from flask import Flask, render_template,jsonify
import requests
import pymysql 
app = Flask(__name__)
server_ip = "http://192.168.43.90:5000"

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



@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/cart')
def cart_page():
    return render_template('cart.html')
@app.route('/orders')
def order_page():
    return render_template('orders.html')

@app.route('/product/<int:id>')
def product_page(id):
    return render_template('product.html', id=id)

@app.route('/server', methods=['GET'])
def get_server():
        return jsonify({'ip': server_ip})

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
