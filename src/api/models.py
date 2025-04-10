from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(), unique=False, nullable=True)
    picture = db.Column(db.String(), unique=False, nullable=True)
    nationality = db.Column(db.String(), unique=False, nullable=True)
    residence = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'name': self.name,
                'picture': self.picture,
                'nationality': self.nationality,
                'residence': self.residence}
    

class Countries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    code = db.Column(db.String(), unique=True, nullable=False)
    flag = db.Column(db.String(), unique=True, nullable=False)
    capital = db.Column(db.String(), unique=True, nullable=True)
    languages = db.Column(db.String(), unique=False, nullable=True)
    currency = db.Column(db.String(), unique=False, nullable=True)
    population = db.Column(db.Integer(), unique=False, nullable=True)
    continents = db.Column(db.String(), unique=False, nullable=True)
    region = db.Column(db.String(), unique=False, nullable=True)
    subregion = db.Column(db.String(), unique=False, nullable=True)
    timezones = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'code': self.code,
                'flag': self.flag,
                'capital': self.capital,
                'languages': self.languages,
                'currency': self.currency,
                'population': self.population,
                'continents': self.continents,
                'region': self.region,
                'subregion': self.subregion,
                'timezones': self.timezones}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), unique=False, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    date = db.Column(db.DateTime(), nullable=False, default=datetime.now(tz=timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'<Post {self.id} - {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'date': self.date,
                'user_id': self.user_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), unique=False, nullable=False)
    date = db.Column(db.DateTime(), nullable=False, default=datetime.now(tz=timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comment_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comment_to', lazy='select'))

    def __repr__(self):
        return f'<Comment {self.id} - Post {self.post_id}>'

    def serialize(self):
        return {'id': self.id,
                'content': self.content,
                'date': self.date,
                'user_id': self.user_id,
                'post_id': self.post_id}
