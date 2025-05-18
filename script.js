let consoleIsOpen = false;
const monolog = [
  "Привет",
  "Хорошо что ты нашел меня",
  "Я постараюсь помочь тебе",
  "Тебе не кажется что здесь слишком светло?",
];
document.addEventListener("keydown", function (event) {
  if (
    !consoleIsOpen &&
    (event.key === "F12" || // F12
      (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "i" || event.key === "j" || event.key === "c")) || // Ctrl + Shift + I, J, C
      (event.metaKey &&
        event.altKey &&
        (event.key === "i" || event.key === "j" || event.key === "c"))) // Cmd + Option + I, J, C
  ) {
    consoleIsOpen = !consoleIsOpen;
    startMonolog();
  }
});

window.addEventListener("resize", function (event) {
  if (
    !consoleIsOpen &&
    (window.outerWidth !== window.outerWidthPrevious ||
      window.innerWidth !== window.innerWidthPrevious)
  ) {
    consoleIsOpen = !consoleIsOpen;
    startMonolog();
  }
  window.outerWidthPrevious = window.outerWidth;
  window.innerWidthPrevious = window.innerWidth;
});

function startMonolog() {
  for (let i = 0; i < monolog.length; i++) {
    setTimeout(function () {
      console.log(monolog[i]);
    }, i * 2000);
  }
}

// function curry(operationFunction) {
//   return function (firstNum) {
//     const numbers = [firstNum];

//     function innerFunction(num) {
//       numbers.push(num);
//       console.log(numbers);

//       return innerFunction(numbers);
//     }

//     innerFunction.valueOf = function () {
//       console.log(numbers);
//       return operationFunction(numbers);
//     };
//   };

// function fn(num) {
//     numbers.push(num);
//     console.log(numbers)
//    return curry(args);

// }

/*  f.toString = function() {
      return fn(numbers);
  } */

// return carriedResult;
// }

// function sum(...rest) {
//   return rest.reduce((acc, curr) => (acc += curr));
// }
