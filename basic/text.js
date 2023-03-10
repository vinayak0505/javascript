const delay = (time) => {
    console.log(time);
}

function counter() {
    let time = 1;
    let timeout;
    return {
        start: function () {
            timeout = setInterval(function () {
                delay(time++);
            }, 1000);
        },
        stop: function () {
            clearInterval(timeout);
        }
    };
}

let count = counter()

count.start()
setTimeout(() => {
    count.stop()
}, 6000)