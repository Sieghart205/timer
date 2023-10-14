const datos = ["R","R2","R'","L","L2","L'","U","U2","U'","D","D2","D'","F","F2","F'","B","B2","B"];
const scramble = document.getElementById("scramble");

let data = []
movimientoAnterior = "";
firstMove = true

const Scramble = ()=>{
    for(i = 0; i<21;i++){
        let movimiento = datos[Math.floor(Math.random()*datos.length)];
    if (firstMove){
        data.push(movimiento)
        movimientoAnterior = movimiento
        firstMove = false
    }
    else if (movimiento.startsWith(movimientoAnterior[0])){
        i --;
    }
    else {
        data.push(movimiento);
        movimientoAnterior = movimiento;
    }
}
data.forEach (e=>{
    scramble.innerHTML += ` ${e} `;
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
    }
    console.log(key)
})

document.body.addEventListener("keyup", (e) => {
    const key = e.key;
    if (key === " ") {
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