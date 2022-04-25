import Lightbox from '/scripts/utils/lightbox.js'
const cardLikes = document.getElementsByClassName('card-likes')
const cardLikeElements = document.getElementsByClassName('card-like')
const params = new URLSearchParams(window.location.search)
const url = window.location.search.replace('?id=', '')
var response

function buildHeader(photographer) { 

    const headerdetails = document.getElementById('photograph-details')

    const photographerName = document.getElementById('photograph-h1')
    photographerName.innerHTML = photographer.name
    headerdetails.appendChild(photographerName)

    const photographerCity = document.getElementById('photograph-city')
    photographerCity.innerHTML = photographer.city
    headerdetails.appendChild(photographerCity)

    const photographerTagline = document.getElementById('photograph-tagline')
    photographerTagline.innerHTML = photographer.tagline
    headerdetails.appendChild(photographerTagline)

    const headerImg = document.getElementById('photograph-img')

    const imgHeadElem = document.createElement('img')
    imgHeadElem.className = 'header-img'
    imgHeadElem.src = 'assets/photographers/' + photographer.portrait
    headerImg.appendChild(imgHeadElem)
 }

 function buildImg(medias,photographer) {
    const imgContainer = document.getElementById('img-container')
    
    const cardImg = document.createElement('div')
    cardImg.className = 'card'
    imgContainer.appendChild(cardImg)

    // TODO if(photographer.images) else(photographer.video)
    if(medias.image) {
        const imgElement = document.createElement('img')
        imgElement.className = 'card-img'
        imgElement.src = 'assets/images/' + photographer.name + '/' + medias.image
        cardImg.appendChild(imgElement)
        
    } else {
        const imgElement = document.createElement('video')
        imgElement.className = 'card-img'
        imgElement.src = 'assets/images/' + photographer.name + '/' + medias.video
        cardImg.appendChild(imgElement)
    }

    const cardDetails = document.createElement('div')
    cardDetails.className = 'card-details'
    cardImg.appendChild(cardDetails)
    
    const imgTitle = document.createElement('h3')
    imgTitle.className = 'card-title'
    imgTitle.innerHTML = medias.title
    cardDetails.appendChild(imgTitle)

    const likesCounter = document.createElement('div')
    likesCounter.className = 'card-likes'
    cardDetails.appendChild(likesCounter)

    const nbLikes = document.createElement('p')
    nbLikes.className = 'card-like'
    nbLikes.innerHTML = medias.likes
    likesCounter.appendChild(nbLikes)

    const imgHeart = document.createElement('i')
    imgHeart.className = 'fas fa-heart'
    likesCounter.appendChild(imgHeart) 

 }

 function bottomLikes(medias, photographer) {
     const like = document.getElementById('bottom_number')
     const price = document.getElementById('bot-container_price')
     let totalLikes = 0;
     for (let i=0; i < medias.length;i++) {
        totalLikes += medias[i].likes
        like.innerHTML = totalLikes
     }
     price.innerHTML = photographer.price + ' € / jour'
 }

function counterLike(event) {

    const cardLikes = event.currentTarget
    cardLikes.innerHTML = Number(cardLikes.textContent) +1
}

const filterElement = document.getElementById('select-btn');
filterElement.addEventListener('change', tri)
function tri(event) {
    response = data
    const photographer = data.photographers.find(elem => elem.id == url)
    const medias = data.media.filter(elem => elem.photographerId == url)
filterElement.sort((a,b) => {
    console.log(medias)
    if (a<b) return -1;
    if (a>b) return 1;
    else return 0;
})
}


    fetch('https://raw.githubusercontent.com/LoopDavid/Front-End-Fisheye/main/data/photographers.json')
    .then(res => res.json())
    .then(data => {
            response = data
            const photographer = data.photographers.find(elem => elem.id == url)
            const medias = data.media.filter(elem => elem.photographerId == url)
            buildHeader(photographer)

            medias.forEach(media => {
                buildImg(media, photographer)
            });
            bottomLikes(medias, photographer)
            for(let i = 0; i< cardLikes.length; i++) {
            cardLikes[i].addEventListener('click', counterLike)
            }
            Lightbox.init();
    })
 

