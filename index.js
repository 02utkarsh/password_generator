const contentslider=document.querySelector("[datalenslider]");
const lengthdisplay=document.querySelector("[data-lenNumber]");
const passwordisp=document.querySelector("[data-passwordDisplay]");
const cpybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[datacopymsg]");
const upperCaseCheck=document.querySelector("#uppercaseselector");
const lowerCaseCheck=document.querySelector("#lowercaseselector");
const symbolCheck=document.querySelector("#symbolselector");
const numbercheck=document.querySelector("#numberselector");
const indicator=document.querySelector("[data-indicator]");
const generate=document.querySelector("[genbtn]");
const allcheck=document.querySelectorAll("input[type=checkbox]"); 
const symbols='~!@#$%^&*()_+-={}[]:;\|/?.,><';
let password="";
let passwordlength=10;
let checkcount=0;
handleslider();
console.log('1');

function handleslider(){
    contentslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
};
console.log('2');
function setIndicator(color){
    indicator.style.backgroundColor=color;
};
console.log('3');
contentslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
});
console.log('4');
function getRndInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
};
console.log('5');
function rtnnumbr(){
    return getRndInt(0,9);
};
console.log('6');
function rtnLowerCase(){
    const ans= getRndInt(97,123);
    return String.fromCharCode(ans);
};

function rtnUpperCase(){
    const ans= getRndInt(65,91);
    return String.fromCharCode(ans);
};

function rtnSymbol(){
    const pnt=getRndInt(0,symbols.length);
    return symbols.charAt(pnt);
};
console.log('9');
function handlecheckboxchange(){
    checkcount=0;
    allcheck.forEach((checkbox) => {
        if(checkbox.changed)
            checkcount++;
    });

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
};
console.log('10');

allcheck.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckboxchange());
});
console.log('11');

function calcstrength(){
    let uppercheck=false;
    let lowercheck=false;
    let numcheck=false;
    let symcheck=false;
    if(upperCaseCheck.checked) uppercheck=true;
    if(lowerCaseCheck.checked) lowercheck=true;
    if(numbercheck.checked) numcheck=true;
    if(symbolCheck.checked) symcheck=true;

    if(uppercheck && lowercheck &&(numcheck|| symcheck) && passwordlength>=8){
        setIndicator('#0f0');
    } 
    else if((uppercheck || lowercheck)&&(numcheck|| symcheck) && passwordlength<=6){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
};
console.log('12');
function  copycontent(){
    navigator.clipboard.writeText(passwordisp.value)
    copymsg.innerText='copied';

    copymsg.classList.add('active');
    setTimeout(() => {
       copymsg.classList.remove('active'); 
    }, 2000);
};
console.log('13');
cpybtn.addEventListener('click',() => {
    if(passwordisp.value){
        copycontent();    
    }
}
);
console.log('14');
generate.addEventListener('click', () => {
    console.log('function calleds');
    // if (checkcount==0){
    //     console.log('function calleds2');
    //     return;
    // }
    
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    console.log('function calleds2');
    password="";

    // if(upperCaseCheck.checked){
    //     password+=rtnUpperCase();
    // }

    // if(lowerCaseCheck.checked){
    //     password+=rtnLowerCase();
    // }
    // if(symbolCheck.checked){
    //     password+=rtnSymbol();
    // }

    // if(numbercheck.checked){
    //     password+=rtnnumbr();
    // }
    console.log('function calleds3');
    let funcArr=[];
    if(upperCaseCheck.checked){
        funcArr.push(rtnUpperCase);
    }

    if(lowerCaseCheck.checked){
        funcArr.push(rtnLowerCase);
    }
    if(symbolCheck.checked){
        funcArr.push(rtnSymbol);
    }

    if(numbercheck.checked){
        funcArr.push(rtnnumbr);
    }
    
    for(let i=0; i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    
    for(let i=0;i<passwordlength-funcArr.length;i++){
        let nnum=getRndInt(0,funcArr.length);
        password += funcArr[nnum]();
    }
    console.log('temporary addition done');
    passwordisp.value=password;
    console.log('password displayed');
    calcstrength();

});

console.log('15');

