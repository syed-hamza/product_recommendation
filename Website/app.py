from flask import Flask, render_template,jsonify
import requests
app = Flask(__name__)
server_ip = "http://192.168.0.183:5000/"


def get_recommendation(id):
    rec = requests.get(server_ip+"/top5")
    return rec

@app.route('/')
def index():
    products_response = requests.get(server_ip + "/products")
    products_json = products_response.json()
    products = products_json['products']
    return render_template('index.html', products=products)

@app.route('/fashion')
def fashion_page():
    return render_template('fashion.html')

@app.route('/electronic')
def electronic_page():
    return render_template('electronic.html')

@app.route('/jewellery')
def jewellery_page():
    return render_template('jewellery.html')

@app.route('/profile')
def profile_page():
    return render_template('profile.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/product/:id')
def product_page():
    recommended = get_recommendation(id) 
    return render_template('product.html',id =id,recommended = recommended)

if __name__ == '__main__':
    app.run(debug=True)
