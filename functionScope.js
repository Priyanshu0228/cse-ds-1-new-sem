/**Function Scope**:
    - Declare a variable with `var` inside a function and then try to access it outside the function. Repeat the same with `let` and `const` and log the observations.*/
console.log("Before the function");
// console.log(age, " before"); // gives error
// console.log(name, " before"); // gives error
// console.log(message, " before"); // gives error
function print() {
    var age = 6;
    let name = "Rohini";
    const message = `Hi! there`;
    console.log("Inside the function");
    console.log(age, " inside");
    console.log(name, " inside");
    console.log(message, " inside");
}
print();

// console.log("outside the function");
// console.log(age, " outside"); // gives error
// console.log(name, " outside"); // gives error
// console.log(message, " outside"); /// gives error