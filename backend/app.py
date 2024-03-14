from flask import Flask, jsonify, send_file
import requests
import io
from flask_cors import CORS, cross_origin
import logging

app = Flask(__name__)
CORS(app)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

MUSEUM_URL = "https://api.artic.edu/api/v1/artworks"
MUSEUM_IMAGE_URL = "https://www.artic.edu/iiif/2"


@app.route('/')
def hello_world():
    return 'Hello world!'

# gets all the artworks
@app.route('/artworks', methods=['GET'])
def get_artwork():
    try:
        response = requests.get(MUSEUM_URL)
        return jsonify(response.json()), 200
    except:
        return jsonify({"message": "An error occurred while processing your request"}), 500

# gets a specific artwork
@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork_by_id(id):
    try:
        response = requests.get(f"{MUSEUM_URL}/{id}")
        return jsonify(response.json()), 200
    except:
        return jsonify({"message": "An error occurred while processing your request"}), 500

# # get image from api
# @app.route('/artworks/image/<int:id>', methods=['GET'])
# def get_artwork_image(id):
#     try:
#         #fetch the data from art institute's api
#         response = requests.get(f"{MUSEUM_IMAGE_URL}/{id}?fields=id,title,image_id")
#         data = response.json()

#         # extract the image_id from the response
#         image_id = data['data']['image_id']
        
#         # Construct the IIIF Image API URL
#         base_url = "https://www.artic.edu/iiif/2"  # Replace with the actual base URL of the IIIF Image API
#         region = "full"
#         size = "843,"
#         rotation = "0"
#         quality = "default"
#         image_format = "jpg"

#         image_url = f"{base_url}/{image_id}/{region}/{size}/{rotation}/{quality}.{image_format}"

#         # fetch image from iiif image api
#         image_response = requests.get(image_url)

#         # create a bytesio object from the image data and return it as a file
#         return send_file(io.BytesIO(image_response.content), mimetype='image/jpeg'), 200
#     except Exception as e:
#         print(e)
#         return jsonify({"error": "error retrieving artwork image"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
