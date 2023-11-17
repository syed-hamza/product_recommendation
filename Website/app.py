from flask import Flask, render_template,json,request
import requests
import pymysql 
app = Flask(__name__)
<<<<<<< HEAD
server_ip = "http://192.168.0.185:5000"
=======
server_ip = "http://192.168.0.183:5000"
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='Regal@301',
    database='products',
    cursorclass=pymysql.cursors.DictCursor 
)

@app.route('/')
def index():
    products_response = requests.get(server_ip + "/products")
    products_json = products_response.json()
    products = products_json['products']
    return render_template('index.html', products=products)


<<<<<<< HEAD
=======

>>>>>>> 297005f0effb15a8213d641722267e38badc08e4
@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

<<<<<<< HEAD
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

=======
@app.route('/cart')
def cart_page():
    return render_template('cart.html')
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4

@app.route('/product/<int:id>')
def product_page(id):
    return render_template('product.html', id=id)

@app.route('/sqlquery/<query>', methods=['GET'])
def execute_sql_query(query):
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        print('Error fetching data from the database:', e)
        return jsonify({'error': 'Error fetching data from the database'}), 500

if __name__ == '__main__':
    app.run(debug=True)
