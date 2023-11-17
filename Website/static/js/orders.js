function get_order_block(id, title, price, status = 'Confirmed') {
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
                    <span id="status${id}">${status}</span>
                </td>
                <td>
                    <button class="cancel-button" data-id="${id}" onclick="cancelOrder(${id})">Cancel</button>
                </td>
            </tr>`;
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

async function cancelOrder(id) {
    try {
        const statusElement = document.getElementById(`status${id}`);

        if (!statusElement) {
            console.error(`Status element with ID ${id} not found.`);
            return;
        }

        // Display a form asking for the reason for cancellation
        const reason = prompt("Please provide the reason for cancellation:");

        if (reason !== null) { // User clicked 'OK' in the prompt
            // Update the status in the HTML
            statusElement.textContent = 'Cancelled';

            // Optionally, you may want to send the cancellation information to the server
            // using an AJAX request or other appropriate method.
        } else {
            // User clicked 'Cancel' in the prompt, do nothing
        }
    } catch (error) {
        console.error('Error cancelling order:', error);
    }
}
