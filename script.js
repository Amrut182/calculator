//function definitions
function add(op1, op2) {
    return op1 + op2;
};

function subtract(op1, op2) {
    return op1 - op2;
};

function multiply(op1, op2) {
    return op1 * op2;
};

function divide(op1, op2) {
    return op1 / op2;
};

function Operate(op1, op2, operator) {
    if(operator == '+') add(op1, op2);
    if(operator == '-') subtract(op1, op2);
    if(operator == '*') multiply(op1, op2);
    if(operator == '/') divide(op1, op2);
};

function num(number) {
    document.getElementById(`${number}`).onclick = function() {
        output.push(number);
        digitsArray.push(number);
        document.getElementById("output").innerText = output.join('');
    }   
}

function digits() {
    for(let i = 0; i <= 9; i++) {
        num(i);
    }
}

function makeNum(array) { //array of digits to number
        let pow = 0;
        let temp = 0;
        let i = array.length;
        while(i--) {
            temp += (array[i])*(Math.pow(10, pow));
            pow++;
        }
        return temp;
}

function operate(operator) {
    document.getElementById(`${operator}`).onclick = function() {
        output.push(operator);

        operatorsArray.push(operator); console.log(operatorsArray);
        let num = makeNum(digitsArray); console.log(num); 
        numberArray.push(num); console.log(numberArray);
        digitsArray = [];

        document.getElementById("output").innerText = output.join('');
    }  
} 

function result() {
    document.getElementById("=").onclick = function() {
        let num = makeNum(digitsArray); console.log(num); 
        numberArray.push(num); console.log(numberArray);
        for(let i = 0; i < operatorsArray.length; i++) {
            if(operatorsArray[i] == '+') {
                finalResult = add(numberArray[i], numberArray[i+1]);
                console.log(finalResult);
            }
            if(operatorsArray[i] == '-') {
                finalResult = subtract(numberArray[i], numberArray[i+1]);
                console.log(finalResult);
            }
            if(operatorsArray[i] == '*') {
                finalResult = multiply(numberArray[i], numberArray[i+1]);
                console.log(finalResult);
            }
            if(operatorsArray[i] == '/') {
                finalResult = multiply(numberArray[i], numberArray[i+1]);
                console.log(finalResult);
            }
        }
        document.getElementById("output").innerText = finalResult;
    }
}

//MAIN BODY
let output = []; //only needed for display
let finalOutput = [];
let digitsArray = [];
let operatorsArray = [];
let numberArray = [];
let finalResult;

digits();

let position = 0 //position to keep track of output array

operate('+');
operate('-');
operate('*');
operate('/');

result();
