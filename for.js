//for(::)
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
let colors = ['red', 'black', 'yellow', 'green'];

for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

//for in loop
for(let color in colors){
    console.log(color);   
}
for (let color in colors) {
    console.log(colors[color]);

}

//for of loop
for(let color of colors){
    console.log(color);
    
}

//break 
for(let i=1;i<=100;i++){
    if(i%7==0){
        break;
    }
    console.log(i);
    
}
//continue
for(let i=1;i<=100;i++){
    if(i%7==0){
        continue;
    }
    console.log(i);
    
}