function add(a, b) {
    console.log(a + b);
}

var args = process.argv;
add(parseInt(args[2]),parseInt(args[3]));