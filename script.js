let displayVal = "0";
//Finds the output screen
const display = document.querySelector(".output");
//finds all numbers
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("mousedown", appendNumber);
});

//finds all operators
const operators = document.querySelectorAll(".operation");
operators.forEach(operator =>{
    operator.addEventListener("mousedown", setOperation);
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

let tempNumber = "0";
let firstNumber = 0;
let secondNumber = 0;
let currentOperation = "";

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
    display.innerText = number; 
}

//appends pressed number to temp number
function appendNumber(e){
    if(tempNumber == "0"){
        tempNumber = e.target.dataset.number;
    }else{
        tempNumber += e.target.dataset.number;
    }
    updateDisplay(tempNumber);
}

//updates the current function
function setOperation(e){
    if(currentOperation == ""){
        currentOperation = e.target.dataset.operation;
        firstNumber = parseFloat(tempNumber);
        tempNumber = "";
    }else{
        firstNumber = operate(firstNumber, parseFloat(tempNumber), currentOperation);
        currentOperation = e.target.dataset.operation;
        updateDisplay(firstNumber);
        tempNumber = "";
    }

}

//evaluates the function when the equals sign is pressed
function eval(){
    if(firstNumber != 0){
        secondNumber = parseFloat(tempNumber);
        let result = operate(firstNumber, secondNumber, currentOperation);
        updateDisplay(result);
        return(result);
    }
    return;
}

function clearEntry(){
    firstNumber = 0;
    secondNumber = 0;
    currentOperation = "";
    tempNumber = "0";
    updateDisplay(tempNumber);
}

function deleteEntry(e){
    tempNumber = tempNumber.substring(0,tempNumber.length-1);
    updateDisplay(tempNumber);
}

//Establishes display on load
window.onload = () =>{
    updateDisplay(tempNumber);
}