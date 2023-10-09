#!/usr/bin/env python3

from flask import request, Flask, make_response, jsonify, session, redirect, url_for
from flask_restful import Resource, Api
from flask_migrate import Migrate
from models import db, Drink, Ingredient, User, DrinkIngredientsAssociation, UserDrinksAssociation
import os
import bcrypt
from config import app, db, api

app.secret_key = "your_secret_key"


@app.route('/')
def index():
    return f"<h1>Coder's Cantina</h1>"


class DrinksById(Resource):
    def get(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        if not drink:
            return make_response({
                "error": "Drink not found"
            }, 404)
        return make_response(drink.to_dict(), 200)

    def delete(self, id):
        drink = Drink.query.filter(Drink.id == id).one_or_none()
        if drink is None:
            return make_response({'error': 'Drink is not found'}, 404)
        db.session.delete(drink)

        db.session.commit()
        return make_response('', 204)

    def patch(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        if not drink:
            return make_response({"error": "Drink not found"}, 404)

        data = request.get_json()

        try:
            # Update the attributes of the drink based on incoming data
            for attr, value in data.items():
                setattr(drink, attr, value)
    
            # Update the associations between the drink and ingredients
            ingredient_ids = []
            for i in range(1, 11):
                ingredient_name = data.get(f"strIngredient{i}")
                if ingredient_name:
                    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                    if not ingredient:
                        ingredient = Ingredient(name=ingredient_name)
                        db.session.add(ingredient)
                        db.session.flush()
                    ingredient_ids.append(ingredient.id)

            # Remove existing associations not in the updated ingredient list
            existing_associations = DrinkIngredientsAssociation.query.filter_by(drink_id=drink.id)
            for association in existing_associations:
                if association.ingredient_id not in ingredient_ids:
                    db.session.delete(association)

            # Create new associations for updated ingredient list
            for ingredient_id in ingredient_ids:
                if not DrinkIngredientsAssociation.query.filter_by(drink_id=drink.id, ingredient_id=ingredient_id).first():
                    drink_ingredient_association = DrinkIngredientsAssociation(drink_id=drink.id, ingredient_id=ingredient_id)
                    db.session.add(drink_ingredient_association)

            db.session.commit()

            return make_response(drink.to_dict(), 201)


        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(DrinksById, '/drinks/<int:id>')


class Drinks(Resource):
    def get(self):
        drinks = [drink.to_dict() for drink in Drink.query.all()]
        return make_response(drinks, 200)


api.add_resource(Drinks, '/drinks')


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)


api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({
                "error": "User not found"
            }, 404)
        return make_response(user.to_dict(), 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).one_or_none()
        if user is None:
            return make_response({'error': 'User is not found'}, 404)
        db.session.delete(user)

        db.session.commit()
        return make_response('', 204)

    # def patch(self, id):
    #     user = user.query.filter(user.id == id).first()
    #     if not user:
    #         return make_response({"error": "user not found"}, 404)


api.add_resource(UsersById, '/users/<int:id>')


class Register(Resource):
    def post(self):
        try:
            email = request.json.get('email', None)
            password = request.json.get('password', None)

            if not email:
                return 'Missing email', 400

            if not password:
                return 'Missing password', 400

            hashed = bcrypt.hashpw(password.encode(
                'utf-8'), bcrypt.gensalt(rounds=12))
            user = User(email=email, hash=hashed, password=password)

            db.session.add(user)
            db.session.commit()
            return f'Welcome {email}', 201
        except Exception as e:
            # Log the error for debugging
            print(f"Error: {str(e)}")
            return 'Internal Server Error', 500


api.add_resource(Register, '/create_account')


class Login(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email:
            return make_response(jsonify(success=False, message='Missing Email!'), 400)
        if not password:
            return make_response(jsonify(success=False, message='Missing Password!'), 400)
        user = User.query.filter_by(email=email).first()
        if not user:
            return make_response(jsonify(success=False, message='User Not Found!'), 404)
        if bcrypt.checkpw(password.encode('utf-8'), user.hash):
            # Store user.id in the session
            session['logged_in_user_id'] = user.id

            return make_response(jsonify(success=True, message=f'Welcome back {email}'), 201)
        else:
            return make_response(jsonify(success=False, message='Wrong Password!'), 200)


api.add_resource(Login, '/login')


class Logout(Resource):
    def post(self):
        if 'logged_in_user_id' in session:
            logged_in_user_id = session['logged_in_user_id']
            # Use user_id to query the user's data from the database
            logged_in_user_id = session.get(User, logged_in_user_id)
            # print(logged_in_user_id)
            # Remove user_id from the session
            session.pop('logged_in_user_id', None)
        # Redirect to the login page or another page after logout
        return redirect(url_for('login'))


api.add_resource(Logout, '/logout')


# class UserSettings(Resource):

#     def delete(self, id):
#         user = Drink.query.filter(User.id==id).one_or_none()
#         if user is None:
#             return make_response({'error': 'Drink is not found'}, 404)
#         db.session.delete(user)
#         db.session.commit()
#         return make_response({''}, 204)

# api.add_resource(UserSettings, '/user_settings')


class CreateDrink(Resource):
    def post(self):
        data = request.get_json()

        drink = Drink()
        drink_data = {
            "strDrink": data["strDrink"],
            "strInstructions": data["strInstructions"],
            # Updated to strDrinkThumb
            "strDrinkThumb": data.get("strDrinkThumb", ""),
            "strCategory": "User created"
        }
        for i in range(1, 11):
            if data.get(f"strIngredient{i}"):
                drink_data[f"strIngredient{i}"] = data[f"strIngredient{i}"]
                drink_data[f"strMeasure{i}"] = data.get(f"strMeasure{i}", "")

        try:
            for attr, value in drink_data.items():
                setattr(drink, attr, value)
                # print(drink_data.strCategory)
            db.session.add(drink)
            db.session.flush()  # Flush to get the drink id

            # Create and associate ingredients
            ingredient_ids = []
            for i in range(1, 11):
                ingredient_name = data.get(f"strIngredient{i}")
                if ingredient_name:
                    ingredient = Ingredient.query.filter_by(
                        name=ingredient_name).first()
                    if not ingredient:
                        ingredient = Ingredient(name=ingredient_name)
                        db.session.add(ingredient)
                        db.session.flush()
                    ingredient_ids.append(ingredient.id)
            print(ingredient_ids)
            for ingredient_id in ingredient_ids:
                # print(drink.id)
                # if ingredient_id None:
                    # ingredient_id = Ingredient.query.filter(Ingredient.name =
                drink_ingredient_association = DrinkIngredientsAssociation(
                    drink_id=drink.id, ingredient_id=ingredient_id)
                # print(ingredient_id)
                db.session.add(drink_ingredient_association)

            db.session.commit()

            return make_response(drink.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(CreateDrink, '/create_drink')


# class UserDrinks(Resource):

#     def add_to_favorites():
#         data = request.get_json()
#         drink_id = data.get("drinkId")
#         user_id = get_current_user_id()  # Implement your user authentication logic

#         user_drink = UserDrinksAssociation(user_id=user_id, drink_id=drink_id)
#         db.session.add(user_drink)
#         db.session.commit()

#         return jsonify(user_drink.to_dict()), 201

# api.add_resource(UserDrinks, '/add_tofavorites')

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")

#     # Implement your user authentication logic here
#     user = User.query.filter_by(username=username).first()
#     if user and user.password == password:
#         session["user_id"] = user.id
#         return make_response({"message": "Login successful"}, 200)
#     else:
#         return make_response({"message": "Invalid credentials"}, 401)


# @app.route('/logout', methods=['POST'])
# def logout():
#     session.clear()
#     return make_response({"message": "Logout successful"}, 200)

# @app.route('/check_login', methods=['GET'])
# def check_login():
#     user_id = session.get("user_id")
#     if user_id:
#         return make_response({"logged_in": True, "user_id": user_id}, 200)
#     else:
#         return make_response({"logged_in": False}, 200)

class FavoriteDrinks(Resource):
    def post(self):
        data = request.get_json()

        drink_id = data.get('drinkId')

        if 'logged_in_user_id' in session:
            logged_in_user_id = session['logged_in_user_id']

            user_drink = UserDrinksAssociation(
                user_id=logged_in_user_id, drink_id=drink_id)

            try:
                db.session.add(user_drink)
                db.session.flush()
                db.session.commit()

                return make_response(user_drink.to_dict(), 201)
            except ValueError:
                db.session.rollback()
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            # Handle the case where the user is not logged in
            return make_response({"error": "User not logged in"}, 401)


api.add_resource(FavoriteDrinks, '/favorite_drinks')


class GetUserId(Resource):
    def get(self):
        # Retrieve email from query parameters
        email = request.args.get('email')
        user = User.query.filter_by(email=email).first()

        if user:
            user_id = user.id
            return make_response({'id': user_id}, 200)
        else:
            return make_response({'error': 'User not found'}, 404)


api.add_resource(GetUserId, '/getUserId')


# class DeleteFavoriteDrinksById(Resource):
#     def delete(self, id):

#         favorite_drink = UserDrinksAssociation.query.filter(UserDrinksAssociation.drink_id == id).one_or_none()
#         if favorite_drink is None:
#             return make_response({'error': 'Drink is not found'}, 404)
#         db.session.delete(favorite_drink)
#         db.session.commit()
#         return make_response('', 204)


# api.add_resource(DeleteFavoriteDrinksById, '/user_favorite_drinks_button/<int:id>')


class UserFavoriteDrinksButton(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        user_drinks = [drink.to_dict() for drink in UserDrinksAssociation.query.filter_by(
            user_id=logged_in_user_id).all()]
        # print(user_drinks)
        return make_response(user_drinks, 202)


api.add_resource(UserFavoriteDrinksButton, '/user_favorite_drinks_button')


class UserFavoriteDrinks(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']

        # Query the favorite drinks with their associated drink details using a join
        favorite_drinks_query = db.session.query(UserDrinksAssociation, Drink).\
            join(Drink, UserDrinksAssociation.drink_id == Drink.id).\
            filter(UserDrinksAssociation.user_id == logged_in_user_id).all()
        # print (favorite_drinks_query[0])
        # Create a list of dictionaries containing drink details for the favorite drinks

        # List comprehension for each Drink instance object and assigning each object to the array
        user_favorite_drinks = [drink.Drink.to_dict()
                                for drink in favorite_drinks_query]

        # print(user_favorite_drinks)

        return make_response(user_favorite_drinks, 202)


api.add_resource(UserFavoriteDrinks, '/user_favorite_drinks')


class UnFavoriteDrinksById(Resource):
    def delete(self, id):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']

        favorite_drink = UserDrinksAssociation.query.filter_by(
            user_id=logged_in_user_id, drink_id=id).one_or_none()
        if favorite_drink is None:
            return make_response({'error': 'Drink is not found'}, 404)
        db.session.delete(favorite_drink)
        db.session.commit()
        return make_response('', 204)


api.add_resource(UnFavoriteDrinksById, '/user_favorite_drinks/<int:id>')


class IngredientsById(Resource):
    def get(self, id):
        ingredient = Ingredient.query.filter(Ingredient.id == id).first()
        if not ingredient:
            return make_response({
                "error": "Ingredient not found"
            }, 404)
        return make_response(ingredient.to_dict(), 200)

    def delete(self, id):
        ingredient = Ingredient.query.filter(Ingredient.id == id).one_or_none()
        if ingredient is None:
            return make_response({'error': 'Ingredient is not found'}, 404)
        db.session.delete(ingredient)

        db.session.commit()
        return make_response('', 204)


api.add_resource(IngredientsById, '/ingredients/<int:id>')

class UserFavById(Resource):
    def get(self, id):
        favorite = UserDrinksAssociation.query.filter(UserDrinksAssociation.id == id).first()
        if not favorite:
            return make_response({
                "error": "Favorite not found"
            }, 404)
        return make_response(favorite.to_dict(), 200)

    def delete(self, id):
        favorite = UserDrinksAssociation.query.filter(UserDrinksAssociation.id == id).one_or_none()
        if favorite is None:
            return make_response({'error': 'Favorite is not found'}, 404)
        db.session.delete(favorite)

        db.session.commit()
        return make_response('', 204)
    
api.add_resource(UserFavById, '/user_fav_id/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
