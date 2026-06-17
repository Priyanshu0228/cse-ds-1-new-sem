function add(a, b) {
    return a + b;
}

function checkEven(num) {
    return num % 2 === 0;
}
console.log(checkEven(8));

// function countdown() {
//     function helper(count) {
//         count--;
//         console.log(count);
//     }
//     helper(8);

// }
// countdown();

function countdown(start){
    function timer(){
        if(start>0){
            start--;
            console.log(start);     
            timer();
        }
        else{
            console.log("Countdown completed");
            
        }
    }
    timer(); //start of timer()
}
countdown(8);