const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
let firstOperand = ''
let secondOperand = '';
let currentOperation = null;       // ÷

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x': 
            return multiply(a, b);
        case '÷': 
            return divide(a, b);              // ÷
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'Error';
    return a / b;
}


// ÷ 











/*
window.addEventListener('keypress', (e) => {
    
    
    console.log("Key pressed ", e.key);
    e.preventDefault();
});
*/