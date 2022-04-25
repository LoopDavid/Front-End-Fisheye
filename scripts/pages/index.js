function buildCard(photographers) {
    const cardContainer = document.getElementById('photographer_section')

    // create card
    const card = document.createElement('article')
    card.className = 'card'
    cardContainer.appendChild(card)

    // create link card
    const link = document.createElement('a')
    link.className = 'photographers-link'
    link.href = '/photographer.html?id=' + photographers[i].id
    card.appendChild(link)

    // create img card
    const img = document.createElement('img')
    img.className = 'photograph-img'
    // not working
    img.src = 'assets/photographers/' + photographers[i].portrait
    link.appendChild(img)

    // create photographer name
    const name = document.createElement('h2')
    name.className = 'photograph-name'
    name.innerHTML = photographers[i].name
    link.appendChild(name)

    // create photographer city
    const city = document.createElement('p')
    city.className = 'photograph-city'
    city.innerHTML = photographers[i].city
    card.appendChild(city)

    // create photographer tagline
    const tagline = document.createElement('p')
    tagline.className = 'photograph-tagline'
    tagline.innerHTML = photographers[i].tagline
    card.appendChild(tagline)

    // create photographer price
    const price = document.createElement('p')
    price.className = 'photograph-price'
    price.innerHTML = photographers[i].price + '€ /jour'
    card.appendChild(price)
}
fetch('https://raw.githubusercontent.com/LoopDavid/Front-End-Fisheye/main/data/photographers.json')
.then(res => res.json())
.then(data => {
    for(i in data.photographers) {
        const photographers = data.photographers
        buildCard(photographers)
    }
})

