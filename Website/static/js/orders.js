function get_order_block(id,title,price){
    return `<tr>
                <td>
                  <div class="product-info">
                      <img src="../static/product_images/${title}.jpg" alt="${title}" class="product-image">
                      <div class="product-details">
                          <p class="product-title">${title}</p>
                      </div>
                  </div>
                </td>
                <td>
                    <span id="price">${price}</span>
                </td>
                <td>
                    <span id="status">'Confirmed'</span>
                </td>
                <td>
                    <button class="cancel-button" onclick="cancelOrder(${id})">Cancel</button>
                </td>
              
    </tr>`
}

async function add_elements(){
    var products = await get_product()
    if(products.length==0){
        document.getElementById("root").innerHTML="Your cart is empty";
    }
    else{
        document.getElementById("root").innerHTML = products.map((items)=>{
            let {product_ID,product_name,description,price} = items;
            return get_order_block(product_ID,product_name,price)
        }).join('');
    }
}
async function get_product(){
    link = await geturl()
    var cart_prod = await getCart();
    var products = []
    for(i in cart_prod){
        var id = cart_prod[i].product_id;
        var product = await get_product_details(id,link);
        products.push(product[0])
    }
    return products
}
async function geturl(){
    var url = await fetch("http://127.0.0.1:5000/server")
              .then(response => response.json())
              .then(response=>{
                return response.ip;
              })
    return url
}
async function getCart(){
    query = `select * from cart where user_id =1;`;
    var results = await fetchSQLResults(query);
    return results;
}
async function get_product_details(productid,link){
    const url = `${link}/details/${productid}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        return data
    });
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
add_elements()