const $btnEmpezar =document.getElementById("boton-empezar");
let patronMaquina = [];
let patronUsuario = [];
let contador= 0;
let $estado=document.getElementById("estado");
let $contador=document.getElementById("nivel");
$btnEmpezar.addEventListener("click",comenzarGame);

function comenzarGame(){
    manejarRondas();
}
function manejarRondas(){
    $estado.innerText="turno de la maquina";
    let nuevoColor = nuevoCuadroRandom();
    patronMaquina.push(nuevoColor);
    let retrasoJugador = (patronMaquina.length+1)*1000;
    patronMaquina.forEach(function(color,index){
        let retrasoIndex= (index +1) *1000;
        setTimeout(function(){
            resaltar(color)
        },retrasoIndex);
    });
    let retrasoMaquina = (1+contador)*1000;
    contador++;
    console.log(patronUsuario+"inicio");

    $contador.innerText="nivel = " + contador;
    setTimeout(function(){
        movimientoUsuario();
    },retrasoJugador);

  
    setTimeout(function(){
        console.log(patronMaquina + " patronMaquina");
        console.log(patronUsuario + " patronUsuario");
        compararPatrones(patronMaquina,patronUsuario);
    },retrasoJugador+retrasoMaquina);   //aca si el jugador se tarda mas de esto muere el simon
    patronUsuario = [];
}
function resaltar (color){
    color.style.opacity = 1;
    color.style.borderStyle = "solid";
    setTimeout(function(){
        color.style.opacity=0.5;
        color.style.borderStyle = "none";
    },500);
}
function movimientoUsuario(){
    $estado.innerText="turno del usuario";
    document.querySelectorAll(".panel").forEach(function(color){
        color.addEventListener("click",secuenciaUsuario);
    });
}
function secuenciaUsuario(e){
    const $color=e.target;
    resaltar($color);
    patronUsuario.push($color);

}
function compararPatrones(patronMaquina,patronUsuario){
    let contador1=0;
for (x=0;x<patronMaquina.length;x++){
    console.log(patronMaquina[x])
    console.log(patronUsuario[x])
    if (patronMaquina[x] === patronUsuario[x]){
    }else{
        contador1++;
    }
}
if (contador1>=1){
alert("perdiste");
return location.reload();

}else{
    return manejarRondas();
}
} 
function nuevoCuadroRandom(){
    let random = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
    if(random === 1){
        const cuadroRojo=document.querySelector(".panel-botton-izquierda");
        return cuadroRojo;
    }
    if(random === 2){
        const cuadroAzul=document.querySelector(".panel-botton-derecha");
        return cuadroAzul;
    }
    if(random === 3){
        const cuadroVerde=document.querySelector(".panel-top-izquierda");
        return cuadroVerde;
    }   
    if(random === 4){
        const cuadroAmarillo=document.querySelector(".panel-top-derecha");
        return cuadroAmarillo;
    }
}
