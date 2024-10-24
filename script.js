let allContacts = {
    "a": [],
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
let searchButton = document.querySelector(".form__element-search")
let clearListButton = document.querySelector(".form__element-clear-list")
let nameErrorNode = document.querySelector(".error-message__name-error")
let vacancyErrorNode = document.querySelector(".error-message__vacancy-error")
let phoneErrorNode = document.querySelector(".error-message__phone-error")
let searchWindow = document.querySelector(".search-window")
let searchWindowCloseButton = document.querySelector(".search-window__close-window")
const timers = {
    nameTimer: undefined,
    vacancyTimer: undefined,
    phoneTimer: undefined
};
let existingContacts = new Set();

window.addEventListener("load", () => {
    loadFromLocalStorage()
    renderAllColumns()

})

addButton.addEventListener("click", function(eve) {
    if (validateAllInputsAndRenderErrors()) {
        return false;
    } else if (!checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
        addPersonToContacts()
        console.log(allContacts)
        console.log(existingContacts)
        renderColumn(reduceSpaces(nameInput.value.trim())[0].toLowerCase())
    }
})

contactTable.addEventListener("click", toggleContacts)

clearListButton.addEventListener("click", (eve) => {
    clearAll()
    renderAllColumns()
})

searchButton.addEventListener("click", event => {
    if (!searchWindow.classList.contains("seach-window_active")) {
        searchWindow.classList.add("seach-window_active")
    }
})

searchWindowCloseButton.addEventListener("click", event => {
    if (searchWindow.classList.contains("seach-window_active")) {
        searchWindow.classList.remove("seach-window_active")
    }
})

document.addEventListener("click", event => {
    if (!searchWindow.contains(event.target) && event.target !== searchButton) {
        searchWindow.classList.remove("seach-window_active")
    }
})

// adds person to contacts and returns first letter of their name
function addPersonToContacts() {
    let person = Object.fromEntries([
        ['name', reduceSpaces(nameInput.value.trim())],
        ['vacancy', reduceSpaces(vacancyInput.value.trim())],
        ['phone', reduceSpaces(phoneInput.value.trim())]
    ])
    if (checkExistingContact(reduceSpaces(`${person.name}${person.vacancy}${person.phone}`))) {

        person = null
        return true;
    }

    allContacts[reduceSpaces(nameInput.value.trim())[0].toLowerCase()].push(person)
    existingContacts.add(reduceSpaces(`${person.name}${person.vacancy}${person.phone}`))
    storeOneInLocalStorage(person)
    // return person.name[0].toLowerCase()
}

// reduces more than one consecutive spaces in a string to just one and returns it
function reduceSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
}

function checkExistingContact(str) {
    if (!checkForEmpty(str)) {
        return existingContacts.has(str)
    }
    return true
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
    column.innerHTML = `${char.toUpperCase()} - ${allContacts[char.toLowerCase()].length}`
    allContacts[char.toLowerCase()].forEach((obj) => {
        const newDiv = createDiv("column__element-data-info");
        const removeButton = renderButton("column__element__remove-button", '\u2716')
        removeButton.addEventListener('click', (eve) => {
            deleteItemFromAllContats(allContacts[char.toLowerCase()], obj.name, obj.vacancy, obj.phone, "name", "vacancy", "phone",`${reduceSpaces(obj.name)}${reduceSpaces(obj.vacancy)}${reduceSpaces(obj.phone)}`)
        })
        renderContact(newDiv, obj)
        newDiv.append(removeButton)
        column.append(newDiv)
    })
}

function renderAllColumns() {
    Object.keys(allContacts).forEach(key => {
        renderColumn(key)
    })
}

// deletes item from array using filter and replaces old array with new array
function deleteItemFromAllContats(arr, prop1, prop2, prop3, removeBy1, removeBy2, removeBy3, setValue) {
    newArr = arr.filter(item => !(item[removeBy1] === prop1 && item[removeBy2] === prop2 && item[removeBy3] === prop3))
    allContacts[prop1[0].toLowerCase()] = newArr
    existingContacts.delete(setValue)
    localStorage.removeItem(`${prop1}${prop2}${prop3}`)
    renderColumn(prop1[0].toLowerCase())
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






function renderButton(className, text) {
    const button = document.createElement('button')
    button.classList.add(className)
    button.innerText = text
    return button;
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

// checks phone number for all mistakes, returns true if theres any
function checkPhoneNumber(str) {
    return checkForEmpty(str) || 
           checkIfDoesntStartsWithPlus(str) ||
           checkForNonNumeric(str) || 
           checkShortLength(str, 5) || 
           checkLongLength(str, 18) ||
           checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`));
}

// checks name or vacancy for all mistakes, returns true if theres any
function checkNameOrVacancy(str) {
    return checkForEmpty(str) || 
           checkForNonEnglishLetters(str) || 
           checkLongLength(str, 15) || 
           checkShortLength(str, 3) ||
           checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`));
}
// displays errorMessage within targetNode for 6 seconds 
// if error is displayed while its clicked, removes the class, cancels animation and adds class immediatly
function displayError(targetNode, errorMessage, timerVariable) {
    if (targetNode.classList.contains("error-message_visible")) {
        targetNode.innerText = errorMessage;
        targetNode.classList.remove("error-message_visible")
        void targetNode.offsetWidth;
        targetNode.classList.add("error-message_visible")
        clearTimeout(timers[timerVariable]);
        timers[timerVariable] = setTimeout(() => {
            targetNode.classList.remove("error-message_visible")
        }, 5500);
        
    } else {
        targetNode.innerText = errorMessage;
        targetNode.classList.add("error-message_visible")
        timers[timerVariable] = setTimeout(() => {
            targetNode.classList.remove("error-message_visible")
        }, 5500);
        
    }
}
// checks if name input has errors and renders necessary error message
function validateNameInputAndRenderErrors() {
    let str = nameInput.value
    if (checkNameOrVacancy(str)) {
        if (checkForEmpty(str)) {
            displayError(nameErrorNode, "Must not contain empty string.", "nameTimer")
            return true;
        } else if (checkForNonEnglishLetters(str)) {
            displayError(nameErrorNode, "Must contain only letters from English alphabet.", "nameTimer")
            return true
        } else if (checkLongLength(str, 15)) {
            displayError(nameErrorNode, "Must not be longer than 15 symbols.", "nameTimer")
            return true
        } else if (checkShortLength(str, 3)) {
            displayError(nameErrorNode, "Must not be shorter than 3 symbols.", "nameTimer")
            return true
        } else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
            displayError(nameErrorNode, "Cannot add existing contact", "nameTimer")
            return true
        }
    }
    return false;
}

