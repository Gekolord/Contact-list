interface contact {
    name: string;
    vacancy: string;
    phone: string;
}

type contactKeys = "name" | "vacancy" | "phone"

interface allContacts {
    [key: string]: contact[]
}

interface timers {
    [key: string]: undefined | number
}

const allContacts: allContacts = {
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

let contactTable = document.querySelector(".contact-table") as HTMLDivElement
let nameInput = document.querySelector(".form__element-name") as HTMLInputElement
let vacancyInput = document.querySelector(".form__element-vacancy") as HTMLInputElement
let phoneInput = document.querySelector(".form__element-phone") as HTMLInputElement
let addButton = document.querySelector(".form__element-add") as HTMLInputElement
let clearListButton = document.querySelector(".form__element-clear-list") as HTMLInputElement
let nameErrorNode = document.querySelector(".error-message__name-error") as HTMLSpanElement
let vacancyErrorNode = document.querySelector(".error-message__vacancy-error") as HTMLSpanElement
let phoneErrorNode = document.querySelector(".error-message__phone-error") as HTMLSpanElement
let searchWindow = document.querySelector(".search-window") as HTMLDivElement
let searchWindowClosingElements = document.querySelectorAll(".search-window__close-window, .search-window-popup-background") as NodeList
let searchWindowBackground = document.querySelector(".search-window-popup-background") as HTMLDivElement
let searchWindowCloseButton = document.querySelector(".search-window__close-window") as HTMLInputElement
let searchButton = document.querySelector(".form__element-search") as HTMLInputElement
let showAllButton = document.querySelector(".search-window__show-all") as HTMLInputElement
let searchWindowOutput = document.querySelector(".search-window__output") as HTMLDivElement
let searchInput = document.querySelector(".search-window__input") as HTMLInputElement
let editWindowBackground = document.querySelector(".edit-window-popup-background") as HTMLDivElement
let edithWindowClosingElements = document.querySelectorAll(".edit-window-popup-background, .edit-window__close-window") as NodeList
let editWindow = document.querySelector(".edit-window") as HTMLDivElement
let editCloseButton = document.querySelector(".edit-window__close-window") as HTMLInputElement
let editApplyChangesButton = document.querySelector(".edit-window__apply-changes-button") as HTMLInputElement
let editInputName = document.querySelector(".edit-window__input-name") as HTMLInputElement
let editInputVacancy = document.querySelector(".edit-window__input-vacancy") as HTMLInputElement
let editInputPhone = document.querySelector(".edit-window__input-phone") as HTMLInputElement
let editNameErrorNode = document.querySelector(".error-message__edit-name-error") as HTMLSpanElement
let editVacancyErrorNode = document.querySelector(".error-message__edit-vacancy-error") as HTMLSpanElement
let editPhoneErrorNode = document.querySelector(".error-message__edit-phone-error") as HTMLSpanElement

type divToRender = HTMLDivElement | null

const temporaryContact: contact = {
    name: "",
    vacancy: "",
    phone: ""
} 
let showallButtonPressed: boolean = false

const timers: timers = {
    nameTimer: undefined,
    vacancyTimer: undefined,
    phoneTimer: undefined
};
let existingContacts: Set<string> = new Set();
window.addEventListener("load", (): void => {
    loadFromLocalStorage()
    renderAllColumns()

})
searchWindowClosingElements.forEach((closingElement) => {
    closingElement.addEventListener("click", () => {
        showallButtonPressed = false
        if (searchWindow.classList.contains("seach-window_active")) {
            searchWindowBackground.classList.remove("search-window-popup-background_active")
            searchWindow.classList.remove("seach-window_active")
            searchWindowOutput.classList.remove("search-window__output-info-shown")
            searchWindowOutput.innerHTML = ""
            searchInput.value = ""
        }
    })
})
edithWindowClosingElements.forEach((closingElement) => {
    closingElement.addEventListener("click", () => {
        editWindow.classList.remove("edit-window_active")
        editNameErrorNode.classList.remove("error-message_visible")
        editVacancyErrorNode.classList.remove("error-message_visible")
        editPhoneErrorNode.classList.remove("error-message_visible")
        editWindowBackground.classList.remove("edit-window-popup-background_active")
        clearTimeout(timers.nameTimer)
        clearTimeout(timers.vacancyTimer)
        clearTimeout(timers.phoneTimer)
    })
})
// editCloseButton.addEventListener("click", () => {
//     editWindow.classList.remove("edit-window_active")
//     editNameErrorNode.classList.remove("error-message_visible")
//     editVacancyErrorNode.classList.remove("error-message_visible")
//     editPhoneErrorNode.classList.remove("error-message_visible")
//     clearTimeout(timers.nameTimer)
//     clearTimeout(timers.vacancyTimer)
//     clearTimeout(timers.phoneTimer)
// })

editApplyChangesButton.addEventListener("click", () => {
    if (validateAllInputsAndRenderErrors(editInputName, editInputVacancy, editInputPhone, editNameErrorNode, editVacancyErrorNode, editPhoneErrorNode)) {
        return;
    }
    deleteItemFromAllContats(
        allContacts[temporaryContact.name[0].toLowerCase()], 
        temporaryContact.name,
        temporaryContact.vacancy,
        temporaryContact.phone,
        "name", 
        "vacancy", 
        "phone", 
        `${reduceSpaces(temporaryContact.name)}${reduceSpaces(temporaryContact.vacancy)}${reduceSpaces(temporaryContact.phone)}`
    );
    addPersonToContacts(editInputName, editInputVacancy, editInputPhone)
    const columnToRender: divToRender = document.querySelector(`[data-id="${reduceSpaces(editInputName.value[0].toLowerCase())}"]`)
    if (columnToRender) {renderColumn(editInputName.value[0].toLowerCase(), columnToRender)}
    if (searchWindow.classList.contains("seach-window_active")) {
        if (showallButtonPressed) {
            renderAllToDiv(searchWindowOutput)
        } else {
            searchWindowOutput.innerHTML = ""
            renderArrToDiv(
                searchByName(allContacts[searchInput!.value[0].toLowerCase()], searchInput!.value),
                searchWindowOutput,
                "search-window__output-data-info",
                "search-window__output-data-info__remove-button",
                "search-window__output-data-info__edit-button"
            )
        }
    }
    editWindow.classList.remove("edit-window_active")

})

addButton.addEventListener("click", function(): void | boolean {
    if (validateAllInputsAndRenderErrors(nameInput, vacancyInput, phoneInput, nameErrorNode, vacancyErrorNode, phoneErrorNode)) {
        return false;
    } else if (!checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput!.value)}${reduceSpaces(vacancyInput!.value)}${reduceSpaces(phoneInput!.value)}`))) {
        addPersonToContacts(nameInput, vacancyInput, phoneInput)
        console.log(allContacts)
        console.log(existingContacts)
        const toRender: divToRender = document.querySelector(`[data-id="${reduceSpaces(nameInput!.value[0].toLowerCase())}"]`)
        if (toRender) {
        renderColumn(reduceSpaces(nameInput!.value.trim())[0].toLowerCase(), toRender)}
    }
})


searchInput.addEventListener("input", (): void => {
    showallButtonPressed = false
    if (!searchInput!.value) {
        searchWindowOutput!.innerHTML = ""
        return;
    };
    searchWindowOutput!.innerHTML = ""
    renderArrToDiv(
        searchByName(allContacts[searchInput!.value[0].toLowerCase()], searchInput!.value),
        searchWindowOutput,
        "search-window__output-data-info",
        "search-window__output-data-info__remove-button",
        "search-window__output-data-info__edit-button"
    )
})


showAllButton!.addEventListener("click", (): void => {
    showallButtonPressed = true
    searchInput!.value = ""
    searchWindowOutput!.innerHTML = ""
    renderAllToDiv(searchWindowOutput)
    searchWindowOutput!.classList.add("search-window__output-info-shown")
    
})

contactTable!.addEventListener("click", toggleContacts)

clearListButton!.addEventListener("click", (): void => {
    clearAll()
    renderAllColumns()
})

searchButton!.addEventListener("click", (): void => {
    if (!searchWindow!.classList.contains("seach-window_active")) {
        searchWindow!.classList.add("seach-window_active")
        searchWindowBackground.classList.add("search-window-popup-background_active")
    }
})

// adds person to contacts and returns first letter of their name
function addPersonToContacts(nameInput: HTMLInputElement, vacancyInput: HTMLInputElement, phoneInput: HTMLInputElement): void | true {
    const entries: [keyof contact, string][] = [
        ['name', reduceSpaces(nameInput.value.trim())],
        ['vacancy', reduceSpaces(vacancyInput.value.trim())],
        ['phone', reduceSpaces(phoneInput.value.trim())]
    ]
    let person = Object.fromEntries(entries) as Record<contactKeys, string>
    if (checkExistingContact(reduceSpaces(`${person.name}${person.vacancy}${person.phone}`))) {

        // person = null
        return true;
    }

    allContacts[reduceSpaces(nameInput.value.trim())[0].toLowerCase()].push(person)
    existingContacts.add(reduceSpaces(`${person.name}${person.vacancy}${person.phone}`))
    storeOneInLocalStorage(person)
    // return person.name[0].toLowerCase()
}

// reduces more than one consecutive spaces in a string to just one and returns it
function reduceSpaces(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
}

function checkExistingContact(str: string): boolean {
    if (!checkForEmpty(str)) {
        return existingContacts.has(str)
    }
    return true
}

// Create a div with a class
function createDiv(className: string): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div')
    div.classList.add(className)
    return div;
}
// adds inner text to existing div
function renderContact(div: HTMLDivElement, object: contact): void {
    div.innerText = `Name: ${object.name}
                     Vacancy:${object.vacancy}
                     Phone: ${object.phone}`
}

function searchByName(array: contact[], searchString: string): contact[] | void {
    if (!array) return;
    const lowerCaseSearchString: string = searchString.toLowerCase();
    return array.filter(person => 
        person.name.toLowerCase().startsWith(lowerCaseSearchString)
    );
}

// writes text into edit fields using values of given object
function redactEditInputs(obj: contact): void {
    editInputName.value = obj.name
    editInputVacancy.value = obj.vacancy
    editInputPhone.value = obj.phone
} 
// writes values of passed contact object into temporary contact
function redactTemporaryContact(obj: contact): void {
    temporaryContact.name = obj.name
    temporaryContact.vacancy = obj.vacancy
    temporaryContact.phone = obj.phone
    console.log(temporaryContact)
}

// renders array of objects with specified classnames of delete buttons and divs to div
function renderArrToDiv(
    arr: contact[] | void, 
    targetDiv: HTMLDivElement, 
    contactDivClassName: string, 
    deleteButtonClassName: string,
    editButtonClassName: string): void {
    if (!arr) return;
    // 
    arr.forEach(contact => {
        const newDiv: HTMLDivElement = createDiv(contactDivClassName)
        const removeButton: HTMLButtonElement = renderButton(deleteButtonClassName, '\u2716')
        const editButton: HTMLButtonElement = renderButton(editButtonClassName, '\u270E')
        editButton.addEventListener("click", (): void => {
            redactEditInputs(contact);
            redactTemporaryContact(contact)
            editWindow.classList.add("edit-window_active")
            editWindowBackground.classList.add("edit-window-popup-background_active")
        })
        removeButton.addEventListener('click', (): void => {
            if (searchInput.value.length !== 0) {
                deleteItemFromAllContats(allContacts[contact.name[0].toLowerCase()], contact.name, contact.vacancy, contact.phone, "name", "vacancy", "phone",`${reduceSpaces(contact.name)}${reduceSpaces(contact.vacancy)}${reduceSpaces(contact.phone)}`)
                targetDiv.innerHTML = ""
                renderArrToDiv(searchByName(allContacts[searchInput.value[0].toLowerCase()], searchInput.value),
                    searchWindowOutput,
                    "search-window__output-data-info",
                    "search-window__output-data-info__remove-button",
                    "search-window__output-data-info__edit-button")
            }
            else {deleteItemFromAllContats(allContacts[contact.name[0].toLowerCase()], contact.name, contact.vacancy, contact.phone, "name", "vacancy", "phone",`${reduceSpaces(contact.name)}${reduceSpaces(contact.vacancy)}${reduceSpaces(contact.phone)}`)
            targetDiv.innerHTML = ""
            renderAllToDiv(targetDiv)}
        })
        renderContact(newDiv, contact)
        newDiv.append(removeButton)
        newDiv.append(editButton)
        targetDiv.append(newDiv)
    })
}

// renders all contacts of corresponding letteraa
function renderColumn(char: string, column: HTMLDivElement): void {
    // const column = document.querySelector(`[data-id="${char.toLowerCase()}"]`)
    column.innerHTML = `${char.toUpperCase()} - ${allContacts[char.toLowerCase()].length}`
    allContacts[char.toLowerCase()].forEach((obj) => {
        const newDiv: HTMLDivElement = createDiv("column__element-data-info");
        const removeButton: HTMLButtonElement = renderButton("column__element__remove-button", '\u2716')
        const editButton: HTMLButtonElement = renderButton("column__element__edit-button", '\u270E')
        editButton.addEventListener("click", (): void => {
            redactEditInputs(obj);
            redactTemporaryContact(obj)
            editWindow.classList.add("edit-window_active")
            editWindowBackground.classList.add("edit-window-popup-background_active")

        })
        removeButton.addEventListener('click', (): void => {
            deleteItemFromAllContats(allContacts[char.toLowerCase()], obj.name, obj.vacancy, obj.phone, "name", "vacancy", "phone",`${reduceSpaces(obj.name)}${reduceSpaces(obj.vacancy)}${reduceSpaces(obj.phone)}`)
        })
        renderContact(newDiv, obj)
        newDiv.append(removeButton)
        newDiv.append(editButton)
        column.append(newDiv)
    })
}

function renderAllColumns(): void {
    Object.keys(allContacts).forEach(key => {
        const renderedDiv: divToRender = document.querySelector(`[data-id="${key}"]`)
        if (renderedDiv) {
            renderColumn(key, renderedDiv)
        }
    })
}

// render all contacts in one div
function renderAllToDiv(targetDiv: HTMLDivElement): void {
    targetDiv.innerHTML = ""
    Object.keys(allContacts).forEach((key) => {
        if (allContacts[key].length == 0) {return}
        console.log(key)
        renderArrToDiv(allContacts[key], targetDiv, "search-window__output-data-info", "search-window__output-data-info__remove-button", "search-window__output-data-info__edit-button")
    })
}

// deletes item from array using filter and replaces old array with new array
function deleteItemFromAllContats(arr: contact[], prop1: string, prop2: string, prop3: string, removeBy1: contactKeys, removeBy2: contactKeys, removeBy3: contactKeys, setValue: string): void {
    const newArr: contact[] = arr.filter(item => !(item[removeBy1] === prop1 && item[removeBy2] === prop2 && item[removeBy3] === prop3))
    allContacts[prop1[0].toLowerCase()] = newArr
    existingContacts.delete(setValue)
    localStorage.removeItem(`${prop1}${prop2}${prop3}`)
    const renderedDiv: divToRender = document.querySelector(`[data-id="${prop1[0].toLowerCase()}"]`)
    if (renderedDiv) {
        renderColumn(prop1[0].toLowerCase(), renderedDiv)
    }
}


function toggleContacts(event: MouseEvent) {
    const target = event.target as Element;
    const closestDiv: HTMLDivElement | null = target.closest("div")
    if (closestDiv) {
        let column: HTMLDivElement = closestDiv;
        if (!column) return;
        if (!column.classList.contains("element__letter")) return;
        let displayedContacts = column.children
        for (const contactDiv of displayedContacts) {
            contactDiv.classList.toggle("column__element-data-info-shown")
        }
    }
    
}


// changes the given contact object and returns 



function renderButton(className: string, text: string): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button')
    button.classList.add(className)
    button.innerText = text
    return button;
}


// returns true if a string contains non english letters, excluding spaces
function checkForNonEnglishLetters(str: string): boolean {
    const nonEnglishPattern = /[^a-zA-Z\s]/;
    return nonEnglishPattern.test(str);
}
// return true if str is shorter than num symbols
function checkShortLength(str: string, num: number): boolean {
    return reduceSpaces(str.trim()).length < num
}

// return true if str is longer than num symbols
function checkLongLength(str: string, num: number): boolean {
    return reduceSpaces(str.trim()).length > num
}

// return true if str is empty
function checkForEmpty(str: string): boolean {
    return str.trim().length === 0
}

// return true if str doesnt start with +
function checkIfDoesntStartsWithPlus(str: string): boolean {
    const startsWithPlus = /^\+/;
    return !startsWithPlus.test(str.trim())
}

// return true if str contains non numeric chars or spaces inside of it, but allows + at the beginning
function checkForNonNumeric(str: string): boolean {
    const containsNonNumeric = /^\+?[\d]*$/;
    return !containsNonNumeric.test(str.trim());
}

// checks phone number for all mistakes, returns true if theres any
function checkPhoneNumber(str: string): boolean {
    return checkForEmpty(str) || 
           checkIfDoesntStartsWithPlus(str) ||
           checkForNonNumeric(str) || 
           checkShortLength(str, 5) || 
           checkLongLength(str, 18) 
        //    checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`));
}

