#!/usr/bin/env python3

# export FLASK_APP=server/app.py
# flask db init
# flask db upgrade head
# flask db revision --autogenerate -m 'message'
# flask db upgrade head
# python server/seed.py

# Standard library imports
from random import randint, choice as rc
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, render_template
from flask_restful import Api, Resource
import os
import requests

# Remote library imports


# Local imports
from app import app
from models import db, Drink, Ingredient, User, DrinkIngredientsAssociation, UserDrinksAssociation


with app.app_context():
    # Drink.query.delete()
    # User.query.delete()
    # DrinkIngredientsAssociation.query.delete()
    # Ingredient.query.delete()
    # UserDrinksAssociation.query.delete()

    if __name__ == '__main__':
        
        with app.app_context():
            
            print("Starting seed...")

            with open('counter.txt', 'r') as file:
                counter = int(file.readline().strip())
            
            # last_drink = db.session.query(Drink).order_by(Drink.id.desc()).first()

        # if last_drink:
        #     last_id = last_drink.id
        #     print("Last id:", last_id)
        # else:
        #     print("No entries found")

        # start_id = last_id + 1
        # end_id = start_id + 10

    for i in range(counter, counter + 10):
        print(i)
        url = f'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={i}'
        response = requests.get(url)
        
        data = response.json()

        if data['drinks'] is not None:
            drink_data = data['drinks'][0]

            # Use the loop index as the ID
            drink_data['idDrink'] = str(i)

            drink = Drink.query.filter_by(id=drink_data['idDrink']).first()

            print("generating drink ", i)
            if not drink:
                drink = Drink(id=drink_data['idDrink'])

            for attr, value in drink_data.items():
                setattr(drink, attr, value)

            db.session.add(drink)
            db.session.commit()

    # populates the ingredient table and the drinkingredientsassociation tables
    drinks = Drink.query.all()

    # Initialize an empty set to store unique ingredients
    unique_ingredients = set()

    # Iterate through each drink to collect unique ingredients
    for drink in drinks:
        for i in range(1, 11):
            ingredient_key = f'strIngredient{i}'
            ingredient_value = getattr(drink, ingredient_key, None)

            if ingredient_value:
                unique_ingredients.add(ingredient_value)

    # Create or retrieve Ingredient instances and associate their IDs
    ingredient_instances = {}
    for ingredient_name in unique_ingredients:
        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
        if not ingredient:
            ingredient = Ingredient(name=ingredient_name)
            db.session.add(ingredient)
            db.session.commit()
        ingredient_instances[ingredient_name] = ingredient

    # Create corresponding entries in the DrinkIngedientAssociations table
    for drink in drinks:
        for i in range(1, 11):
            ingredient_key = f'strIngredient{i}'
            ingredient_value = getattr(drink, ingredient_key, None)

            if ingredient_value:
                ingredient = ingredient_instances[ingredient_value]
                association = DrinkIngredientsAssociation(
                    drink_id=drink.id, ingredient_id=ingredient.id)
                db.session.add(association)

    db.session.commit()


    counter += 10
    with open('counter.txt', 'w') as file:
        file.write(str(counter))
    # ingredients = []

    # for j in range(1, 15):
    #     ingredient_key = f'strIngredient{j}'
    #     ingredients_from_query = Drink.query.all()

    #     for drink in ingredients_from_query:
    #         ingredient_value = getattr(drink, ingredient_key, None)

    #         if ingredient_value is not None and ingredient_value not in ingredients:
    #             ingredients.append(ingredient_value)

    # Create and insert Ingredient instances into the database
    # for idx, ingredient in enumerate(ingredients):
    #     ingredient_instance = Ingredient(
    #         id=idx + 1,  # Assign a unique ID to each ingredient
    #         name=ingredient,
    #         drink_id=1,  # Set the drink ID as needed
    #     )
    #     db.session.add(ingredient_instance)

    # db.session.commit()

    # for i in range(1, 15):
    #     ingredients = []
    #     print(f'strIngredient{i}.content')
    #     if f'strIngredient{i}' in Drink.query.all() != None:

    #         ingredients.append(f'strIngredient{i}.content')
    #     print(ingredients)
