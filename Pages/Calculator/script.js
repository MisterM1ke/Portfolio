let displayArr = [];
const operators = ["/","*","+","-"];
let displayElement = document.getElementById("display").children[0];

function calculate(e){
    if (isNumber(e.value) || e.value == "."){
        if (displayArr[0] == "=" && isNumber(displayArr.slice(-1))){ // clear display if a number is selected right after a calculation via pressing "="
            displayArr = [];
        }
        if (e.value == "." && displayArr.slice(-1)[0].includes(".")) {
            console.log(typeof displayArr.slice(-1)[0])
            return;
        }else if (displayArr.length == 0){ // if display array is empty, push the selected number to the array
            displayArr.push(e.value);
        }else if (isNumber(displayArr.slice(-1)) || displayArr.slice(-1) == "."){ // if last element in array is a number, then concatenate to the same index
            displayArr.splice(-1,1,displayArr.slice(-1)+e.value);
        }else{
            displayArr.push(e.value); // pushes number to the array
        }
        
    }else if(isOperator(e.value)){
        if(displayArr[0] == "=") {
            displayArr.shift();
        }
        if (displayArr.length == 0){
            return
        }else if (isOperator(displayArr[1]) && displayArr.length == 2) { // replaces operator if expression incomplete
            displayArr.splice(-1,1,e.value);
        }else if (isOperator(displayArr[1]) && displayArr.length == 3) { // evaluates expression and adds new operator
            displayArr = [...evaluate(displayArr),e.value]
        }else{
        displayArr.push(e.value);
        }
    }else if (e.value == "="){
        if (displayArr.length < 3){
            return
        }else if (displayArr[0] == "=") {
            displayArr.shift();
            evaluate(displayArr);
        }
        
            evaluate(displayArr);
            displayArr.unshift(e.value);
        
    }else if (e.value == "CLR") {
        displayArr = [];
    }
    display(displayArr);

    console.log(displayArr)
}

function isNumber(n) {
    return !Number.isNaN(parseInt(n));
}

function isOperator(v) {
    return operators.includes(v);
}

function display(str) {
    if (displayArr.length == 0) {
        displayElement.textContent = "0";
    }else{
        let tempArr = displayArr.map(v => v == "/" ? String.fromCharCode(247) : v == "*" ? String.fromCharCode(215) : v);
        displayElement.textContent = tempArr.join(" ");
    }
}

function add(n1,n2){
    displayArr = [[n1,n2].reduce((a,b) => parseFloat(a) + parseFloat(b))];
}

function subtract(n1,n2){
    displayArr = [[n1,n2].reduce((a,b) => parseFloat(a) - parseFloat(b))];
}

function multiply(n1,n2){
    displayArr = [[n1,n2].reduce((a,b) => parseFloat(a) * parseFloat(b))];
}

function divide(n1,n2){
    displayArr = [[n1,n2].reduce((a,b) => parseFloat(a) / parseFloat(b)).toFixed(11)];
}

function evaluate(n) {
    const [n1,op,n2] = n;
    if (op == "+") add(n1,n2);
    if (op == "-") subtract(n1,n2);
    if (op == "*") multiply(n1,n2);
    if (op == "/") divide(n1,n2);
    
    display(displayArr);
    return displayArr;
}
