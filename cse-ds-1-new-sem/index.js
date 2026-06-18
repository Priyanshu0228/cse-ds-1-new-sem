// 1. **String Variables**:
//     - Create a string variable named `greeting` that contains the phrase "Hello, World!".
//     - Log this string to the console.
let greeting = "Hello, World!";
console.log(greeting);

// ### Part 2: Basic String Operations

// 1. **Concatenation**:
//     - Create two string variables, `firstName` and `lastName`.
//     - Concatenate them into a third variable `fullName` and log it to the console.
// 2. **Length Property**:
//     - Log the length of the `fullName` string to the console.
let firstName = "Rohini";
let lastName = "Mittal";
let fullName = firstName.concat(" ",lastName);
console.log(fullName);
console.log(fullName.length);

// ### Part 3: String Methods

// 1. **Finding a Substring**:
//     - Find the index of the first occurrence of the letter "a" in the `fullName` and log it to the console.
// 2. **Slicing a String**:
//     - Extract the first name from the `fullName` string using the `slice()` method and log it to the console.
// 3. **Replacing String Content**:
//     - Replace "Hello" in the `greeting` string with "Goodbye" and log the new string to the console.
// 4. **Converting to Upper and Lower Case**:
//     - Log `fullName` in uppercase and then in lowercase.

console.log(fullName.indexOf("a")); 
console.log(fullName.slice(0,6));
let newGreeting = greeting.replace("Hello","Goodbye");
console.log(newGreeting);
console.log(fullName.toLowerCase());
console.log(fullName.toUpperCase());


// ### Part 4: Comparing Strings

// 1. **Equality Check**:
//     - Check if `greeting` is equal to "Hello, World!" and log the result (true or false).
// 2. **Case-Insensitive Comparison**:
//     - Compare `greeting` to "hello, world!" in a case-insensitive manner and log whether they are equal.

console.log(greeting.includes("Hello, World!"));
console.log((greeting.toLowerCase()).includes("Hello, World!".toLowerCase()));


