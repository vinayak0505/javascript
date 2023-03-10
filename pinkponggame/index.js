// array of rod or slates
let slates = document.getElementsByClassName("slate");
// scores
let scores = document.getElementsByClassName("score");
// body
let body = document.getElementById("body");
// promt message
let promt = document.getElementById("prompt");
// ball
let ball = document.getElementById("ball");

// all initals values 
let value;
let play = false;
let player1Score = 0, player2Score = 0;
let promtInterval;
let ballColorInterval;
let ballSpeedInterval;

init();
// init function need to be calles in the begning
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

// call when to start game
function startGame() {
    play = true;
    ballColorInterval = setInterval(changeBallColor, 500);
    ballSpeedInterval = setInterval(changeBall, 5);
    clearInterval(promtInterval);
    promt.style.opacity = 0;
}


// call to pause game
function stopGame() {
    play = false;
    clearInterval(ballColorInterval);
    clearInterval(ballSpeedInterval);
    promtInterval = setInterval(changePromt, 2000);
}

// changeing promt opacity
function changePromt() {
    if (promt.style.opacity == 0) {
        promt.style.opacity = 0.6;
    } else promt.style.opacity = 0;
}

// ball color
let isRed = true;
function changeBallColor() {
    if (isRed) ball.style.backgroundColor = "rgb(122, 0, 0)";
    else ball.style.backgroundColor = "red";
    isRed = !isRed;
}


// speed for ball movement
let horizontal = 1;
let vertical = 1;
function changeBall() {
    ball.style.left = (horizontal + ball.getBoundingClientRect().left) + 'px';
    ball.style.top = (vertical + ball.getBoundingClientRect().top) + 'px';
    checkHorizontal();
    checkVertical();
}

// checking ball horizontal does not goes out of screen
function checkHorizontal() {
    if (ball.getBoundingClientRect().right >= screen.width && horizontal > 0) {
        horizontal = -horizontal;
    }

    if (ball.getBoundingClientRect().left <= 0 && horizontal < 0) {
        horizontal = -horizontal;
    }
}

// checking ball vertically does not goes out of screen and change directoin
function checkVertical() {
    // player 2
    if (ball.getBoundingClientRect().bottom >= slates[1].getBoundingClientRect().top && vertical > 0) {
        if (colide(slates[1], ball)) {
            vertical = -vertical;
            player2ScoreIndecator();
        } else {
            won(1)
        }
    }

    // player 1
    if (ball.getBoundingClientRect().top <= slates[0].getBoundingClientRect().bottom && vertical < 0) {
        if (colide(slates[0], ball)) {
            vertical = -vertical;
            player1ScoreIndecator();
        } else {
            won(2)
        }
    }
}

/**
 * @brief move the slate
 * @param by defines the movement speed and direction
 */
function move(by) {
    for (var i = 0; i < slates.length; i++) {
        slates[i].style.left = (by + slates[i].getBoundingClientRect().left) + 'px';
    }
}

// movement speed
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

// return true if collision between 2 objects occour
function colide(object1, object2) {
    if (object1.getBoundingClientRect().right > object2.getBoundingClientRect().left
        && object1.getBoundingClientRect().left < object2.getBoundingClientRect().left)
        return true;
    if (object1.getBoundingClientRect().right > object2.getBoundingClientRect().right
        && object1.getBoundingClientRect().left < object2.getBoundingClientRect().right)
        return true;

    return false;
}

// resets the games
function reset() {
    stopGame();
    console.log(body.getBoundingClientRect());
    player2ScoreIndecator(0);
    player1ScoreIndecator(0);
    ball.style.left = (body.getBoundingClientRect().right / 2) + "px";
    ball.style.top = ((slates[1].getBoundingClientRect().top - slates[0].getBoundingClientRect().top) / 2) + "px";
    let center = (body.getBoundingClientRect().width / 2) - (slates[0].getBoundingClientRect().width / 2);
        slates[0].style.left = center + 'px';
    slates[1].style.left = center + 'px';
}

// player 1 score indecator
function player1ScoreIndecator(value) {
    if (value != undefined) {
        player1Score = value;
    } else {
        player1Score++;
    }
    scores[0].innerHTML = player1Score;
}

// player 2 score indecator
function player2ScoreIndecator(value) {
    if (value != undefined) {
        player2Score = value;
    } else {
        player2Score++;
    }
    scores[1].innerHTML = player2Score;
}

/**
 * @info call when even a player won
 * @param player that won
 */
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