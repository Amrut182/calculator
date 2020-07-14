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

function mapDigit(number) { //mapping each digit to a button
    document.getElementById(`${number}`).onclick = function() {
        if(evaluated) {
           clear(); 
           evaluated = false; 
        }

        output.push(number);
        digitsArray.push(number);

        document.getElementById("output").innerText = output.join('');
    }   
}

function mapAllDigits() { //mapping digits 0-9 to buttons
    for(let i = 0; i <= 9; i++) {
        mapDigit(i);
    }
}

function makeNum(array) { //array of digits to number (converting digits up till operator to number)
        let pow = 0;
        let num = 0;
        let i = array.length;

        while(i--) {
            num += (array[i])*(Math.pow(10, pow));
            pow++;
        }

        return num;
}

function convertToNum() {
    let num = makeNum(digitsArray); console.log("number", num); 
    numberArray.push(num); console.log("numberArray", numberArray); 
}

function mapOperator(operator) {
    document.getElementById(`${operator}`).onclick = function() {
        output.push(operator);

        operatorsArray.push(operator); console.log("opArray", operatorsArray);
        convertToNum();
        digitsArray = []; //clearing digits array 

        document.getElementById("output").innerText = output.join('');
    }  
} 

function mapAllOperators() {
    mapOperator('+');
    mapOperator('-');
    mapOperator('*');
    mapOperator('/');
}

function clear() {
    output = [];
    digitsArray = [];
    operatorsArray = [];
    numberArray = [];

    document.getElementById("output").innerText = "__";
}

document.getElementById("clear").onclick = function() {
    clear();
}

function divideZero() {
    let zeroIndex = -1;
    let divisionIndex = -1;

    let i = 0;
    while(i < numberArray.length) {
        if(numberArray[i] == '0') {
            zeroIndex = i;
        }
        i++;
    }
    console.log("zeroIndex", zeroIndex);

    i = 0;
    while(i < operatorsArray.length) {
        if(operatorsArray[i] == '/') {
            divisionIndex = i;
        }
        i++;
    }
    console.log("divisionIndex", divisionIndex);

    if((zeroIndex - 1) == divisionIndex) {
        clear();
        alert("Division by zero! Please try again");
        return true;
    }

    return false;
}

function precedenceRanker(opArray, arr) {//creating another array to keep ranks of operators
    let i = 0; 
    while(i < opArray.length) { //precedence ranking
        if(opArray[i] =='/') { 
            arr[i] = 4; //highest priority
        }
        if(opArray[i] =='*') {
            arr[i] = 3;
        }
        if(opArray[i] =='+') {
            arr[i] = 2;
        }
        if(opArray[i] =='-') {
            arr[i] = 1; //lowest priority
        }
        i++;
    }
    console.log("opArray", opArray); console.log("precendence ranks", arr);
}

function evaluation(opArray, numArray) { //calculator main logic
    let arr = []; //array to keep ranks on precedence 
    let result;
    let maxIndex; //index of operator with highest priority
    
    precedenceRanker(opArray, arr);
    
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
        arr.splice(maxIndex, 1); console.log("rank array", arr); console.log("max rank", max);

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

        let newArr = numArray.splice(maxIndex, 2, result); console.log("removed from num array", newArr); console.log("numArray",numArray);
        let removed = opArray.splice(maxIndex, 1); console.log("removed from opArray", removed); console.log("opArray", opArray);
    }

    console.log("length of opArray", opArray.length);
    
    return result;
}

function result() {
    document.getElementById("=").onclick = function() {
        convertToNum();

        if(!divideZero()) {
            let finalResult = evaluation(operatorsArray, numberArray);

            if(!Number.isInteger(finalResult)) {
                finalResult = finalResult.toFixed(2);
            }

            document.getElementById("output").innerText = finalResult;  
            evaluated = true; //since expression has been evaluated
        }
    }
}



//MAIN BODY
let output = []; //only needed for display
let digitsArray = [];
let operatorsArray = [];
let numberArray = [];
let finalResult;
let evaluated = false; //if expression has been evaluated or not

mapAllDigits();
mapAllOperators();

result();
