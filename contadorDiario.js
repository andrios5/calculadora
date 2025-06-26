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

window.addEventListener('load', exibirContador) // Exibe o contador ao carregar a página
window.addEventListener('load', virarDia) // Verifica se é hora de virar o dia ao carregar a página
window.addEventListener('scroll', virarDia) // Verifica se é hora de virar o dia ao rolar a página
window.addEventListener('load', exibeSemana) // Exibe a semana ao carregar a página
document.querySelector('#mais').addEventListener('click', maisUm)
document.querySelector('#menos').addEventListener('click', menosUm)
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#reset2').addEventListener('click', resetSem)
document.querySelector('span.aut').addEventListener('click', autoCont)
document.querySelector('#virarDia').addEventListener('click', virarD)

const dataAtual = new Date(); // Cria um objeto Date com a data atual

diaDoAno = diaDoAno(dataAtual) // Chama a função para obter o dia do ano atual
function diaDoAno(data) {
  const primeiroDoAno = new Date(data.getFullYear(), 0, 1);
  const milissegundosNoAno = data - primeiroDoAno;
  const milissegundosEmUmDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(milissegundosNoAno / milissegundosEmUmDia);
  return diaDoAno;
}

let tempDiaSem = 0;
let tempSetar = 0; // Variável para controlar se o dia da semana deve ser atualizado
let tempAut = 0;


let diaAno = diaDoAno; // Obtém o dia do ano atual
let diaAnoTemp = diaDoAno
diaSem = dataAtual.getDay(); // Obtém o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)

function autoCont() {
    tempAut = parseInt(getCookie('tempAut')) || 0; // Lê o cookie "tempAut" ou inicia em 0
    if (tempAut == 0) { // Se o contador automático não estiver ativado
        tempAut = 1; // Reseta a variável de controle para o contador automático
        setCookie('tempAut', tempAut, 365); // Salva a variável de controle no cookie por 365 dias
        alert('Contador automático desativado!\nPara virar o dia precionar Virar Dia.\nSe você ativar o contador automatico novamente o contador pode zerar.');
    } else {
        tempAut = 0; // Reseta a variável de controle para o contador automático
        setCookie('tempAut', tempAut, 365); // Salva a variável de controle no cookie por 365 diasautomático foi desativado
        diaAno = parseInt(getCookie('diaAnoC')) || diaAno;
        if (diaAno > diaAnoTemp){
            resetSem() // Se o dia do ano atual for maior que o dia do ano inicial, reseta a semana
            alert('Contador automático ativado!\nContador zerado.');
        } else { alert('Contador automático ativado!');}
    }
    autoContador() // Chama a função para atualizar a exibição do contador automático
}

autoContador()
function autoContador() {
    tempAut = parseInt(getCookie('tempAut')) || 0; // Lê o cookie "tempAut" ou inicia em 0
    if (tempAut == 1) { // Se o contador automático estiver ativado
        document.querySelector('#virarDia').style.display = 'block'
    } else {
        document.querySelector('#virarDia').style.display = 'none'
    }
}

function virarD() {
    diaAno = parseInt(getCookie('diaAnoC')) || diaAno; // Lê o cookie "diaAnoC" ou usa o dia do ano atual
    diaSem = parseInt(getCookie('diaSemC')) || diaSem; // L
    diaAno++
    
    setCookie('diaAnoC', diaAno, 365) // Salva o dia do ano no cookie por 365 dias
    if (diaSem >= 6) { // Se for sábado, volta para domingo
        diaSem = 0; // Reseta o dia da semana para domingo
    } else {
        diaSem++; // Incrementa o dia da semana
    }
    setCookie('diaSemC', diaSem, 365) // Salva o dia da semana no cookie por 365 dias
    virarDia() // Verifica se é hora de virar o dia
}


function maisUm() {
    let contador = parseInt(getCookie('contador')) || 0 // Lê o cookie "Contador" ou inicia em 0
    contador++
    setCookie('contador', contador, 365) // Salva o cookie por 365 dias
    
    virarDia() // Verifica se é hora de virar o dia
    salvarDia() // Salva o dia atual
    exibirContador() // Exibe o contador atualizado
}

function menosUm() {
    let contador = parseInt(getCookie('contador')) || 0; // Lê o cookie "Contador" ou inicia em 0
    if (contador > 0) { // Verifica se o contador é maior que 0
        contador--

        setCookie('contador', contador, 365); // Salva o cookie por 365 dias

        virarDia() // Verifica se é hora de virar o dia
        salvarDia() // Salva o dia atual
        exibirContador() // Exibe o contador atualizado
    }
}

