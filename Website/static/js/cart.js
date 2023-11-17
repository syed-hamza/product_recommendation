async function get_product(){
    link = "http://192.168.0.183:5000"
    var cart_prod = await getCart();
    var products = []
    for(i in cart_prod){
        var id = cart_prod[i].product_id;
        var product = await get_product_details(id,link);
        products.push(product[0])
    }
    return products
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

function delElement(a){
    categories.splice(a,1);
    displaycart();
}

function promo(){
    let promocode = document.getElementById('promocode').value;
    if(promocode==1234){
        displaycart(50);
    }
    else{
        prompt("enter correct code");
    }
}

async function displaycart(c){
    let j=0, total =0;
    var products = await get_product()
    console.log("______________________________")
    console.log(products)
    document.getElementById("itemA").innerHTML = products.length + "Items";
    document.getElementById("itemB").innerHTML = products.length + "Items";
    if(products.length==0){
        document.getElementById("root").innerHTML="Your cart is empty";

        document.getElementById("totalA").innerHTML = "$ 00.00";
        document.getElementById("totalB").innerHTML = "$ 00.00";
    }
  else{
    document.getElementById("root").innerHTML = products.map((items)=>{
        let {product_ID,product_name,description,price} = items;
        total = total+price;
        document.getElementById("totalA").innerHTML = "$" + total +".00";

       if(c==50){
        document.getElementById("totalB").innerHTML = "$ "+(total-c)+".00";
       }else{
        document.getElementById("totalB").innerHTML = "$ "+total+ ".00";
       }
        return(
            `<tr>
                <td width="150"><div class="img-box">
                <img class="img" src="../static/product_images/${product_name}.jpg"></div></td>
                            <td width="360"><p style='font-size:15px;'>${product_name}</p></td>
                            <td width="150"><h2 style='font-size:15px;
            color:black;' >$ ${price}.00 </h2></td>
                            <td width="70">`+"<i class='fa-solid fa-trash'onclick='delElement("+(j++) +")'></i></td>"+
                            `</tr>`
        );

    }).join('');
}
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

getCart();
displaycart();

