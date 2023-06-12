const createProduct = (data) => {
    let productContainer = document.querySelector('.product-container');
    
    console.log(data.id)
    console.log(data.name)
    console.log(data.shoet)
    console.log(data.image)

    productContainer.innerHTML += `
    <div class="product-card">
        <button class="btn edit-btn" onclick="location.href = '/add-product/${data.id}' "><img src="img/edit.png" alt=""></button>
        <button class="btn open-btn"  onclick="location.href = '/products/${data.id}'><img src="img/open.png" alt=""></button>
        <button class="btn delete-btn" onclick="deleteItem('${data.id}')"><img src="img/delete.png" alt=""></button>
        <img src="${data.image}" alt="" class="product-img">
        <p class="product-name">${data.name} &rarr;</p>
    </div>
    `
}


const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.replace()
        } else{
            showAlert('some error occured')
        }
    })
}