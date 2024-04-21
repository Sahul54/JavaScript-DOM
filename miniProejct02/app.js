const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDispaly = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatBtn = document.querySelector(".genterateButton");
const allcheckBox = document.querySelectorAll("input[type=checkBox]"); 
const symbols = "!@#$%^&*()-={}[]?/|<>,";


let password ="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//  ste syrength circle color to grey

// ste Passwordlength

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDispaly.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroubdColor = color;
    // shadow

}

function getRandomInterger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generatRandomNoumber(){
    return getRandomInterger(0,9);
}

function generatorLowercase(){
    return String.fromCharCode(getRandomInterger(97,123));
}

function generatorUppercase(){
    return String.fromCharCode(getRandomInterger(65,91));
}

function generatorSymbols(){
    const random = getRandomInterger(0,symbols.length);
    return symbols.charAt(random);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;



    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0f");
    } 
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
        
}

async function cpyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);  
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy wala content
    copyMsg.classList.add("active");

    setTimeout( () =>{
        copyMsg.classList.remove("active");
    }, 2000);
    
}

function shufflePassword(array) {
    // alogo -> Fisher yates Method
    for(let i = array.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckBox.forEach( (checkbox) =>{
        if(checkbox.checked)
        checkCount++
    });

    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}



allcheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () =>{
     if(passwordDisplay.value)
     cpyContent();
})

generatBtn.addEventListener('click', ()=>{
    //  none of the check box
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the journy to find new password
    console.log("starting the journy");
    password = "";
    // let's put the mentaion by checkbox

    // if(upppercaseCheck.checked){
    //     password += generatorUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generatorLowercase();
    // }

    // if(numberCheck.checked){
    //     password += generatorNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generatorSymbols();
    // }
    

    // other method

    let funArr = [];

    if(upppercaseCheck.checked)
       funArr.push(generatorUppercase);
    
    if(lowercaseCheck.checked)
       funArr.push(generatorLowercase);

       if(numberCheck.checked)
       funArr.push(generatorNumber);

       if(symbolsCheck.checked)
       funArr.push(generatorSymbols);

    //    compulsary addition
    for(let i =0; i<funArr.length; i++){
        password += funArr[i]();
    }

    console.log("compulsary  the journy");
    // remaining addition
    for(let i =0; i<passwordLength - funArr.length; i++){
        let randIndex = getRandomInterger(0, funArr.length)
        password += funArr[randIndex]();
    } 
    console.log("remaning the done");

    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("shuffling the journy");

    // show UI
    passwordDisplay.value = password;
    console.log("ui done the journ");

    // calculate strangth
    calcStrength();
})