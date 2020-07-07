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

function operate(op1, op2, operator) {
    if(operator == '+') add(op1, op2);
    if(operator == '-') subtract(op1, op2);
    if(operator == 'x') multiply(op1, op2);
    if(operator == '/') divide(op1, op2);
};

let output = [];

function num(number) {
    document.getElementById(`${number}`).onclick = function() {
        output.push(number);
        document.getElementById("output").innerText = output.join('');
    }   
}

function digits() {
    for(let i = 0; i <= 9; i++) {
        num(i);
    }
}

digits();

num('+');
num('-');
num('*');
num('/');