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
        ['name', reduceSpaces(nameInput.value.trim())],
        ['vacancy', reduceSpaces(vacancyInput.value.trim())],
        ['phone', reduceSpaces(phoneInput.value.trim())]
    ])
    if (existingContacts.has(person.name)) {
        person = null
        return true;
    }

    allContacts[reduceSpaces(nameInput.value.trim())[0].toLowerCase()].push(person)
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
    existingContacts.delete(prop)
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
    if (!addPersonToContacts()) {
        renderColumn(reduceSpaces(nameInput.value.trim())[0].toLowerCase())
    }
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
// reduces more than one consecutive spaces in a string to just one and returns it
function reduceSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
}

// returns true if a string contains non english letters, excluding spaces
function checkForNonEnglishLetters(str) {
    const nonEnglishPattern = /[^a-zA-Z\s]/;
    return nonEnglishPattern.test(str);
}
// return true if str is shorter than num symbols
function checkShortLength(str, num) {
    return reduceSpaces(str.trim()).length < num
}

// return true if str is longer than num symbols
function checkLongLength(str, num) {
    return reduceSpaces(str.trim()).length > num
}

// return true if str is empty
function checkForEmpty(str) {
    return !str.trim()
}

// return true if str doesnt start with +
function checkIfDoesntStartsWithPlus(str) {
    const startsWithPlus = /^\+/;
    return !startsWithPlus.test(str.trim())
}

// return true if str contains non numeric chars or spaces inside of it, but allows + at the beginning
function checkForNonNumeric(str) {
    const containsNonNumeric = /^\+?[\d]*$/;
    return !containsNonNumeric.test(str.trim());
}

// return true if str has spaces inside of it
// function checkForSpaces(str) {
//     const containsSpaces = /\s/;
//     return containsSpaces.test(str.trim())
// }

// checks phone number for all mistakes, returns true if theres any
function checkPhoneNumber(str) {
    return checkForEmpty(str) || 
           checkIfDoesntStartsWithPlus(str) ||
           checkForNonNumeric(str) || 
           checkShortLength(str, 5) || 
           checkLongLength(str, 18);
}

// checks name or vacancy for all mistakes, returns true if theres any
function checkNameOrVacancy(str) {
    return checkForEmpty(NameOrVacancy) || 
           checkForNonEnglishLetters(NameOrVacancy) || 
           checkLongLength(NameOrVacancy, 15) || 
           checkShortLength(NameOrVacancy, 3);
}