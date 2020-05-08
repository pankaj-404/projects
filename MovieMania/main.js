let data = []
let dayData = []
let pageData = []
let perPage = document.querySelector("#pageSelect").value || 4
let activePage = 1
let select;
var total;


function debounce(func, delay) {
    let debounce;
    return function () {
        clearTimeout(debounce)
        debounce = setTimeout(() => func(), delay)
    }
}

let count = 0
let input = document.querySelector("#title")
input.addEventListener("keyup", debounce(getData, 600))

function getData() {

    let val = input.value || "iron man"
    if (val) {
        fetch(`http://www.omdbapi.com/?apikey=fcc8d66d&s=${val}`)
            .then(res => res.json())
            .then(res => {
                if (res.Response==="True") {
                    data = res
                    pagination(activePage)
                    select = document.getElementById("pageSelect")
                    select.addEventListener("change", () => {
                        perPage = Number(select.value)
                        pagination(activePage)
                    })
                }
                else {
                    alert("Error : " + res.Error)
                }
            })
    }
}
document.getElementById('submitBtn').addEventListener("click", function () {

    var url = getUrl()
    fetch(url)
    .then(res => res.json())
    .then(res => {
        if (res.Response==="True") {
            data = res
            pagination(activePage)
            select = document.getElementById("pageSelect")
            select.addEventListener("change", () => {
                perPage = Number(select.value)
                pagination(activePage)
            })
        }
        else {
            alert("Error : " + res.Error)
        }
    })
    document.getElementById("form").reset()
    document.getElementById("content").innerHTML = ""
})


function pagination(page) {
    if (typeof (data) == "Array") {
        total = data.length
    } else {
        total = data.Search.length
    }

    let pageCount = Math.ceil(total / perPage)
    let pages = document.getElementById("pages")
    pages.innerHTML = ""

    for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li")
        if (i === page - 1) {
            li.setAttribute("class", "page-item active")
        } else {
            li.setAttribute("class", "page-item ")
        }
        li.setAttribute("onclick", `changePage(${i + 1})`)
        let a = document.createElement("a")
        a.setAttribute("class", "page-link")
        a.setAttribute("herf", `#${i + 1}`)
        a.textContent = i + 1
        li.append(a)
        pages.append(li)
    }
    loadData()
}


function loadData() {
    let page = activePage
    //   set the data acording to page
    let low = (page - 1) * perPage
    let high = page * perPage

    if (typeof (data) == "Array") {
        pageData = data.filter((a, i) => i >= low && i < high)
    } else {
        pageData = data.Search.filter((a, i) => i >= low && i < high)
    }
    fillPageForSummary(data, low, high)
}


function changePage(newPage) {
    let liActive = document.querySelector(`#pages li:nth-child(${activePage})`)
    liActive.setAttribute("class", "page-item")
    activePage = newPage
    let liNew = document.querySelector(`#pages li:nth-child(${activePage})`)
    liNew.setAttribute("class", "page-item active")
    loadData()
}


function fillPageForSummary(dataRes, low, high) {
    let res = document.querySelector("#res")
    res.innerHTML = ""
    for (i = low; i < high && dataRes.Search[i]; i++) {
        var card = document.createElement("div")
            card.setAttribute("class", "card col-12 col-sm-6 col-md-4 col-lg-3 my-2 text-center")
            card.setAttribute("id", "cardDetail")

            var poster = document.createElement("img")
            poster.setAttribute("class", "card-img-top imgSize")
            poster !== null ? (poster.src = dataRes.Search[i].Title) : (poster.innerHTML = "http://via.placeholder.com/400")
            poster.src = dataRes.Search[i].Poster

            var cardBody = document.createElement("div")

            var ul = document.createElement("ul")
            ul.setAttribute("class", "list-group list-group-flush")

            var liTitle = document.createElement("li")
            liTitle.setAttribute("class", "list-group-item")
            liTitle !== null ? (liTitle.innerHTML = "Title :" + dataRes.Search[i].Title) : (liTitle.innerHTML = "Title : ")

            var liType = document.createElement("li")
            liType.setAttribute("class", "list-group-item")
            liType !== null ? (liType.innerHTML = "Type :" + dataRes.Search[i].Type) : (liType.innerHTML = "Type : ")

            var liYear = document.createElement("li")
            liYear.setAttribute("class", "list-group-item")
            liYear !== null ? (liYear.innerHTML = "Year :" + dataRes.Search[i].Year) : (liYear.innerHTML = "  Year : ")

            ul.append(liTitle, liType, liYear)
            cardBody.append(ul)
            card.append(poster, cardBody)
            res.append(card)

    }

}

function getUrl() {

    var baseUrl = "http://www.omdbapi.com/?apikey=5f66fbfa"
    var titleValue = document.getElementById("title")
    var typeValue = document.getElementById("type")
    var yearValue = document.getElementById("year")

    if (titleValue) {
        baseUrl += "&s=" + titleValue.value
    } else {
        alert("Title is Mandatory")
    }
    if (typeValue) {
        baseUrl += "&type=" + typeValue.value
    }
    if (yearValue) {
        baseUrl += "&y=" + yearValue.value
    }

    titleValue.value = ""
    typeValue.value = ""
    yearValue.value = ""
    return baseUrl;

}


getData()