// checks if vacancy input has errors and renders necessary error message
function validateVacancyInputAndRenderErrors() {
    let str = vacancyInput.value
    if (checkNameOrVacancy(str)) {
        if (checkForEmpty(str)) {
            displayError(vacancyErrorNode, "Must not contain empty string.", "vacancyTimer")
            return true;
        } else if (checkForNonEnglishLetters(str)) {
            displayError(vacancyErrorNode, "Must contain only letters from English alphabet.", "vacancyTimer")
            return true
        } else if (checkLongLength(str, 15)) {
            displayError(vacancyErrorNode, "Must not be longer than 15 symbols.", "vacancyTimer")
            return true
        } else if (checkShortLength(str, 3)) {
            displayError(vacancyErrorNode, "Must not be shorter than 3 symbols.", "vacancyTimer")
            return true
        } else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
            displayError(vacancyErrorNode, "Cannot add existing contact", "vacancyTimer")
            return true
        }
    }
    return false;
}

// checks if phone input has errors and renders necessary error message
function validatePhoneInputAndRenderErrors() {
    let str = phoneInput.value
    if (checkPhoneNumber(str)) {
        if (checkForEmpty(str)) {
            displayError(phoneErrorNode, "Must not contain empty string.", "phoneTimer")
            return true;
        } else if (checkIfDoesntStartsWithPlus(str)) {
            displayError(phoneErrorNode, "Must start with plus.", "phoneTimer")
            return true;
        } else if (checkForNonNumeric(str)) {
            displayError(phoneErrorNode, "Must contain only numbers, no spaces and only one plus at the beginning.", "phoneTimer")
            return true;
        } else if (checkShortLength(str, 5)) {
            displayError(phoneErrorNode, "Must not be shorter than 5 symbols.", "phoneTimer")
            return true;
        } else if (checkLongLength(str, 18)) {
            displayError(phoneErrorNode, "Must not be longer that 18 symbols.", "phoneTimer")
            return true;
        } else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
            displayError(phoneErrorNode, "Cannot add existing contact", "phoneTimer")
            return true;
        }
    }
    return false;
}

// checks if all inputs have errors and renders necessary error messages
function validateAllInputsAndRenderErrors() {
    if (validateNameInputAndRenderErrors()    ||
        validatePhoneInputAndRenderErrors()   ||
        validateVacancyInputAndRenderErrors() ||
        checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) 
        {
            validateNameInputAndRenderErrors() 
            validatePhoneInputAndRenderErrors() 
            validateVacancyInputAndRenderErrors()
            return true
        }
    return false;
}
// stores one object in local storage
function storeOneInLocalStorage(obj) {
    const dataString = JSON.stringify(obj)
    const storeKey = `${obj.name}${obj.vacancy}${obj.phone}`
    localStorage.setItem(storeKey, dataString)
    console.log(localStorage)
}

// retrieves one object from local storage
function retrieveOneFromLocalStorage(key) {
    const retrievedDataString = localStorage.getItem(key);
    if (retrievedDataString) {
        const retrievedData = JSON.parse(retrievedDataString);
        return retrievedData;
    }
}
// retrieves all objects from localstorage and stores it in object
function retrieveAllFromLocalStorage() {
    let returnObj = {}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        returnObj[key] = retrieveAllFromLocalStorage(key)
    }
    return returnObj;
}

// writes from local storage to allContacts and existingContacts
function loadFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        existingContacts.add(key)
        allContacts[key[0]].push(retrieveOneFromLocalStorage(key))
    }
}

// clears all data 
function clearAll() {
    Object.keys(allContacts).forEach(key => {
        if (allContacts[key].length > 0) {
            allContacts[key].forEach(obj => {
                deleteItemFromAllContats(allContacts[key], obj.name, obj.vacancy, obj.phone, "name", "vacancy", "phone", `${reduceSpaces(obj.name)}${reduceSpaces(obj.vacancy)}${reduceSpaces(obj.phone)}`)
            })
        }
    })
}