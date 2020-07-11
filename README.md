# A demo gRPC server + client + webapp

### Setup Development Environment
----
1. Install python virtual environemt using [pyenv](https://github.com/pyenv/pyenv)

2. Install python >= 3.7.2
```
  $ pyenv install 3.7.2
```

3. Create virtual environemt
```
  $ pyenv virtualenv 3.7.2 <env-name>
```

4. Activate Python virtual environemt
```
  $ cd /grpc-demo
  $ pyenv local <env-name>
```

5. install dependencies
```
  $ cd /grpc-demo
  $ pip install -r requirements.txt
```

6. Compile `protobuf` (Compiled files already added to `/grpc-demo/protos/generated-py` in this repo)
```
  $ cd /grpc-demo/protos
  $ sh build.sh
```

7. Start Server
```
  $ cd /grpc-demo/server
  $ sh run_server.sh
```
You should see this in terminal
```
Starting server. Listening on port 50051.
```

7. Start webapp
```
  $ cd /grpc-demo/webapp
  $ sh run_server.sh
```
You should see this in terminal
```
 * Serving Flask app "app" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: XXX-XXX-XXX
```

8. Open `http://127.0.0.1:5000/` in browser.

9. Click on `Fetch Data` button. The data should be populated in the table.


### Architecture and Data Flow:
----
1. The frontend makes and XHR GET request to Flask webserver on `/usage` endpoint.
2. `Flask` calls the `client` that executes `run` method. 
3. `Client` is wrapped around a Service Wrapper that makes a request to gRPC server.
4. `gRPC Server` validates the request and read CSV file.
5. `gRPC Server` converts the csv into json and returns a `protobuf` with data to client.
6. `Client` received protobuf from server and pass it to the `Flask webserver`.
7. `Flask webserver` returns the content received from `Client` to the frontend as json.
8. `Frontend` renders the json in table via a jsvascript method `render_data_in_table`

# Thats all Folks.
