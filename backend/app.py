# <?php
# $url = "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=0";

# $ch = curl_init();

# curl_setopt($ch, CURLOPT_URL, $url);
# curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
# curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

# $response = curl_exec($ch);

# if(curl_errno($ch)){
#     echo 'Error: ' . curl_error($ch);
# }

# curl_close($ch);

# // process the response
# $responseArray = json_decode($response, true);

# // use data in $responseArray as needed
# ?>

from flask import Flask
import jsonify
import requests

app = Flask(__name__)

MUSEUM_URL = "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=0"


@app.route('/')
def hello_world():
    return 'Hello world!'


@app.route('/artwork', methods=['GET'])
def get_artwork():
    try:
        response = requests.get(MUSEUM_URL)
        return jsonify(response.json()), 200
    except:
        return jsonify({"message": "An error occurred while processing your request"}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
