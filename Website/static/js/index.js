url = "http://10.20.203.86:5000"
async function start() {

    fetch(`${url}/products`)
    .then(response => response.json())
    .then(data => {
        products_data = data.products
        generateTables(products_data);
    });
}
function make_block(product){
return `<div class="box_main">
            <a href ="/product/${product.product_ID}">
                <h4 class="shirt_text">${product.product_name}</h4>
                <p class="price_text">price<span style="color: #262626;">$${product.price}</span></p>
                <div class="tshirt_img"><img src="static/product_images/${product.product_name}.jpg"></div>
                <div class="btn_main">
                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                    <div class="seemore_bt"><a href="#">See More</a></div>
                </div>
            </a>
        </div>`
}

function generateTables(products){
    place_holder = document.getElementById("clothing");
    for(i in products){
        console.log(products[i]);
        const code = make_block(products[i]);
        const col = document.createElement('div');
        col.className = "col-lg-4 col-sm-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        place_holder.appendChild(col);
    }
}
document.addEventListener('DOMContentLoaded', start);
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }