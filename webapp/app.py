import json

from flask import Flask
from flask import render_template
from flask import Response

from grpc import FutureTimeoutError

from client import client

app = Flask(__name__)


# The frontend makes a get XHR call to this endpoint.
# The api respond with a meter usage json fetched from gRPC Client.
@app.route('/usage', methods=['GET'])
def usage_get():
    try:
        response = client.run()
    except FutureTimeoutError:
        return "ServerDown", 503
    except Exception:
        return "UnknownError", 500
    return Response(json.dumps(response), content_type='application/json')


# Index page: to render a simple html to getch data.
@app.route('/')
def meter_usage_get():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
