window.onload = () =>{
    if(!sessionStorage.user){
        location.replace('/login');
    }

    if(location.search.includes('payment=done')){
        let item = [];
        localStorage.setItem('cart', JSON.stringify(item));
        showFormError("order is placed")
    }

    if(location.search.includes('payment_fail=true')){
        showFormError("some error occured. please try again ")
    }
}

// select place order button
const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();

    if(address.address.length){
            // send data to backend
    fetch('/stripe-checkout',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            address: address,
            email: JSON.parse(sessionStorage.user).email
        })
    })
    .then(res => res.json())
    .then(url => {
        location.href = url;
    })
    .catch(err => console.log(err))
    }
})

const getAddress = () => {
    // form validate
    let address = document.querySelector('#address');
    let street = document.querySelector('#street');
    let city = document.querySelector('#city');
    let state = document.querySelector('#state');
    let pincode = document.querySelector('#pincode');
    let landmark = document.querySelector('#landmark');

    if(!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length ){
        return showFormError("fill all the inputs")
    } else{
        return { address, street, city, state, pincode, landmark }
    }



}