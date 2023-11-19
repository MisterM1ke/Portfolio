//Global variables
//create list of lowercase letters
const lowercaseASCII = [97,122]
let lowercaseLetters = '';
let [min,max] = lowercaseASCII
while (min <= max) {
    lowercaseLetters+=String.fromCharCode(min);
    min++
}

// create list of special characters
const specialCharASCII = [[33,47],[58,64],[91,96],[123,126]]
let specialChars = [];
for (sChars of specialCharASCII){
    let [min, max] = sChars;
    while (min <= max){
        specialChars.push(min);
        min++;
    }
}
const specialCharList = String.fromCharCode(...specialChars)


function generatePassword(){
    // dom elements
    const displayPassword = document.getElementById("password");
    const generateBtn = document.getElementById("generateBtn");
    let length = document.getElementById("pwLength").value;
    let isDigit = document.getElementById("digits").checked;
    let isSpecialChar = document.getElementById("specialChar").checked;
    let isUppercase = document.getElementById("upperCase").checked;


    //set variables
    let islowercase = true;
    let pw = []
    let maxAllowedCount = length - (isDigit + isSpecialChar + isUppercase + islowercase); //maxAllowedCount makes sure that all selected options are in the generated password

    // generate and add numbers
    if (isDigit){
        maxAllowedCount = length - isSpecialChar - isUppercase - islowercase;
        let noOfDigits = Math.floor(Math.random() * maxAllowedCount + 1);
        for (let i = 0; i < noOfDigits; i++){
            pw.push(Math.floor(Math.random() * 10))
        }
        length-=noOfDigits;
    }

    //generate and add Special characters
    if(isSpecialChar){
        maxAllowedCount = length - isUppercase - islowercase;
        let noOfSpecialChars = Math.floor(Math.random() * maxAllowedCount +1)
        for (let i=0;i<noOfSpecialChars;i++){
            rand = Math.floor(Math.random() * specialCharList.length)
            pw.push(specialCharList.slice(rand,rand+1))
        }
        length-=noOfSpecialChars;
    }

    //generate and add uppercase letters
    if (isUppercase){
        maxAllowedCount = length - islowercase;
        let noOfUppercase = Math.floor(Math.random() * maxAllowedCount +1)
        for (let i=0;i<noOfUppercase;i++){
            rand = Math.floor(Math.random() * lowercaseLetters.length)
            pw.push(lowercaseLetters.slice(rand,rand+1).toLocaleUpperCase())
        }
        length-=noOfUppercase;
    }

    //generate and add lowercase characters
    maxAllowedCount = length;
    for (let i = 0; i < maxAllowedCount; i++){
        let rand = Math.floor(Math.random() * lowercaseLetters.length)
        pw.push(lowercaseLetters.slice(rand,rand+1))
    }

    //randomize pw list
    let pwLen = pw.length;
    let randPassword = "";
    for (let i=0;i<pwLen;i++){
        rand = Math.floor(Math.random() * pw.length)
        randPassword+=pw.splice(rand,1);
    }

    // add password to dom element
displayPassword.textContent = randPassword;
}