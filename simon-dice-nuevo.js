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
    let retrasoMaquina = 1000 + (contador*1000);
    contador++;
    $contador.innerText="nivel = " + contador;
    setTimeout(function(){
        movimientoUsuario();
    },retrasoJugador);

  
    setTimeout(function(){
        console.log(patronMaquina + " patronMaquina");
        console.log(patronUsuario + " patronUsuario");
        compararPatrones(patronMaquina,patronUsuario);//no importa si los patrones no son iguales, no entra a la funcion
    },retrasoJugador+retrasoMaquina);   //aca si el jugador se tarda mas de esto muere el simon

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
    for(let i =0; i < patronMaquina.length;i++){
        for(let j =0; j < patronUsuario.length;j++){
            if(patronMaquina[i] == patronUsuario[j]){
                patronUsuario = [];
                manejarRondas();
            }
            else{
                alert("perdiste o algo anda mal");
                reiniciarGame();
            }
        }
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
function reiniciarGame(){
    patronMaquina = [];
    patronUsuario = [];
    contador= 0;
    $btnEmpezar.addEventListener("click",comenzarGame);

}