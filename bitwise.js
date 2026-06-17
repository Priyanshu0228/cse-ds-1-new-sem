let a = 8;
let b = 1;
console.log(`Bitwise AND of ${a} and ${b} is ${a&b} and binary is ${(a&b).toString(2)}`);
console.log(`Bitwise OR of ${a} and ${b} is ${a|b} and binary is ${(a|b).toString(2)}`);
console.log(`Bitwise NOT of ${a} is ${~a} and binary is ${(~a).toString(2)}`);
console.log(`Bitwise XOR of ${a} and ${b} is ${a^b} and binary is ${(a^b).toString(2)}`);
console.log(`Bitwise LEFT SHIFT of ${a} and ${b} is ${a<<b} and binary is ${(a<<b).toString(2)}`);
console.log(`Bitwise RIGHT SHIFT of ${a} and ${b} is ${a>>b} and binary is ${(a>>b).toString(2)}`);
console.log(`Bitwise ZERO FILL RIGHT SHIFT of ${a} and ${b} is ${a>>>b} and binary is ${(a>>>b).toString(2)}`);
