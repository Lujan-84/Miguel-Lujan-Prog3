export default class Carta {
    code;
    value;
    suit;
    image;

   


    constructor(code, value, suit, image) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.image = image;

        
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        
        return new Carta(
            json.code, 
            json.value, 
            json.suit,
            json.image,
        )
    }


    createHtmlElement(){
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Codigo: ${this.code}</h3>
            <a href="${this.image}" target="_blank" rel="noopener noreferrer">
                <img src="${this.image}" alt="imgCarta">
            </a> 
            <p>Suit: ${this.suit}</p>
            <p>Valor: ${this.value}</p>
            <button class="guardar" data-id="${this.code}">Guardar</button>
            `;
     
        return div;
    }

    static guardarCarta(carta) {  
        let cartas;
        
        if (localStorage.getItem("cartas")){
            cartas = JSON.parse(localStorage.getItem("cartas"));
        } else {
            cartas = [];
        }

        cartas.push(carta);
        console.log(cartas);
        
        localStorage.setItem("cartas", JSON.stringify(cartas));
    }
}
