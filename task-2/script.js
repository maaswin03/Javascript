const ui_value = document.querySelector(".buttons"); // variable to fetch the button container
const ui_input_field = document.getElementById("inputfield"); // variable used to update the input container in ui

let user_input = ""; // used to store inputs
let temp = "";
let stack = []; // used to store input value and operator

//Event listener for getting inputs
ui_value.addEventListener("click", (e) => {
  const button = e.target.closest(".btn");

  if (!button) return;

  const value = button.dataset.value;

  if (!value) return;

  operation(value);

  const output_field = document.querySelector(".output-display");

  if (stack.length === 0 && user_input !== "") {
    output_field.innerText = temp;
    document.querySelector(".display").classList.add("result-mode");
  } else {
    output_field.innerText = "";
    document.querySelector(".display").classList.remove("result-mode");
  }

  ui_input_field.innerText = stack.join("") + user_input || "0";
  console.log(temp , stack , user_input)
});

//function to check that the last value is an operator in stack
function checklast() {
  const last = stack[stack.length - 1];

  if (
    last !== "+" &&
    last !== "-" &&
    last !== "×" &&
    last !== "÷" &&
    last !== "%"
  ) {
    return true;
  }

  return false;
}

//function to check the value is an operator
function checkvalue(value) {
  if (
    value == "+" ||
    value == "-" ||
    value == "×" ||
    value == "÷" ||
    value == "%"
  ) {
    return true;
  }
  return false;
}

function digit(value) {
  if (value === ".") {
    if (user_input.includes(".")) {
      return;
    }
    if (user_input === "") {
      user_input = "0";
    }
    user_input += value;
  } else {
    if (user_input === "0") {
      user_input = value;
    } else {
      user_input += value;
    }
  }
}

//function to convert positive to negative and negative to positive  integers
function negative() {
  if (user_input === "") {
    return;
  }

  if (user_input.startsWith("-")) {
    user_input = user_input.slice(1);
  } else {
    user_input = "-" + user_input;
  }
}

//function to calculate the final result
function output() {
  if (user_input !== "") {
    stack.push(user_input);
    user_input = "";
  }
  if (stack.length === 0) {
    return;
  }
  if (!checklast()) {
    stack.pop(); // remove last value if it is an variable
  }
  try {
    const expression = stack.join("").replaceAll("×", "*").replaceAll("÷", "/");
    const result = eval(expression);
    user_input = String(Number(result.toFixed(8)));
    temp = stack.join("");
    stack = [];
  } catch (e) {
    user_input = "Error";
    stack = [];
  }
  return;
}

function operation(value) {
  // condition if value is =
  if (value == "=") {
    output();
  }
  // condition  if value is N
  else if (value == "N") {
    negative();
  }
  // condition if value is All clear
  else if (value == "AC") {
    user_input = "";
    stack = [];
    temp = "";
  }
  // condition if value is delete
  else if (value == "DEL") {
    if (user_input !== "") {
      user_input = user_input.slice(0, -1);
    } else if (stack.length > 0) {
      if (!checklast()) {
        stack.pop();
      } else {
        user_input = stack[stack.length - 1];
        user_input = user_input.slice(0, -1);
        stack.pop();
      }
    } else {
      return;
    }
  } else if (user_input == "" && stack.length === 0) {
    if ((value >= "0" && value <= "9") || value === ".") {
      temp = "";
      digit(value);
    } else {
      return;
    }
  } else if (user_input == "" && stack.length > 0) {
    if ((value >= "0" && value <= "9") || value === ".") {
      digit(value);
    } else if (checkvalue(value) && checklast()) {
      stack.push(value);
    } 
    else if(checkvalue(value) && !checklast()){
      stack.pop();
      stack.push(value);
    }else {
      return;
    }
  } else {
    if ((value >= "0" && value <= "9") || value === ".") {
      digit(value);
    } else if (checkvalue(value)) {
      if (user_input !== "") {
        stack.push(user_input);
        stack.push(value);
        user_input = "";
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
