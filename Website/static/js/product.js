
async function start() {
    var link = await geturl();
    var element= document.getElementById('data');
    var productid = element.getAttribute('productid');
    add_product_details(productid,link);
    const url = `${link}/toprec/${productid}`;
    fetch(url)
    .then(response => response.json())
    .then(recommended => {
        add_recommendations(recommended,link);
    });
}
async function geturl(){
    var url = await fetch("http://127.0.0.1:5000/server")
              .then(response => response.json())
              .then(response=>{
                return response.ip;
              })
    return url
}

function get_product_block(data){
    return `
       
    <div style=" position: relative; left:25%; display: flex; justify-content: center; align-items: center; height: 75vh;">
    <div class="product">
        <div class="product-image">
            <img src="../static/product_images/${data.product_name}.jpg" alt="Product Image">
        </div>
        <div class="product-details">
            <h2>${data.product_name}</h2>
            <p>${data.description}</p>
            <h3>Price: $${data.price}</h3>
            <div class="button-container">
                <button onclick='addtocart(event)' id="${data.product_ID}">Add to Cart</button>
                <a href="/cart"><button class="btn btn-danger">Go To Cart</button></a>
            </div>
            <button onclick='report(event)' id="${data.product_ID}" style="background-color: red; color: white; border: none; padding: 10px; cursor: pointer;"
                onmouseover="this.style.backgroundColor='darkred'" onmouseout="this.style.backgroundColor='red'">Report Item</button>
        </div>
    </div>
</div>

            
    `;
}


async function addtocart(event) {
    const buttonID = event.target.id;
    const query = `INSERT INTO cart (user_id, product_id) VALUES (1,${buttonID});`;
    const results = await fetchSQLResults(query);
}
async function report(event) {
    const buttonID = event.target.id;
    const query = `INSERT INTO reports (user_id, product_id) VALUES (1,${buttonID});`;
    const results = await fetchSQLResults(query);
}
  
function get_recommended_block(data){
    return `
            <div class="recomended-product-image">
                <a href = "/product/${data.product_ID}"><img src="../static/product_images/${data.product_name}.jpg" alt="Recommended Product 1"></a>
            </div>
            <div class="product-details">
                <h2>${data.product_name}</h2>
                <p>${data.description}</p>
                <h3>Price: $${data.price}</h3>
                <button onclick='addtocart(event)' id="${data.product_ID}">Add to Cart</button>
            </div>
        `
}
function get_product_details(productid,link){
    const url = `${link}/details/${productid}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        return data
    });
}
async function add_product_details(productid,link){
    place_holder = document.getElementById("prod_place");
    data = await get_product_details(productid,link);
    data = data[0]
    console.log(data.product_ID)
    code = get_product_block(data)
    const col = document.createElement('div');
    col.className = "product"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
    col.innerHTML = code;
    place_holder.appendChild(col);
}
async function add_recommendations(recommended,link){
    recommended = recommended["top"]
    place_holder = document.getElementById("recommended-products");
    for(i in recommended){
        //console.log("---")
        console.log(recommended[i]);
        data = await get_product_details(recommended[i],link);
        data = data[0]
        code = get_recommended_block(data)
        const col = document.createElement('div');
        col.className = "product"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        place_holder.appendChild(col);
    }
}

async function fetchSQLResults(query) {
    const url = `http://127.0.0.1:5000/sqlquery/${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data from the database');
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return { error: 'Error fetching data from the database' };
    }
  }
  
document.addEventListener('DOMContentLoaded', start);

// Create a style element
var style = document.createElement('style');
style.type = 'text/css';

// Define your CSS rules
var css = `

    .product {
        display: flex;
        justify-content: space-between;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 30px;
        align-items: center;
    }

    .product-image img {
        max-width: 100%;
        height: auto;
        max-height: 500px; 
        align-items: center;

    }

    .product-details {
        margin-left: 20px; 
    }


    .button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px; 
        justify-content: space-between;
    }
   
    button {
        margin-bottom: 10px; 
        width: 200px;
    }
`;

// Append the CSS rules to the style element
style.appendChild(document.createTextNode(css));

// Append the style element to the head of the document
document.head.appendChild(style);
