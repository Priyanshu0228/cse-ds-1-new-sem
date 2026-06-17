/***Global Scope**:
    - Declare a variable with `var`, `let`, and `const` outside of any function.
    - Try accessing them outside and inside functions and log the results.*/
var age = 6;
let name = "Rohini";
const message = `Hi! there`;

console.log(age);
console.log(name);
console.log(message);

function print(age, name, message) {
    console.log("Inside the function");
    console.log(age);
    console.log(name);
    console.log(message);
}

print(age,name,message);