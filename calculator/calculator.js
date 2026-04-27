// Calculator Class
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        // Reset screen after equals or operation
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }

        // Prevent multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Replace initial zero unless adding decimal
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        // Chain calculations
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand + ' ' + operation;
        this.shouldResetScreen = true;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Can't divide by zero!");
                    this.clear();
                    this.updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Handle floating point precision
        computation = Math.round(computation * 1e10) / 1e10;
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.currentOperand = (current / 100).toString();
        this.shouldResetScreen = true;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.textContent = 
            this.getDisplayNumber(this.currentOperand);
        this.previousOperandElement.textContent = this.previousOperand;
    }
}

// Initialize Calculator
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Button Event Listeners
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const percentButton = document.querySelector('[data-action="percent"]');

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
        animateButton(button);
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
        animateButton(button);
    });
});

// Equals button
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    animateButton(equalsButton);
});

// Delete button
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
    animateButton(deleteButton);
});

// Clear button
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
    animateButton(clearButton);
});

// Percent button
percentButton.addEventListener('click', () => {
    calculator.percent();
    calculator.updateDisplay();
    animateButton(percentButton);
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    // Numbers
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
        animateButtonByKey(e.key);
    }
    
    // Decimal
    if (e.key === '.' || e.key === ',') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
        animateButtonByKey('.');
    }
    
    // Operators
    if (e.key === '+') {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
        animateButtonByOperator('+');
    }
    
    if (e.key === '-') {
        calculator.chooseOperation('−');
        calculator.updateDisplay();
        animateButtonByOperator('−');
    }
    
    if (e.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
        animateButtonByOperator('×');
    }
    
    if (e.key === '/') {
        e.preventDefault(); // Prevent browser search
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
        animateButtonByOperator('÷');
    }
    
    // Equals
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
        animateButtonByAction('equals');
    }
    
    // Delete
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
        animateButtonByAction('delete');
    }
    
    // Clear
    if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        calculator.clear();
        calculator.updateDisplay();
        animateButtonByAction('clear');
    }
    
    // Percent
    if (e.key === '%') {
        calculator.percent();
        calculator.updateDisplay();
        animateButtonByAction('percent');
    }
});

// Animation Functions
function animateButton(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

function animateButtonByKey(key) {
    const button = document.querySelector(`[data-number="${key}"]`);
    if (button) animateButton(button);
}

function animateButtonByOperator(operator) {
    const button = document.querySelector(`[data-operator="${operator}"]`);
    if (button) animateButton(button);
}

function animateButtonByAction(action) {
    const button = document.querySelector(`[data-action="${action}"]`);
    if (button) animateButton(button);
}

// Initialize display
calculator.updateDisplay();
