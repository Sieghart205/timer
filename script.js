const datos = ["R","R2","R'","L","L2","L'","U","U2","U'","D","D2","D'","F","F2","F'","B","B2","B"];
const scramble = document.getElementById("scramble");

let data = [];
let movimientoAnterior = "";

const getRandomMove = () => {
    return datos[Math.floor(Math.random() * datos.length)];
}

const getRandomLayerMove = (layer) => {
    const layerMoves = datos.filter(move => move.startsWith(layer));
    if (layerMoves.length === 0) {
        return getRandomMove();
    }
    return layerMoves[Math.floor(Math.random() * layerMoves.length)];
}

const Scramble = () => {
    const layers = ["U","F","R","L","B","D"];
    
    for (let i = 0; i < 21; i++) {
        const layer = layers[Math.floor(Math.random() * layers.length)];
        let movimiento = getRandomLayerMove(layer);
        
        if (i > 0 && movimiento.startsWith(movimientoAnterior[0])) {
            i--;
        } else {
            data.push(movimiento);
            movimientoAnterior = movimiento;
        }
    }

    scramble.innerHTML = data.join(" ");
}

Scramble();



const timer = document.getElementById("time");
time = 0.00

takingTime = false


const tomarTiempo = () => {
    intervalId = setInterval(() => {
        timer.innerHTML = `<h1>${time.toFixed(2)}</h1>`;
        time += 0.01;
    }, 10);
};

document.body.addEventListener("keydown",(e)=>{
    
    const key = e.key;
    if(key == " "){
        timer.classList.add("press")
        e.preventDefault()
    }
    console.log(key)
})

document.body.addEventListener("keyup", (e) => {
    
    const key = e.key;
    if (key === " ") {
        e.preventDefault()
        if (takingTime) {
            takingTime = false;
            clearInterval(intervalId);
            document.getElementById("times").innerHTML += `<tr><td>${scramble.innerHTML}</td><td>${time.toFixed(2)}</td></tr>`
            scramble.innerHTML = ""
            data = [];
            Scramble();
        } else {
            takingTime = true;
            time = 0.00;
            tomarTiempo();
        }
        timer.classList.remove("press")
    }
    else if (key === "Escape") {
        clearInterval(intervalId);
        takingTime = false;
        timer.classList.remove("press");
    }
});