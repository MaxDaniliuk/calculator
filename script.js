function startCalculation() {
    const displayCurrentValue = document.querySelector('.current-text');
    const displayOperation = document.querySelector('.previous-text');
    const numberBtns = document.querySelectorAll('.number');
    const operationBtns = document.querySelectorAll('.operation');
    const clearAllBtn = document.querySelector('#clear-all');
    const equalsBtn = document.querySelector('#equals');
    const percentageBtn = document.querySelector('#percentage');
    const signChangeBtn = document.querySelector('#sign-change');
    const decimalsBtn = document.querySelector('#decimals');
    const clearPreviousBtn = document.querySelector('#clear-previous');
    let operatorHolder = '';
    let number = '0';
    let containerArr = [];
    let answer = [];
    let removedNum;
    let calculator = new Calculator;

    numberBtns.forEach(numberBtn => {
        numberBtn.addEventListener('click', () => {
            let fixedNumbers = number.split('');
            if (!(number[number.length - 1] === "%" || displayCurrentValue.textContent === "Error")) {
                if (number === '0') {
                    number = '';
                }
                if (fixedNumbers.includes('.')) {
                    if (number[number.length - 1] === '.' || number[number.length - 2] === '.') {
                        number += numberBtn.textContent;
                        displayCurrentValue.textContent = number;
                    }
                } else {
                    number += numberBtn.textContent;
                    displayCurrentValue.textContent = number;
                }
            }
            
        });
    });

    operationBtns.forEach(operationBtn => {
        operationBtn.addEventListener('click', () => {
            if (!(displayCurrentValue.textContent === "Error")) {
                operatorHolder = operationBtn.textContent;
                if (!(number.length === 0)) {
                    if (number[number.length - 1] === "%") {
                        number = calculator.getSimplePercentage(number);
                    }
                    containerArr.push(number);
                    number = '';
                    removedNum = false;
                   
                }
                if (number === "0") {
                    containerArr.push(number);
                    number = '';
                }

                if (number.length === 0 && removedNum) {
                    containerArr.push('0');
                    removedNum = false;
                }

                if (containerArr.length == 3) {
                    if (isNaN(containerArr[2])) {
                        containerArr = evaluateFirstPair(calculator, containerArr, operatorHolder);
                    } else {
                        containerArr = evaluateFirstPair(calculator, containerArr, operatorHolder);
                    }
                }
                if (!isNaN(+containerArr[containerArr.length - 1])) {
                    containerArr.push(operationBtn.textContent);
                } else if (containerArr[containerArr.length - 1] == '+' || containerArr[containerArr.length - 1] == '-' || containerArr[containerArr.length - 1] == 'x' || containerArr[containerArr.length - 1] == '/') {
                    containerArr[containerArr.length - 1] = operationBtn.textContent
                }
                displayOperation.textContent = containerArr.join(' ');
                displayCurrentValue.textContent = containerArr[0];
            } else {
                displayOperation.textContent = '';
            }
        });
    });
    
    clearPreviousBtn.addEventListener('click', () => {
        if (!(displayCurrentValue.textContent === "Error")) {
            let val = displayCurrentValue.textContent;
            if ((val || val[val.length - 1] === "%") && !(val === "0")) {
                if (!(displayOperation.textContent[displayOperation.textContent.length - 1] === "=")) {
                    let array = val.split('');
                    array.pop();
                    number = array.join('');
                    if (number.length === 0) {
                        removedNum = true;
                    }
                    displayCurrentValue.textContent = number;
                }
            }
        }
    });

    decimalsBtn.addEventListener('click', () => {
        if (!(isNaN(displayCurrentValue.textContent))) {
            if (!(displayCurrentValue.textContent === '')) {
                let pointCheck = displayCurrentValue.textContent.split('');
                if (!(pointCheck.includes('.'))) {
                    if (number) {
                        number += '.';
                        displayCurrentValue.textContent = number;
                    } else { 
                        displayCurrentValue.textContent = containerArr[0] + '.';
                        number = displayCurrentValue.textContent;
                        containerArr = [];
                        
                    }
                }
            }
        }
    });

    signChangeBtn.addEventListener('click', () => {
        if (!(displayCurrentValue.textContent === "Error")) {
            if (number || number[number.length - 1] === "%") {
                number = calculator.changeSign(number);
                displayCurrentValue.textContent = number;
            } else if (!number && displayOperation.textContent[displayOperation.textContent.length - 1] === "=") {
                containerArr[0] = displayCurrentValue.textContent;
                containerArr[0] = calculator.changeSign(containerArr[0]);
                displayCurrentValue.textContent = containerArr[0];
            }
        } else {
            displayOperation.textContent = '';
        }
    });

    percentageBtn.addEventListener('click', () => {
        if (!(displayCurrentValue.textContent === "Error")) {
            if (!(number.length === 0)) {    
                if (!(number[number.length - 1] === '%')) {
                    let numberSplit = number.split('');
                    count = 0;
                    for (let i = 0; i < numberSplit.length; i++) {
                        if (numberSplit[i] === "%") {
                            count += 1;
                        }
                    }
                    if (count < 1) {
                        number += percentageBtn.textContent;
                        displayCurrentValue.textContent = number;
                    }
                }
            }
            if (number.length == 0 && containerArr.length == 2) {
                number = containerArr[0];
                number += percentageBtn.textContent;
                displayCurrentValue.textContent = number;
                containerArr = [];
            }
        } else {
            displayOperation.textContent = '';
        }
    });
    
    clearAllBtn.addEventListener('click', () => {
        number = '0';
        displayCurrentValue.textContent = 0;
        displayOperation.textContent = '';
        containerArr = [];
        answer = [];
    });
    // Improve logic to avoid copy pasting 
    equalsBtn.addEventListener('click', () => {
        if (!(displayCurrentValue.textContent === "Error")) {
            if (!(displayCurrentValue.textContent === '')) {
                
                if (answer.length > 0) {
                    answer = [];
                }
                let tempNum;
                if (number[number.length - 1] === "%" &&  containerArr.length == 0  && displayOperation.textContent === '') {
                    tempNum = number;
                    number = calculator.getSimplePercentage(number);
                    containerArr.push(number);
                    let answerComponents = [tempNum, equalsBtn.textContent];
                    answer.push(...answerComponents);
                    displayOperation.textContent = answer.join(' ');
                    displayCurrentValue.textContent = number;
                    number = ''
                } else if (displayOperation.textContent.split(' ')[0] === displayCurrentValue.textContent.match(/(-?\d+)/)[0] && displayCurrentValue.textContent[displayCurrentValue.textContent.length - 1] === "%") {
                    tempNum = number; 
                    number = calculator.getSimplePercentage(number);
                    answer = answer.concat(displayOperation.textContent.split(' '));
                    answer.push(tempNum);
                    containerArr = evaluateFirstPair(calculator, answer, operatorHolder); 
                    answer.push(equalsBtn.textContent)
                    displayOperation.textContent = answer.join(' ');
                    displayCurrentValue.textContent = containerArr[0];
                    number = '';
                } else if (displayCurrentValue.textContent[displayCurrentValue.textContent.length - 1] === "%" && displayOperation.textContent[displayOperation.textContent.length - 1] === "=") {
                    tempNum = number;
                    answer.push(tempNum);
                    answer.push(equalsBtn.textContent);
                    number = calculator.getSimplePercentage(number);
                    containerArr.push(number);
                    displayOperation.textContent = answer.join(' ');
                    displayCurrentValue.textContent = containerArr[0];
                    number = '';
                } else if (!(number.length == 0) && containerArr.length == 2) {
                    containerArr.push(number);
                    number = ''
                    answer = answer.concat(containerArr);
                    answer.push(equalsBtn.textContent);
                    let copyArr = evaluateFirstPair(calculator, containerArr.slice(), operatorHolder);
                    containerArr = evaluateFirstPair(calculator, containerArr, operatorHolder);
                    displayOperation.textContent = answer.join(' ');
                    displayCurrentValue.textContent = copyArr[0];
                } else if (number.split('.')[0] == displayOperation.textContent.split(' ')[0] && containerArr.length == 0) {
                    containerArr.push(number);
                    number = ''
                    answer = answer.concat(displayOperation.textContent.split(' '));
                    answer.push(containerArr[0]);
                    containerArr = evaluateFirstPair(calculator, answer, operatorHolder);
                    answer.push(equalsBtn.textContent);
                    displayOperation.textContent = answer.join(' ');
                    displayCurrentValue.textContent = containerArr[0];
                    number = '';
                }
            }
        } else {
            displayOperation.textContent = '';
        }
    });
    
}

