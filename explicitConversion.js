//Convert a number and a boolean to a string using `String()`.
const numToStr = String(1234);
console.log(`Type of ${numToStr} is ${typeof(numToStr)}`);

const boolValueToStr = String(true);
console.log(`type of ${boolValueToStr} is ${typeof(boolValueToStr)}`);
 
//Convert a string numeric value and a boolean to a number using `Number()`.

const strToNum = Number("1234");
console.log(typeof(strToNum));

const boolToNum = Number(true);
console.log(typeof(boolToNum));

const nonNumericToNum = Number("Hi");
console.log(nonNumericToNum);
console.log(typeof(nonNumericToNum));


//Convert various values (0, 1, "", "hello", `null`, and `undefined`) to boolean using `Boolean()`.
console.log(Boolean(0));
console.log(Boolean(1));
console.log(Boolean(""));
console.log(Boolean("hello"));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(5));
console.log(Boolean(-5));
// console.log(Boolean(NaN));