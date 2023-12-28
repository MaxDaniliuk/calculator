function findPercentage(a) {return a / 100}
function changeSign(a) {return a * (-1)}

function startCalculation() {
    let operatorHolder = '';
    let number = '';
    let containerArr = [];
    const displayCurrentValue = document.querySelector('.current-text');
    const displayOperation = document.querySelector('.previous-text');
    const numberBtns = document.querySelectorAll('.number');
    const operationBtns = document.querySelectorAll('.operation');
    const clearAllBtn = document.querySelector('#clear-all');
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
                let calculationResult = String(calculator.calculate(containerArr));
                console.log(calculationResult);
                containerArr = [calculationResult, operatorHolder]
            }
            if (!isNaN(+containerArr[containerArr.length - 1])) {
                containerArr.push(operationBtn.textContent);
            } else if (containerArr[containerArr.length - 1] == '+' || containerArr[containerArr.length - 1] == '-' || containerArr[containerArr.length - 1] == 'x' || containerArr[containerArr.length - 1] == '/') {
                containerArr[containerArr.length - 1] = operationBtn.textContent
            }
            displayOperation.textContent = containerArr.join(' ');
            displayCurrentValue.textContent = containerArr[0];
            console.log(containerArr);
        });
    });

    clearAllBtn.addEventListener('click', () => {
        number = '';
        displayCurrentValue.textContent = 0;
        displayOperation.textContent = '';
        containerArr = [];
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



startCalculation();