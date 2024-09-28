const clearBtn = document.querySelector("#clearLikes");
const prevBtn = document.querySelector("#prevColor");
const bg = document.querySelector("*");
const ul = document.querySelector(".likedColors");

clearBtn.addEventListener("click", clearLikes);
prevBtn.addEventListener("click", restorePrevious);
ul.addEventListener('click', removeLike)

// To get a color on page load, uncomment below code:
// addEventListener("load", changeBackground);

const bgBtn = document.querySelector("#colorChanger");
bgBtn.addEventListener("click", changeBackground);

let prevColor;
let bgColor = "FFFFFF";

function changeBackground() {
  // Record the last color:
  prevColor = bgColor;
  //Change the background:
  bgColor = getHexCode();
  console.log(`The color is #${bgColor}`);
  bg.style.backgroundColor = `#${bgColor}`;

  //Update the inputContainer text to show the color.
  const txt = document.querySelector("#colorText");
  txt.textContent = `#${bgColor}`;
  txt.style.color = `#${bgColor}`;
};

function getHexCode() {
  let choices = "1234567890ABCDEF"
  let bgColor = choices.charAt(randomInt());
  for(let i=1; i < 6; i++) {
    bgColor = bgColor.concat( choices.charAt(randomInt()) )
  }
  return bgColor;
}

function randomInt() {
  return Math.floor(Math.random() * 16);
}

function restorePrevious() {
  if(prevColor == "000000") {
    alert("Sorry, you can only go back once.")
    prevColor = bgColor;
  } else if(prevColor == null) {
    alert("There is no previous color.")
  } else {
    bg.style.backgroundColor = `#${prevColor}`
    txt = document.querySelector("#colorText");
    txt.textContent = `#${prevColor}`;
    txt.style.color = `#${prevColor}`;}
    bgColor = prevColor;
    prevColor = "000000";
};

const likeBtn = document.querySelector("#addToLikes");
likeBtn.addEventListener("click", addLike);

function addLike() {
  li = document.createElement("li");
  ul.appendChild(li);
  addSpan(bgColor);
  addButton();
  return
};

function addSpan(bgColor) {
  li = ul.lastElementChild;
  span = document.createElement("SPAN");
  span.textContent = `██████ #${bgColor}`;
  span.style.color = `#${bgColor}`;
  li.appendChild(span);
};

function addButton() {
  li = ul.lastElementChild;
  button = document.createElement("button");
  button.textContent = "remove";
  button.classList.add("removeBtn")
  li.appendChild(button);
};

function removeLike(event) {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.className === 'removeBtn') {
      let li = event.target.parentNode;
      let parent = li.parentNode;
      parent.removeChild(li);
    }
  }
};

function clearLikes() {
  const ul = document.querySelector("ul");
  const list = document.querySelectorAll("li");
  list.forEach(function (li) { ul.removeChild(li) } )
};

// These two functions were intial workarounds for problems that were later solved.
// They are being kept just in case of adding additional functionalities to the page.
// rbgString in this case refers to the string produced when pulling the color values 
// of the current background, formated as: rgb(XXX, XXX, XXX)

function colorToHexCode(c) {
  code = c.toString(16);
  return code.length == 1 ? "0" + code : code;
};

function convertToHex(rgbString) {
  let values = rgbString.substring( (bgColor.indexOf("(") + 1), (bgColor.indexOf(")")) );
  let colorArray = values.split(", ");

  let red = parseInt( colorArray[0] );
  let green = parseInt( colorArray[1] );
  let blue = parseInt( colorArray[2] );

  let hex = colorToHexCode(red) + colorToHexCode(green) + colorToHexCode(blue);
  return hex;
};