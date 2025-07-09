// Calculadora de Esquadro - Teorema de Pitágoras
// a² + b² = c² (onde c é a hipotenusa)
let esq1 = document.getElementById('esq1'); // Lado A
let esq2 = document.getElementById('esq2'); // Lado B
let esq3 = document.getElementById('esq3'); // Hipotenusa
document.addEventListener('DOMContentLoaded', function() {
    

    // Função para calcular usando o teorema de Pitágoras
    function calcularEsquadro() {
        const ladoA = parseFloat(esq1.value) || 0;
        const ladoB = parseFloat(esq2.value) || 0;
        const hipotenusa = parseFloat(esq3.value) || 0;

        // Contar quantos campos estão preenchidos
        const camposPreenchidos = [ladoA, ladoB, hipotenusa].filter(valor => valor > 0).length;

        if (camposPreenchidos >= 2) {
            if (ladoA > 0 && ladoB > 0 && hipotenusa === 0) {
                // Calcular hipotenusa: c = √(a² + b²)
                const resultado = Math.sqrt(Math.pow(ladoA, 2) + Math.pow(ladoB, 2));
                esq3.value = resultado.toFixed(2);
                esq3.style.backgroundColor = '#e8f5e8';
            } else if (ladoA > 0 && hipotenusa > 0 && ladoB === 0) {
                // Calcular lado B: b = √(c² - a²)
                if (hipotenusa > ladoA) {
                    const resultado = Math.sqrt(Math.pow(hipotenusa, 2) - Math.pow(ladoA, 2));
                    esq2.value = resultado.toFixed(2);
                    esq2.style.backgroundColor = '#e8f5e8';
                } else {
                    esq2.value = '';
                    esq2.style.backgroundColor = '#ffe8e8';
                }
            } else if (ladoB > 0 && hipotenusa > 0 && ladoA === 0) {
                // Calcular lado A: a = √(c² - b²)
                if (hipotenusa > ladoB) {
                    const resultado = Math.sqrt(Math.pow(hipotenusa, 2) - Math.pow(ladoB, 2));
                    esq1.value = resultado.toFixed(2);
                    esq1.style.backgroundColor = '#e8f5e8';
                } else {
                    esq1.value = '';
                    esq1.style.backgroundColor = '#ffe8e8';
                }
            }
        }

        // Verificar se os três valores formam um triângulo retângulo válido
        if (ladoA > 0 && ladoB > 0 && hipotenusa > 0) {
            const calculado = Math.sqrt(Math.pow(ladoA, 2) + Math.pow(ladoB, 2));
            const diferenca = Math.abs(calculado - hipotenusa);
            
            if (diferenca < 0.01) {
                // Triângulo retângulo válido
                esq1.style.backgroundColor = '#e8f5e8';
                esq2.style.backgroundColor = '#e8f5e8';
                esq3.style.backgroundColor = '#e8f5e8';
            } else {
                // Não é um triângulo retângulo válido
                esq1.style.backgroundColor = '#ffe8e8';
                esq2.style.backgroundColor = '#ffe8e8';
                esq3.style.backgroundColor = '#ffe8e8';
            }
        }
    }

    // Função para limpar as cores de fundo
    function limparCores() {
        esq1.style.backgroundColor = '';
        esq2.style.backgroundColor = '';
        esq3.style.backgroundColor = '';
    }

    // Event listeners para calcular automaticamente quando o usuário digita
    esq1.addEventListener('input', function() {
        if (this.value === '') {
            limparCores();
        } else {
            calcularEsquadro();
        }
    });

    esq2.addEventListener('input', function() {
        if (this.value === '') {
            limparCores();
        } else {
            calcularEsquadro();
        }
    });

    esq3.addEventListener('input', function() {
        if (this.value === '') {
            limparCores();
        } else {
            calcularEsquadro();
        }
    });

    // Limpar cores quando o campo perde o foco por um tempo
    [esq1, esq2, esq3].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = '';
        });
    });

    // Exemplo de uso com os valores padrão
    if (esq1.placeholder && esq2.placeholder && esq3.placeholder) {
        setTimeout(() => {
            esq1.value = esq1.placeholder;
            esq2.value = esq2.placeholder;
            calcularEsquadro();
        }, 1000);
    }
});

// Função para calcular baseado na proporção 3:4:5
function ladoA() {
    let ladoA = Number(esq1.value);

    if (ladoA > 0) {
        let tempA = ladoA / 3;
        let tempB = tempA * 4;
        let tempC = tempA * 5;

        document.querySelector('#esq2').value = tempB.toFixed(2);
        document.querySelector('#esq3').value = tempC.toFixed(2);
    }
}

function ladoB() {
    let ladoB = Number(esq2.value);

    if (ladoB > 0) {
        let tempB = ladoB / 4;
        let tempA = tempB * 3;
        let tempC = tempB * 5;

        document.querySelector('#esq1').value = tempA.toFixed(2);
        document.querySelector('#esq3').value = tempC.toFixed(2);
    }
}

function ladoC() {
    let hipotenusa = Number(esq3.value);

    if (hipotenusa > 0) {
        let tempC = hipotenusa / 5;
        let tempA = tempC * 3;
        let tempB = tempC * 4;

        document.querySelector('#esq1').value = tempA.toFixed(2);
        document.querySelector('#esq2').value = tempB.toFixed(2);
    }
}


esq1.addEventListener('change', ladoA);
esq2.addEventListener('change', ladoB);
esq3.addEventListener('change', ladoC);