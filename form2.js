const circlesteps = document.querySelectorAll('.step');// get all circles
const steps = document.querySelectorAll('.stp');// get all steps
const formInputs = document.querySelectorAll('.step-1 form input');
const plans = document.querySelectorAll('.plan-card');// get all plans
const addons = document.querySelectorAll('.box');
const switcher = document.querySelector('.switch');
const total = document.querySelector('.total b');
const planPrice = document.querySelector('.plan-price');

const infoErr = document.querySelectorAll('.error');

let time =0;
let currentStep = 1;
let currentCircle = 0;

const obj = {
    plan: null,
    kind: null,
    price: null,
};

steps.forEach((step =>{
    const nextBtn = step.querySelector('.nxt-step');
    const prevBtn = step.querySelector('.prev-step');
    if(prevBtn){
        prevBtn.addEventListener('click', ()=>{
           document.querySelector(`.step-${currentStep}`).style.display = 'none';
           currentStep--;
           document.querySelector(`.step-${currentStep}`).style.display = 'flex';
           circlesteps[currentCircle].classList.remove('active');
           currentStep--;
        });
    }
    
        nextBtn.addEventListener('click', ()=>{
        document.querySelector(`.step-${currentStep}`).style.display = 'none';
        if(currentStep < 5 && validateForm()){
            currentStep++;
            currentCircle++;
            setTotal();
        }
        document.querySelector(`.step-${currentStep}`).style.display = 'flex';
        circlesteps[currentCircle].classList.remove('active');
        summary(obj);
     });
 }
));
function summary(obj) {
    const planName = document.querySelector('.plan-name');
    const planPrice = document.querySelector('.plan-price');
    planPrice.innerHTML = `${obj.price.innerText}`;
    planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? 'yearly': 'monthly'})`;
}
function validateForm(){
const showError = (input, arrTnfoErr, message) => {
    input.classList.add('err');
    infoErr[arrTnfoErr].classList.add('d-block');
    infoErr[arrTnfoErr].textContent = message;
};
const hideError = (input, arrTnfoErr) => {
    input.classList.remove('err');
    infoErr[arrTnfoErr].classList.remove('d-block');
    //infoErr[arrTnfoErr].textContent = '';
};

let inputNameValue = '';

const validateInput = (input, arrTnfoErr,wordLength) => {
    if(!wordLength){
        if(!input.value){
            showError(input, arrTnfoErr, 'This field is required');
           
        }else{
            hideError(input, arrTnfoErr);
            inputNameValue = input.value;
        }
    }
}
}