const increment = document.querySelector("#inc");
const decrement = document.querySelector("#dec");
const counter = document.querySelector("#counter");

let counterValue = 0;
increment.addEventListener("click", () => {
  updateValue((counterValue += 1));
});

decrement.addEventListener("click", () => {
  if (counterValue != 0) updateValue((counterValue -= 1));
});

function updateValue(counterValue) {
  counter.textContent = counterValue;
}
/***********************************************************************/

const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const onlyNumbers = new RegExp(/^\d+$/);

fahrenheit.addEventListener("input", () => {
  console.log(onlyNumbers.test(fahrenheit.value));
  if (onlyNumbers.test(fahrenheit.value)) {
    celsius.value = ((parseInt(fahrenheit.value) - 32) * (5 / 9)).toFixed();
  } else {
    celsius.value = "";
  }
});

celsius.addEventListener("input", () => {
  if (onlyNumbers.test(celsius.value)) {
    fahrenheit.value = (parseInt(celsius.value) * (9 / 5) + 32).toFixed();
  } else {
    fahrenheit.value = "";
  }
});

/***********************************************************************/
const flightType = document.querySelector("#flightType");
const bookFlightForm = document.querySelector("#bookFlightFrom");
const T1 = document.querySelector("#T1");
const T2 = document.querySelector("#T2");
const date = new Date();
const Ticket = document.querySelector("#ticket");

T1.min = date.toISOString().split("T")[0];
T2.min = date.toISOString().split("T")[0];

flightType.addEventListener("change", () => {
  if (flightType.value == "oneway") {
    T1.disabled = false;
    T2.disabled = true;
    T2.value = "";
  } else if (flightType.value == "returnFlight") {
    T1.disabled = false;
    T2.disabled = false;
    T2.min = T1.value;
    T2.value = T1.value;
  } else {
    T1.disabled = true;
    T2.disabled = true;
  }
});

T1.addEventListener("change", () => {
  if (flightType.value == "returnFlight") {
    T2.min = T1.value;
    T2.value = T1.value;
  }
});

$("#bookFlightFrom").on("submit", function (e) {
  if (
    (T1.value == "" &&
      (flightType.value == "oneway" || flightType.value == "chooseOption")) ||
    (T1.value == "" &&
      T2.value == "" &&
      (flightType.value == "returnFlight" ||
        flightType.value == "chooseOption"))
  ) {
    e.preventDefault();
    console.log("error");
    $("#ticket").slideUp();
    $("#error").slideDown();
  } else {
    e.preventDefault();
    $("#error").slideUp();
    $("#ticket").slideDown().delay(3000).slideUp("slow");
    Ticket.textContent =
      flightType.value == "oneway"
        ? `You have booked a ${
            flightType.options[flightType.selectedIndex].innerHTML
          }  flight with deparature on ${T1.value}`
        : `You have booked a ${
            flightType.options[flightType.selectedIndex].innerHTML
          }  flight  with deparature on ${T1.value} and return on ${T2.value}`;
    T2.value = "";
    T1.value = "";
    flightType.options[0].selected = "selected";
  }
});

/***********************************************************************/

const crud = document.querySelector("#crud");
const namesListDivs = document.querySelector("#listOfNames");
const clear = document.querySelector("#clear");
let listOfNames = [];
crud.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstName = document.querySelector("#firstname");
  let lastName = document.querySelector("#lastname");
  let name = { firstName: firstName.value, lastName: lastName.value };
  listOfNames.push(name);
  removeAlldivs();
  displayNames();
  clearInputs(firstName, lastName);
  deleteName(listOfNames);
});

function deleteName(listOfNames) {
  console.log(listOfNames);
  const deleteButtons = document.querySelectorAll("#listOfNames button");
  deleteButtons.forEach((ele) => {
    ele.addEventListener("click", () => {
      ele.parentElement.remove();
      listOfNames.splice(ele.parentElement.getAttribute("id"), 1);
    });
  });
}

function displayNames() {
  listOfNames.forEach((ele, index) => {
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    let buttonText = document.createTextNode("X");
    button.appendChild(buttonText);
    let div = document.createElement("div");
    let idAttribute = document.createAttribute("id");
    idAttribute.value = index;
    let divIdText = document.createTextNode(index + " ");
    let divText = document.createTextNode(
      " " + ele.firstName + " " + ele.lastName
    );
    div.setAttributeNode(idAttribute);
    div.appendChild(divIdText);
    div.appendChild(divText);
    div.appendChild(button);
    namesListDivs.appendChild(div);
  });
}

function removeAlldivs() {
  namesListDivs.querySelectorAll("*").forEach((n) => n.remove());
}

function clearInputs(firstName, lastName) {
  firstName.value = "";
  lastName.value = "";
}

clear.addEventListener("click", () => {
  removeAlldivs();
  listOfNames = [];
});
