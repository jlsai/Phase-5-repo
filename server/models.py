from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

user_watched_movies = db.Table('user_watched_movies',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    age = db.Column(db.Integer)
    image_url = db.Column(db.String)

    # Add a many-to-many relationship for watched movies
    watched_movies = db.relationship('Movie', secondary=user_watched_movies, back_populates='watched_by')
    watched_movies_proxy = association_proxy('watched_movies', 'title') 

    ratings = db.relationship('Rating', backref='user')
    
    def to_dict(self):
        user_dict = super().to_dict()
        user_movies = [{'id': rating.movie.id, 'name': rating.movie.title, 'rating': rating.rating, 'img': rating.movie.img_url} for rating in self.ratings]
        user_dict['movies'] = user_movies
        return user_dict

    serialize_rules = ('-ratings.user', '-comments.user', '-lists.user',)
    
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username must be present")
        return username
    
    @validates('age')
    def validate_age(self, key, age):
        age = int(age)
        if type(age) is int and age < 16 or age > 100:
            raise ValueError("Age must be a number of 16 or older")
        return age

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        from app import bcrypt
        if type(password) is str and len(password) > 6:
            password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
            self._password_hash = password_hash.decode('utf-8')
        else:
            raise ValueError("Password Invalid")
    
    def authenticate(self, password):
        from app import bcrypt
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    rating = db.Column(db.Integer)
    img_url = db.Column(db.String)
    summary = db.Column(db.String)

    comments = db.relationship('Comment', backref='movie_comments', cascade="all, delete-orphan")
    ratings = db.relationship('Rating', backref='movie', cascade="all, delete-orphan")
    lists = db.relationship('MovieList', backref='movie_lists', cascade="all, delete-orphan")

    # Add a many-to-many relationship for users who watched the movie
    watched_by = db.relationship('User', secondary=user_watched_movies, back_populates='watched_movies')

    serialize_rules = ('-comments.movie', '-ratings.movie', '-ratings.user', '-users.movie', '-lists.movies', '-watched_by')


class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-user.ratings', '-movie.ratings')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    serialize_rules = ('-user.comments', '-movie.comments')

class MovieList(db.Model, SerializerMixin):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    serialize_rules = ('-user.lists', '-movies.lists')

class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    rating = db.Column(db.Integer)

    serialize_rules = ('-movie.logs')
