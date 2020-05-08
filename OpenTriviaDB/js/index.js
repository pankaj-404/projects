// console.log("welcome to new Project")

function getCategoriesList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://opentdb.com/api_category.php');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.response).trivia_categories
            //   console.log(data);
            showCategories(data);
        }
        else {
            console.log("Error Code is:" + xhr.status)
        }
    }
}

function showCategories(data) {
    var cat_select = document.getElementById("category")
    for (i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].id;
        option.text = data[i].name;
        cat_select.appendChild(option);
    }
}

function getRandomQuestion(e) {
    e.preventDefault()
    var num = document.getElementById("numberOfQue").value
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://opentdb.com/api.php?amount=' + num);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            var rendomDta = (JSON.parse(xhr.response).results);
            // console.log(rendomDta)
            showQuestion(rendomDta);
        }
        else {
            console.log("Error Code is:" + xhr.status)
        }
    }
}

var correct_answers;

function showQuestion(data) {
    correct_answers = []
    var card = document.getElementById("jokes-card");
    card.setAttribute("class", "px-4")
    card.innerText = ""
    var form = document.createElement("form")
    form.setAttribute("class", "p-5 container bg-light mb-5")

    for (i = 0; i < data.length; i++) {
        correct_answers.push(data[i]['correct_answer'])
        var joke_text = document.createElement("div");
        joke_text.setAttribute("class", "card card-text text-break")
        var cardbody = document.createElement("div")
        cardbody.setAttribute("class", "lead")
        joke_text.setAttribute("class", "card-body")
        cardbody.innerHTML = (i + 1) + ". " + data[i]['question'];
        var options = document.createElement("p")
        options.setAttribute("class", "h6")
        var input = document.createElement("input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("value", data[i]['correct_answer'])
        input.setAttribute("id", i)
        var lable = document.createElement("label")
        lable.innerHTML = data[i]['correct_answer']
        var br = document.createElement("br")
        options.append(input, lable, br)
        cardbody.appendChild(options)
        for (j = 0; j < data[i]['incorrect_answers'].length; j++) {
            var input = document.createElement("input")
            input.setAttribute("type", "checkbox")
            input.setAttribute("value", data[i]['incorrect_answers'][j])
            var lable = document.createElement("label")
            lable.innerHTML = data[i]['incorrect_answers'][j]
            var br = document.createElement("br")
            options.append(input, lable, br)
            cardbody.appendChild(options)
        }

        form.append(joke_text, cardbody);
    }
    var btn = document.createElement("btn")
    btn.setAttribute("class", "btn btn-lg btn-danger mb-4  col-6 offset-3 align-self-center")
    btn.setAttribute("id", "submitBtn")
    btn.setAttribute("onclick", "formSubmit()")
    btn.textContent = "Submit"
    card.append(form, btn)
    console.log(correct_answers)
}

function getCategoryQuestion(e) {
    e.preventDefault()
    var num = document.getElementById("numberOfQue").value
    var category = document.getElementById("category").value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://opentdb.com/api.php?amount=' + num || 10 + '&category=' + category);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            var categoryData = (JSON.parse(xhr.response).results);
            // console.log(categoryData)
            showQuestion(categoryData);
        }
        else {
            console.log("Error Code is:" + xhr.status)
        }
    }
}


function formSubmit() {
    validateForm()

}

var checks;

function validateForm() {
    checks = $('input[type="checkbox"]:checked').map(function () {
        return $(this).val();
    }).get()
    if(checks.length === correct_answers.length){
        result(checks, correct_answers)
    }
    else{
        alert("Pleas attempt all Question")
    }
    return 0;
}

function result(ansArr, compArr) {
    console.log(ansArr, compArr)
    var count = 0
    for (k = 0; k < ansArr.length; k++) {
        if (compArr[k] === ansArr[k]) {
            count++
        }
    }
    alert("you got "+ count +" marks")
    var card = document.getElementById("jokes-card")
    card.innerText = ""
    card.innerHTML =`<div class="container d-none d-md-block display-3 p-5 text-center text-wrap " id="ui">
                        WELCOME TO <br>
                        Open trivia Database
                    </div>
                    <div class="container d-block d-md-none h1 p-5 text-center text-wrap" id="ui">
                        WELCOME TO <br>
                        Open trivia Database
                    </div>`
}

getCategoriesList()

var selectCategories = document.getElementById("category")
var selectNum = document.getElementById("numberOfQue")
selectCategories.addEventListener("change", getCategoryQuestion)
selectNum.addEventListener("change", getRandomQuestion)