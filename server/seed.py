#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
import requests
from app import app, api_url
from models import db
from models import User, Movie, Rating, Comment, MovieList, Log

def create_movies():
    headers = {
        'Authorization': 'Bearer c9ec267ab1d062779039d92435621a6b'
    }
        # Send a GET request to the API to fetch the first 10 movies
    response = requests.get(api_url, headers=headers)
    data = response.json()
    movies_to_add = data.get("results", [])[:10]  # Get the first 10 movies from the API response

            # Iterate through the movies and add them to the database
    for movie_data in movies_to_add:
        title = movie_data.get("title")
        vote_average = movie_data.get("vote_average")
        image_url = movie_data.get("poster_path")
        movie = Movie(
            title=title, 
            rating=vote_average,
            img_url=image_url
            )
        db.session.add(movie)    
        db.session.commit()
        print(f"Added movie: {title}")
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.create_all()  # Create the database tables if they don't exist
        create_movies()   # Call the function to add movies from the API
        db.session.commit()  # Commit changes to the database
        
        print("Done seeding!")
