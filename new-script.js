const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const displayValue = document.querySelector('.current-operand');
const displayOperation = document.querySelector('.current-operation');
const clearAllButton = document.querySelector('#clear-all');
const equalsButton = document.querySelector('#equals');
const specialButtons = document.querySelectorAll('.special');
let firstOperand = ''
let secondOperand = '';
let currentOperation = null;     // ÷
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
        }
    });
})

function changeSign() {
    if (displayValue.textContent.includes('%') || displayValue.textContent === '0' || displayValue.textContent === '') {
        return;
    }
    if (numberSelected) {
        displayValue.textContent *= (-1);
        
    }
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
        resetDisplay();
    }
    displayValue.textContent += number;
    numberSelected = true;

}

function resetDisplay() {
    displayValue.textContent = '';
    screenReset = false;
}

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => { 
        if (displayValue.textContent !== 'Error') {
            assignOperation(operationButton.textContent);
            numberSelected = false;
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
    //numberSelected = false;
}

function evaluate(eqaulsSign = equalsButton.textContent) {
    if (currentOperation === null || screenReset) return;
    secondOperand = displayValue.textContent;
    displayValue.textContent = operate(currentOperation, firstOperand, secondOperand); 
    if (eqaulsSign) {
        displayOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand} ${eqaulsSign}`;
    }
    currentOperation = null;
    //numberSelected = false;
}
// Conisder always taking display values for operations!

clearAllButton.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    screenReset = false;
    displayValue.textContent = '0';
    displayOperation.textContent = '';
    console.log("After clear ", firstOperand, secondOperand)
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