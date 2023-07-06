// product page setting

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let tags = document.querySelector('.tags');
let productImage = document.querySelector('.product-img');
let title = document.querySelector('title');

const cartBtn = document.querySelector('.cart-btn') || null;

console.log(cartBtn);

let cartProductData;


const setData = (data) => {
    let { name, image } = data;
    productName.innerHTML = title.innerHTML = name;
    productImage.src = image;
    shortDes.innerHTML = data.short_des;
    detail.innerHTML = data.detail;
    price.innerHTML = `$ ${data.price}`;

    cartProductData = data;
}

cartBtn.addEventListener('click', () =>{
    console.log('cartProductData');
    add_product_to_cart(cartProductData);
    cartBtn.innerHTML = 'added to cart';
})


const fetchProductData = (product) => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: productId })
    }).then(res => res.json())
        .then(data => {
            setData(data);
            getProducts(data.tags[0])
                .then(res => createProductCards(res, 'similar product', '.best-selling-product-section'))
        })
        .catch(err => {
            // alert('no product found')
            console.log('no product found');
        })
}

let productId = null;
if (location.pathname != '/add-product') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData(productId);
}