function exibirContador() {
    tela = document.querySelector('section.tela')
    let contador = parseInt(getCookie('contador')) || 0; // Lê o cookie ou inicia em 0
    tela.innerText = `${contador}`; // Exibe o contador na tela

    tela2 = document.querySelector('section.tela2')
    tela15 = document.querySelector('section.tela15')
    let dataC = 0
    dataC = getCookie('data') // Lê o cookie da data
    if(dataC !='' && dataC != 0) { // Se o cookie da data não estiver vazio ou for 0
    tela2.innerText = `${dataC}`; // Exibe a data atual
    tela15.style.display = 'block'; // Exibe a seção da data atual
    } else {
        tela2.innerText = ''
        tela15.style.display = 'none'; // Oculta a seção da data atual
    }
}

function salvarDia(){
    let dia = diaAno; // Obtém o dia do ano atual
    let diaDaSem = diaSem; // Obtém o dia da semana atual
    setCookie('dia', dia, 365); // Salva o dia do ano no cookie por 365 dias
    setCookie('diaDaSem', diaDaSem, 365); // Salva o dia da semana no cookie por 365 dias

    let dataC = 0 // Exibe a data Inicial
    dataC = getCookie('data') // Lê o cookie da data
    if (dataC === "" || dataC == 0) { // Se o cookie estiver vazio ou for 0
    dataC = dataAtualV.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}); // Formata a data atual
    setCookie('data', dataC, 365); // Salva a data no cookie por 365 dias
    }
}

function virarDia(){
    let dia = parseInt(getCookie('dia')) || 0; // Lê o cookie do dia ou inicia em 0
    if (dia < diaAno && dia != 0) {
        cont = getCookie('contador') // Lê o contador atualizado
        adicionarSemana(cont)
        tempSem = Number(getCookie('virarSem')) // Lê o dia da semana atualizado
        tempS = Number(getCookie('tempSetar')) // Lê a variável de controle para atualizar o dia da semana
        if (tempSem == 1) {
            virarSem() // Chama a função para resetar o dia da semana
        }
        if (tempS == 1) {
            limparSemana() // Chama a função para limpar o contador da semana
            alert('Contador da semana zero!') // Exibe um alerta informando que o contador da semana foi virado
        }
    }
}

function virarSem() {
    domingo = parseInt(getCookie('domingo')) || false; // Lê o cookie do domingo ou inicia em 0
    segunda = parseInt(getCookie('segunda')) || false; // Lê o cookie do segunda ou inicia em 0
    terca = parseInt(getCookie('terca')) || false; // Lê o cookie do terça ou inicia em 0
    quarta = parseInt(getCookie('quarta')) || false; // Lê o cookie do quarta ou inicia em 0
    quinta = parseInt(getCookie('quinta')) || false; // Lê o cookie do quinta ou inicia em 0
    sexta = parseInt(getCookie('sexta')) || false; // Lê o cookie do sexta ou inicia em 0
    sabado = parseInt(getCookie('sabado')) || false; // Lê o cookie do sabado ou inicia em 0

    let totalSemana = 0; // Inicializa o total da semana
    totalSemana = domingo + segunda + terca + quarta + quinta + sexta + sabado; // Calcula o total da semana
    setCookie('SemanaAnterior', totalSemana, 365); // Salva o total da semana no cookie por 365 dias

    setCookie('data', 0, 365); // Reseta o dia do ano para 0 e salva por 365 dias
    setCookie('dia', 0, 365) // Reseta o dia do ano para 0 e salva por 365 dias



    setCookie('virarSem', 0, 365); // Reseta a função de limpar o contador para false
    setCookie('tempSetar', 1, 365); // Reseta a variável de controle para false
}

function limparSemana() {
    setCookie('domingo', 0, 365)
    setCookie('segunda', 0, 365)
    setCookie('terca', 0, 365)
    setCookie('quarta', 0, 365)
    setCookie('quinta', 0, 365)
    setCookie('sexta', 0, 365)
    setCookie('sabado', 0, 365)
    setCookie('tempSetar', 0, 365); // Reseta a variável de controle para false
    
    tela25 = document.querySelector('section.tela25')
    
    tela25.style.display = 'none'; // Oculta a seção da semana
    exibeSemana() // Atualiza a exibição da semana
}



function reset() {
    setCookie('contador', 0, 365); // Reseta o contador para 0 e salva por 365 dias
    setCookie('diaAnoC', 0, 365) // Reseta o dia do ano para 0 e salva por 365 dias
    setCookie('diaSemC', 0, 365) // Reseta o dia da semana para 0 e salva por 365 dias
    exibirContador() // Atualiza a exibição da data inicial
}

