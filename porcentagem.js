let pvlr1 = document.getElementById("por1");
let pvlr2 = document.getElementById("por2");
let pvlr3 = document.getElementById("por3");

let tempP1 = 0
let tempP2 = 0;
let tempP3 = 0;

function calcularPorcentagem1() {
    
    let valor1 = parseFloat(pvlr1.value);
    let valor2 = parseFloat(pvlr2.value);
    let valor3 = parseFloat(pvlr3.value);

    if (valor1 > 0 && valor2 > 0 && tempP1 == 0) {
    let porcentagem = (valor1 / valor2) * 100;
    pvlr3.value = porcentagem.toFixed(2);} else if (valor1 > 0 && valor3 > 0) {
    let porcentagem = (valor1 * valor3) / 100;
    pvlr2.value = porcentagem.toFixed(2);
    tempP1 = 1;
    }
}

function calcularPorcentagem2() {
    let valor1 = parseFloat(pvlr1.value);
    let valor2 = parseFloat(pvlr2.value);
    let valor3 = parseFloat(pvlr3.value);
    if (valor1 > 0 && valor2 > 0 && tempP2 == 0) {
        let porcentagem = (valor2 / valor1) * 100;
        pvlr3.value = porcentagem.toFixed(2);
    } else if (valor2 > 0 && valor3 > 0) {
        let porcentagem = (valor2 * valor3) / 100;
        pvlr1.value = porcentagem.toFixed(2);
        tempP2 = 1;
        
    }
}

function calcularPorcentagem3() {
    let valor1 = parseFloat(pvlr1.value);
    let valor2 = parseFloat(pvlr2.value);
    let valor3 = parseFloat(pvlr3.value);
    if (valor3 > 0 && valor1 > 0 && tempP3 == 0) {
        let porcentagem = (valor1 * valor3) / 100;
        pvlr2.value = porcentagem.toFixed(2);
    } else if (valor3 > 0 && valor2 > 0) {
        let porcentagem = (valor2 * valor3) / 100;
        pvlr1.value = porcentagem.toFixed(2);
        tempP3 = 1;
        
    }
}


pvlr1.addEventListener('change', calcularPorcentagem1);
pvlr2.addEventListener('change', calcularPorcentagem2);
pvlr3.addEventListener('change', calcularPorcentagem3);

document.getElementById("resetP").addEventListener("click", function() {
    pvlr1.value = '';
    pvlr2.value = '';
    pvlr3.value = '';
    tempP1 = 0;
    tempP2 = 0;
    tempP3 = 0;
});