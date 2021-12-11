const inputSlider = document.querySelectorAll(".slider");
const inputText = document.querySelectorAll(".input-text");
const outputValue = document.querySelectorAll(".output-value");
let principle  = 0;
let noOfPayment = 0;
let time = 0;
let rateOfReturn = 0;

const inputChange = (e, i) => {
    inputText[i].value = e.target.value;
    calculateReturn();
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
    principle = parseInt(e.target.value);
    inputChange(e, 0);
})

inputText[1].addEventListener("input", (e) => {
    time = parseInt(e.target.value);
    inputChange(e, 1);
})

inputText[2].addEventListener("input", (e) => {
    rateOfReturn = parseInt(e.target.value);
    inputChange(e, 2);
})


const calculateReturn = () => {
    if(inputText[0].value.length > 0 && inputText[1].value.length && inputText[2].value.length){
        noOfPayment = time*12;
        ratePerMonth = (rateOfReturn/100)/12;
        totalAmount = Math.round(principle*((Math.pow((1 + ratePerMonth),noOfPayment)-1)/ratePerMonth) * (1 + ratePerMonth));
        investmentAmount = principle*time*12;console.log(principle, time)
        outputValue[0].textContent = `₹${totalAmount}`;
        outputValue[1].textContent = `₹${investmentAmount}`;
        outputValue[2].textContent = `₹${totalAmount - investmentAmount}`;
    }
}