import Carta from "./carta.js";

let datos = [];
let cartasGuardadas = [];

document.addEventListener("DOMContentLoaded", () => {
    datos = obtnerCartas();
    cartasGuardadas = crearCartas(datos);
    renderizarCartas(cartasGuardadas);
    
    let ordenarPorCodigo = $("ordenarCodigo");
    ordenarPorCodigo.addEventListener("click", () => {
        cartasGuardadas.sort((a,b) => {
            if (a.code < b.code) {
                return -1;
            }
            if (a.code > b.code) {
                return 1;
            }
            return 0;
        })
        renderizarCartas(cartasGuardadas);
    })

    let ordenarPorValor = $("ordenarValor");
    ordenarPorValor.addEventListener("click", () => {
        cartasGuardadas.sort((a,b) => {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        })
        renderizarCartas(cartasGuardadas);
    })

    let ordenarPorSuits = $("ordenarSuits");
    ordenarPorSuits.addEventListener("click", () => {
        cartasGuardadas.sort((a,b) => {
            if (a.suit < b.suit){
                return -1;
            }
            if (a.suit > b.suit) {
                return 1;
            }
            return 0;
        })
        renderizarCartas(cartasGuardadas);
    })
})



const obtnerCartas = () => {
    return JSON.parse(localStorage.getItem("cartas"));
}

const crearCartas = (data) => {
    return data.map(ob => Carta.createFromJsonString(ob));
}

const renderizarCartas = (cartas) => {
    let contenedor = $("cartas"); 
    contenedor.innerHTML = "";

    cartas.forEach(carta => {
        let div = carta.createHtmlElement();
        contenedor.appendChild(div);
    });
    let botonesGurdar = document.querySelectorAll(".guardar");
    botonesGurdar.forEach(boton => {
        boton.classList.add("oculto");
    })
}

const $ = (id) => {
    return document.getElementById(id);
}