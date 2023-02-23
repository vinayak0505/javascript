let slates = document.getElementsByClassName("slate");
let scores = document.getElementsByClassName("score");
let body = document.getElementById("body");
let promt = document.getElementById("prompt");
let ball = document.getElementById("ball");

let value;
let play = false;
let player1Score = 0, player2Score = 0;
let promtInterval;
let ballColorInterval;
let ballSpeedInterval;

init();
function init() {
    let player = localStorage.getItem("player");
    if (player == undefined) {
        window.alert("This is your first time");
    } else {
        value = localStorage.getItem("value");
        window.alert("Maximus score is " + value + " by " + player);
    }
    promtInterval = setInterval(changePromt, 2000);
}

function startGame() {
    play = true;
    ballColorInterval = setInterval(changeBallColor, 500);
    ballSpeedInterval = setInterval(changeBall, 5);
    clearInterval(promtInterval);
    promt.style.opacity = 0;
}

function stopGame() {
    play = false;
    clearInterval(ballColorInterval);
    clearInterval(ballSpeedInterval);
    promtInterval = setInterval(changePromt, 2000);
}

function changePromt() {
    if (promt.style.opacity == 0) {
        promt.style.opacity = 0.6;
    } else promt.style.opacity = 0;
}

let isRed = true;
function changeBallColor() {
    if (isRed) ball.style.backgroundColor = "rgb(122, 0, 0)";
    else ball.style.backgroundColor = "red";
    isRed = !isRed;
}

let horizontal = 1;
let vertical = 1;
function changeBall() {
    ball.style.left = (horizontal + ball.getBoundingClientRect().left) + 'px';
    ball.style.top = (vertical + ball.getBoundingClientRect().top) + 'px';
    checkHorizontal();
    checkVertical();
}

function checkHorizontal() {
    if (ball.getBoundingClientRect().right >= screen.width && horizontal > 0) {
        horizontal = -horizontal;
    }

    if (ball.getBoundingClientRect().left <= 0 && horizontal < 0) {
        horizontal = -horizontal;
    }
}

function checkVertical() {
    // player 2
    if (ball.getBoundingClientRect().bottom >= slates[1].getBoundingClientRect().top && vertical > 0) {
        if (colide(slates[1], ball)) {
            vertical = -vertical;
            player2ScoreIncreate();
        } else {
            won(1)
        }
    }

    // player 1
    if (ball.getBoundingClientRect().top <= slates[0].getBoundingClientRect().bottom && vertical < 0) {
        if (colide(slates[0], ball)) {
            vertical = -vertical;
            player1ScoreIncreate();
        } else {
            won(2)
        }
    }
}

function move(by) {
    for (var i = 0; i < slates.length; i++) {
        slates[i].style.left = (by + slates[i].getBoundingClientRect().left) + 'px';
    }
}

const SPEED = 50;

document.addEventListener('keydown',
    function (event) {
        if (play == false) {
            startGame();
        } else {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    move(-SPEED);
                    break;
                case "d":
                case "ArrowRight":
                    move(SPEED);
                    break;
            }
        }
    }
);

function colide(object1, object2) {
    if (object1.getBoundingClientRect().right > object2.getBoundingClientRect().left
        && object1.getBoundingClientRect().left < object2.getBoundingClientRect().left)
        return true;
    if (object1.getBoundingClientRect().right > object2.getBoundingClientRect().right
        && object1.getBoundingClientRect().left < object2.getBoundingClientRect().right)
        return true;

    return false;
}

function reset() {
    stopGame();
    console.log(body.getBoundingClientRect());
    player2ScoreIncreate(0);
    player1ScoreIncreate(0);
    ball.style.left = (body.getBoundingClientRect().right / 2) + "px";
    ball.style.top = ((slates[1].getBoundingClientRect().top - slates[0].getBoundingClientRect().top) / 2) + "px";
    let center = (body.getBoundingClientRect().width / 2) - (slates[0].getBoundingClientRect().width / 2);
    slates[0].style.left = center + 'px';
    slates[1].style.left = center + 'px';
}

function player1ScoreIncreate(value) {
    if (value != undefined) {
        player1Score = value;
    } else {
        player1Score++;
    }
    scores[0].innerHTML = player1Score;
}

function player2ScoreIncreate(value) {
    if (value != undefined) {
        player2Score = value;
    } else {
        player2Score++;
    }
    scores[1].innerHTML = player2Score;
}

function won(player) {
    if (player == 1) {
        if (value < player1Score || value == undefined) {
            window.alert("Player 1 won with new Max score of " + player1Score);
            localStorage.setItem("value", player1Score);
            value = player1Score;
            localStorage.setItem("player", "player 1");
        } else if (value > player1Score) {
            window.alert("Player 1 won by " + player1Score + " Max score: " + value);
        } else {
            window.alert("Player 1 won by " + player1Score);
        }
    } else {
        if (value < player2Score || value == undefined) {
            window.alert("Player 2 won with new Max score of " + player2Score);
            localStorage.setItem("value", player2Score);
            localStorage.setItem("player", "player 2");
            value = player2Score
        } else if (value > player2Score) {
            window.alert("Player 2 won by " + player2Score + " Max score: " + value);
        } else {
            window.alert("Player 2 won by " + player2Score);
        }
    }
    reset();
}