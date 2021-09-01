let displayVal = "0";
//Finds the output screen
const display = document.querySelector(".output");
//finds all numbers
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", appendNumber);
});

//finds all operators
const operators = document.querySelectorAll(".operation");
operators.forEach(operator =>{
    operator.addEventListener("click", setOperation);
});

//finds the equals button
const equals = document.querySelector(".equals");
equals.addEventListener("click", eval);

//finds the clear button
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearEntry);

//finds the delete button
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", deleteEntry);

//finds the decimal button
const decimalButton = document.querySelector(".dot");
decimalButton.addEventListener("click", addDecimal);

let tempNumber = "0";
let firstNumber = 0;
let secondNumber = 0;
let currentOperation = "";

const firstNumberDisplay = document.querySelector("#firstNumber");
const secondNumberDisplay = document.querySelector("#secondNumber");

// Good for bug fixes
// setInterval(function(){
//     firstNumberDisplay.innerText = `first number: ${firstNumber}`;
//     secondNumberDisplay.innerText = `second number: ${secondNumber}`;

// }, 100);

//performs calculation
function operate(a, b, operation){
    switch(true){
        case operation == "plus":
            return(a+b);
        case operation == "minus":
            return(a-b);
        case operation == "multiply":
            return(a*b);
        case operation == "divide":
            return(a/b);
    }
}

//updates the screen with passed through number
function updateDisplay(number){
    number = String(number);
    if((number.length >= 12 && number.includes(".")) || number.length == null){
        if(number.split(".")[0].length >= 10){
            display.innerText = "Too big :(";
            firstNumber = 0;
            secondNumber = 0;
            tempNumber = 0;
            currentOperation = "";
        }else{
            display.innerText = number.substring(0,10);
        }
    }else if(number.length >= 12){
        display.innerText = "Too big :(";
        firstNumber = 0;
        secondNumber = 0;
        tempNumber = 0;
        currentOperation = "";
    }else{
        display.innerText = number; 
    }
    
}

//appends pressed number to temp number
function appendNumber(e){
    if(tempNumber == "0"){
        tempNumber = e.target.dataset.number;
    }else{
        if(tempNumber.length != 11){
            tempNumber += e.target.dataset.number;
        }
        
    }
    updateDisplay(tempNumber);
}

//updates the current function
function setOperation(e){
    if(currentOperation == ""){
        if(firstNumber == 0){
            currentOperation = e.target.dataset.operation;
            firstNumber = parseFloat(tempNumber);
            tempNumber = "";
        }else{
            currentOperation = e.target.dataset.operation;
            tempNumber = "";
        }

    }else{
        if(tempNumber != ""){
            firstNumber = operate(firstNumber, parseFloat(tempNumber), currentOperation);
            currentOperation = e.target.dataset.operation;
            updateDisplay(firstNumber);
            tempNumber = "";
        }
    }
}

//evaluates the function when the equals sign is pressed
function eval(){
    if(parseFloat(tempNumber) == 0 && currentOperation == "divide"){
        updateDisplay("no thanks");
        firstNumber = 0;
        secondNumber = 0;
        tempNumber = 0;
        currentOperation = "";
    }else{
        if(firstNumber != 0){
            secondNumber = parseFloat(tempNumber);
            let result = operate(firstNumber, secondNumber, currentOperation);
            firstNumber = parseFloat(result);
            secondNumber = 0;
            tempNumber = "";
            currentOperation = "";
            updateDisplay(result);
        }
    }
}

//Erases everything stored
function clearEntry(){
    firstNumber = 0;
    secondNumber = 0;
    currentOperation = "";
    tempNumber = "0";
    updateDisplay(tempNumber);
}

//Acts as a backspace when typing a number out
function deleteEntry(){
    tempNumber = tempNumber.substring(0,tempNumber.length-1);
    updateDisplay(tempNumber);
}

//Adds decimal place to number
function addDecimal(){
    if(tempNumber.length != 11){
        tempNumber += ".";
    }
    updateDisplay(tempNumber);
}

//Establishes display on load
window.onload = () =>{
    updateDisplay(tempNumber);
}

