from flask import Flask, jsonify
import requests

app = Flask(__name__)

MUSEUM_URL = "https://api.artic.edu/api/v1/artworks"


@app.route('/')
def hello_world():
    return 'Hello world!'

# gets all the artworks
@app.route('/artwork', methods=['GET'])
def get_artwork():
    try:
        response = requests.get(MUSEUM_URL)
        return jsonify(response.json()), 200
    except:
        return jsonify({"message": "An error occurred while processing your request"}), 500

# gets a specific artwork
@app.route(/'artwork/<int:id>', methods=['GET'])
def get_artwork_by_id(id):
    try:
        response = requests.get(f"{MUSEUM_URL}/{id}")
        return jsonify(response.json()), 200
    except:
        return jsonify({"message": "An error occurred while processing your request"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
