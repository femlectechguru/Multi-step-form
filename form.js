const circlesteps = document.querySelectorAll('.step');// get all circles
const steps = document.querySelectorAll('.stp');// get all steps
const formInputs = document.querySelectorAll('.step-1 form input');
const plans = document.querySelectorAll('.plan-card');// get all plans
const addons = document.querySelectorAll('.box');
const switcher = document.querySelector('.switch');
const total = document.querySelector('.total b');
const planPrice = document.querySelector('.plan-price');

let time;
let currentStep = 1;
let currentCircle = 0;

const obj = {
    plan: null,
    kind: null,
    price: null,
};

steps.forEach((step ) =>{
    const nextBtn = step.querySelector('.nxt-step');
    const prevBtn = step.querySelector('.prev-step');
    if(prevBtn){
        prevBtn.addEventListener('click', ()=>{
           document.querySelector(`.step-${currentStep}`).style.display = 'none';
           currentStep--;
           document.querySelector(`.step-${currentStep}`).style.display = 'flex';
           circlesteps[currentCircle].classList.remove('active');
           currentCircle--;
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
        circlesteps[currentCircle].classList.add('active');
        summary(obj);
    });
 
});
    function summary(obj) {
    const planName = document.querySelector('.plan-name');
    const planPrice = document.querySelector('.plan-price');
    planPrice.innerHTML = `${obj.price.innerText}`;
    planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? 'yearly': 'monthly'})`;
} 
/* function summary(obj) {
    const planValue = document.querySelector('#plan-value');
    const kindValue = document.querySelector('#kind-value');
    const priceValue = document.querySelector('#price-value');
    
    if (planValue !== null && kindValue !== null && priceValue !== null) {
      planValue.innerText = obj.plan;
      kindValue.innerText = obj.kind;
      priceValue.innerText = obj.price;
    } 
  }*/
  

function findLabel(el){
    const idVal = el.id;
    const labels = document.getElementsByTagName('label');
    for(let i = 0; i < labels.length; i++){
        if(labels[i].htmlFor == idVal) {
            console.log(`Found label element for ${idVal}:`, labels[i]);
            if (labels[i].nextElementSibling) {
                console.log(`Next sibling element for ${idVal}:`, labels[i].nextElementSibling);
                return labels[i];
            } else {
                console.error(`Label element for ${idVal} has no next sibling element!`);
                return null;
            }
        }
    }
    console.error(`Label element for ${idVal} not found!`);
    return null;
}

function validateForm(){
    let valid = true;
    for(let i =0; i< formInputs.length; i++){
        if(!formInputs[i].value){
            valid = false;
            formInputs[i].classList.add('err');
            const label = findLabel(formInputs[i]);
            if (label && label.nextElementSibling) {
                label.nextElementSibling.style.display = 'flex';
            } else {
                console.error(`Could not display error message for ${formInputs[i].id}`);
            }
        }else {
            valid = true;
            formInputs[i].classList.remove('err');
            const label = findLabel(formInputs[i]);
            if (label && label.nextElementSibling) {
                label.nextElementSibling.style.display = 'none';
            } else {
                console.error(`Could not hide error message for ${formInputs[i].id}`);
            }
        }
    }
    return valid;
}




plans.forEach((plan) => {
    plan.addEventListener('click', () => {
        document.querySelector('.selected').classList.remove('selected');
        plan.classList.add('selected');
        const planName = plan.querySelector('b');
        const planPrice = plan.querySelector('.plan-priced');
        obj.plan = planName;
        obj.price = planPrice;
    });
});

switcher.addEventListener('click', () => {
    const val = switcher.querySelector('input').checked;
    if(val){
        document.querySelector('.monthly').classList.remove('sw-active');
        document.querySelector('.yearly').classList.add('sw-active');
    }else{
        document.querySelector('.monthly').classList.add('sw-active');
        document.querySelector('.yearly').classList.remove('sw-active');  
    }
    switchPrice(val);
    obj.kind = val;
});
addons.forEach((addon) => {
    addon.addEventListener('click', (e) => {
        const addonSelect = addon.querySelector('input');
        const ID = addon.getAttribute('data-id');
        if(addonSelect.checked){
            addonSelect.checked = false;
            addon.classList.remove('ad-selected');
            showAddon(ID , false);
        }else{
            addonSelect.checked = true;
            addon.classList.add('ad-selected');
            showAddon(addon, true);
            e.preventDefault();
        }
    });
});

function switchPrice(checked){
    const yearlyPrice = [90, 120, 150];
    const monthlyPrice = [9, 12, 15];
    const prices = document.querySelectorAll('.plan-priced');
    if(checked){
        prices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
        prices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
        prices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
        setTimeout(true)
    }else{
        prices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
        prices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
        prices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
        setTimeout(false)
    }
}

function showAddon(ad, val){
    const temp = document.getElementsByTagName('template')[0];
    const clone = temp.content.cloneNode(true);
    const serviceName = clone.querySelector('.service-name');
    const servicePrice = clone.querySelector('.service-Onprice');
    const serviceID = clone.querySelector('.selected-onlineaddons');
    if(ad && val){
        serviceName.innerText = ad.querySelector('label').innerText;
        servicePrice.innerText = ad.querySelector('.price').innerText;
        serviceID.setAttribute('data-id', ad.dataset.id);
        document.querySelector('.addons').appendChild(clone);
    }else{
        const addons = document.querySelectorAll('.selected-onlineaddons');
        addons.forEach((addon) => {
            const attr = addon.getAttribute('data-id');
            if(attr == ad) {
                addon.remove();
            }
        });
    }
}
function setTotal(){
    const str = planPrice.innerHTML;
    const res = str.replace(/\D/g, "");
    const addonPrices = document.querySelectorAll('.selected-onlineaddons .service-price');
/*     /* let total = parseInt(res);
  addonPrice.forEach(price => {
    total += parseInt(price.innerHTML);
  });
  document.querySelector('.total b').innerHTML = total; */

let val = 0;
for(let i = 0; i < addonPrices.length; i++){
    const str = addonPrices[i].innerHTML;
    const res = str.replace(/\D/g, "");

    val += Number(res);
}

total.innerHTML = `$${val + Number(res)}/${time?"yr":"mo"}`;
}
function setTime(t){
    return time = t;
} 