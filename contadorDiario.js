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

const dataAtual = new Date(); // Cria um objeto Date com a data atual

diaDoAno = diaDoAno(dataAtual) // Chama a função para obter o dia do ano atual
function diaDoAno(data) {
  const primeiroDoAno = new Date(data.getFullYear(), 0, 1);
  const milissegundosNoAno = data - primeiroDoAno;
  const milissegundosEmUmDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(milissegundosNoAno / milissegundosEmUmDia) + 1;
  return diaDoAno;
}

let diaAno = diaDoAno; // Obtém o dia do ano atual
diaSem = dataAtual.getDay(); // Obtém o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)


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
    }
}

function reset() {
    setCookie('contador', 0, 365); // Reseta o contador para 0 e salva por 365 dias
    exibirContador(); // Atualiza a exibição do contador
    setCookie('data', 0, 365) // Reseta o dia do ano para 0 e salva por 365 dias
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
    reset(); // Reseta o contador
}

function limparContador () {
    setCookie('dia', diaAno, 365); // Atualiza o cookie do dia para o dia atual
    setCookie('contador', 0, 365); // Reseta o contador para 0 e salva por 365 dias
    tela = document.querySelector('section.tela')
    tela.innerText = `0`; // Exibe o contador na tela
}

function adicionarSemana(cont) {
    let diaDaSem = parseInt(getCookie('diaDaSem')) || 0; // Lê o cookie do dia da semana ou inicia em 0
    if (diaDaSem == 0) {
        domingo = cont // Se for domingo, atribui o valor do contador
        setCookie('domingo', domingo, 365) // Salva o valor do domingo no cookie por 365 dias
    } else if (diaDaSem == 1) {
        segunda = cont // Se for segunda, atribui o valor do contador
        setCookie('segunda', segunda, 365) // Salva o valor da segunda no cookie por 365 dias
    } else if (diaDaSem == 2) {
        terca = cont // Se for terça, atribui o valor do contador
        setCookie('terca', terca, 365) // Salva o valor da terça no cookie por 365 dias
    } else if (diaDaSem == 3) {
        quarta = cont // Se for quarta, atribui o valor do contador
        setCookie('quarta', quarta, 365) // Salva o valor da quarta no cookie por 365 dias
    } else if (diaDaSem == 4) {
        quinta = cont // Se for quinta, atribui o valor do contador
        setCookie('quinta', quinta, 365) // Salva o valor da quinta no cookie por 365 dias
    } else if (diaDaSem == 5) {
        sexta = cont // Se for sexta, atribui o valor do contador
        setCookie('sexta', sexta, 365) // Salva o valor da sexta no cookie por 365 dias
    } else if (diaDaSem == 6) {
        sabado = cont // Se for sábado, atribui o valor do contador
        setCookie('sabado', sabado, 365) // Salva o valor do sábado no cookie por 365 dias
    }
    limparContador() // Limpa o contador para o próximo dia
    exibeSemana()
}

function exibeSemana() {
    tela25 = document.querySelector('section.tela25')
    tabelaSemana = document.querySelector('#contSem')
    tr0 = document.querySelector('#trdom')
    tr1 = document.querySelector('#trseg')
    tr2 = document.querySelector('#trter')
    tr3 = document.querySelector('#trqua')
    tr4 = document.querySelector('#trqui')
    tr5 = document.querySelector('#trsex')
    tr6 = document.querySelector('#trsab')
    rodape = document.querySelector('#rodSem')
    

    domingo = parseInt(getCookie('domingo')) || 0; // Lê o cookie do domingo ou inicia em 0
    segunda = parseInt(getCookie('segunda')) || 0; // Lê o cookie do segunda ou inicia em 0
    terca = parseInt(getCookie('terca')) || 0; // Lê o cookie do terça ou inicia em 0
    quarta = parseInt(getCookie('quarta')) || 0; // Lê o cookie do quarta ou inicia em 0
    quinta = parseInt(getCookie('quinta')) || 0; // Lê o cookie do quinta ou inicia em 0
    sexta = parseInt(getCookie('sexta')) || 0; // Lê o cookie do sexta ou inicia em 0
    sabado = parseInt(getCookie('sabado')) || 0; // Lê o cookie do sabado ou inicia em 0

    totalSemana = domingo + segunda + terca + quarta + quinta + sexta + sabado; // Calcula o total da semana

    if (domingo == 0 && segunda == 0 && terca == 0 && quarta == 0 && quinta == 0 && sexta == 0 && sabado == 0) {
        tabelaSemana.style.display = 'none'; // Oculta a tabela da semana se todos os valores forem 0
    } else {
    if (domingo != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr0.innerHTML = `<th colspan="2">Domingo: </th><td colspan="2">${domingo}</td>`; // Atualiza a linha do domingo na tabela
        tr0.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr0.style.display = 'none'; // Oculta a linha do domingo se o valor for 0
    }

    if (segunda != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr1.innerHTML = `<th colspan="2">Segunda: </th><td colspan="2">${segunda}</td>`; // Atualiza a linha da segunda na tabela
        tr1.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr1.style.display = 'none'; // Oculta a linha da segunda se o valor for 0
    }

    if (terca != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr2.innerHTML = `<th colspan="2">Terça: </th><td colspan="2">${terca}</td>`; // Atualiza a linha da terça na tabela
        tr2.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr2.style.display = 'none'; // Oculta a linha da terça se o valor for 0
    }

    if (quarta != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr3.innerHTML = `<th colspan="2">Quarta: </th><td colspan="2">${quarta}</td>`; // Atualiza a linha da quarta na tabela
        tr3.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr3.style.display = 'none'; // Oculta a linha da quarta se o valor for 0
    }

    if (quinta != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr4.innerHTML = `<th colspan="2">Quinta: </th><td colspan="2">${quinta}</td>`; // Atualiza a linha da quinta na tabela
        tr4.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr4.style.display = 'none'; // Oculta a linha da quinta se o valor for 0
    }

    if (sexta != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr5.innerHTML = `<th colspan="2">Sexta: </th><td colspan="2">${sexta}</td>`; // Atualiza a linha da sexta na tabela
        tr5.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr5.style.display = 'none'; // Oculta a linha da sexta se o valor for 0
    }

    if (sabado != 0){
        tela25.style.display = 'block'; // Exibe a seção da semana
        tabelaSemana.style.display = 'table'; // Exibe a tabela da semana
        tr6.innerHTML = `<th colspan="2">Sábado: </th><td colspan="2">${sabado}</td>`; // Atualiza a linha do sábado na tabela
        tr6.style.display = 'table-row'; // Exibe a linha da tabela
    } else {
        tr6.style.display = 'none'; // Oculta a linha do sábado se o valor for 0
    }
    rodape.innerHTML = `<th colspan="2">Total da Semana: </th><td colspan="2">${totalSemana}</td>`; // Atualiza o rodapé da tabela com o total da semana
    }
}