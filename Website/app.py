from flask import Flask, render_template,jsonify
import requests
app = Flask(__name__)
server_ip = "http://10.20.203.86:5000"


@app.route('/')
def index():
    products_response = requests.get(server_ip + "/products")
    products_json = products_response.json()
    products = products_json['products']
    return render_template('index.html', products=products)



@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/cart')
def cart_page():
    return render_template('cart.html')

@app.route('/product/<int:id>')
def product_page(id):
    return render_template('product.html', id=id)

if __name__ == '__main__':
    app.run(debug=True)
