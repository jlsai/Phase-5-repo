#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from config import db
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import requests
import os
from flask_bcrypt import Bcrypt
from faker import Faker
import tmdbsimple as tmdb
from models import Movie

tmdb.API_KEY = 'c9ec267ab1d062779039d92435621a6b'




# Create a Flask application
app = Flask(__name__)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)


# API endpoint URL with API key
api_key = 'c9ec267ab1d062779039d92435621a6b'
api_url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key  # Replace with the actual API endpoint

# Define your routes
@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

@app.route('/data')
def get_data():
    # Set up the headers with your API key
    headers = {
        'Authorization': 'Bearer c9ec267ab1d062779039d92435621a6b'
    }

    # Send a GET request to the API with your API key
    response = requests.get(api_url, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data from the API"}), 500
    
class Movies(Resource):
    def get(self):
        movies = [movie.to_dict() for movie in Movies.query.all()]
        return make_response(movies, 200)

api.add_resource(Movies, "/movies")  

if __name__ == '__main__':
    # Run the Flask app on port 5555
    app.run(port=5555, debug=True)
