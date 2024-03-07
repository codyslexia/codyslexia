from datetime import datetime, timezone
import json
from flask import Flask,  Response

app = Flask(__name__)

books = [{"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
         {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
         {"id": 3, "title": "1984", "author": "George Orwell"}]


@app.route('/', methods=['GET'], defaults={'path': ''})
@app.route('/<path:path>')
def not_found(path):
    return Response(json.dumps({
        "code": 404,
        "message": f"Path Not Found: '/{path}'",
    }), mimetype='application/json')


@app.route('/books', methods=['GET'])
def get_books():
    return Response(json.dumps({
        "books": books
    }), mimetype='application/json')


@app.route('/status', methods=['GET'])
def get_status():
    return Response(json.dumps({
        "app": "pythonapi",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    }), mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8002)
