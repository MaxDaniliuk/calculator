const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const displayValue = document.querySelector('.current-operand');
const displayOperation = document.querySelector('.current-operation');
const clearAllButton = document.querySelector('#clear-all');
const equalsButton = document.querySelector('#equals');

let firstOperand = ''
let secondOperand = '';
let currentOperation = null;     // ÷
let screenReset = false;

equalsButton.addEventListener('click', () => {
    if (displayValue.textContent !== 'Error') {
        evaluate(equalsButton.textContent);
    }
});


numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (displayValue.textContent !== 'Error') {
            populateDisplay(numberButton.textContent);
        }
    });
});

function populateDisplay(number) {
    if (displayValue.textContent === '0' || screenReset) {
        resetDisplay();
    }
    displayValue.textContent += number;
}

function resetDisplay() {
    displayValue.textContent = '';
    screenReset = false;
}

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => { 
        if (displayValue.textContent !== 'Error') {
            assignOperation(operationButton.textContent);
        }
    });
});


function assignOperation(operator) { 
    //Think how to store first value while changing operators or selecting second value...
    if (currentOperation !== null && !screenReset) {
        evaluate();
    }
    if (displayValue.textContent === "Error") {
        return displayOperation.textContent = 'Cannot divide by 0...';
    }
    firstOperand = displayValue.textContent;
    displayOperation.textContent = `${firstOperand} ${operator}`;
    currentOperation = operator;
    screenReset = true;
    // Should change operator if the second operand has not been selected
}

function evaluate(eqaulsSign = equalsButton.textContent) {
    if (currentOperation === null || screenReset) return;
    secondOperand = displayValue.textContent;
    displayValue.textContent = operate(currentOperation, firstOperand, secondOperand); 
    if (eqaulsSign) {
        displayOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand} ${eqaulsSign}`;
    }
    currentOperation = null;
}
// Conisder always taking display values for operations!

clearAllButton.addEventListener('click', () => {
    firstOperand, secondOperand, displayOperation.textContent = '';
    currentOperation = null;
    screenReset = false;
    displayValue.textContent = '0';
});

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '−':
            return a - b;
        case '×': 
            return a * b;
        case '÷': 
            return (b == 0) ? 'Error' : a / b;             // ÷
    }
}




// ÷ 











/*
window.addEventListener('keypress', (e) => {
    
    
    console.log("Key pressed ", e.key);
    e.preventDefault();
});
*/