const topNumber = document.getElementsByClassName("previous-operand")[0];
const bottomNumber = document.getElementsByClassName("current-operand")[0];
const buttons = document.querySelectorAll(".button");

class Calculator {
    constructor() {
        this.previousOperand = document.querySelector("[data-previous-operand]");
        this.currentOperand = document.querySelector("[data-current-operand]");
        this.display = this.currentOperand;
        this.buttons = document.querySelectorAll(".button");
        this.equalsButton = document.querySelector(".span-two"); // Update selector for "=" button
        this.operator = null;
    }

    initialize() {
        this.buttons.forEach((button) => {
            button.addEventListener("click", () => this.handleButtonClick(button));
        });

        // Modify event listener for "=" button
        this.equalsButton.addEventListener("click", () => this.handleButtonClick(this.equalsButton));
    }

    handleButtonClick(button) {
        switch (button.innerText) {
            case "AC":
                this.clearDisplay();
                break;
            case "DEL":
                this.deleteDigit();
                break;
            case "=":
                this.evaluateExpression();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                this.handleOperatorClick(button.innerText);
                break;
            default:
                this.handleInput(button.innerText);
        }
    }

    clearDisplay() {
        this.previousOperand.innerText = "";
        this.currentOperand.innerText = "";
        this.operator = null;
    }

    deleteDigit() {
        this.currentOperand.innerText = this.currentOperand.innerText.slice(0, -1);
    }

    handleInput(value) {
        this.currentOperand.innerText += value;
    }

    handleOperatorClick(operator) {
        if (this.currentOperand.innerText !== "") {
            if (this.operator !== null) {
                this.evaluateExpression();
            }
            this.operator = operator;
            this.previousOperand.innerText = this.currentOperand.innerText + " " + this.operator;
            this.currentOperand.innerText = "";
        } else if (operator === "-") {
            // If '-' is clicked and there's no current operand, treat it as a negative sign
            this.currentOperand.innerText = "-";
        }
    }

    evaluateExpression() {
        try {
            if (this.operator && this.currentOperand.innerText !== "") {
                const leftOperand = parseFloat(this.previousOperand.innerText);
                const rightOperand = parseFloat(this.currentOperand.innerText);

                switch (this.operator) {
                    case "+":
                        this.currentOperand.innerText = (leftOperand + rightOperand).toString();
                        break;
                    case "-":
                        this.currentOperand.innerText = (leftOperand - rightOperand).toString();
                        break;
                    case "*":
                        this.currentOperand.innerText = (leftOperand * rightOperand).toString();
                        break;
                    case "/":
                        if (rightOperand !== 0) {
                            this.currentOperand.innerText = (leftOperand / rightOperand).toString();
                        } else {
                            this.currentOperand.innerText = "Error";
                        }
                        break;
                }

                this.previousOperand.innerText = "";
                this.operator = null;
            }
        } catch (error) {
            this.currentOperand.innerText = "Error";
        }
    }
}

// Usage
const calculator = new Calculator();
calculator.initialize();
