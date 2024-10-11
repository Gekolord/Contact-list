let allContacts = {
    "a": [
        {
            "name": "anatoly",
            "vacancy": "dev",
            "phone": "+523852375"
        },
        {
            "name": "nikola",
            "vacancy": "chat",
            "phone": "+88005553535"
        }
        
    ],
    "b": [],
    "c": [],
    "d": [],
    "e": [],
    "f": [],
    "g": [],
    "h": [],
    "i": [],
    "j": [],
    "k": [],
    "l": [],
    "m": [],
    "n": [],
    "o": [],
    "p": [],
    "q": [],
    "r": [],
    "s": [],
    "t": [],
    "u": [],
    "v": [],
    "w": [],
    "x": [],
    "y": [],
    "z": []
}

let contactTable = document.querySelector(".contact-table")
let nameInput = document.querySelector(".form__element-name")
let vacancyInput = document.querySelector(".form__element-vacancy")
let phoneInput = document.querySelector(".form__element-phone")
let addButton = document.querySelector(".form__element-add")



function addPerson() {
    let person = Object.fromEntries([
        ['name', nameInput.value],
        ['vacancy', vacancyInput.value],
        ['phone', phoneInput.value]
    ])
    allContacts[nameInput.value[0].toLowerCase()].push(person)
    console.log(allContacts)
}

addButton.addEventListener("click", addPerson)
// let p = document.createElement("p")
// p.innerText = `${allContacts.a[0].name} ${allContacts.a[0].vacancy} ${allContacts.a[0].phone}`

// function showContacts(event) {
    
//     let div = event.target.closest("div");
//     if (!div) return;
//     if (!div.classList.contains("element__letter")) return;
//     let p = document.createElement('p');
//     let letter = div.dataset.id
    
//     allContacts[letter].forEach(element => {
//         let newDiv = document.createElement('div')
//         newDiv.append(`Name: ${element.name}\n`)
//         newDiv.append(`Vacancy: ${element.vacancy}\n`)
//         newDiv.append(`Phone: ${element.phone}\n\n`)
//         div.append(newDiv)
//     });

//     // console.log(letter)
    
// }

// contactTable.addEventListener("click", showContacts)

// column__element-data-info
// column__element-data-info_active

