const capas = ["U", "D", "F", "B", "L", "R"];
const contrarias = { "U": "D", "D": "U", "F": "B", "B": "F", "L": "R", "R": "L" };
const variables = ["'", 2, ""];
const scrambleElement = document.getElementById("scramble")

const Scramble = (capas,contrarias,variables,scrambleElement)=>{
    let lastLayer = "";
    let scramble = [];
    let functionals;
    for(let i = 0;i<19;i++){
        let movimiento = capas[Math.floor(Math.random()*capas.length)] + variables[Math.floor(Math.random()*variables.length)];
        if(scramble == ""){
            scramble.push(movimiento);
            lastLayer = movimiento[0];
        } else if(scramble.length != 3){
            if(lastLayer == movimiento[0]){
                functionals = capas.filter(move=> move != lastLayer);   
                movimiento = functionals[Math.floor(Math.random()*functionals.length)] + variables[Math.floor(Math.random()*variables.length)];
                scramble.push(movimiento);
                lastLayer = movimiento[0];
            } else {
                scramble.push(movimiento);
                lastLayer = movimiento[0];
            }
        } else {
            let ultimasTres = scramble.slice(-3);
            ultimasTres.forEach(e=>{
                if(contrarias[e[0]] == movimiento[0]){
                    functionals = capas.filter(move=> move != lastLayer)
                    console.log(functionals);
                    movimiento = functionals[Math.floor(Math.random()*functionals.length)] + variables[Math.floor(Math.random()*variables.length)];
                    scramble.push(movimiento);
                    lastLayer = movimiento[0];
                } else {
                    if(lastLayer == movimiento[0]){
                        functionals = capas.filter(move=> move != lastLayer);   
                        movimiento = functionals[Math.floor(Math.random()*functionals.length)] + variables[Math.floor(Math.random()*variables.length)];
                        scramble.push(movimiento);
                        lastLayer = movimiento[0];
                    } else {
                        scramble.push(movimiento);
                        lastLayer = movimiento[0];
                    }
                }
            })
        }
    }
    scramble.forEach(e=>{
        scrambleElement.innerHTML += ` ${e} `;
    })
}

Scramble(capas,contrarias,variables,scrambleElement);


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
            Scramble(capas,contrarias,variables,scrambleElement);
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