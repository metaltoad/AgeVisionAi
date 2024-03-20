import os
import boto3
import json
from typing import Dict, Union
from datetime import datetime

s3_bucket: str = os.environ["S3_BUCKET"]
s3_client = boto3.client("s3", region_name="us-west-2")


class ClientError(Exception):
    pass


class ServerError(Exception):
    pass


def lambda_handler(event: Dict[str, str], context):
    # Define responses
    api_response: Dict[str, Union[int, str]] = {"statusCode": 200, "body": ""}
    response: Dict[str, Union[str, Dict[str, str]]] = {
        "PreSignedInformation": "",
        "FileName": "",
    }

    try:
        # Create presigned url for S3
        body: Dict[str, str] = json.loads(event.get("body", "{}"))

        # Get file extension
        file_extension: str | None = body.get("FileExtension")

        if not file_extension:
            raise ClientError("No file extension provided")

        # Define key with unique hash
        timestamp: str = datetime.now().isoformat()
        object_key: str = f"{timestamp}.{file_extension}"

        # Generate PUT presigned URL
        presigned_url: Dict = s3_client.generate_presigned_post(
            Bucket=s3_bucket,
            Key=object_key,
        )

        # Update response
        response["PreSignedInformation"] = presigned_url
        response["FileName"] = object_key

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
