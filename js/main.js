import Carta from "./carta.js";

let urlBase = "https://deckofcardsapi.com/api/deck/new/draw/?count=";
let arrayDatos = [];

async function obtenerCarta(numero) {
    try {

        let respuesta = await fetch(`${urlBase}${numero}`);
        
        
        if (!respuesta.ok) {
            switch (respuesta.status) {
                case 400:
                    throw new Error("Solicitud incorrecta");

                case 404:
                    throw new Error("Carta no encontrada");

                default:
                    throw new Error(`Error ${respuesta.status}`);
            }
        }
        let datos = await respuesta.json();        
       
        arrayDatos.push(...datos.cards);       
                   
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    let cartas = [];
    let numero = 6;
    let pagina = 1;

    const btnSiguiente = $("siguiente");
    const btnAnterior = $("anterior");
    
    await cargarPagina(numero, cartas, arrayDatos, pagina);

    btnSiguiente.addEventListener("click", async () => {
        pagina++;         
        numero = await paginaSiguiente(cartas, arrayDatos, numero, pagina);
    })

    btnAnterior.addEventListener("click", async () => {
        pagina--;
        numero = await paginaAnterior(cartas, arrayDatos, numero, pagina);
    })
    
});


const cargarPagina = async (numero, cartas, arrayDatos, pagina) => { 
    await cargarCartas(numero);
    let inicio = numero -6;
    let fin = numero;
    arrayDatos = arrayDatos.slice(inicio, fin);
    
    cartas = mapearCartas(arrayDatos); 
    configurarBotones(pagina);  
    renderizarCartas(cartas);
    const botonesGuardar = document.querySelectorAll(".guardar");
    botonesGuardar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                let code = e.target.dataset.id;                
                let carta = cartas.find(carta => carta.code === code); 
                                
                Carta.guardarCarta(carta);
            }); 
            boton.classList.remove("oculto");
        });
}

const cargarCartas = async (numero) => {      
    await obtenerCarta(numero);
}

const mapearCartas = (datos) => {  
    return datos.map(carta => {
        return Carta.createFromJsonString(carta);
    })
}

const renderizarCartas = (cartas) => {
    let contenedor = $("cartas"); 
    contenedor.innerHTML = "";

    cartas.forEach(carta => {
        let div = carta.createHtmlElement();
        contenedor.appendChild(div);
    });
}

const $ = (id) => {
    return document.getElementById(id);
}

const paginaSiguiente = async (cartas, arrayDatos, numero, pagina) => {
    if (numero === 48) {
        numero += 2;
    }else {
        numero += 6;
    }
    
    cartas.length = 0;
    arrayDatos.length = 0;
    await cargarPagina(numero, cartas, arrayDatos, pagina);
    return numero;
}

const paginaAnterior = async (cartas, arrayDatos, numero, pagina) => {
    if (numero === 48) {
        numero -= 2;
    }else {
        numero -= 6;
    }
    cartas.length = 0;
    arrayDatos.length = 0;
    await cargarPagina(numero, cartas, arrayDatos, pagina);
    return numero;
}

const configurarBotones = (pagina) => {
    if (pagina === 1) {
        $("anterior").classList.add("oculto");
        $("siguiente").classList.remove("oculto");
    } else if (pagina < 10) {
        $("anterior").classList.remove("oculto");
        $("siguiente").classList.remove("oculto");
    } else {
        $("siguiente").classList.add("oculto");
    }
}