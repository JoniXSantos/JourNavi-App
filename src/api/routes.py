"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime
from api.utils import generate_sitemap, APIException
from api.models import db, Users, Countries, Posts, Comments
import re
import cloudinary
import cloudinary.uploader
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    password_pattern = r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    password = data.get('password')
    if not re.match(password_pattern, password):
        response_body['message'] = "Your password must be minimally 8 characters long and contain at least one uppercase letter, one downcase letter, one digit and one special character."
        return response_body, 400
    existing_user = db.session.execute(db.select(Users).where(Users.email == data.get('email'))).scalar()
    if existing_user:
        response_body['message'] = "There is already an account with this email."
        return response_body, 400
    new_user = Users(email = data.get('email'),
                     password = password)
    db.session.add(new_user)
    db.session.commit()
    response_body['message'] = "Registration succeeded!"
    response_body['results'] = new_user.serialize()
    return response_body, 200


@api.route('/login', methods=['POST'])
def login():
    response_body = {}
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password)).scalar()
    if not user:
        response_body['message'] = 'Email or password incorrect'
        return response_body, 401
    identity = f"{user.id}|{user.email}"
    access_token = create_access_token(identity=identity)
    response_body['message'] = f'Welcome, {email}'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'List of the users'
    response_body['results'] = result
    return response_body, 200


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def user(id):
    response_body = {}
    current_user = get_jwt_identity()
    user_id, email = current_user.split('|')
    row = Users.query.filter_by(id=user_id).first()
    if request.method == 'GET':
        response_body['message'] = f'This is the information about user no. {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name')
        row.nationality = data.get('nationality')
        row.residence = data.get('residence')
        db.session.commit()
        response_body['message'] = 'Your data are updated'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = 'Your account was deleted'
        response_body['results'] = {}
        return response_body, 200


@api.route('/upload', methods=['POST'])
def upload():
    response_body = {}
    file_to_upload = request.files.get('img')
    if not file_to_upload:
       response_body['message'] = 'Upload failed'
       return response_body, 400
    upload = cloudinary.uploader.upload(file_to_upload)
    image_url = upload.get('url')
    if image_url.startswith("http://"):
        image_url = image_url.replace("http://", "https://")
    response_body['message'] = 'The file was uploaded'
    response_body['results'] = image_url
    return response_body, 200


@api.route('/profileimage', methods=['PATCH'])
@jwt_required()
def profileimage():
    response_body = {}
    current_user = get_jwt_identity()
    user_id, email = current_user.split('|')
    row = Users.query.filter_by(id=user_id).first()
    data = request.json
    row.picture = data.get('picture')
    db.session.commit()
    response_body['message'] = 'Your profile picture is updated'
    response_body['results'] = row.serialize()
    return response_body, 200


@api.route('/password', methods=['PATCH'])
@jwt_required()
def password():
    response_body = {}
    current_user = get_jwt_identity()
    user_id, email = current_user.split('|')
    row = Users.query.filter_by(id=user_id).first()
    data = request.json
    old_password = data.get('oldpassword')
    new_password = data.get('password')
    if old_password != row.password:
        response_body['message'] = "The current password is not correct."
        return response_body, 400
    password_pattern = r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    if not re.match(password_pattern, new_password):
        response_body['message'] = "Please, follow the above requirements for the password format."
        return response_body, 400
    row.password = new_password
    db.session.commit()
    response_body['message'] = 'Your password is changed'
    return response_body, 200


@api.route('/countries', methods=['GET'])
def countries():
    response_body = {}
    rows = db.session.execute(db.select(Countries)).scalars()
    result = [row.serialize() for row in rows]
    if len(result) == 0:
        url = 'https://restcountries.com/v3.1/all/'
        response = requests.get(url)
        if response.status_code != 200:
            response_body['message'] = 'Error fetching data from REST Countries API'
            response_body['results'] = {}
            return response_body, 502 
        data = response.json()
        for country_data in data:
            new_country = Countries(name=country_data['name']['common'],
                                    code=country_data.get('cca2'),
                                    flag=country_data['flags']['png'],
                                    capital=country_data.get['capital'][0] if 'capital' in country_data else None,
                                    languages=', '.join(country_data['languages'].values()),
                                    currency=', '.join([currency_info['name'] for currency_info in country_data['currencies'].values()]),
                                    population=country_data.get('population'),
                                    continents=', '.join(country_data['continents']),
                                    region=country_data.get('region'),
                                    subregion=country_data.get('subregion', ''),
                                    timezones=', '.join(country_data['timezones']))
            db.session.add(new_country)
            db.session.commit()
            rows = db.session.execute(db.select(Countries)).scalars()
            result = [row.serialize() for row in rows]
    response_body['message'] = 'List of the countries (GET)'
    response_body['results'] = result
    return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    rows = db.session.execute(db.select(Posts)).scalars()
    if not rows:
        response_body['message'] = 'No posts yet'
        return response_body, 404
    if request.method == 'GET':
        result = [row.serialize() for row in rows]
        response_body['message'] = 'List of the posts'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    data = datetime.now(),
                    user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'A new post is created'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/users/<int:id>/posts', methods=['GET'])
def posts_by_user(id):
    response_body = {}
    rows = db.session.execute(db.select(Posts)).where(Posts.user_id == id).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = f'List of the posts written by user no. {id}'
    response_body['results'] = result
    return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts)).where(Posts.id == id).scalar()
    if not row:
        response_body['message'] = 'This post does not exist'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'This is the post no. {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'You cannot change the post no. {id}'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        row.title = data.get('title')
        row.description = data.get('description')
        db.session.commit()
        response_body['message'] = f'The post no. {id} is updated'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(db.delete(Comments).where(Comments.post_id == id))
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'The post no. {id} no longer exists'
        response_body['results'] = {}
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    rows = db.session.execute(db.select(Comments)).scalars()
    if not rows:
        response_body['message'] = 'No comments yet'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        result = [row.serialize() for row in rows]
        response_body['message'] = 'List of the comments'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(content = data.get('content'),
                       date = datetime.now(),
                       user_id = data.get('user_id'),
                       post_id = data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'A new comment is posted'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/comments/<int:id>', methods=['PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments)).where(Comments.id == id).scalar()
    post_row = db.session.execute(db.select(Posts)).where(Posts.id == row.post_id).scalar()
    current_user = get_jwt_identity()
    if request.method == 'PUT':
        if row.user_id != current_user['user_id']:
            response_body['message'] = f'You cannot change the comment no. {id}'
            response_body['results'] = {}
            return response_body, 404
        data = request.json
        row.content = data.get('content')
        db.session.commit()
        response_body['message'] = f'The comment no. {id} is updated'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        if row.user_id != current_user['user_id'] or post_row.user_id != current_user['user_id']:
            response_body['message'] = f'You cannot delete the comment no. {id}'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'The comment no. {id} no longer exists'
        response_body['results'] = {}
        return response_body, 200