function resetSem() {
    setCookie('data', 0, 365); // Reseta o dia do ano para 0 e salva por 365 dias
    setCookie('dia', 0, 365) // Reseta o dia do ano para 0 e salva por 365 dias

    
    tela2 = document.querySelector('section.tela2')
    tela15 = document.querySelector('section.tela15')
    tela25 = document.querySelector('section.tela25')
    tabelaSemana = document.querySelector('#contSem')
    
    tela2.innerText = ``; // Atualiza a exibição da data inicial
    tela15.style.display = 'none'; // Oculta a seção da data atual
    tela25.style.display = 'none'; // Oculta a seção da semana
    tabelaSemana.style.display = 'none'; // Oculta a tabela da semana

    setCookie('domingo', 0, 365)
    setCookie('segunda', 0, 365)
    setCookie('terca', 0, 365)
    setCookie('quarta', 0, 365)
    setCookie('quinta', 0, 365)
    setCookie('sexta', 0, 365)
    setCookie('sabado', 0, 365)

    setCookie('virarSem', 0, 365); // Reseta a função de limpar o contador para false
    setCookie('SemanaAnterior', 0, 365); // Reseta o total da semana para 0 e salva por 365 dias
    setCookie('tempSetar', 0, 365); // Reseta a variável de controle para false

    setCookie('tempAut', 0, 365); // Reseta a variável de controle do contador automático para false

    reset(); // Reseta o contador

    window.location.reload(); // Recarrega a página para aplicar as mudanças
}

function limparContador() {
    let diaDaSem = diaSem; // Obtém o dia da semana atual
    setCookie('dia', diaAno, 365); // Atualiza o cookie do dia para o dia atual
    setCookie('diaDaSem', diaDaSem, 365); // Salva o dia da semana no cookie por 365 dias
    setCookie('contador', 0, 365); // Reseta o contador para 0 e salva por 365 dias
    tela = document.querySelector('section.tela')
    tela.innerText = `0`; // Exibe o contador na tela
}

function adicionarSemana(cont) {
    let diaDaSem = parseInt(getCookie('diaDaSem')) || 0; // Lê o cookie do dia da semana ou inicia em 0
    cont = parseInt(cont) || 0; // Lê o contador ou inicia em 0
    if (diaDaSem == 0) {
        domingo = cont // Se for domingo, atribui o valor do contador
        setCookie('domingo', domingo, 365) // Salva o valor do domingo no cookie por 365 dias
        domingoD = diaAno // Atualiza o dia do ano para o domingo
        setCookie('domingoD', domingoD, 365) // Salva o
    } else if (diaDaSem == 1) {
        segunda = cont // Se for segunda, atribui o valor do contador
        setCookie('segunda', segunda, 365) // Salva o valor da segunda no cookie por 365 dias
        segundaD = diaAno // Atualiza o dia do ano para a segunda
        setCookie('segundaD', segundaD, 365) // Salva
    } else if (diaDaSem == 2) {
        terca = cont // Se for terça, atribui o valor do contador
        setCookie('terca', terca, 365) // Salva o valor da terça no cookie por 365 dias
        tercaD = diaAno // Atualiza o dia do ano para a terça
        setCookie('tercaD', tercaD, 365) // Salva o
    } else if (diaDaSem == 3) {
        quarta = cont // Se for quarta, atribui o valor do contador
        setCookie('quarta', quarta, 365) // Salva o valor da quarta no cookie por 365 dias
        quartaD = diaAno // Atualiza o dia do ano para a quarta
        setCookie('quartaD', quartaD, 365) // Salva o
    } else if (diaDaSem == 4) {
        quinta = cont // Se for quinta, atribui o valor do contador
        setCookie('quinta', quinta, 365) // Salva o valor da quinta no cookie por 365 dias
        quintaD = diaAno // Atualiza o dia do ano para a quinta
        setCookie('quintaD', quintaD, 365) // Salva o
    } else if (diaDaSem == 5) {
        sexta = cont // Se for sexta, atribui o valor do contador
        setCookie('sexta', sexta, 365) // Salva o valor da sexta no cookie por 365 dias
        sextaD = diaAno // Atualiza o dia do ano para a sexta
        setCookie('sextaD', sextaD, 365) // Salva o
    } else if (diaDaSem == 6) {
        sabado = cont // Se for sábado, atribui o valor do contador
        setCookie('sabado', sabado, 365) // Salva o valor do sábado no cookie por 365 dias
        sabadoD = diaAno // Atualiza o dia do ano para o sábado
        setCookie('sabadoD', sabadoD, 365) // Salva o
    }
    limparContador() // Limpa o contador para o próximo dia
    exibeSemana()
}

function exibeSemana() {
    tela25 = document.querySelector('section.tela25')
    tabelaSemana = document.querySelector('#contSem')
    bodySem = document.querySelector('#bodySem')
    rodape = document.querySelector('#rodSem')
    tela35 = document.querySelector('#tela35')
    

    domingo = parseInt(getCookie('domingo')) || false; // Lê o cookie do domingo ou inicia em 0
    segunda = parseInt(getCookie('segunda')) || false; // Lê o cookie do segunda ou inicia em 0
    terca = parseInt(getCookie('terca')) || false; // Lê o cookie do terça ou inicia em 0
    quarta = parseInt(getCookie('quarta')) || false; // Lê o cookie do quarta ou inicia em 0
    quinta = parseInt(getCookie('quinta')) || false; // Lê o cookie do quinta ou inicia em 0
    sexta = parseInt(getCookie('sexta')) || false; // Lê o cookie do sexta ou inicia em 0
    sabado = parseInt(getCookie('sabado')) || false; // Lê o cookie do sabado ou inicia em 0

    domingoD = parseInt(getCookie('domingoD')) || 0; // Lê o cookie do dia do domingo ou inicia em 0
    segundaD = parseInt(getCookie('segundaD')) || 0; // Lê o cookie do dia da segunda ou inicia em 0
    tercaD = parseInt(getCookie('tercaD')) || 0; // Lê o cookie do dia da terça ou inicia em 0
    quartaD = parseInt(getCookie('quartaD')) || 0; // Lê o cookie do dia da quarta ou inicia em 0
    quintaD = parseInt(getCookie('quintaD')) || 0; // Lê o cookie do dia da quinta ou inicia em 0
    sextaD = parseInt(getCookie('sextaD')) || 0; // Lê o cookie do dia da sexta ou inicia em 0
    sabadoD = parseInt(getCookie('sabadoD')) || 0; // Lê o cookie do dia do sábado ou inicia em 0

    let arrayCont = [];
    arrayCont.length = 0;


    if (domingo == false && segunda == false && terca == false && quarta == false && quinta == false && sexta == false && sabado == false) {
        tabelaSemana.style.display = 'none'; // Oculta a tabela da semana se todos os valores forem 0
    } else {
    if (domingo != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana

        arrayCont.push([domingoD, 'Domingo:', domingo])

    } else {
        domingo = 0
    }

    if (segunda != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([segundaD, 'Segunda:', segunda])
    } else {
        segunda = 0
    }

    if (terca != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([tercaD, 'Terça:', terca])
    } else {
        terca = 0
    }

    if (quarta != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([quartaD, 'Quarta:', quarta])
    } else {
        quarta = 0
    }

    if (quinta != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([quintaD, 'Quinta:', quinta])
    } else {
        quinta = 0
    }
    

    if (sexta != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([sextaD, 'Sexta:', sexta])
    } else {
        sexta = 0
        
    }

    if (sabado != false){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        
        arrayCont.push([sabadoD, 'Sabado:', sabado])
    } else {
        sabado = 0
        
    }

    

    arrayCont = arrayCont.sort((a, b) => a[0] - b[0]); // Ordena o array de contadores pelo dia do ano
    bodySem.innerHTML = ""
    for (let i = 0; i < arrayCont.length; i++) {
        bodySem.innerHTML += `<tr><th colspan="2">${arrayCont[i][1]}</th><td colspan="2">${arrayCont[i][2]}</td></tr>`; // Define o conteúdo da linha 
    }

    let totalSemana = 0; // Inicializa o total da semana
    totalSemana = domingo + segunda + terca + quarta + quinta + sexta + sabado; // Calcula o total da semana
    
    rodape.innerHTML = `<th colspan="2">Total da Semana: </th><td colspan="2">${totalSemana}</td>`; // Atualiza o rodapé da tabela com o total da semana
    }
    
        tempS = Number(getCookie('tempSetar')) // Lê a variável de controle para atualizar o dia da semana
    if (domingo >= 1 && segunda >= 1 && terca >= 1 && quarta >= 1 && quinta >= 1 && sexta >= 1 && sabado >= 1 && tempS == 0) {
        tempDiaSem = 1;
        setCookie('virarSem', tempDiaSem, 365); // Salva a função de limpar o contador no cookie por 365 dias
    } else {
        tempDiaSem = 0; // Se todos os dias da semana forem 0, define tempDiaSem como false
        setCookie('virarSem', tempDiaSem, 365); // Salva a função de limpar o contador no cookie por 365 dias
    }

    
    let semanaAnterior = parseInt(getCookie('SemanaAnterior')) || 0; // Lê o cookie do total da semana anterior ou inicia em 0
    if (semanaAnterior > 0) {
        tela35.style.display = 'inline-block'; // Exibe a seção da semana anterior
        tela35.innerHTML = `Semana Anterior: ${semanaAnterior}`; // Exibe o total da semana anterior
    } else {
        tela35.style.display = 'none'; // Oculta a seção da semana anterior se o total for 0
    }
}