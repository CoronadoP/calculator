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

        
        //prevent user from entering more than one decimal point or as first input
        if(button.value == "." && displayValue == ""){
            display.textContent = 0; 
        } else if (button.value == "." && displayValue.includes(".")){
            display.textContent = checkForLeadingZero(displayValue);
        }else {
            displayValue += button.value;
            display.textContent = checkForLeadingZero(displayValue);
        }   
               
          
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
        
        if(button.value == "/" && secondValue === 0){
            displayValue = "";
            display.textContent = "lmao";
        } else if (secondValue != "0"){
            result = operate(operationSelected, firstValue, secondValue);

            console.log(`Performing Calc: ${firstValue} ${operationSelected} ${secondValue} = ${result}`);

            firstValue = result;
            secondValue = "0";

            display.textContent = result.toString();
        }

        displayValue = "";
        operationSelected = button.value;
        console.log(`Op: ${operationSelected}`);
        
    });
});



//Calculate the solution

enter.addEventListener('click', function(){

    //Check for division by 0
    if(operationSelected == "/" && secondValue === 0) {
        displayValue = "";
        display.textContent = "lmao";

    } else if (operationSelected !== "") {
        result = operate(operationSelected, firstValue, secondValue);
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
    firstValue = "0";
    secondValue = "0";
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

    let answer = 0;

    if(oper === "+"){
        answer = add(a, b);
    } else if(oper === "-"){
        answer = subtract(a, b);
    } else if(oper === "*"){
        answer = multiply(a, b);
    } else if(oper === "/"){
        answer = divide (a, b);
    }

    console.log(answer);
    return truncateAnswer(oper, answer)
}

function truncateAnswer(oper, answer){
    /*
    return Math.round((answer + Number.EPSILON) * 100) / 100;
    */
    
    let answerString = String(answer);
    let answerLength = String(answer).length;

    //display original answer (no truncation) if less than 14 chars long
     if(answerLength <= 14){    
         return answer;

    //perform truncation of answer if answer is greater than 14 chars long
     } else if (answerLength > 14){
         if(answerString.includes(".")){
             let beforeDec = answerString.substring(0, answerString.indexOf("."));
             let beforeDecLength = beforeDec.length;
             let spaceLeft = 14 - beforeDecLength;
             let afterDec = answerString.substring(beforeDecLength, beforeDecLength + spaceLeft);
             let truncatedAnswer = beforeDec + afterDec;

             return Number(truncatedAnswer);
         }
     }

     
    

    
}

//If there is a leading zero in value to be displayed, get rid of it
function checkForLeadingZero(val){
    if(val.indexOf("0") == 0){
        displayValue = "";
        return "0";
    }
    return val;
    
}

