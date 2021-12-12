const inputSlider = document.querySelectorAll(".slider");
const inputText = document.querySelectorAll(".input-text");
const outputValue = document.querySelectorAll(".output-value");
const sipOption = document.querySelectorAll("input[name='sip-option']");
let principle  = 5000;
let noOfPayment = 0;
let time = 10;
let rateOfReturn = 14;
let numPattern = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
let isSIPChecked = true;

const checkedSIPOption = (e) => {
    const currentSIPOption = e.target.value;
    if(currentSIPOption === "lumpsum"){
        isSIPChecked = false;
    }
    else if(currentSIPOption === "sip"){
        isSIPChecked = true;
    }
}
 
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
        inputSlider[0].value = e.target.value;
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

const calculateSIP = (ratePerMonth, noOfPayment) => {
    return Math.round(principle*((Math.pow((1 + ratePerMonth),noOfPayment)-1)/ratePerMonth) * (1 + ratePerMonth));
}

const calculateLumpsum = () => {
    return Math.round(principle*((Math.pow((1 + (rateOfReturn/100)),(time)))));
}

const calculateReturn = () => {
    if(inputText[0].value.length > 0 && inputText[1].value.length && inputText[2].value.length){
        noOfPayment = time*12;
        ratePerMonth = (rateOfReturn/100)/12;
        totalAmount = isSIPChecked? calculateSIP(ratePerMonth, noOfPayment): calculateLumpsum();
        investmentAmount = isSIPChecked? principle*time*12 : principle;
        outputValue[0].textContent = `₹${totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        outputValue[1].textContent = `₹${investmentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        outputValue[2].textContent = `₹${(totalAmount - investmentAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
}

((() => {
    for(let i=0; i < sipOption.length; i++){
        sipOption[i].addEventListener("input", (e) => {
            checkedSIPOption(e);
            calculateReturn();
        })
    }
})());