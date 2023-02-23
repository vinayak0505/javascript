let slates = document.getElementsByClassName("slate");
let ball = document.getElementById("ball");


let isRed = true;
setInterval(changeBallColor, 1000);
function changeBallColor() {
    if(isRed) ball.style.backgroundColor = "rgb(122, 0, 0)";
    else ball.style.backgroundColor = "red";
    isRed = !isRed;
}

let horizontal = 1;
let vertical = 0;
setInterval(changeBall, 1);
function changeBall() {
    ball.style.left = (horizontal + ball.getBoundingClientRect().left) + 'px';
    ball.style.top = (vertical + ball.getBoundingClientRect().top) + 'px';
    checkBallRight();
    if(vertical > 0){
        ball.getBoundingClientRect().left
    }
}

function checkBallRight() {
    console.log(ball.getBoundingClientRect().right);
    console.log(screen.width);
    if(ball.getBoundingClientRect().right >= screen.width && horizontal > 0){
        horizontal = -horizontal;
    }
    
    if(ball.getBoundingClientRect().left <= 0 && horizontal < 0){
        horizontal = -horizontal;
    }
}

function move(by) {
    for (var i = 0;i < slates.length; i++) {
        slates[i].style.left = (by + slates[i].getBoundingClientRect().left) + 'px';
    }
}

const SPEED = 50;
document.addEventListener('keydown',
    function (event) {
        switch (event.key) {
            case "ArrowLeft":
                move(-SPEED);
                break;
            case "ArrowRight":
                move(SPEED);
                break;
        }
    });