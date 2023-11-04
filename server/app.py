#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from config import db
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import requests
import os
import bcrypt
import tmdbsimple as tmdb
from models import db, User, Movie, Rating, Comment, MovieList, Log
from faker import Faker
fake = Faker()

tmdb.API_KEY = 'c9ec267ab1d062779039d92435621a6b'


# Create a Flask application
app = Flask(__name__)


CORS(app)
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


api = Api(app)

from flask_cors import CORS





CORS(app, resources={r"/users/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/movies/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/logout/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/signup*": {"origins": "http://localhost:3000"}})





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
        movies = [movie.to_dict() for movie in Movie.query.all()]
        return make_response(movies, 200)

api.add_resource(Movies, "/movies")

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
   
    def post(self):
        try:
            new_user = User(
                username = request.json['username'],
                password = request.json['password'],
                age = request.json['age']
                )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201 )
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        user_to_dict = user.to_dict()
        return make_response(user_to_dict, 200)

    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        try:
            for attr in request.json: 
                setattr(user, attr, request.json[attr])
            db.session.add(user)
            db.session.commit()
            user_to_dict = user.to_dict()
            return make_response(user_to_dict, 202)
        except ValueError:
            return make_response({"errors":["validation errors"]}, 400)

    def delete(self,id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"error": ["User not found"]}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)
api.add_resource(UsersById, '/users/<int:id>')


# Create a resource for the Movie model
class MovieById(Resource):
    def get(self, movie_id):
        movie = Movie.query.get(movie_id)
        if movie:
            return movie.to_dict()
        else:
            return {'message': 'Movie not found'}, 404

api.add_resource(MovieById, '/movies/<int:movie_id>')

# Create a resource for the Rating model
class RatingById(Resource):
    def get(self, rating_id):
        rating = Rating.query.get(rating_id)
        if rating:
            return rating.to_dict()
        else:
            return {'message': 'Rating not found'}, 404

api.add_resource(RatingById, '/ratings/<int:rating_id>')

class Ratings(Resource):
    def get(self):
        ratings = [rating.to_dict() for rating in Rating.query.all()]
        return make_response(ratings, 200)

api.add_resource(Ratings, '/ratings')

# Create a resource for the Comment model
class CommentResource(Resource):
    def get(self, comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            return comment.to_dict()
        else:
            return {'message': 'Comment not found'}, 404

api.add_resource(CommentResource, '/comments/<int:comment_id>')

# Create a resource for the MovieList model
class MovieListResource(Resource):
    def get(self, list_id):
        movie_list = MovieList.query.get(list_id)
        if movie_list:
            return movie_list.to_dict()
        else:
            return {'message': 'Movie List not found'}, 404

api.add_resource(MovieListResource, '/lists/<int:list_id>')

# Create a resource for the Log model
class Logs(Resource):
    def get(self):
        logs = [log.to_dict() for log in Log.query.all()]
        return make_response(logs, 200)

api.add_resource(Logs, '/logs')

class LogById(Resource):
    def get(self, log_id):
        log = Log.query.get(log_id)
        if log:
            return log.to_dict()
        else:
            return {'message': 'Log not found'}, 404

api.add_resource(LogById, '/logs/<int:log_id>')

class Signup(Resource):
    def post(self):
        try:
            new_user = User(
                username = request.json['username'],
                _password_hash = request.json['password'],
                age = request.json['age'],
                image_url = fake.image_url()
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return make_response({"error": "User not created"}, 400)
    
    

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.json['username']).first()
        password = request.json['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-_password_hash',)), 201)
        else:
            return make_response('error', 400)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

class AutoLogin(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                return make_response(user.to_dict(rules=('-_password_hash',)), 200)
            else:
                return make_response({"errors": "User not found"}, 404)
        else:
            return make_response('', 204)

api.add_resource(AutoLogin, '/auto_login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
