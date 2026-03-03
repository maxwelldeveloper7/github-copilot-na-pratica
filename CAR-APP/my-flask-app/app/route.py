from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    # sample car data to send to the template
    cars = [
        {"brand": "Ford", "model": "Fiesta", "year": 2018, "price": 45000},
        {"brand": "Chevrolet", "model": "Onix", "year": 2020, "price": 55000},
        {"brand": "Volkswagen", "model": "Gol", "year": 2019, "price": 40000},
    ]
    return render_template("car_sales.html", cars=cars)