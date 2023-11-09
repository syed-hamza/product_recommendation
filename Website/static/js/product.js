async function start() {
    var element= document.getElementById('data');
    var products_id = element.getAttribute('product_id');
    var recommended = element.getAttribute('recommended');
    console.log(products_id)
    console.log(recommended)
    add_product_details(products_id);
    add_recommendations(recommended);
}
async function add_product_details(products_id){
    
}
async function add_recommendations(recommended){
    for(i in recommended){
        console.log(recommended[i]);
    }
}
document.addEventListener('DOMContentLoaded', start);