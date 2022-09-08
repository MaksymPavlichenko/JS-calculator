const result = document.getElementById("result");
const calc = document.getElementById("calc");
const operand_bts = document.querySelectorAll("button[data-type=operand]");
const operator_bts = document.querySelectorAll("button[data-type=operator]");

calc.addEventListener("submit", (e) => {
    e.preventDefault();
});

let isOperator = false;
let calculation = [];

const removeActive = () => {
    operator_bts.forEach((btn) =>{
        btn.classList.remove("active");
    });
};

operand_bts.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        removeActive();
        if (result.value == "0") {
            result.value = e.target.value;
        } else if (result.value.includes(".")) {
            result.value = result.value + "" + e.target.value.replace(".", "");
        } else if (isOperator) {
            isOperator = false;
            result.value = e.target.value;
        } else {
            result.value = result.value + "" + e.target.value;
        }
    });
});

operator_bts.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        removeActive();
        e.currentTarget.classList.add("active");
        switch (e.target.value) {
            case "%":
                result.value = parseFloat(result.value) / 100;
                break;
            case "invert":
                result.value = parseFloat(result.value) * -1;
                break;
            case "=":
                calculation.push(result.value);
                result.value = eval(calculation.join(""));
                calculation = [];
                break;
            default:
                let lastItem = calculation[calculation.length - 1];
                if (["/", "*", "+", "-"].includes(lastItem) && is_operator) {
                    calculation.pop();
                    calculation.push(e.target.value);
                } else {
                    calculation.push(result.value);
                    calculation.push(e.target.value);
                }
                isOperator = true;
                break;
        }
    });
});