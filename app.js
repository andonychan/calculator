class Calculator {
    constructor(previousResultText, currentResultText) {
        this.previousResultText = previousResultText;
        this.currentResultText = currentResultText;
        this.clear();
    }

    clear() {
        this.previousResult = '';
        this.currentResult = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentResult === '') return;
        this.currentResult = this.currentResult.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentResult.includes('.')) return;
        this.currentResult = this.currentResult.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentResult === '') return;
        if (this.previousResult !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousResult = this.currentResult;
        this.currentResult = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousResult);
        const current = parseFloat(this.currentResult);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentResult = computation;
        this.operation = undefined;
        this.previousResult = '';
    }

    numberDisplay(number) {
        const numString = number.toString();
        const intergerFloat = parseFloat(numString.split('.')[0]);
        const decimalFloat = numString.split('.')[1];
        let displayNum;

        if (isNaN(intergerFloat)) {
            displayNum = ''
        } else {
            displayNum = intergerFloat.toLocaleString('en');
        }

        if (decimalFloat != null) {
            return `${displayNum}.${decimalFloat}`;
        } else {
            return displayNum;
        }


    }

    updateDisplay() {
        this.currentResultText.innerText = this.numberDisplay(this.currentResult);
        if (this.operation != null) {
            this.previousResultText.innerText = this.numberDisplay(this.previousResult) + ' ' + this.operation;
        } else {
            this.previousResultText.innerText = '';
        }
    }

}

const numberButton = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearAllButton = document.querySelector('.clear-all');
const clearLastButton = document.querySelector('.clear-last');
const previousResultText = document.querySelector('.previous-result');
const currentResultText = document.querySelector('.current-result');

const calculator = new Calculator(previousResultText, currentResultText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

clearLastButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})