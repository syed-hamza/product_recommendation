
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
        <div class="product-image">
            <img src="../static/product_images/${data.product_name}.jpg" alt="Product Image">
        </div>
        <div class="product-details">
            <h2>${data.product_name}</h2>
            <p>${data.description}</p>
            <h3>Price: $${data.price}</h3>
            <button onclick='addtocart(event)' id="${data.product_ID}">Add to Cart</button>
            <button class = "btn btn-danger" onclick='report(event)' id="${data.product_ID}">Report</button>
        </div>
    `;
}
async function addtocart(event) {
    const buttonID = event.target.id;
    const query = `INSERT INTO cart (user_id, product_id) VALUES (1,${buttonID});`;
    const results = await fetchSQLResults(query);
}
async function addtocart(event) {
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