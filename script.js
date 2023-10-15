class Cube{
    constructor(capas,contrarias,variables,scrambleElement){
        this.capas = capas;
        this.contrarias = contrarias;
        this.variables = variables;
        this.scrambleElement = scrambleElement;
    }

    Scramble(){
        let lastMove = [];
        let contador = 0;
        let scramble = [];
        for(let i = 0; i<21;i++){
            let movimiento = this.capas[Math.floor(Math.random()*this.capas.length)] + this.variables[Math.floor(Math.random()*this.variables.length-1)];
            if(lastMove == ""){
                contador++;
                lastMove.push(movimiento);
                scramble.push(movimiento);
                console.log(lastMove);
            } else if(contador <2){
                if(movimiento.startsWith(lastMove[lastMove.length-1][0])){
                    let functionals = capas.filter(move => move.startsWith(!lastMove[lastMove.length-1][0]));
                    console.log(functionals);
                    movimiento = functionals[Math.floor(Math.random()*functionals.length)] + this.variables[Math.floor(Math.random()*this.variables.length)];
                    lastMove.push(movimiento);
                    scramble.push(movimiento);
                    contador++;
                } else {
                    lastMove.push(movimiento)
                    scramble.push(movimiento)
                    contador++;
                }
            } else if(contador <= 2){
                for(let x = 0;x < lastMove.length-1;x++){
                    if(this.contrarias[lastMove[x][0]] == movimiento[0]){
                        let functionals = capas.filter(move => move.startsWith(!movimiento[0]));
                        movimiento = functionals[Math.floor(Math.random()*functionals.length)] + this.variables[Math.floor(Math.random()*this.variables.length)];
                        lastMove = [];
                        lastMove.push(movimiento);
                        scramble.push(movimiento);
                        contador = 0;
                    }
                }
            }
        }
        scramble.forEach(e=>{
            this.scrambleElement.innerHTML += ` ${e} `;
        })
    }
}

const capas = ["U", "D", "F", "B", "L", "R"];
const contrarias = { "U": "D", "D": "U", "F": "B", "B": "F", "L": "R", "R": "L" };
const variables = ["'", 2, ""];
const scrambleElement = document.getElementById("scramble")

rubikCube = new Cube(capas,contrarias,variables,scrambleElement);
rubikCube.Scramble();

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
            rubikCube.Sramble();
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