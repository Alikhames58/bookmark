let bookmarkNameInput = document.getElementById('bookmarkName')
let bookmarkUrlInput = document.getElementById('bookmarkUrl')
let siteList = []
if (localStorage.getItem !== null) {
    siteList = JSON.parse(localStorage.getItem('site'))
    displayData()
}
function addSite() {
    if (validationSiteName() && validationUrlSite()) {
        let site = {
            name: bookmarkNameInput.value,
            url: bookmarkUrlInput.value
        }
        siteList.push(site)
        localStorage.setItem('site', JSON.stringify(siteList))
        displayData()
        clearData()
        console.log(siteList)
    }
}

function displayData() {
    let container = ""
    for (let i = 0; i < siteList.length; i++) {
        container += `
                <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td>
                <a href="${siteList[i].url}" target="blank" >
                <button class="btn btn-visit">
                <i class="fa fa-solid fa-eye pe-2">
                </i>
                Visit
                </button>
                </a>
                </td>
                <td><button onclick="deleteSite(${i})" class="btn btn-delete pe-2">
                <i class="fa fa-solid fa-trash-can"></i>
                Delete
                </button>
                </td>
                </tr>
                `
    }

    document.getElementById('tBodyData').innerHTML = container
}

function deleteSite(index) {
    siteList.splice(index, 1)
    localStorage.setItem('site', JSON.stringify(siteList))
    displayData()
}
function clearData() {
    bookmarkNameInput.value = null
    bookmarkUrlInput.value = null
    bookmarkNameInput.classList.remove('is-valid')
    bookmarkUrlInput.classList.remove('is-valid')
}
function validationSiteName() {
    let regex = /^[a-zA-Z]{2,19}$/
    let text = bookmarkNameInput.value
    let msgName = document.getElementById('msgName')
    if (regex.test(text)) {
        bookmarkNameInput.classList.add('is-valid')
        bookmarkNameInput.classList.remove('is-invalid')
        msgName.classList.add('d-none')
        return true
    }
    else {
        bookmarkNameInput.classList.add('is-invalid')
        bookmarkNameInput.classList.remove('is-valid')
        msgName.classList.remove('d-none')
        return false
    }
}
function validationUrlSite() {
    let regex = /^https:\/\/.{5,30}$/
    let text = bookmarkUrlInput.value
    let msgUrl = document.getElementById('msgUrl')
    if (regex.test(text)) {
        bookmarkUrlInput.classList.add('is-valid')
        bookmarkUrlInput.classList.remove('is-invalid')
        msgUrl.classList.add('d-none')
        return true
    }
    else {
        bookmarkUrlInput.classList.add('is-invalid')
        bookmarkUrlInput.classList.remove('is-valid')
        msgUrl.classList.remove('d-none')
        return false
    }
}