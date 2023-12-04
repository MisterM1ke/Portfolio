let now;
let timeIntervalInMinutes = 0;
let typingArea = document.getElementById("typingArea");
let typingAreaArray;
let correctWordCount = 0;
let correctWords = []
let wpm = 0;
const seconds = 60;
const milliseconds = 1000;

// const joke = document.getElementById("joke").textContent.split(" ")
let joke = document.getElementById("joke");
let wpmDisplay = document.getElementById("wpm")
console.log(joke)

async function getJoke() {
    const url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '97d08b7d10msh6938d5fb551a26ap198379jsne1be3cd7a6e2',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        joke.textContent = result.value;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function start(){
    typingArea.textContent = "";
    getJoke();
    now = Date.now();
    console.log(now);
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(typingArea);
    range.collapse(false);
    selection.addRange(range);
    typingArea.focus();
}

function wpmCheck(){
    timeIntervalInMinutes = (Date.now() - now)/milliseconds/seconds;
    // wpm = (correctWordCount/timeIntervalInMinutes).toFixed(1);
    wpm = (typingAreaArray.length/timeIntervalInMinutes).toFixed(1);
    console.log(wpm, typingAreaArray.length,timeIntervalInMinutes, Date.now());
    wpmDisplay.textContent = wpm.toString()
}

function doSomething(event) {
    console.log(event.textContent);
    typingArea = document.getElementById("typingArea")
    typingAreaArray = typingArea.textContent.split(" ");
    console.log(typingAreaArray)

    if (typingAreaArray.length > 1){
        // let currentWordIndex = typingAreaArray.length - 1;
        console.log(joke.textContent)
        correctWords = typingAreaArray.map((a,index) => a == joke.textContent.split(" ")[index]);
        correctWordCount = correctWords.reduce((a,b) => a + b)
    }
   
    wpmCheck();
}