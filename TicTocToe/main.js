function gameStart() {
    document.player = "X";
    document.winner = 0;
    alert("Let's Play")
    document.getElementById("msg").textContent("")
}

function nextMove(sqr) {
    if (document.winner != 0) {
        alert(document.player + " already won")
    }
    else if (sqr.innerText == "") {
        sqr.innerText = document.player;
        switchPlayer();
    }
    else{
        document.getElementById("msg").innerHTML = "Select empty box"
    }

}

function switchPlayer() {

    if (checkWinner(document.player)) {
        alert(document.player + " WON")
        document.winner = document.player
    }
    else if (document.player == "X" ) {
        document.player = "O";
        document.getElementById("msg").innerHTML = "it's" + document.player + "'s turn"
    } else {
        document.player = "X"
        document.getElementById("msg").innerHTML = "it's" + document.player + "'s turn"
    }

}


function check(x, y, z, move) {
    var flag = false;
    if (id(x) == move && id(y) == move && id(z) == move) {
        flag = true;
    }
    return flag
}

function checkWinner(move) {
    var flag = false;
    if (check(1, 2, 3, move) || check(4, 5, 6, move) || check(7, 8, 9, move) || check(1, 4, 7, move) || check(2, 5, 8, move) ||  
        check(3, 6, 9, move) || check(3, 5, 7, move) || check(1, 5, 9, move)) {
        flag = true;
    }
    return flag
}


function id(num) {
    return document.getElementById("sqr"+num).innerText
}

