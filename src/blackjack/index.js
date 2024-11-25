import _ from 'underscore';
// import { crearDeck as crearNuevoDeck } from './usecases/crear-deck';
 import { crearDeck } from './usecases';
let deck = [];


// Arrays con los tipos y cartas especiales
const tipos = ['C', 'D', 'H', 'S'];           // Tipos de cartas: tréboles, diamantes, corazones y picas
const especiales = ['A', 'J', 'Q', 'K'];       // Cartas especiales: As, Jota, Reina y Rey
let puntosJugador = 0;
let puntosComputadora = 0;


// Referencias de propiedades del html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnStop');
const btnNuevoJuego = document.querySelector('#btnNewgame');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');
// Función para crear el mazo de cartas

// Ejecutamos la función para crear el mazo
 deck = crearDeck(tipos,especiales);
 console.log(deck);

// Función para pedir una carta del mazo
const pedirCarta = () => {
    if (deck.length === 0) {                   // Si el mazo está vacío, lanzamos un error
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();                  // Tomamos la última carta del mazo y la eliminamos
/*     console.log(deck);                         // Ver el mazo restante en consola
    console.log(carta);       */                  // Ver la carta que se tomó en consola
    return carta;                              // Retornamos la carta tomada
};

// Pedimos una carta para probar la función pedirCarta
pedirCarta();

// Función para obtener el valor de una carta específica
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Obtenemos el valor (ej: '10' de '10H')
    return (isNaN(valor)) ?                          // Si no es un número
           (valor === 'A') ? 11 : 10                 // As vale 11, otras especiales valen 10
           : valor * 1;                              // Si es un número, lo multiplicamos por 1 para pasarlo a número
};

// Probamos la función valorCarta con la carta obtenida en pedirCarta
/* const valor = valorCarta(pedirCarta());
console.log({ valor }); */

//Turno de la computadora
const turnoComputadora = (puntosMinimos) =>{
do{
    const carta = pedirCarta();
    

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    // Crear la imagen de la carta y agregarla al div
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);


    if(puntosMinimos > 21 ) {
        break;
    }

} while(   (puntosComputadora < puntosMinimos)        &&  (puntosMinimos <= 21)  ); 

setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana');
    } else if (puntosComputadora > 21) {
        alert('Jugador gana');
    } else if (puntosMinimos > 21) {
        alert('Computadora gana');
    } else if (puntosComputadora > puntosMinimos) {
        alert('Computadora gana');
    } else {
        alert('Jugador gana');
    }
    btnNuevoJuego.click();
}, 1000); // Puedes cambiar 1000 por el tiempo en milisegundos que prefieras
};









btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    console.log(carta);

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // Crear la imagen de la carta y agregarla al div
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    // Comprobar el estado del juego
    if (puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('¡21! Genial. Posiblemente seas el ganador...');
        btnPedir.disabled = true;
    }
});



btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});


btnNuevoJuego.addEventListener('click',() => {
    console.clear();
    deck = crearDeck(tipos,especiales);

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1] .innerText= 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '' ;

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});

