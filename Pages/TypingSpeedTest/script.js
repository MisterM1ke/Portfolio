const secretKey = config.SECRET_KEY;
// const secretKey = env.APIKEY;
const jokesArray = ["Chuck Norris once glared at someone and the guys heart jump out of his chest out of fear. it didn't get far before Chuck Norris grabbed it and ate it. the only thing scarier than Chuck Norris glaring at you is him smiling while in the middle of a round house kick",
                    "Contrary to popular belief, there are actually 5 classical elements: Earth, Air, Fire, Water, and Chuck Norris.",
                    "Chuck Norris stapled two liquids together",
                    "If Chuck Norris cuts ahead of you in line, just be thankful he let you survive after being in his way.",
                    "Chuck Norris went into a Catholic confession booth and made the priest confess to over one hundred unsolved pedophilia cases. Then Norris jammed a crucifix up his ass and emptied two Uzis into his face. On live TV."]
let now;
let timeIntervalInMinutes = 0;
let typingArea = document.getElementById("typingArea");
let typingAreaArray;
let correctWordCount = 0;
let correctWords = []
let tempArray = [];
let wpm = 0;
const seconds = 60;
const milliseconds = 1000;

// const joke = document.getElementById("joke").textContent.split(" ")
let joke = document.getElementById("joke");
let wpmDisplay = document.getElementById("wpm")
console.log(joke)

async function getJokeApi() {
    const url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': secretKey,
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

function getRandomJoke() {
    joke.textContent = jokesArray[Math.floor(Math.random() * 5)];
    // joke.textContent = "Chuck Norris once glared at someone and the guys heart jump out of his chest out of fear. it didn't get far before Chuck Norris grabbed it and ate it. the only thing scarier than Chuck Norris glaring at you is him smiling while in the middle of a round house kick";
}

function start(){
    typingArea.textContent = "";
    // getJokeApi();
    getRandomJoke();
    // joke.textContent = "Chuck Norris once glared at someone and the guys heart jump out of his chest out of fear. it didn't get far before Chuck Norris grabbed it and ate it. the only thing scarier than Chuck Norris glaring at you is him smiling while in the middle of a round house kick";
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

    if (typingAreaArray.length > 0){
        // let currentWordIndex = typingAreaArray.length - 1;
        console.log(joke.innerHTML)
        correctWords = typingAreaArray.map((a,index) => a == joke.textContent.split(" ")[index]);
        correctWordCount = correctWords.reduce((a,b) => a + b)
    }

    for (const [i, word] of joke.textContent.split(" ").entries()){
        if (typingAreaArray.length == i + 1 && typingAreaArray[i].length <= word.length){
            console.log(typingAreaArray[i].length)
            tempArray.push(`<span class="current">${word}</span>`)
        }else if (correctWords[i] === false && typingAreaArray.length > i + 1){
            tempArray.push(`<span class="incorrect">${word}</span>`)
        }else{
            tempArray.push(word);
        }
    }
    
    joke.innerHTML = tempArray.join(" ");
    tempArray = [];
   
    wpmCheck();
}