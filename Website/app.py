from flask import Flask, render_template

app = Flask(__name__)

# Define some sample data for the carousel items
men_fashion_items = [
    {"name": "Men T-shirt", "price": 30, "image": "images/dress-shirt-img.png"},
    {"name": "Men Shirt", "price": 30, "image": "images/tshirt-img.png"},
    {"name": "Men Trousers", "price": 30, "image": "images/trousers.png"},
]

women_fashion_items = [
    {"name": "Skirt", "price": 100, "image": "images/women-clothes-img.png"},
    {"name": "Shorts", "price": 100, "image": "images/shorts.png"},
    {"name": "Crop Top", "price": 100, "image": "images/croptop.png"},
]

footwear_items = [
    {"name": "Heels", "price": 100, "image": "images/heels.png"},
    {"name": "Shoes", "price": 100, "image": "images/shoes.png"},
    {"name": "Flip Flops", "price": 100, "image": "images/ff.png"},
]

@app.route('/')
def index():
    return render_template('index.html', men_fashion_items=men_fashion_items)

@app.route('/fashion')
def fashion_page():
    return render_template('fashion.html')

@app.route('/electronic')
def electronic_page():
    return render_template('electronic.html')

@app.route('/jewellery')
def jewellery_page():
    return render_template('jewellery.html')

if __name__ == '__main__':
    app.run(debug=True)
