function findPercentage(a) {return a / 100}
function changeSign(a) {return a * (-1)}

function startCalculation() {
    let operatorHolder = '';
    let number = '';
    let containerArr = [];
    let answer = [];
    const displayCurrentValue = document.querySelector('.current-text');
    const displayOperation = document.querySelector('.previous-text');
    const numberBtns = document.querySelectorAll('.number');
    const operationBtns = document.querySelectorAll('.operation');
    const clearAllBtn = document.querySelector('#clear-all');
    const equalsBtn = document.querySelector('#equals');
    let calculator = new Calculator;

    numberBtns.forEach(numberBtn => {
        numberBtn.addEventListener('click', () => {
            number += numberBtn.textContent;
            displayCurrentValue.textContent = number;
        });
    });

    operationBtns.forEach(operationBtn => {
        operationBtn.addEventListener('click', () => {
            operatorHolder = operationBtn.textContent;
            if (!(number.length === 0)) {
                containerArr.push(number);
                number = '';
            }
            if (containerArr.length == 3) {
                containerArr = evaluateFirstPair(calculator, containerArr, operatorHolder);
            }
            if (!isNaN(+containerArr[containerArr.length - 1])) {
                containerArr.push(operationBtn.textContent);
            } else if (containerArr[containerArr.length - 1] == '+' || containerArr[containerArr.length - 1] == '-' || containerArr[containerArr.length - 1] == 'x' || containerArr[containerArr.length - 1] == '/') {
                containerArr[containerArr.length - 1] = operationBtn.textContent
            }
            displayOperation.textContent = containerArr.join(' '); //Repeats here 
            displayCurrentValue.textContent = containerArr[0]; //Repeats here
            console.log("ContainerArr is ", containerArr);
        });
    });

    clearAllBtn.addEventListener('click', () => {
        number = '';
        displayCurrentValue.textContent = 0;
        displayOperation.textContent = '';
        containerArr = [];
        answer = [];
    });
    
    equalsBtn.addEventListener('click', () => {
        if (answer.length > 0) {
            answer = []
        }
        containerArr.push(number);
        number = ''
        answer = answer.concat(containerArr);
        answer.push(equalsBtn.textContent);
        displayOperation.textContent = answer.join(' ');
        let copyArr = evaluateFirstPair(calculator, containerArr.slice(), operatorHolder);
        displayCurrentValue.textContent = copyArr[0]; 
        containerArr = evaluateFirstPair(calculator, containerArr, operatorHolder);
    });
}

function Calculator() {
    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "x": (a, b) => a * b,
        "/": (a, b) => b == 0 ? "Error" : (a / b).toFixed(2),
    }

    this.calculate = function(array) {
        a = +array[0]
        op = array[1]
        b = +array[2]
        
        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
          }
        if (array.length > 2 ) {
            return this.methods[op](a, b);
        }
    }
}

function evaluateFirstPair(obj, ...args) {
    let result = String(obj.calculate(args[0]));
    args[0] = [result, args[1]];
    return args[0];
}

startCalculation();