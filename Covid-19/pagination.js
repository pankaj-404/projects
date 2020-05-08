let data = []
let dayData = []
let pageData = []
let perPage = document.querySelector("select").value 
let activePage = 1
let select;
let days = []
let totalCases = []

$(document).ready(function () {
    $("select").hide()
    $("canvas").hide()
    // Handler for .ready() called.
});


// api call for SUMMARY
var url = "https://api.covid19api.com/summary"
fetch(url)
    .then(response => response.json())
    .then(res => {
        data = res
        data.Countries.splice(0, 2)
    })

var total;
function pagination(page) {
    if (typeof (data) == "Array") {
        total = data.length
        // console.log(total)
    } else {
        total = data.Countries.length
        // console.log(total)
    }
    let pageCount = Math.ceil(total / perPage)
    let pages = document.getElementById("pages")
    pages.innerHTML = ""

    for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li")
        if (i === page - 1) {
            li.setAttribute("class", "page-item active")
        } else {
            li.setAttribute("class", "page-item")
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
        pageData = data.Countries.filter((a, i) => i >= low && i < high)
    }
    fillPageForSummary(page)
}


function changePage(newPage) {
    let liActive = document.querySelector(`#pages li:nth-child(${activePage})`)
    liActive.setAttribute("class", "page-item")
    activePage = newPage
    let liNew = document.querySelector(`#pages li:nth-child(${activePage})`)
    liNew.setAttribute("class", "page-item active")
    loadData()
}


function fillPageForSummary(res) {
    let div = document.getElementById("data")
    div.innerHTML = ""

    div.innerHTML = `<table class="table table-sm table-striped bg-light text-center" >
    <thead>
    <tr>
    <th scope="col"><h3>Country</h3></th>
    <th scope="col"><h3>Total Confirmed</h3></th>
    <th scope="col"><h3>New Confirmed</h3></th>
    <th scope="col"><h3>Total Recovered</h3></th>
    <th scope="col"><h3>Total Deaths</h3></th>
    </tr>
    </thead>
    <tbody></tbody>
    </table>`
    var tbody = document.querySelector("tbody")

    var tr = ""

    pageData.forEach(item => {
        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${item.Country}</td>
        <td>${item.TotalConfirmed}</td>
        <td>${item.NewConfirmed}</td>
       <td>${item.TotalRecovered}</td>
        <td>${item.TotalDeaths}</td>`
        tbody.append(tr)
    })

}

var summaryBtn = document.getElementById("summryBtn")
summaryBtn.addEventListener("click", () => {
    $("canvas").hide()
    $("#data").show()
    $("#bottomNav").show()
    $("select").show()
    pagination(activePage)
    select = document.getElementById("pageSelect")
    select.addEventListener("change", () => {
        perPage = Number(select.value)
        pagination(activePage)
    })
})




var submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", chart)


async function chart() {
    if (country.value) {
        totalCases.length = 0
        days.length = 0
        $("#data").hide()
        $("#bottomNav").hide()
        $("select").hide()
        $("canvas").show()
        await getDataByCountry()
        var ctx = document.getElementById('chart').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: ` # of Total Cases in ${country.value}`,
                    data: totalCases,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },

        });
        country.value = ""
    } else {
        alert("Please Enter Country Name")
    }

}



let country = document.querySelector("#countryInput")
async function getDataByCountry() {
    // console.log(country.value)

    url = `https://api.covid19api.com/total/country/${country.value}/status/confirmed`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    data.forEach(item => {
        days.push(`${new Date(item.Date).getDate()}-${new Date(item.Date).getMonth() + 1}-${new Date(item.Date).getFullYear()}`)
        totalCases.push(item.Cases)
    });

}





