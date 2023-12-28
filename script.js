//function add(a, b) {return a + b}
//function subtract(a, b) {return a - b}
//function multiply(a, b) {return a * b}
//function divide(a, b) {return b == 0 ? "Error" : a / b}
function findPercentage(a) {return a / 100}
function changeSign(a) {return a * (-1)}

//Focus on adding 3 + 5 and showing 8

function startCalculation() {
    let operatorHolder = '';
    let number = '';
    let containerArr = [];
    const displayCurrentValue = document.querySelector('.current-text');
    const numberBtns = document.querySelectorAll('.number');
    const operationBtns = document.querySelectorAll('.operation');
    //5 + 3
    numberBtns.forEach(numberBtn => {
        numberBtn.addEventListener('click', () => {
            number += numberBtn.textContent;
            displayCurrentValue.textContent = number;
            //containerArr.push(numberBtn.textContent);
            
        });
    });

    operationBtns.forEach(operationBtn => {
        operationBtn.addEventListener('click', () => {
            operatorHolder = operationBtn.textContent;
            if (!(number.length === 0)) {
                containerArr.push(number);
                number = '';
            }
            if (!isNaN(+containerArr[containerArr.length - 1])) {
                containerArr.push(operationBtn.textContent);
            } else if (containerArr[containerArr.length - 1] == '+' || containerArr[containerArr.length - 1] == '-' || containerArr[containerArr.length - 1] == 'x' || containerArr[containerArr.length - 1] == '/') {
                containerArr[containerArr.length - 1] = operationBtn.textContent
            } 
            console.log(containerArr);
        });
    });
    /*
    function controlArrayLength(array, operationSign) {
    if (isNaN(+array[array.length - 1])) {
        return array[array.length - 1] = operationSign
    }
}
    */
}

function Calculator() {
    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => b == 0 ? "Error" : a / b,
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