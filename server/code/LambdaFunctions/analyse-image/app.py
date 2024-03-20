import os
import boto3
import json
from typing import Dict, Union

s3_bucket: str = os.environ["S3_BUCKET"]
s3_client = boto3.client("s3")


class ClientError(Exception):
    pass


class ServerError(Exception):
    pass


def lambda_handler(event: Dict[str, str], context):
    # Define responses
    api_response: Dict[str, Union[int, str]] = {"statusCode": 200, "body": ""}
    response: Dict[str, str] = {"PreSignedUrl": "", "FileName": ""}

    try:
        # Create presigned url for S3
        body: Dict[str, str] = json.loads(event.get("body", "{}"))

        # Get file extension
        file_extension: str | None = body.get("FileExtension")

        if not file_extension:
            raise ClientError("No file extension provided")

        # TODO: Define key with unique hash
        object_key: str = f"test_image.{file_extension}"

        # Generate PUT presigned URL
        presigned_url: str = s3_client.generate_presigned_url(
            "put_object",
            {
                "Bucket": s3_bucket,
                "Key": object_key,
            },
        )

        # Update response
        response["PreSignedUrl"] = presigned_url
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
