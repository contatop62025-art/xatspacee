/*================================
 XATSPACE PREMIUM SCRIPT
================================*/


/*==============================
 LOADING
==============================*/

window.addEventListener("load",()=>{

const loading=document.getElementById("loading");

setTimeout(()=>{

loading.style.opacity="0";

setTimeout(()=>{

loading.remove();

},1000);


},1000);


});





/*==============================
 RELÓGIO E DATA
==============================*/


function clock(){


const now=new Date();


let time=

now.toLocaleTimeString("pt-BR");



let date=

now.toLocaleDateString("pt-BR",{

weekday:"long",

day:"2-digit",

month:"long",

year:"numeric"

});



document.getElementById("time").innerHTML=time;


document.getElementById("date").innerHTML=date;



}



setInterval(clock,1000);

clock();





/*==============================
 PLAYER DE MÚSICA
==============================*/


const audio=

document.getElementById("audio");


const play=

document.getElementById("play");


const pause=

document.getElementById("pause");


const volume=

document.getElementById("volume");




audio.volume=.3;



play.onclick=async()=>{


try{


await audio.play();


animateEqualizer(true);



}catch(e){


console.log(e);


}



};



pause.onclick=()=>{


audio.pause();


animateEqualizer(false);



};



volume.oninput=()=>{


audio.volume=

volume.value;


};





/*==============================
 EQUALIZADOR
==============================*/


let equalizerTimer;


function animateEqualizer(status){


const bars=

document.querySelectorAll(
".equalizer span"
);



if(status){


equalizerTimer=setInterval(()=>{


bars.forEach(bar=>{


bar.style.height=

(10+
Math.random()*35)
+"px";



});


},120);



}else{


clearInterval(equalizerTimer);



bars.forEach(bar=>{


bar.style.height="15px";


});


}


}





/*==============================
 TEMAS
==============================*/


const root=

document.documentElement;



const themes={



blue:{

primary:"#00eaff",

background:"#031525"

},



purple:{

primary:"#b026ff",

background:"#17002b"

},



green:{

primary:"#00ff88",

background:"#001b12"

},



red:{

primary:"#ff004c",

background:"#250008"

},



dark:{

primary:"#ffffff",

background:"#000000"

},



galaxy:{

primary:"#9d00ff",

background:"#050014"

},



rainbow:{

primary:"#ff00ff",

background:"#001"

}



};






document.querySelectorAll("[data-theme]")

.forEach(btn=>{


btn.onclick=()=>{


let theme=

themes[btn.dataset.theme];


root.style.setProperty(

"--primary",

theme.primary

);



root.style.setProperty(

"--background",

theme.background

);



saveSettings();



showToast(

"✨ Tema alterado"

);



};



});







/*==============================
 SLIDERS
==============================*/



document
.getElementById("blur")
.oninput=e=>{


root.style.setProperty(

"--blur",

e.target.value+"px"

);



saveSettings();



};





document
.getElementById("opacity")
.oninput=e=>{


let value=

e.target.value/100;



root.style.setProperty(

"--glass",

`rgba(255,255,255,${value})`

);



saveSettings();



};






/*==============================
 LOCAL STORAGE
==============================*/



function saveSettings(){


let data={


primary:

getComputedStyle(root)

.getPropertyValue("--primary"),



background:

getComputedStyle(root)

.getPropertyValue("--background"),



blur:

getComputedStyle(root)

.getPropertyValue("--blur"),



glass:

getComputedStyle(root)

.getPropertyValue("--glass")



};



localStorage.setItem(

"xatspace-theme",

JSON.stringify(data)

);


}





function loadSettings(){


let data=

JSON.parse(

localStorage.getItem(
"xatspace-theme"
)

);



if(!data)return;



root.style.setProperty(

"--primary",

data.primary

);



root.style.setProperty(

"--background",

data.background

);



root.style.setProperty(

"--blur",

data.blur

);



root.style.setProperty(

"--glass",

data.glass

);



}



loadSettings();







/*==============================
 PARTICULAS
==============================*/


const canvas=

document.getElementById(
"particles"
);


const ctx=

canvas.getContext("2d");



let particles=[];



function resize(){


canvas.width=

window.innerWidth;


canvas.height=

window.innerHeight;



}


resize();


window.onresize=resize;




for(let i=0;i<120;i++){


particles.push({


x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*3+1,

speed:

Math.random()*0.5+.2



});


}




function particleAnimation(){


ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);



particles.forEach(p=>{


ctx.beginPath();


ctx.fillStyle=

"rgba(0,255,255,.6)";


ctx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);


ctx.fill();



p.y-=p.speed;



if(p.y<0)

p.y=canvas.height;



});



requestAnimationFrame(

particleAnimation

);


}



particleAnimation();






/*==============================
 MOUSE GLOW
==============================*/


const glow=

document.getElementById(
"mouseGlow"
);



document.addEventListener(
"mousemove",
e=>{


glow.style.left=

e.clientX-125+"px";


glow.style.top=

e.clientY-125+"px";



});







/*==============================
 TOAST
==============================*/


function showToast(text){


const toast=

document.getElementById(
"toast"
);



toast.innerHTML=text;


toast.style.opacity=1;



setTimeout(()=>{


toast.style.opacity=0;


},2000);



}