from flask import Flask, render_template,json,request
import requests
app = Flask(__name__)
server_ip = "http://192.168.0.185:5000"


def get_recommendation(id):
    rec = requests.get(server_ip+"/top5")
    return rec

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

@app.route('/cart3')
def cart_page():
    return render_template('cart3.html')

@app.route('/orders')
def orders():
    cart_data = request.args.get('cartData')

    if cart_data is not None:
        # If cart_data is not None, proceed with parsing
        cart_products = json.loads(cart_data)
    else:
        # If cart_data is None, provide a default or handle accordingly
        cart_products = []

    return render_template('orders.html', cart_products=cart_products)


@app.route('/product/<int:id>')
def product_page(id):
    recommended = get_recommendation(id) 
    return render_template('product.html', id=id, recommended=recommended)

if __name__ == '__main__':
    app.run(debug=True)
