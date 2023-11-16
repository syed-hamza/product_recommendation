from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)
correlation_matrix = pd.read_csv("Data/correlation_matrix.csv")
home_path = "Data/home.csv"
product_path = "Data/products.csv"
def top_5_products(correlation_matrix,product_ID):
    prod_corr =correlation_matrix[product_ID].values
    top5_indices = np.argsort(prod_corr)[-6:]
    top5_indices = top5_indices[::-1]+1
    return top5_indices[1:]
@app.route('/toprec/<id>', methods=['GET'])
def get_top5(id):
    index = top_5_products(correlation_matrix, id)
    data = {'top': index.tolist()}
    return jsonify(data)

@app.route('/details/<id>', methods=['GET'])
def get_details(id):
    products = pd.read_csv(product_path)
    products = products[products["product_ID"]==int(id)]
    data = products.to_dict(orient='records')
    return jsonify(data)

@app.route('/products', methods=['GET'])
def products():
    products = pd.read_csv(home_path)
    data = products.to_dict(orient='records')
    data_dict = {}
    for n,i in enumerate(data):
        data_dict[n] = i
    data = {'products': data_dict}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

