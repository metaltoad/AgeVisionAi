import boto3
import os
import json

from typing import Dict, Union, List

s3_bucket: str = os.environ["S3_BUCKET"]
s3_client = boto3.client("s3")
rekognition_client = boto3.client("rekognition")


class ClientError(Exception):
    pass


class ServerError(Exception):
    pass


def lambda_handler(event: Dict[str, str], context):

    api_response: Dict[str, Union[int, str]] = {"statusCode": 200, "body": ""}
    response: Dict[str, Union[str, float]] = {"PreSignedViewUrl": "", "Age": 0}

    try:
        # Extract information from event
        body: Dict[str, str] = json.loads(event.get("body", "{}"))
        s3_key: str | None = body.get("FileName")

        if not s3_key:
            raise ClientError("No file name provided")

        # Analyze image
        analysis = rekognition_client.detect_faces(
            Image={"S3Object": {"Bucket": s3_bucket, "Name": s3_key}},
            Attributes=["AGE_RANGE"],
        )

        if len(analysis["FaceDetails"]) == 0:
            raise ClientError("No faces detected")

        face_details = analysis["FaceDetails"][0]

        # Extract age
        upper_age = face_details["AgeRange"]["High"]
        lower_age = face_details["AgeRange"]["Low"]

        age: float = (upper_age + lower_age) / 2

        # Update response
        response["Age"] = age

        # Get presigned url to view image in FE for 24 hours
        expiration: int = 60 * 60 * 24  # 24 hours

        pre_signed_url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": s3_bucket, "Key": s3_key},
            ExpiresIn=expiration,
        )

        # Add presigned url to response
        response["PreSignedViewUrl"] = pre_signed_url

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