// checks name or vacancy for all mistakes, returns true if theres any
function checkNameOrVacancy(str: string): boolean {
    return checkForEmpty(str) || 
           checkForNonEnglishLetters(str) || 
           checkLongLength(str, 15) || 
           checkShortLength(str, 3) 
        //    checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`));
}
// displays errorMessage within targetNode for 6 seconds 
// if error is displayed while its clicked, removes the class, cancels animation and adds class immediatly
function displayError(targetNode: HTMLSpanElement, errorMessage: string, timerVariable: string): void {
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
function validateNameInputAndRenderErrors(inputNameField: HTMLInputElement, errorNode: HTMLSpanElement): boolean {
    let str: string = inputNameField.value
    if (checkNameOrVacancy(str)) {
        if (checkForEmpty(str)) {
            displayError(errorNode, "Must not contain empty string.", "nameTimer")
            return true;
        } else if (checkForNonEnglishLetters(str)) {
            displayError(errorNode, "Must contain only letters from English alphabet.", "nameTimer")
            return true
        } else if (checkLongLength(str, 15)) {
            displayError(errorNode, "Must not be longer than 15 symbols.", "nameTimer")
            return true
        } else if (checkShortLength(str, 3)) {
            displayError(errorNode, "Must not be shorter than 3 symbols.", "nameTimer")
            return true
        } 
        // else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
        //     displayError(errorNode, "Cannot add existing contact", "nameTimer")
        //     return true
        // }
    }
    return false;
}

// checks if vacancy input has errors and renders necessary error message
function validateVacancyInputAndRenderErrors(inputNameField: HTMLInputElement, errorNode: HTMLSpanElement): boolean {
    let str: string = inputNameField.value
    if (checkNameOrVacancy(str)) {
        if (checkForEmpty(str)) {
            displayError(errorNode, "Must not contain empty string.", "vacancyTimer")
            return true;
        } else if (checkForNonEnglishLetters(str)) {
            displayError(errorNode, "Must contain only letters from English alphabet.", "vacancyTimer")
            return true
        } else if (checkLongLength(str, 15)) {
            displayError(errorNode, "Must not be longer than 15 symbols.", "vacancyTimer")
            return true
        } else if (checkShortLength(str, 3)) {
            displayError(errorNode, "Must not be shorter than 3 symbols.", "vacancyTimer")
            return true
        } 
        // else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
        //     displayError(errorNode, "Cannot add existing contact", "vacancyTimer")
        //     return true
        // }
    }
    return false;
}

// checks if phone input has errors and renders necessary error message
function validatePhoneInputAndRenderErrors(inputNameField: HTMLInputElement, errorNode: HTMLSpanElement): boolean {
    let str: string = inputNameField.value
    if (checkPhoneNumber(str)) {
        if (checkForEmpty(str)) {
            displayError(errorNode, "Must not contain empty string.", "phoneTimer")
            return true;
        } else if (checkIfDoesntStartsWithPlus(str)) {
            displayError(errorNode, "Must start with plus.", "phoneTimer")
            return true;
        } else if (checkForNonNumeric(str)) {
            displayError(errorNode, "Must contain only numbers, no spaces and only one plus at the beginning.", "phoneTimer")
            return true;
        } else if (checkShortLength(str, 5)) {
            displayError(errorNode, "Must not be shorter than 5 symbols.", "phoneTimer")
            return true;
        } else if (checkLongLength(str, 18)) {
            displayError(errorNode, "Must not be longer that 18 symbols.", "phoneTimer")
            return true;
        } 
        // else if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInput.value)}${reduceSpaces(vacancyInput.value)}${reduceSpaces(phoneInput.value)}`))) {
        //     displayError(errorNode, "Cannot add existing contact", "phoneTimer")
        //     return true;
        // }
    }
    return false;
}

// new function to render a specific error if 3 inputs match the exact values of already existing contact
function checkExistingContactAndRenderError(
    nameInputElement: HTMLInputElement, 
    vacancyInputElement: HTMLInputElement,
    phoneInputElement: HTMLInputElement,
    nameErrorContainer: HTMLSpanElement,
    vacancyErrorContainer: HTMLSpanElement,
    phoneErrorContainer: HTMLSpanElement) {
        if (checkExistingContact(reduceSpaces(`${reduceSpaces(nameInputElement.value)}${reduceSpaces(vacancyInputElement.value)}${reduceSpaces(phoneInputElement.value)}`))) {
            displayError(nameErrorContainer, "Cannot add existing contact", "nameTimer")
            displayError(vacancyErrorContainer, "Cannot add existing contact", "vacancyTimer")
            displayError(phoneErrorContainer, "Cannot add existing contact", "phoneTimer")
        }
    }

// checks if all inputs have errors and renders necessary error messages
// now that i look at it i question why i made it this way 2 months ago
function validateAllInputsAndRenderErrors(nameInputElement: HTMLInputElement, 
                                          vacancyInputElement: HTMLInputElement,
                                          phoneInputElement: HTMLInputElement,
                                          nameErrorContainer: HTMLSpanElement,
                                          vacancyErrorContainer: HTMLSpanElement,
                                          phoneErrorContainer: HTMLSpanElement): boolean {
    if (validateNameInputAndRenderErrors(nameInputElement, nameErrorContainer)    ||
        validatePhoneInputAndRenderErrors(phoneInputElement, phoneErrorContainer)   ||
        validateVacancyInputAndRenderErrors(vacancyInputElement, vacancyErrorContainer) ||
        checkExistingContact(reduceSpaces(`${reduceSpaces(nameInputElement.value)}${reduceSpaces(vacancyInputElement.value)}${reduceSpaces(phoneInputElement.value)}`))) 
        {
            validateNameInputAndRenderErrors(nameInputElement, nameErrorContainer) 
            validatePhoneInputAndRenderErrors(phoneInputElement, phoneErrorContainer) 
            validateVacancyInputAndRenderErrors(vacancyInputElement, vacancyErrorContainer)
            checkExistingContactAndRenderError(nameInputElement, vacancyInputElement, phoneInputElement, nameErrorContainer, vacancyErrorContainer, phoneErrorContainer)
            return true
        }
    return false;
}
// stores one object in local storage
function storeOneInLocalStorage(obj: contact) {
    const dataString: string = JSON.stringify(obj)
    const storeKey: string = `${obj.name}${obj.vacancy}${obj.phone}`
    localStorage.setItem(storeKey, dataString)
    console.log(localStorage)
}

// retrieves one object from local storage
function retrieveOneFromLocalStorage(key: string): contact | void {

    const retrievedDataString: string | null = localStorage.getItem(key);
    if (retrievedDataString) {
        const retrievedData: contact = JSON.parse(retrievedDataString);
        return retrievedData;
    }
}

// writes from local storage to allContacts and existingContacts
function loadFromLocalStorage(): void {
    for (let i = 0; i < localStorage.length; i++) {
        const key: string | null = localStorage.key(i)
        if (key) {
            const retrievedContact: contact | void = retrieveOneFromLocalStorage(key)
            existingContacts.add(key)
            if (retrievedContact) {
                allContacts[key[0]].push(retrievedContact)
            }
        }
    }
}

// clears all data 
function clearAll(): void {
    Object.keys(allContacts).forEach(key => {
        if (allContacts[key].length > 0) {
            allContacts[key].forEach(obj => {
                deleteItemFromAllContats(allContacts[key], obj.name, obj.vacancy, obj.phone, "name", "vacancy", "phone", `${reduceSpaces(obj.name)}${reduceSpaces(obj.vacancy)}${reduceSpaces(obj.phone)}`)
            })
        }
    })
}