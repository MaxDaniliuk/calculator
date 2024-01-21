const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const displayValue = document.querySelector('.current-operand');
const displayOperation = document.querySelector('.current-operation');
const clearAllButton = document.querySelector('#clear-all');
const equalsButton = document.querySelector('#equals');
const specialButtons = document.querySelectorAll('.special');
let firstOperand = ''
let secondOperand = '';
let currentOperation = null;
let screenReset = false;
let numberSelected = false;

equalsButton.addEventListener('click', () => {
    if (displayValue.textContent !== 'Error') {
        evaluate(equalsButton.textContent);
    }
});

specialButtons.forEach(specialButton => {
    specialButton.addEventListener('click', () => {
        if (displayValue.textContent !== 'Error') {
            if (specialButton.textContent === '+/−') changeSign();
            if (specialButton.textContent === '.') enableDecimals();
            if (specialButton.textContent === 'CE') deleteNumber();
            if (specialButton.textContent === '%') activatePercentage();
        }
    });
})

function changeSign() {
    if (displayValue.textContent.includes('%') || displayValue.textContent === '0' || displayValue.textContent === '') return;
    if (numberSelected) {
        displayValue.textContent *= (-1); 
    }
}

function enableDecimals() {
    if (screenReset) resetScreen();
    if (displayValue.textContent === '') {
        displayValue.textContent = '0';
    }
    if (displayValue.textContent.includes('.') || displayValue.textContent.includes('%')) return;
    displayValue.textContent += '.';
}

function deleteNumber() {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
    if (displayValue.textContent === '') {
        displayValue.textContent = '0';
    }
}

function activatePercentage() {
    if (displayValue.textContent.includes('%') || displayValue.textContent === '') return;
    displayValue.textContent += '%';
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (displayValue.textContent !== 'Error') {
            populateDisplay(numberButton.textContent);
        }
    });
});

function populateDisplay(number) {
    if (displayValue.textContent === '0' || screenReset) {
        resetScreen();
    }
    displayValue.textContent += number;
    numberSelected = true;
}

function resetScreen() {
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
    if (currentOperation !== null && !screenReset) {
        evaluate();
    }
    if (displayValue.textContent === "Error") {
        return displayOperation.textContent = 'Cannot divide by 0...';
    }
    firstOperand = displayValue.textContent;
    displayOperation.textContent = `${displayValue.textContent} ${operator}`;
    currentOperation = operator;
    screenReset = true;
    numberSelected = false;
}

function evaluate(eqaulsSign = equalsButton.textContent) {
    if ((currentOperation === null || screenReset) && displayValue.textContent.includes('%') && eqaulsSign) {
        displayOperation.textContent = `${displayValue.textContent} ${'='}`;
        return displayValue.textContent = displayValue.textContent.slice(0, -1) / 100
    }
    if (currentOperation === null || screenReset) {
        console.log('Enter here')
        return;
    }
    secondOperand = displayValue.textContent;
    displayValue.textContent = operate(currentOperation, firstOperand, secondOperand); 
    if (eqaulsSign) {
        displayOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand} ${'='}`;
    }
    currentOperation = null;
    screenReset = true;
}

clearAllButton.addEventListener('click', () => clearAll());

function clearAll () {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    screenReset = false;
    displayValue.textContent = '0';
    displayOperation.textContent = '';
}

function operate(operator, a, b) {
    if (isNaN(a)) {
        a = Number(a.slice(0, -1)) / 100;
    } 
    if (isNaN(b)) {
        return evaluatePercentage(operator, a, b);
    }
    switch (operator) {
        case '+':
            return +a + +b;
        case '−':
            return +a - +b;
        case '×': 
            return +a * +b;
        case '÷': 
            return (+b == 0) ? 'Error' : +a / +b;
    }
}

function handleDecimals () {
    //There is a lib called Big.js that handles proper rounding
    //Link and explanation how to use can be found here
    // https://www.youtube.com/watch?v=wETgMr6QMIE
    // 
    // Get back to this later
    //
}

function evaluatePercentage(operator, a, b) {
    b = Number(b.slice(0, -1));
    a = Number(a);
    switch (operator) {
        case '+':
            return a + (a * b / 100);
        case '−':
            return a - (a * b / 100);
        case '×': 
            return a * b / 100;
        case '÷':
            return b == 0 ? "Error" : (a * 100 / b);
    }
}

window.addEventListener('keydown', (e) => {
    if (displayValue.textContent !== 'Error') {
        if (e.key >= 0 && e.key <= 9) populateDisplay(e.key);
        if (e.key === 'Enter' || e.key === '=') evaluate(e.key);
        if (e.key === 'Backspace') deleteNumber();
        if (e.key === '%') activatePercentage();
        if (e.key === '.') enableDecimals();
        if (e.key === '±') changeSign();
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            assignOperation(convertOperator(e.key));
        }
    }
    if (e.key === 'Escape') clearAll();
    e.preventDefault();
});

function convertOperator(key) {
    if (key === '+') return '+';
    if (key === '-') return '−';
    if (key === '*') return '×';
    if (key === '/') return '÷';
}