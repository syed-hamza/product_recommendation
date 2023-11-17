from flask import Flask, render_template,jsonify, request, redirect, url_for, session
import requests
import pymysql 
app = Flask(__name__)
server_ip = "http://10.30.203.231:5000"

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



@app.route('/login', methods=['GET','POST'])
def login_page():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            session['user_data'] = user  
            return redirect(url_for('user_dashboard'))
        else:
            return redirect(url_for('login_page', alert = "danger",logged_in="Incorrect Username or Password."))
       #if the user is already logged in
    if 'user_data' in session:
        return redirect(url_for('dashboard'))
    logged_in = request.args.get('logged_in')
    return render_template('login.html',alert = "danger", logged_in=logged_in)

#include logout button in user dashboard
#<a style="text-decoration: none; color: red;" href="{{ url_for('logout') }}">Logout</a>

@app.route('/logout')
def logout():
    session.pop('user_data', None)  
    return redirect(url_for('login'))

@app.route('/signup')
def signup_page():
    error_message = request.args.get('error_message')
    return render_template('signup.html', error_message=error_message)

@app.route('/process_signup', methods=['POST'])
def register_user():
    try:
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        cursor = connection.cursor()
        insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (username, email, password))
        connection.commit()

        return redirect(url_for('login_page', logged_in="User Successfully Signed in!"))

    except Exception as e:
        print("Error registering user:", e)
        error_message = "Error registering user. Please try again."
        return render_template('signup.html', error_message=error_message)


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
