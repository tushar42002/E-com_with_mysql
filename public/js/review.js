let ratingStarInput = [...document.querySelectorAll('.rating-star')]
let rate = 0;

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index +1}.0`;
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                ratingStarInput[i].src = '../img/fill star.png';
            } else {
                ratingStarInput[i].src = '../img/no fill star.png';
            }
        }
    })
})

// add review form

let reviewHeadline = document.querySelector('.review-headline');
let review = document.querySelector('.review-field');
let loader = document.querySelector('.loader');


let addReviewBtn = document.querySelector('.add-review-btn');

addReviewBtn.addEventListener('click', () => {
    // form validation
    if (user.email == undefined) {// user is not logged in
        location.href = `/login?after_page=${productId}`;
    } else{
        if(!reviewHeadline.value.length || !review.value.length || rate == 0){
            showFormError('file all the input');
        } else if(reviewHeadline.value.length > 50){
            showFormError('headline should not be more than 50 letter');
        
        } else if(review.value.length > 150){
            showFormError('review should not be more than 150 letter');
        
        } else{
            // send the data to back end
            loader.style.display = 'block';
            sendData('/add-review', {
                headline: reviewHeadline.value,
                review: review.value,
                rate: rate,
                email: user.email,
                product: productId
            })
        }
    }
})

// fetch review

const getReviews = () => {
    if(user == null){
        user = {
            email: undefined
        }
    }

    fetch('/get-reviews', {
       method: 'post',
       headers : new Headers({'Content-Type': 'Application/json'}),
       body : JSON.stringify({
        email: user.email,
        product: productId
       })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length){
            createReviewSection(data)
        }
    })
}

const createReviewSection = (data) =>{
  let section = document.querySelector('.review-section');

  section.innerHTML += `
  <h1 class="section-title">Reviews</h1>
  <div class="review-container">
      ${createReviewCard(data)}
  </div> 
  `
}

const createReviewCard = (data) => {
    let cards = '';
    for(let i = 0; i < 4; i++){
        if(data[i]){
            cards +=`
            <div class="review-card">
               <div class="user-dp" data-rating="${data[i].rating}"><img src="../img/user-icon.png" alt=""></div>
               <h2 class="review-title">${data[i].headline}</h2>
               <p> ${data[i].review } </p>
            </div>
            `
        }
    }
   
    return cards;  

}

getReviews();