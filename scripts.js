let displayValue = "";
let operationSelected = "";
let firstValue = "0";
let secondValue = "0";
let result = 0;

let display = document.querySelector('#display');

let enter = document.querySelector('#enter');
let clear = document.querySelector('#clear');

let valueBtns = document.querySelectorAll('div.values button');
let valueBtnsArr = Array.from(valueBtns);
valueBtnsArr = valueBtnsArr.splice(0, 11); //only get buttons 0-9 and decimal point

let negBtn = document.querySelector('#neg');

let operBtns = document.querySelectorAll('div#operations-body button');
let operBtnsArr = Array.from(operBtns);




//console.log(valueBtnsArr);

//Display number when a value button is placed
valueBtnsArr.forEach((button) => {
    button.addEventListener('click', () => {
        displayValue += button.value;
        display.textContent = checkForLeadingZero(displayValue);        
          
    });
});

//Turn value negative if not negative already, if it is negative then turn it back into a positive number
negBtn.addEventListener('click', () => {
    if(displayValue.includes("-")){
        displayValue = String(0 - Number(displayValue));
    } else {
        displayValue = "-" + displayValue;
    }
    display.textContent = displayValue;
});

valueBtnsArr.forEach((button) => {
    button.addEventListener('click', () => {
        if(operationSelected == ""){
            firstValue = Number(displayValue);

            console.log(`first value: ${firstValue}`);
        } else {
            secondValue = Number(displayValue);

            console.log(`second value: ${secondValue}`);
        }
    });
});

//Take note of the operations the user wants to perform
//If a first and second value have been entered, and then an operation is selected, then calculator result and set it to first value. Second value becomes "0"

operBtnsArr.forEach((button) => {
    button.addEventListener('click', () => {

        if(secondValue != "0"){
            result = truncateAnswer(operate(operationSelected, firstValue, secondValue));

            console.log(`Performing Calc: ${firstValue} ${operationSelected} ${secondValue} = ${result}`);

            firstValue = result;
            secondValue = "0";

            display.textContent = result.toString();

            
        }

        displayValue = "";
        operationSelected = button.value;
        console.log(`Op: ${operationSelected}`);
        
    })
});



//Calculate the solution

enter.addEventListener('click', function(){

    //Check for division by 0
    /*
    if(secondValue == 0){
        alert
    }
*/
    if(operationSelected !== ""){
        result = truncateAnswer(operate(operationSelected, firstValue, secondValue));
        console.log(`Performing Calc: ${firstValue} ${operationSelected} ${secondValue} = ${result}`);

        displayValue = "";
        display.textContent = result.toString();

        firstValue = result;
        secondValue = "0";

        operationSelected = "";
    }  
});




//Clear the numbers from the display
clear.addEventListener('click', function(){
    displayValue = "";
    display.textContent = "0";
    operationSelected = "";
    result = 0;
    firstValue = 0;
    secondValue = 0;
});

//Operations
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(oper, a, b){
    if(oper === "+"){
        return add(a, b);
    } else if(oper === "-"){
        return subtract(a, b);
    } else if(oper === "*"){
        return multiply(a, b);
    } else if(oper === "/"){
        return divide (a, b);
    }
}

function truncateAnswer(answer){
    return Math.round((answer + Number.EPSILON) * 100) / 100;
}

//If there is a leading zero in value to be displayed, get rid of it
function checkForLeadingZero(val){
    if(val.indexOf("0") == 0){
        displayValue = "";
        return "0";
    }
    return val;
    
}

