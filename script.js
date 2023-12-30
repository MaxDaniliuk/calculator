function changeSign(a) {return a * (-1)}

function startCalculation() {
    const displayCurrentValue = document.querySelector('.current-text');
    const displayOperation = document.querySelector('.previous-text');
    const numberBtns = document.querySelectorAll('.number');
    const operationBtns = document.querySelectorAll('.operation');
    const clearAllBtn = document.querySelector('#clear-all');
    const equalsBtn = document.querySelector('#equals');
    const percentageBtn = document.querySelector('#percentage');
    let operatorHolder = '';
    let number = '';
    let containerArr = [];
    let answer = [];
    let calculator = new Calculator;

    numberBtns.forEach(numberBtn => {
        numberBtn.addEventListener('click', () => {
            if (!(number[number.length - 1] === "%" || displayCurrentValue.textContent === "Error")) {
                number += numberBtn.textContent;
                displayCurrentValue.textContent = number;
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
        number = '';
        displayCurrentValue.textContent = 0;
        displayOperation.textContent = '';
        containerArr = [];
        answer = [];
    });

    equalsBtn.addEventListener('click', () => {
        
        if (!(displayCurrentValue.textContent === "Error")) {
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
            } else if (displayOperation.textContent[0] === displayCurrentValue.textContent.match(/(\d+)/)[0] && displayCurrentValue.textContent[displayCurrentValue.textContent.length - 1] === "%") {
                    tempNum = number; //8%
                    number = calculator.getSimplePercentage(number); //0.08 containerArr is now empty
                    answer = answer.concat(displayOperation.textContent.split(' '));
                    answer.push(tempNum);
                    containerArr = evaluateFirstPair(calculator, answer, operatorHolder); //Container has NUMBER and OPERATOR
                    answer.push(equalsBtn.textContent)
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

    this.calculate = function(array) {
        a = +array[0];
        op = array[1];
        b = +array[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
          }
        if (array.length > 2 ) {
            if (this.methods[op](a, b) === "Error") {
                //Return ERROR, change display to '' and consider how to handle it
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