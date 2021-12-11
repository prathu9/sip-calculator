const inputSlider = document.querySelectorAll(".slider");
const inputText = document.querySelectorAll(".input-text");
const outputValue = document.querySelectorAll(".output-value");
let principle  = 5000;
let noOfPayment = 0;
let time = 10;
let rateOfReturn = 14;
let numPattern = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;

const inputChange = (e, i) => {
    inputText[i].value = e.target.value;
    calculateReturn();
}

const checkInput = (e) => {
    const enteredValue = e.target.value;
    return numPattern.test(enteredValue);
}

inputSlider[0].addEventListener("input", (e) => {
    principle = parseInt(e.target.value);
    inputChange(e, 0);
})

inputSlider[1].addEventListener("input", (e) => {
    time = parseInt(e.target.value);
    inputChange(e, 1);
})

inputSlider[2].addEventListener("input", (e) => {
    rateOfReturn = parseInt(e.target.value);
    inputChange(e, 2);
})

inputText[0].addEventListener("input", (e) => {
    if(checkInput(e)){ 
        principle = parseInt(e.target.value);
        inputChange(e, 0);
    }
})

inputText[1].addEventListener("input", (e) => {
    if(checkInput(e)){ 
        time = parseInt(e.target.value);
        inputChange(e, 1);
    }
})

inputText[2].addEventListener("input", (e) => {
    if(checkInput(e)){ 
        rateOfReturn = parseInt(e.target.value);
        inputChange(e, 2);
    }
})


const calculateReturn = () => {
    if(inputText[0].value.length > 0 && inputText[1].value.length && inputText[2].value.length){
        noOfPayment = time*12;
        ratePerMonth = (rateOfReturn/100)/12;
        totalAmount = Math.round(principle*((Math.pow((1 + ratePerMonth),noOfPayment)-1)/ratePerMonth) * (1 + ratePerMonth));
        investmentAmount = principle*time*12;console.log(principle, time)
        outputValue[0].textContent = `₹${totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        outputValue[1].textContent = `₹${investmentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        outputValue[2].textContent = `₹${(totalAmount - investmentAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
}