const btn = document.getElementsByClassName('contact_modal')
const header = document.getElementsByClassName('photograph-header')


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    // document.body.style.backgroundColor = "black"
    // header.style.backgroundColor = 'black'

    // need check 
    // const btnContact = document.getElementsByClassName('contact_button')
    // btnContact.style.display = 'none'
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    // document.body.style.backgroundColor = 'white'
    // header.style.backgroundColor = '#FAFAFA'

}

// btn.addEventListener("click", displayModal)

