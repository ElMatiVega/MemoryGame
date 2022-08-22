//variable initialization
let cardOne= null;
let cardTwo= null;
let firstResult=null;
let secondResult=null;
let uncoveredCards= 0;
let movements=0;
let hits=0;
let timer= false;
let timerBack= 45;
let initialTime=45;
let timer_Back_Id=null;

let winAudio= new Audio('./sounds/win (2).wav');
let loseAudio= new Audio('./sounds/lose.wav')
let clickAudio= new Audio('./sounds/click.wav');
let rightAudio= new Audio('./sounds/right.wav');
let wrongAudio= new Audio('./sounds/wrong.wav');



//apuntando a documento HTML
let showMovements= document.getElementById('movementsid');
let showHits= document.getElementById('smallHitsid');
let showTimer= document.getElementById('timeLeftid');
showTimer.innerHTML=`Tiempo: ${timerBack} segundos`
let reset1=document.getElementById('resetid');
reset1.addEventListener('click',handlerReset);
//Generacion de números aleatorios
let number= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number=number.sort(()=>{return Math.random()-0.5});
// console.log(number)
// console.log(handlerReset())
//Funcionnes



function countTime(){
timer_Back_Id = setInterval(()=>{
        timerBack --;
        showTimer.innerHTML=`Tiempo: ${timerBack} segundos`;
        if(timerBack===0){
        clearInterval(timer_Back_Id);
        blockCard();
        loseAudio.play()
        showTimer.innerHTML=`Se te termino el tiempo😔😢😭`
        }
    },1000)
}

function blockCard(){
    for(let i=0; i<15;i++){
        let cardBlock=document.getElementById(i);
        //cardBlock.innerHTML=`<img src="./image/${number[i]}.png" alt="">`;
        cardBlock.disabled=true;
    }
};

//function principal
function handlerButtom(id){

if(timer===false){
    countTime();
    timer=true;
}

uncoveredCards++;
console.log(uncoveredCards)
if(uncoveredCards===1){
//mostrar el primer número
cardOne=document.getElementById(id);
firstResult=number[id];
cardOne.innerHTML= `<img src="./image/${firstResult}.png" alt="">`;
clickAudio.play();

//Deshabilitar primer botor
cardOne.disabled=true;
}else if(uncoveredCards===2){
//Mostrar el segundo número.
cardTwo=document.getElementById(id);
secondResult=number[id];
cardTwo.innerHTML=`<img src="./image/${secondResult}.png" alt="">`;

//deshabilitamos el segundo boton.
cardTwo.disabled=true;

//Incrementar movimientos
movements++;
showMovements.innerHTML=`Movimientos: ${movements}`;


if(firstResult===secondResult){
 //Poner en 0 el contador de tarjetas destapadas
uncoveredCards=0;

 //Aumentar aciertos
hits++;
showHits.innerHTML= `Aciertos: ${hits}`;
rightAudio.play();

if(hits===8){
    winAudio.play();
    clearInterval(timer_Back_Id);
    showHits.innerHTML= `Aciertos: ${hits}👏👏😀🎉🎊🎆🎆`;
    showTimer.innerHTML=`Genial!!! lo hiciste en ${initialTime-timerBack} segundos.`
    if(movements===8){
        showMovements.innerHTML=`Movimientos: ${movements} Te Super-Mega-ArchiFELICITO, Perfecto `;
    }else if(movements >8&&movements<15){
        showMovements.innerHTML=`Movimientos: ${movements} Muy bien te Felicito, ganaste estos animalitos🐶🐱‍🚀🐱‍🐉🦓`;
    }else{
        showMovements.innerHTML=`Movimientos: ${movements} Bien sigue así👏👏👏👏`;
    }
    }
}else{
//Mostrar momentaneamente valores y volver a tapar
        wrongAudio.play();
        setTimeout(()=>{
        cardOne.innerHTML=' ';
        cardTwo.innerHTML=' ';
        cardOne.disabled=false;
        cardTwo.disabled=false;
        uncoveredCards=0;
        },800)
    }
 }
}

function handlerReset(){
    clickAudio.play();
    setTimeout('window.location.reload()',1000)
}


