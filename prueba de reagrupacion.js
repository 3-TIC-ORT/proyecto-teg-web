let numerofichas = document.getElementById ("numerofichas")
let boton = document.getElementById ("button")
let numero = 1;
let fichas =[
    {fichas ="5", color =cantidadjugadores}

]
fichas="5+3"
function  cantidadpasable(){
    document.getElementById ("elegido").textContent = numerofichas.value;
}
while (numero >= numerofichas) {
    let pizzeria=document.createElement ("option")
 pizzeria.textContent= "queres pasar " + numero + "fichas"
 numerofichas.appendChild (pizzeria)
 numero++
}

boton.addEventListener("click",cantidadpasable)