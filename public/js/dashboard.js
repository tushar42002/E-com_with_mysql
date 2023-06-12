let user = JSON.parse(sessionStorage.user || null);
console.log(user.name);

if(user == null){
    location.replace('/login');
}else if(user.seller == "false"){
    location.replace('/seller');
}

let greeting = document.querySelector('#seller-greeting');
greeting.innerHTML += user.name; 

//loader
let loader = document.querySelector('.loader');
let noProductImg = document.querySelector('.no-product');

loader.style.display = 'block';

const setupProduct = () => {
    console.log('asdfghjk');
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = 'none';
        if(data == 'no products'){
            noProductImg.style.display = 'block';
        } else{
            console.log(data);
            data.forEach(product => createProduct(product));
        }
    })
}

setupProduct();