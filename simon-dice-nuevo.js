const $btnEmpezar =document.getElementById("boton-empezar");
let patronMaquina = [];
let patronUsuario = [];
let contador= 0;
let index =0 ;
let $estado=document.getElementById("estado");
let $panelEstado=document.getElementById("panel-estado");
let $contador=document.getElementById("nivel");
"panel-estado"
$btnEmpezar.addEventListener("click",comenzarGame);


function comenzarGame(){
    esconderBtnEmpezar();
    manejarRondas();

    
}
function manejarRondas(){
    index=0;
    $estado.innerText="TURNO DE LA MAQUINA";
    $panelEstado.style.background="rgb(170, 62, 54)";
    let nuevoColor = nuevoCuadroRandom();
    patronMaquina.push(nuevoColor);
    let retrasoJugador = (patronMaquina.length+1)*1000;
    patronMaquina.forEach(function(color,index){
        let retrasoIndex= (index +1) *1000;
        setTimeout(function(){
            bloquearClicksUsuario();
            resaltar(color)
        },retrasoIndex);
    });
    // let retrasoMaquina = (1+contador)*1000;
    contador++;
    patronUsuario = [];
    console.log(patronUsuario+" chekeo que patronUsuario este vacio antes de que se llene de vuelta");

    $contador.innerText="NIVEL #" + contador;
    setTimeout(function(){
        movimientoUsuario();
    },retrasoJugador);

    debugger;
  
    //   setTimeout(function(){
    //     console.log(patronMaquina + " patronMaquina");
    //     console.log(patronUsuario + " patronUsuario");
    //     compararPatrones(patronMaquina,patronUsuario);
    // },retrasoJugador+retrasoMaquina); //aca si el jugador se tarda mas de esto muere el simon
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
    $estado.innerText="TURNO DEL USUARIO";
    $panelEstado.style.background="rgb(49, 141, 95)";
    document.querySelectorAll(".panel").forEach(function(color){
        color.addEventListener("click",secuenciaUsuario);
    });
    
    
}
function secuenciaUsuario(e){
    console.log(index);
    const $color=e.target;
    resaltar($color);
    patronUsuario.push($color);
    console.log(patronUsuario[index])
    if (patronMaquina[index] != patronUsuario[index]){
         
    Swal.fire({
        icon: 'error',
        title: 'PERDISTE'
        }).then((result) => {
            if (result.isConfirmed) {
            return location.reload();
        }else{
            location.reload();   
        } 
    })
    }else{
        index++;
    }
    if(patronMaquina.length === patronUsuario.length){
        setTimeout(function(){
            console.log("espero")
            manejarRondas()
        },1200);
    }
}

function compararPatrones(patronMaquina,patronUsuario){
    let contador1=0;
for (x=0;x<patronMaquina.length;x++){
    console.log(patronMaquina[x])
    console.log(patronUsuario[x])
    if (patronMaquina[x] != patronUsuario[x]){
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
function bloquearClicksUsuario(){
    document.querySelectorAll(".panel").forEach(function($color){
        $color.onclick=function(){
            console.log("INPUT BLOQUEADO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    });
}
function esconderBtnEmpezar(){
    console.log("entro")
    $btnEmpezar.innerText="REINICIAR"
    $btnEmpezar.onclick=function(){
        return location.reload();
    }
    
}