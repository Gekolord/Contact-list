let allContacts = {
    "a": [
        {
            "name": "anatoly",
            "vacancy": "dev",
            "phone": "+523852375"
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
    "n": [
        {
            "name": "nikola",
            "vacancy": "chat",
            "phone": "+88005553535"
        }
    ],
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
    // return person.name[0].toLowerCase()
}



// Create a div with a class
function createDiv(className) {
    const div = document.createElement('div')
    div.classList.add(className)
    return div;
}
// adds inner text to existing div
function renderContact(div, object) {
    div.innerText = `Name: ${object.name}
                     Vacancy:${object.vacancy}
                     Phone: ${object.phone}`
}

// renders all contacts of corresponding letter
function renderColumn(char) {
    const column = document.querySelector(`[data-id="${char.toLowerCase()}"]`)
    column.innerHTML = char.toUpperCase()
    allContacts[char.toLowerCase()].forEach((obj) => {
        const newDiv = createDiv("column__element-data-info");
        const removeButton = renderButton("column__element__remove-button", '\u2716')
        removeButton.addEventListener('click', (eve) => {
            deleteItemFromAllContats(allContacts[char.toLowerCase()], obj.name, "name")
        })
        renderContact(newDiv, obj)
        newDiv.append(removeButton)
        column.append(newDiv)
    })
}

// deletes item from array using filter and replaces old array with new array
function deleteItemFromAllContats(arr, prop, removeBy) {
    newArr = arr.filter(item => item[removeBy] != prop)
    allContacts[prop[0].toLowerCase()] = newArr
    renderColumn(prop[0].toLowerCase())
}


function toggleContacts(event) {
    
    let column = event.target.closest("div");
    if (!column) return;
    if (!column.classList.contains("element__letter")) return;
    let displayedContacts = column.children
    for (contact of displayedContacts) {
        contact.classList.toggle("column__element-data-info-shown")
    }
}


addButton.addEventListener("click", function(eve) {
    addPersonToContacts();
    renderColumn(nameInput.value[0].toLowerCase())
})


contactTable.addEventListener("click", toggleContacts)


window.addEventListener('load', function(event) {
    renderColumn("a")
    renderColumn("n")
})

function renderButton(className, text) {
    const button = document.createElement('button')
    button.classList.add(className)
    button.innerText = text
    return button;
}

