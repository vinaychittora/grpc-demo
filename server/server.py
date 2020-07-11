from concurrent import futures
import grpc
import os
import time

import pandas as pd

import meterusage_pb2
import meterusage_pb2_grpc


# A class to define the server functions, derived from
# meterusage_pb2_grpc.MeterUsageServicer
class MeterUsageServicer(meterusage_pb2_grpc.MeterUsageServicer):

    # Read csv and convert into a python dictionary.
    def get_data(self):
        PWD = os.getcwd()
        df = pd.read_csv("{}/data/meterusage.csv".format(PWD))
        return df.to_dict('records')

    # Entrypoint for MeterUsage services.
    def MeterUsageJson(self, request, context):
        start = time.time()
        print("." * 80)
        print("Received a request")
        print("Invocation MetaData: {}".format(context.invocation_metadata()))
        print("Peers: {}".format(context.peer()))
        print("Fetching data and parsing it to protobuf")
        response = meterusage_pb2.Record(value=self.get_data())
        print("Request Completed in: {}".format(time.time() - start))
        print("." * 80)
        return response


# create a gRPC server
server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))

# use the generated function `add_MeterUsageServicer_to_server`
# to add the defined class to the server
meterusage_pb2_grpc.add_MeterUsageServicer_to_server(
    MeterUsageServicer(),
    server
)

# listen on port 50051
print('Starting server. Listening on port 50051.')
server.add_insecure_port('[::]:50051')
server.start()

# since server.start() will not block,
# a sleep-loop is added to keep alive
try:
    while True:
        time.sleep(60 * 60 * 24)
except KeyboardInterrupt:
    server.stop(0)
