let displayValue = "";
let operationSelected = "";
let firstValue = 0;
let secondValue = 0;
let result = 0;

let display = document.querySelector('#display');

let enter = document.querySelector('#enter');
let clear = document.querySelector('#clear');

let valueBtns = document.querySelectorAll('div.values button');
let valueBtnsArr = Array.from(valueBtns);
valueBtnsArr = valueBtnsArr.splice(0, 10); //only get buttons 0-9

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

//Take note of the operations the user wants to perform
//Prevent the user from selecting an operation if first value has not been entered
/*
operBtnsArr.forEach((button) => {
    button.addEventListener('click', () => {
        if(firstValue === 0){
            alert("First enter a value, then an operation");
            firstValue = 0;
        } else {
           displayValue = "";
            operationSelected = button.value;
            console.log(`Operation Selected: ${operationSelected}`); 
        } 
    })
});
*/


//Calculate the solution
/*
enter.addEventListener('click', function(){

    if(operationSelected !== ""){
        result = truncateAnswer(operate(operationSelected, firstValue, secondValue));
        console.log(`Performing operation: ${firstValue} ${operationSelected} ${secondValue} = ${result}`);

        displayValue = "";
        display.textContent = result.toString();

        firstValue = result;
        secondValue = 0;

        operationSelected = "";
    }  
});

*/


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

