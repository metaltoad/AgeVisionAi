import io
import os
import json
import boto3
import base64

from datetime import datetime
from typing import Dict, Union, List

s3_bucket: str = os.environ["S3_BUCKET"]
s3_client = boto3.client("s3")
rekognition_client = boto3.client("rekognition")


class ClientError(Exception):
    pass


class ServerError(Exception):
    pass


def lambda_handler(event: Dict[str, str], context):

    api_response: Dict[str, Union[int, str, Dict]] = {
        "statusCode": 200,
        "body": "",
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }
    response: Dict[str, Union[str, int, List, Dict]] = {
        "Age": 0,
        "Emotions": [],
        "HigherEmotion": {},
    }

    try:
        # Extract information from event
        body: Dict[str, str] = json.loads(event.get("body", "{}"))

        base64_image = body.get("Image")
        file_extension = body.get("FileExtension")

        if not base64_image:
            raise ClientError("Image not sent")

        if not file_extension:
            raise ClientError("File extension not sent")

        # Define key with unique hash
        timestamp: str = datetime.now().isoformat()
        object_key: str = f"{timestamp}.{file_extension}"

        # Remove the data URI prefix if it exists
        base64_image = base64_image.split(",")[-1]

        # Add padding if necessary
        padding = b"=" * (-len(base64_image) % 4)
        base64_image += padding.decode()

        image_data = base64.urlsafe_b64decode(base64_image)

        s3_client.put_object(
            Bucket=s3_bucket,
            Key=object_key,
            Body=io.BytesIO(image_data),
            ContentType="image/png",
        )

        # Analyze image
        analysis = rekognition_client.detect_faces(
            Image={"S3Object": {"Bucket": s3_bucket, "Name": object_key}},
            Attributes=["AGE_RANGE", "EMOTIONS"],
        )

        if len(analysis["FaceDetails"]) == 0:
            raise ClientError("No faces detected")

        face_details = analysis["FaceDetails"][0]

        # Extract age
        upper_age: int = face_details["AgeRange"]["High"]
        lower_age: int = face_details["AgeRange"]["Low"]

        emotions = [
            emotion
            for emotion in face_details["Emotions"]
            if emotion["Confidence"] > 40
        ]
        age: int = int((upper_age + lower_age) / 2)

        # Update response
        response["Age"] = age
        response["Emotions"] = emotions  # type: ignore

    except ServerError as e:
        api_response["statusCode"] = 500
        api_response["body"] = f"Server error: please check cloudfront logs"

    except ClientError as e:
        api_response["statusCode"] = 400
        api_response["body"] = f"Client error: {e}"

    except Exception as e:
        api_response["statusCode"] = 500
        api_response["body"] = "Unexpected error, please check cloudfront logs"

    else:
        api_response["body"] = json.dumps(response)

    finally:
        return api_response
