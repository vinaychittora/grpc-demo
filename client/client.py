import json

from google.protobuf.json_format import MessageToJson

from client.client_wrapper import ServiceClient
import meterusage_pb2
import meterusage_pb2_grpc


def run():
    # Create a service Client using the client wrapper.
    meterusage_client = ServiceClient(
        meterusage_pb2_grpc,
        'MeterUsageStub',
        'localhost',
        50051
    )

    # Create request object.
    request = meterusage_pb2.Request()

    # Make a request to server. and parse the response to json.
    try:
        response = meterusage_client.MeterUsageJson(request)
        return json.loads(MessageToJson(response))
    except Exception as e:
        # Raise exception if any error occurs.
        raise e
