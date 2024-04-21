const countValue = document.getElementById("count");

const increment = ()=>{
    // get the value from ui
    let value = parseInt(countValue.innerText)
    // update value
    value++;
    // set the value
    countValue.innerText = value;
}

const decrement = ()=>{
    let value = parseInt(countValue.innerText)
    // if(value>0){
    //     value--;
    // }
    value--;
    countValue.innerText = value;
    
}