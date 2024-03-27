document.addEventListener("DOMContentLoaded", function() {
    const monitor = document.getElementById("monitor");
    const buttons = document.querySelectorAll(".btn");
    let currentOperand = "";
    let previousOperand = "";
    let operation = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            const operator = button.getAttribute("data-operator");
            const action = button.getAttribute("data-action");

            if (value !== null) {
                currentOperand += value;
                updateMonitor();
            } else if (operator !== null) {
                if (currentOperand !== "") {
                    previousOperand = currentOperand;
                    currentOperand = "";
                    operation = operator;
                }
            } else if (action !== null) {
                if (action === "clear") {
                    clearDisplay();
                } else if (action === "calculate") {
                    calculateResult();
                }
            }
        });
    });

    function updateMonitor() {
        monitor.textContent = currentOperand;
    }

    function clearDisplay() {
        currentOperand = "";
        previousOperand = "";
        operation = "";
        updateMonitor();
    }

    function calculateResult() {
        let result;
        const num1 = parseFloat(previousOperand);
        const num2 = parseFloat(currentOperand);

        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                if (num2 === 0) {
                    monitor.textContent = "Error: Division by zero";
                    return;
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                monitor.textContent = "Error";
                return;
        }

        currentOperand = result.toString();
        previousOperand = "";
        operation = "";
        updateMonitor();
    }
});
