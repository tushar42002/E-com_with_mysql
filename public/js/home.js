//  image bular
const collageImages = [...document.querySelectorAll('.collage-img')]

collageImages.map((item, i) => {
    item.addEventListener('mouseover', () => {
        collageImages.map((image, index) => {
            if (index != i) {
                image.style.filter = 'blur(10px)';
                item.style.zIndex = 2;
            }
        })
    })

    item.addEventListener('mouseleave', () => {
        collageImages.map((image, index) => {
            if (index != i) {
                image.style = null;
            }
        })
    })
})

// get product function
// let productId = null;
const getProducts = (tag) => {
    return fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ tag: tag })
    }).then(res => res.json())
        .then(data => {
            return data
        })
}

const createProductCards = (data, title, ele) => {
    let container = document.querySelector(ele);
    container.innerHTML += `
    <h1 class="section-title">${title}</h1>
    <div class="product-container">
       ${createCards(data)}
    </div>
    `
}

const createCards = data => {
    let cards = '';

    data.forEach(item => {
        if (item.id != productId) {
            cards += `
            <div class="product-card">
               <img src="${item.image}" onclick="location.href = '/products/${item.id}' " alt="" class="product-img">
               <p class="product-name">${item.name} &rarr;</p>
            </div>
            `
        }

    })

    return cards;
}

// cart fuction

const add_product_to_cart = product => {
    updateNavCartCounter();
    let cart = JSON.parse(localStorage.getltem('cart'));
    if (cart == null) {
        cart = []
    }

    product = {
        item: 1,
        name: product.name,
        price: product.price,
        shortDes: product.shortDes,
        image: product.image
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    return 'added';

}

const fetchAllProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(data => {
            setData(data);
            getProducts(data.tags[0])
            .then(res => createProductCards(res, 'best selling products', '.best-selling-product-section'))
        })
        .catch(err => {
            console.log(err)
            alert('no product found')
        })
}

fetchAllProducts();