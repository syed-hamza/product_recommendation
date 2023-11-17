<<<<<<< HEAD
const product =[
    {
        image: "../static/product_images/Peacoat.jpg",
        title: "Pea-Coat",
        price: 120
    },
    {
        image: "../static/product_images/Slim-fit.jpg",
        title: "Slimfit jeans",
        price: 120
    },
    {
        image: "../static/product_images/Polo.jpg",
        title: "Polo Shirt",
        price: 120
    }
]

const categories = [...new Set(product.map((item)=>
    {return item}))];
=======
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
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4

function delElement(a){
    categories.splice(a,1);
    displaycart();
<<<<<<< HEAD
}    
=======
}
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4

function promo(){
    let promocode = document.getElementById('promocode').value;
    if(promocode==1234){
        displaycart(50);
    }
<<<<<<< HEAD
    else{ 
=======
    else{
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4
        prompt("enter correct code");
    }
}

<<<<<<< HEAD
function checkout() {
    const cartData = categories.map(item => {
        return {
            image: item.image,
            title: item.title,
            price: item.price
        };
    });

    const cartDataString = encodeURIComponent(JSON.stringify(cartData));
    window.location.href = `/orders?cartData=${cartDataString}`;
}



function displaycart(c){
    let j=0, total =0;
    document.getElementById("itemA").innerHTML = categories.length + "Items";
    document.getElementById("itemB").innerHTML = categories.length + "Items";
    if(categories.length==0){
=======
async function displaycart(c){
    let j=0, total =0;
    var products = await get_product()
    console.log("______________________________")
    console.log(products)
    document.getElementById("itemA").innerHTML = products.length + "Items";
    document.getElementById("itemB").innerHTML = products.length + "Items";
    if(products.length==0){
>>>>>>> 297005f0effb15a8213d641722267e38badc08e4
        document.getElementById("root").innerHTML="Your cart is empty";

        document.getElementById("totalA").innerHTML = "$ 00.00";
        document.getElementById("totalB").innerHTML = "$ 00.00";
    }
  else{
<<<<<<< HEAD
    document.getElementById("root").innerHTML = categories.map((items)=>{
        let {image,title,price} = items;
        total = total+price;
        document.getElementById("totalA").innerHTML = "$" + total +".00";
       
=======
    document.getElementById("root").innerHTML = products.map((items)=>{
        let {product_ID,product_name,description,price} = items;
        total = total+price;
        document.getElementById("totalA").innerHTML = "$" + total +".00";

>>>>>>> 297005f0effb15a8213d641722267e38badc08e4
       if(c==50){
        document.getElementById("totalB").innerHTML = "$ "+(total-c)+".00";
       }else{
        document.getElementById("totalB").innerHTML = "$ "+total+ ".00";
       }
        return(
            `<tr>
<<<<<<< HEAD
                <td width="150"><div class="img-box"><img class="img" src=${image}></div></td>
                <td width="360"><p style='font-size:15px;'>${title}</p></td>
                <td width="150"><h2 style='font-size:15px; color:black;' >$ ${price}.00 </h2></td>
                <td width="70">`+"<i class='fa-solid fa-trash' onclick='delElement("+(j++) +")'></i></td>"+
                `</tr>`
        );

    }).join('');
} 
}
displaycart();


function cancelOrder(index) {
    if (!categories || categories.length === 0) {
        console.error('Empty or undefined categories array.');
        return;
    }

    if (categories.length > index) {
        const productToCancel = categories[index];

        // Display a form asking for the reason for cancellation
        const reason = prompt("Please provide the reason for cancellation:");

        if (reason !== null) { // User clicked 'OK' in the prompt
            // Update the product's status and reason
            productToCancel.status = "Cancelled";
            productToCancel.cancellationReason = reason;

            // Update the UI
            const statusElement = document.getElementById(`status${index}`);
            if (statusElement) {
                statusElement.textContent = 'Cancelled';
            }

            // Optionally, you may want to send the cancellation information to the server
            // using an AJAX request or other appropriate method.
        } else {
            // User clicked 'Cancel' in the prompt, do nothing
        }
    } else {
        console.error('Invalid index.');
    }
}
=======
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

>>>>>>> 297005f0effb15a8213d641722267e38badc08e4
