"use strict";

const numb = document.querySelector(".num");
const numberBtns = document.querySelectorAll(".num");
const operationBtns = document.querySelectorAll(".operation");
let operations = document.querySelectorAll("[data-operation]");
let operationSymbolPlus = document.querySelector(".plus");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".all-clear");
const deleteBtn = document.querySelector(".del");
const plusMinusBtn = document.querySelector(".plus-minus");
const sqroot = document.querySelector(".sqroot");
const expo = document.querySelector(".expo");
const dot = document.querySelector(".dot");
let currentOutputText = document.querySelector(".current-output").innerText;
let previousOutputText = document.querySelector(".previous-output").innerText;
let currentOutput = document.querySelector("[data-current-output]");
let previousOutput = document.querySelector("[data-previous-output]");
let oper;
let result;
let currentNumber;
let clearOnNextNumber = false;
let sqrootResult;
let sqrootResultState = false;

const clearFunc = function () {
  currentOutputText = "";
  previousOutput.innerText = "";
  operations = undefined;
  oper = undefined;
  sqrootResultState = false;
};

function appendNumberFunc(number) {
  if (number === "." && currentOutputText.includes(".")) return;
  if (
    number === "0" &&
    currentOutputText[0] === "0" &&
    currentOutputText[1] !== "."
  )
    return;

  if (currentOutputText.length >= 10) return;

  currentNumber = number;
  currentOutputText = currentOutputText.toString() + currentNumber.toString();
}

function deleteFunc() {
  currentOutputText = currentOutputText.toString().slice(0, -1);
}

function selectOperationFunc(operation) {
  clearOnNextNumber = false;

  if (currentOutputText === "") return;
  if (sqrootResultState) {
    currentOutputText = sqrootResult;
    sqrootResultState = false;
  }
  if (previousOutputText !== "") {
    computationFunc();
  }
  let op = operation;
  previousOutputText = currentOutputText;
  currentOutputText = "";

  return op;
}

function computationFunc() {
  const previousNumber = Number(previousOutputText);
  const currentNumber = Number(currentOutputText);
  if (isNaN(previousNumber) || isNaN(currentNumber)) return;
  switch (oper) {
    case "+":
      result = (previousNumber * 100 + currentNumber * 100) / 100;
      break;
    case "-":
      result = (previousNumber * 100 - currentNumber * 100) / 100;
      break;
    case "×":
      result = (previousNumber * 100 * (currentNumber * 100)) / 10000;
      break;
    case "÷":
      result = previousNumber / currentNumber;
      break;
    case "^":
      result = Math.pow(previousNumber, currentNumber);
      break;
    default:
      return;
  }

  if (result === Infinity) {
    result = "Error";
  }

  result = result.toString();
  if (result.length >= 10) {
    result = result.slice(0, 10);
  }

  currentOutputText = result;
  previousOutput.innerText = "";
  clearOnNextNumber = true;
  operations = undefined;
  oper = undefined;
}

function plusMinusFunc() {
  if (currentOutputText[0] === "-")
    currentOutputText = currentOutputText.slice(1, currentOutputText.length);
  else currentOutputText = "-" + currentOutputText;
  currentOutput.innerText = currentOutputText;
}

function displayFunc() {
  currentOutput.innerText = currentOutputText;

  if (oper != null) {
    previousOutput.innerText = `${previousOutputText} ${oper}`;
  }
}

function clearOnNextNumberFunc(number) {
  if (clearOnNextNumber) {
    clearOnNextNumber = false;
    currentOutputText = "";
  }
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    clearOnNextNumberFunc(button.innerText);
    appendNumberFunc(button.innerText);
    displayFunc();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    oper = selectOperationFunc(button.innerText);
    displayFunc();
  });
});

clearBtn.addEventListener("click", () => {
  clearFunc();
  displayFunc();
});

equalBtn.addEventListener("click", () => {
  computationFunc();
  displayFunc();
});

deleteBtn.addEventListener("click", () => {
  deleteFunc();
  displayFunc();
});

sqroot.addEventListener("click", () => {
  currentOutput.innerText = Math.sqrt(currentOutput.innerText);
  sqrootResult = currentOutput.innerText.toString();

  if (sqrootResult.length >= 10) {
    sqrootResult = sqrootResult.slice(0, 10);
  }

  currentOutput.innerText = sqrootResult;
  currentOutputText = sqrootResult;
  sqrootResultState = true;
  clearOnNextNumber = true;
  previousOutput.innerText = "";

  if (currentOutput.innerText === "NaN") {
    currentOutput.innerText = "Error";
    clearOnNextNumber = true;
  }
});

plusMinusBtn.addEventListener("click", () => {
  plusMinusFunc();
});
