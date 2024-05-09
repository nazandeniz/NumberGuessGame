// Variables
var randomNum = 0;
var gameLevel = 1;
var givenNum = 0;
var guessRight = 5;
var multiplier = 10;
var second = 30;

// document GetElementBtId
const btnGuess = document.getElementById("btnGuess");
const inputGuess = document.getElementById("inputGuess");
const messageDiv = document.getElementById("messageDiv");
const HeaderRightToGuess = document.getElementById("HeaderRightToGuess");
const headerGameLevel = document.getElementById("headerLevel");

// Create Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * gameLevel * multiplier) + 1;
}

function createMessageSpan(message, isCorrect) {
    messageDiv.innerHTML = "";
    let messageSpan = document.createElement("span");
    messageSpan.innerHTML = message;
    messageSpan.style.color = isCorrect ? "green" : "red";
    messageDiv.append(messageSpan);
    messageDiv.style.display = "block";

    return messageSpan;
}

// window onload
window.onload = function () {
    messageDiv.style = "display:none";
    randomNum = getRandomNumber();
    console.log(randomNum);
    getTimer();
}

// btnOnclick
btnGuess.onclick = function () {
    givenNum = inputGuess.value;

    if (guessRight !== 0) {
        if (randomNum == givenNum) {
            createMessageSpan("YAAAYYY you got it!", true);
            gameLevel++;
            randomNum = getRandomNumber();
            guessRight = 5;
            HeaderRightToGuess.innerHTML = guessRight;
            headerGameLevel.innerHTML = gameLevel; 
        } else if (randomNum < givenNum) {
            createMessageSpan("Enter a smaller number!", false);
            guessRight--;
            HeaderRightToGuess.innerHTML = guessRight;
        } else if (randomNum > givenNum) {
            createMessageSpan("Enter a bigger number!", false);
            guessRight--;
            HeaderRightToGuess.innerHTML = guessRight;
        }
    } else {
        createMessageSpan(`GAME OVER! The correct number was ${randomNum}.`, false);
    }

    inputGuess.value = "";
    inputGuess.focus();
}

// get timer
function getTimer() {
    const timer = document.getElementById("timer");
    const timerHeader = document.getElementById("timerHeader");

    const countDown = setInterval(function () {
        second--;
        if (second == 5) {
            timer.className = "bg-danger text-white";
        }
        timer.innerHTML = `<h1 class="text-center">${second}</h1>`
        if (second <= 0) {
            alert(`TIME OVER! The correct number was ${randomNum}.`, false)
            clearInterval(countDown)
            btnTahmin.style = "display:none"
        }
    }, 1000);
}

// when click the enter button : btnGuess.click()
inputGuess.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        btnGuess.click();
    }
});
