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
// let p = document.createElement("p")
// p.innerText = `${allContacts.a[0].name} ${allContacts.a[0].vacancy} ${allContacts.a[0].phone}`

function showContacts(event) {
    
    let div = event.target.closest("div");
    if (!div) return;
    if (!div.classList.contains("element__letter")) return;
    let p = document.createElement('p');
    let letter = div.dataset.id
    p.innerText = `${letter}`
    div.append(p)
}

contactTable.addEventListener("click", showContacts)