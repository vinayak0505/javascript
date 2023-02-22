const john = {
    name:  "John",
    greet: function(){
        console.log(  "Hello! My name is " + this.name) ;
    }
}

const CN = {
  name: "Coding Ninjas",
  printName: function(){
        console.log(this) ;
    }
};

CN.printName.bind(john)();
john.greet.bind(CN)();