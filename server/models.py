from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from flask_migrate import Migrate
from sqlalchemy import MetaData, Table
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

    
user_movie_association = db.Table(
    'user_movie_association',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer)

    ratings = db.relationship('Rating', backref='user_ref', cascade="all, delete-orphan")
    comments = db.relationship('Comment', backref='user_comments', cascade="all, delete-orphan")
    lists = db.relationship('MovieList', backref='user_list', cascade="all, delete-orphan")
    movies = db.relationship('Movie', secondary=user_movie_association, backref='rated_by_users')

    serialize_rules = ('-ratings.user', '-comments.user', '-lists.user', '-movies_rated.users')

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    rating = db.Column(db.Integer)
    img_url = db.Column(db.String)

    comments = db.relationship('Comment', backref='movie_comments', cascade="all, delete-orphan")
    ratings = db.relationship('Rating', primaryjoin='Movie.id == Rating.movie_id', backref='movie_ratings', cascade="all, delete-orphan")
    users = db.relationship('User', secondary=user_movie_association, backref='movies_user')
    lists = db.relationship('MovieList', backref='movie_lists', cascade="all, delete-orphan")
    
    serialize_rules = ('-comments.movie', '-ratings.movie', 'users.movie', '-lists.movies')


class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', backref='ratings_ref')
    movie = db.relationship('Movie', backref='ratings_movie')

    serialize_rules = ('-user.ratings',)

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    user = db.relationship('User', backref='comments_user')
    movie = db.relationship('Movie', backref='comments_movie')

    serialize_rules = ('-user.comments', '-movie.comments')

class MovieList(db.Model, SerializerMixin):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    user = db.relationship('User', backref='lists_user')
    movie = db.relationship('Movie', backref='lists_movie')

    serialize_rules = ('-user.lists', '-movies.lists')

class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    rating = db.Column(db.Integer)

    movie = db.relationship('Movie', backref='logs')

    serialize_rules = ('-movie.logs')