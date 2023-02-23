let slates = document.getElementsByClassName("slate");

function move(by) {
    for (var i = 0;i < slates.length; i++) {
        slates[i].style.left = (by + slates[i].getBoundingClientRect().left) + 'px';
    }
}

const SPEED = 10;
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