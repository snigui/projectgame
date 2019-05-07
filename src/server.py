from flask import Flask, send_from_directory, request, render_template
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
socket_server = SocketIO(app)
position = []
username = ""

# Tip: the emit method has an optional parameter "broadcast" which when set to True will
#      emit to all connected websockets

@socket_server.on('click')
def click(data):
    # received a "click" message over the socket
    print(data)
    info = json.loads(data)
    emit('click', info, broadcast=True)
    print(info)

@app.route('/')
def index():
    return send_from_directory('static', 'index1.html')


@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)


print("listening on port 8082")
socket_server.run(app, port=8082)
