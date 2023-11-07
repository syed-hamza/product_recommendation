from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)
correlation_matrix = pd.read_csv("Data/correlation_matrix.csv")
def top_5_products(correlation_matrix,product_ID):
    prod_corr =correlation_matrix[product_ID].values
    top5_indices = np.argsort(prod_corr)[-6:]
    top5_indices = top5_indices[::-1]+1
    return top5_indices[1:]
@app.route('/top5', methods=['GET'])
def get_data():
    product_id = int(request.args.get("id"))
    index = top_5_products(correlation_matrix, product_id)
    data = {'message': index}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
