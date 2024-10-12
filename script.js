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
let existingContacts = new Set();

// adds person to contacts and returns first letter of their name
function addPersonToContacts() {
    let person = Object.fromEntries([
        ['name', nameInput.value],
        ['vacancy', vacancyInput.value],
        ['phone', phoneInput.value]
    ])
    if (existingContacts.has(person.name)) {
        person = null
        return;
    }

    allContacts[nameInput.value[0].toLowerCase()].push(person)
    existingContacts.add(person.name)
    console.log(allContacts)
    return person.name[0].toLowerCase()
}



// Create a div with a class
function createDiv(className) {
    const div = document.createElement('div')
    div.classList.add(className)
    return div;
}
// adds inner text to existing div
function renderContact(div, key, index) {
    div.innerText = `Name: ${allContacts[key][index].name}\n
                     Vacancy:${allContacts[key][index].vacancy}\n
                     Phone: ${allContacts[key][index].phone}\n`
}



addButton.addEventListener("click", addPersonToContacts)

function showContacts(event) {
    
    let div = event.target.closest("div");
    if (!div) return;
    if (!div.classList.contains("element__letter")) return;
    let p = document.createElement('p');
    let letter = div.dataset.id
    
    allContacts[letter].forEach(element => {
        let newDiv = document.createElement('div')
        newDiv.append(`Name: ${element.name}\n`)
        newDiv.append(`Vacancy: ${element.vacancy}\n`)
        newDiv.append(`Phone: ${element.phone}\n\n`)
        div.append(newDiv)
    });

    // console.log(letter)
    
}

// contactTable.addEventListener("click", addPeopleToPage)

// column__element-data-info
// column__element-data-info_active

