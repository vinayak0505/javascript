let slates = document.getElementsByClassName("slate");
let scores = document.getElementsByClassName("score");
let ball = document.getElementById("ball");

let player1Score = 0, player2Score = 0;

let isRed = true;
setInterval(changeBallColor, 1000);
function changeBallColor() {
    if (isRed) ball.style.backgroundColor = "rgb(122, 0, 0)";
    else ball.style.backgroundColor = "red";
    isRed = !isRed;
}

let horizontal = 1;
let vertical = 1;
setInterval(changeBall, 5);
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
        if (colide(slates[1],ball)) {
            vertical = -vertical;
            player2ScoreIncreate();
        } else {
            won(1)
            reset();
        }
    }

    // player 1
    if (ball.getBoundingClientRect().top <= slates[0].getBoundingClientRect().bottom && vertical < 0) {
        if (colide(slates[0],ball)) {
            vertical = -vertical;
            player1ScoreIncreate();
        } else {
            won(2)
            reset();
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
        console.log(event);
        switch (event.key) {
            case "ArrowLeft":
                move(-SPEED);
                break;
            case "ArrowRight":
                move(SPEED);
                break;
        }
    }
);

document.addEventListener('keydown',
    function (event) {
        console.log(event);
        switch (event.key) {
            case "ArrowLeft":
                move(-SPEED);
                break;
            case "ArrowRight":
                move(SPEED);
                break;
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
    ball.style.left = "200px";
    ball.style.top = "200px";
}

function player1ScoreIncreate() {
    player1Score++;
    scores[0].innerHTML = player1Score;
}

function player2ScoreIncreate() {
    player2Score++;
    scores[1].innerHTML = player2Score;
}

function won(value) {
    if(value == 1){
        window.alert("Player 1 won by " + player1Score);
    }else {
        window.alert("Player 2 won by " + player2Score);
    }
}