async function start() {
    var element= document.getElementById('data');
    var products_data = element.getAttribute('productdata');

    fetch('http://192.168.0.183:5000/products')
    .then(response => response.json())
    .then(data => {
        products_data = data.products
        //console.log(products_data)
        generateTables(products_data);
    });
}
function make_block(product){
    
}
function generateTables(products){
    for(i in products){
        console.log(products[i]);
    }
}
document.addEventListener('DOMContentLoaded', start);
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }