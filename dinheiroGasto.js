// Função para salvar cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 1 segundo
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para ler cookies
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}


const dataAtualV = new Date(); // Cria um objeto Date com a data atual


diaDoMes = diaDoAno(dataAtualV) // Chama a função para obter o dia do ano atual
function diaDoAno(data) {
  const primeiroDoAno = new Date(data.getFullYear(), 0, 1);
  const milissegundosNoAno = data - primeiroDoAno;
  const milissegundosEmUmDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(milissegundosNoAno / milissegundosEmUmDia) + 1;
  return diaDoAno;
}



document.querySelector('#maisV').addEventListener('click', mais)
document.querySelector('#menosV').addEventListener('click', menos)
document.querySelector('#resetV1').addEventListener('click', resetvalor1)
document.querySelector('#resetV2').addEventListener('click', resetvalor2)

telaV1 = document.querySelector('section.telaV1')
telaV0 = document.querySelector('section.telaV0')
telaV2 = document.querySelector('section.telaV2')
telaV3 = document.querySelector('section.telaV3')
telaV4 = document.querySelector('section.telaV4')

let valorDia = 0 // Inicializa o valor do dia
let valorMes = 0 // Inicializa o valor do mês
valorDia = Number(getCookie('valorDia')) // Lê o cookie do valor do dia
valorDia1 = valorDia.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
telaV0.innerHTML = `${valorDia1}`
valorMes = Number(getCookie('valorMes')) // Lê o cookie do valor do mês
valorMes1 = valorMes.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
telaV2.innerHTML = `Valor gasto no mês: ${valorMes1}`

diaAnteriorV = Number(getCookie('diaAnteriorV'))
if (diaAnteriorV >= 1) { // Checa se o cookie do dia anterior existe
    telaV1.innerHTML = `Dia anterior: ${diaAnteriorV.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}` // Exibe o dia anterior
    telaV1.style.display = 'block' // Exibe a tela do dia anterior
} else {
    telaV1.style.display = 'none' // Esconde a tela do dia anterior
}


//diaDoMes = 175

diaInicial = getCookie('diaInicial')
    if (diaDoMes > diaInicial){ // Checa se precisa atualizar o dia
        viraDia()
     }

dataV1 = getCookie('dataV1') // Lê a data inicial do cookie
if (dataV1 != '') { // Se não houver data inicial salva
    telaV3.innerHTML = `Data inicial: ${dataV1}` // Exibe a data inicial salva no cookie
    telaV3.style.display = 'block'
}

valorMesAnt = Number(getCookie('valorMesAnt')) // Lê o valor do mês anterior do cookie
if (valorMesAnt != '' && valorMesAnt > 0) { // Se não houver valor do mês anterior salva
    telaV4.innerHTML = `Valor do mês anterior: ${valorMesAnt.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}` // Exibe o valor do mês anterior
    telaV4.style.display = 'block' // Exibe a tela do valor do mês anterior
}else {
    telaV4.style.display = 'none' // Esconde a tela do valor do mês anterior
}


function mais() {
    diaInicial = getCookie('diaInicial')
    if (diaDoMes > diaInicial) { // Checa se precisa atualizar o dia
        viraDia()
     }else {
    valorGasto = Number(document.querySelector('#valorGasto').value) // Lê o valor do input
    if (valorGasto.value == '') {
        alert('Digite um valor válido!')
    } else {
        valorDia = valorDia + valorGasto
        valorDia1 = valorDia.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        telaV0.innerHTML = `${valorDia1}`
        setCookie('valorDia', valorDia, 30) // Salva o valor do mês no cookie
        valorMes = valorMes + valorGasto
        valorMes1 = valorMes.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        telaV2.innerHTML = `Valor do mês: ${valorMes1}`
        setCookie('valorMes', valorMes, 90) // Salva o valor do mês no cookie
        diaInicial = diaDoMes
        setCookie('diaInicial', diaInicial, 60) // Salva o dia inicial no cookie
        dataV1 = getCookie('dataV1') // Lê a data inicial do cookie
        if (dataV1 == '') {
            dataInicialV() // Se não houver data inicial salva, chama a função para salvar
        }
    }
}
}

function menos() {
    valorGasto = Number(document.querySelector('#valorGasto').value) // Lê o valor do input
    if (valorGasto.value == '') {
        alert('Digite um valor válido!')
    } else {
        valorDia = valorDia - valorGasto
        valorDia1 = valorDia.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        telaV0.innerHTML = `${valorDia1}`
        setCookie('valorDia', valorDia, 30) // Salva o valor do mês no cookie
        valorMes = valorMes - valorGasto
        valorMes1 = valorMes.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        telaV2.innerHTML = `Valor do mês: ${valorMes1}`
        setCookie('valorMes', valorMes, 90) // Salva o valor do mês no cookie
        diaInicial = diaDoMes
        setCookie('diaInicial', diaInicial, 60)
        dataV1 = getCookie('dataV1') // Lê a data inicial do cookie
        if (dataV1 == '') {
            dataInicialV() // Se não houver data inicial salva, chama a função para salvar
        }
    }
}


function dataInicialV (){
    dataV1 = dataAtualV.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}); // Formata a data atual
    telaV3.innerHTML = `Data inicial: ${dataV1}` // Exibe a data inicial
    setCookie('dataV1', dataV1, 60) // Salva a data inicial no cookie
    telaV3.style.display = 'block' // Exibe a tela da data inicial
}



function viraDia() {
    diaAnteriorV = getCookie('valorDia') // Lê o dia inicial do cookie
    setCookie('diaAnteriorV', diaAnteriorV, 60) // Salva o dia anterior no cookie
    diaInicial = diaDoMes
    setCookie('diaInicial', diaInicial, 60) // Salva o dia inicial no cookie
    resetvalor1()
    window.location.reload() // Recarrega a página para atualizar os valores
}

function resetvalor1() {
    valorDia = 0 // Reseta o valor do dia
    setCookie('valorDia', valorDia, 30) // Reseta o valor do dia no cookie
    telaV0.innerHTML = `0`
    diaInicial = diaDoMes
    setCookie('diaInicial', diaInicial, 60)
    window.location.reload() // Recarrega a página para atualizar os valores
}

function resetvalor2() {
    valorMesAnt = valorMes // Salva o valor do mês anterior
    setCookie('valorMesAnt', valorMesAnt, 90) // Salva o valor do mês anterior no cookie
    valorMes = 0 // Reseta o valor do mês
    diaAnteriorV = 0
    setCookie('diaAnteriorV', diaAnteriorV, 60) // Salva o dia anterior no cookie
    setCookie('valorMes', valorMes, 90) // Reseta o valor do mês no cookie
    telaV2.innerHTML = `Valor do mês: 0`
    dataInicialV()
    resetvalor1() // Reseta o valor do dia
}

