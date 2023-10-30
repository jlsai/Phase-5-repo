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

import requests
from models import db, Movie

def create_movies():
    headers = {
        'Authorization': 'Bearer c9ec267ab1d062779039d92435621a6b'
    }
    
    # Send a GET request to the API to fetch the first 10 movies
    response = requests.get(api_url, headers=headers)
    data = response.json()
    movies_to_add = data.get("results", [])[:20]  # Get the first 20 movies from the API response
    
    # Clear the existing movies in the database
    Movie.query.delete()
    db.session.commit()
    print("Cleared existing movies in the database.")

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
        print(f"Added movie: {title}")
    
    # Commit the changes after adding all movies
    db.session.commit()

# Assuming api_url is defined somewhere in your code.
# Example: api_url = "https://example.com/api/movies"

    
def create_users():
    users = []
   
    for _ in range(5):

        s = User(
            username = fake.user_name(),
            _password_hash = fake.password(),
            age = randint(18,90),
            image_url = fake.image_url()
        )
        users.append(s)
    
    return users


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.create_all()  # Create the database tables if they don't exist
        create_movies()   # Call the function to add movies from the API
        db.session.commit()  # Commit changes to the database
        
        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        
        print("Done seeding!")
