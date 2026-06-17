let day = 7;
let message;

switch (day) {
    case 1:
        message = `Its a Monday`;
        break;
    case 2:
        message = `Its a Tuesday`;
        break;
    case 3:
        message = `Its a Wedday`;
        break;
    case 4:
        message = `Its a Thursday`;
        break;
    case 5:
        message = `Its a Friday`;
        break;
    case 6:
        message = `Its a Saturday`;
        break;
    case 7:
        message = `Its a Sunday`;
        break;
    default:
        message = `Please enter valid day number`;
}
console.log(message);
