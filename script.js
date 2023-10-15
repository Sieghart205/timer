const scrambleElement = document.getElementById("scramble");


data = [];
counter = 1;
lastMove = "";

const Scramble = ()=>{
    const capas = ["U", "D", "F", "B", "L", "R"];
    const contrarias = { "U": "D", "D": "U", "F": "B", "B": "F", "L": "R", "R": "L" };
    const variables = ["'",2,""];
    for(let i = 0;i<21;i++){
        movimiento = capas[Math.floor(Math.random()*capas.length)]+variables[Math.floor(Math.random()*variables.length)];
        if (contrarias[lastMove[0]] == movimiento[0]){
            i--;
        } else if (movimiento.startsWith(lastMove[0])){
            i--;
        } else {
            data.push(movimiento)
            lastMove = movimiento;
        }
        
    }
    data.forEach(e=>{
        scrambleElement.innerHTML += ` ${e} `
    })
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