function Calculator() {
    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "x": (a, b) => (a * b),
        "/": (a, b) => b == 0 ? "Error" : (a / b),
    }
    this.percentageMethods = {
        "+": (a, b) => (a + (a * b / 100)),
        "-": (a, b) => (a - (a * b / 100)),
        "x": (a, b) => (a * b / 100),
        "/": (a, b) => b == 0 ? "Error" : (a * 100 / b),
    }

    this.calculatePercentage = function(array) {
        a = +array[0];
        op = array[1];
        b = parseFloat(array[2])

        if (!this.percentageMethods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
          }
        if (array.length > 2 ) {
            if (this.percentageMethods[op](a, b) === "Error") {
                return this.percentageMethods[op](a, b);
            } else {
                return this.percentageMethods[op](a, b).toFixed(2);
            }
        }
    }

    this.getSimplePercentage = function(str) {
       let strSplit = str.split('');
       strSplit.pop();
       return (strSplit.join('') / 100).toFixed(2);
    }

    this.changeSign = function(str) {
        let splitStr = str.split('');
        if (splitStr.includes("%")) {
            splitStr.pop();
            let newStr = splitStr.join('');
            return (String(newStr * (-1))) + "%"
        } else {
            return String(str * (-1));
        }
    }

    this.calculate = function(array) {
        a = +array[0];
        op = array[1];
        b = +array[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
          }
        if (array.length > 2 ) {
            if (this.methods[op](a, b) === "Error") {
                return this.methods[op](a, b);
            } else if (this.methods[op](a, b) % 1 === 0) {
                return this.methods[op](a, b);
            } else {
                return this.methods[op](a, b).toFixed(2);
            }
        }
    }
}

function evaluateFirstPair(obj, ...args) {
    let result;
    if (isNaN(args[0][2])) {
        result = String(obj.calculatePercentage(args[0]))
    } else {
        result = String(obj.calculate(args[0]));
    }
    args[0] = [result, args[1]];
    return args[0];
}

startCalculation();