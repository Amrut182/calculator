//function definitions
function add(op1, op2) {
    return op1 + op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    return op1 / op2;
}

function num(number) {
    document.getElementById(`${number}`).onclick = function() {
        output.push(number);
        digitsArray.push(number);
        document.getElementById("output").innerText = output.join('');
    }   
}

function mapDigits() {
    for(let i = 0; i <= 9; i++) {
        num(i);
    }
}

function makeNum(array) { //array of digits to number
        let pow = 0;
        let num = 0;
        let i = array.length;
        while(i--) {
            num += (array[i])*(Math.pow(10, pow));
            pow++;
        }
        return num;
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

function mapOperators() {
    operate('+');
    operate('-');
    operate('*');
    operate('/');
}

function clear() {
    document.getElementById("clear").onclick = function() {
        output = [];
        digitsArray = [];
        operatorsArray = [];
        numberArray = [];
        document.getElementById("output").innerText = output.join('');
    }
}

function result() {
    document.getElementById("=").onclick = function() {
        let num = makeNum(digitsArray); console.log(num); 
        numberArray.push(num); console.log(numberArray);

        let finalResult = evaluation(operatorsArray, numberArray);
        document.getElementById("output").innerText = finalResult;
    }
}

function evaluation(opArray, numArray) { //calculator main logic
    let arr = []; //array to keep ranks on precedence 
    let result;
    let maxIndex;
    
    let i = 0;
    while(i < opArray.length) { //precedence ranking
        if(opArray[i] =='/') {
            arr[i] = 4;
        }
        if(opArray[i] =='*') {
            arr[i] = 3;
        }
        if(opArray[i] =='+') {
            arr[i] = 2;
        }
        if(opArray[i] =='-') {
            arr[i] = 1;
        }
        i++;
    }
    console.log(opArray); console.log(arr);

    while(opArray.length > 0) {
        let max = 0;
        let j = 0;
        while(j < arr.length) {
            if(arr[j] > max) {
                max = arr[j];
                maxIndex = j;
            }
            j++;
        }
        arr.splice(maxIndex, 1); console.log(arr); console.log(max);

        if(max == 4) {
            result = divide(numArray[maxIndex], numArray[maxIndex+1]);
        }
        if(max == 3) {
            result = multiply(numArray[maxIndex], numArray[maxIndex+1]);
        }
        if(max == 2) {
            result = add(numArray[maxIndex], numArray[maxIndex+1]);
        }
        if(max == 1) {
            result = subtract(numArray[maxIndex], numArray[maxIndex+1]);
        }

        let newArr = numArray.splice(maxIndex, 2, result); console.log(newArr); console.log(numArray);
        let removed = opArray.splice(maxIndex, 1); console.log(removed); console.log(opArray);
    }

    console.log(opArray.length);
    
    return result;
}

//MAIN BODY
let output = []; //only needed for display
let digitsArray = [];
let operatorsArray = [];
let numberArray = [];
let finalResult;

mapDigits();
mapOperators();
clear();

result();
