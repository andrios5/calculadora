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

med2 = document.querySelector('button#med2')
resetC2 = document.querySelector('button#resetC2')
menosC2 = document.querySelector('button#menosC2')
export2 = document.querySelector('button#export2')
formatoEX = document.querySelector('#formatoEX')
ordenar = document.querySelector('#ordenarM2')
profund = document.querySelector('#profund')
profund2 = document.querySelector('#profund2')
lpro = document.querySelector('#lpro')
cpro = document.querySelector('#cpro')
lpro2 = document.querySelector('#lpro2')
cpro2 = document.querySelector('#cpro2')
tabela1 = document.querySelector('table#m1')
theadM1 = document.querySelector('#theadM1')
document.querySelector('#medType').addEventListener('change', function() {
    tempTypeMed = document.querySelector('#medType').value; // Obtém o valor
    typeMed(); // Chama a função para atualizar o tipo de medição
    exibeArea2()
});
const seletorDeArquivo = document.getElementById('seletorDeArquivo');

nome2 = document.querySelector('#nome2')

if (nome2.value == '') { // Verifica se o campo de nome está vazio
    tempNome3 = getCookie('tempNome3'); // Obtém o nome temporário do cookie
    nome2.value = tempNome3 || 'Área'; // Define o nome, se estiver vazio usa 'Área'
}

document.querySelector('#largura').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada é 'Enter'
        calcularArea2();
    }
});

seletorDeArquivo.addEventListener('change', function(e){
if (e.target.files.length) { // Verifica se algum arquivo foi selecionado
        importarCSVparaArray2d(e.target.files[0]);
    }
});

med2.addEventListener('click', calcularArea2)
resetC2.addEventListener('click', resetarC2)
menosC2.addEventListener('click', diminuirC2)
export2.addEventListener('click', exportar)
ordenar.addEventListener('click', ordenarVetor)



formatoEX.innerHTML = `<option value="0">CSV</option>`
formatoEX.innerHTML += `<option value="1">XLS</option>`

var tempNome2
let vetorOrdenando = false // Variável para controlar se o vetor está sendo ordenado
let array2d = []
let arrayM1 = []; // Array para armazenar os nomes únicos
let tempTypeMed = 0 // Variável para armazenar o tipo de medição selecionado
let tempTypeMed2 = 0
let tempTypeMed3 = 0 // Variável para armazenar o tipo de medição selecionado

typeMed()

function obterDataHoraFormatada() {
  const data = new Date();

  // Garante que números menores que 10 tenham um zero à esquerda
  const padZero = (numero) => String(numero).padStart(2, '0');

  // Extrai as partes da data
  const dia = padZero(data.getDate());
  const mes = padZero(data.getMonth() + 1); // getMonth() retorna de 0-11
  const ano = data.getFullYear();

  // Extrai as partes da hora
  const horas = padZero(data.getHours());
  const minutos = padZero(data.getMinutes());
  const segundos = padZero(data.getSeconds());

  return `${horas}${dia}${mes}${ano}`;
}


function typeMed() {
    medType = document.querySelector('#medType')
    if (tempTypeMed == 1) {
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a profundidade'
    lpro.innerHTML = 'Profundidade:'
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    tempTypeMed2 = 0;
    } else if (tempTypeMed == 2) { //R$
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite o preço'
    lpro.innerHTML = 'Preço:'
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    tempTypeMed2 = 0;
    tempTypeMed2 = 1;
    if (tempTypeMed3 == 1) {
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
        tempTypeMed3 = 0
        tempTypeMed2 = 1
    }
    } else if (tempTypeMed == 3) { //UN
    cpro.style.display = 'inline-flex' // Esconde o campo de profundidade
    profund.placeholder = 'Digite a unidade'
    lpro.innerHTML = 'Unidade:'
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    } else if (tempTypeMed == 4) {
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a Unidade'
    lpro.innerHTML = 'Unidade:'
    profund2.placeholder = 'Digite o preço'
    lpro2.innerHTML = 'Preço:'
    cpro2.style.display = 'inline-flex' // Esconde o campo de profundidade 2
    if (tempTypeMed2 == 1) {
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
        tempTypeMed3 = 1
        tempTypeMed2 = 0
    }
    }
    else {
    cpro.style.display = 'none' // Esconde o campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    medType.innerHTML = `<option value="0">M² (Medição Quadrada)</option>`
    medType.innerHTML += `<option value="1">M³ (Medição Cubica)</option>`
    medType.innerHTML += `<option value="3">UN (Medição com Unidade)</option>`
    medType.innerHTML += `<option value="2">R$ (Medição com Valor)</option>`
    medType.innerHTML += `<option value="4">UN + R$ (Unidade e Valor)</option>`
    tempTypeMed2 = 0;
    }
}

function inverteVetor(array2d) {
    if(array2d.length > 0){
    array2dTemp = []; // Cria um novo array temporário
    let tempPreco = 0
    let tempUn = 0
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, preco, area2, un, area3] = array2d[i];
        array2dTemp.push([nome, altura, largura, area, un, area2, preco, area3]); // Adiciona os valores ao array temporário
        }

    array2d.length = 0; // Limpa o array original
    for (let i = 0; i < array2dTemp.length; i++) {
        const [nome, altura, largura, area, un, area2, preco, area3] = array2dTemp[i];
        array2d.push([nome, altura, largura, area, un, area2, preco, area3]); // Adiciona os valores do array temporário ao array original
        tempPreco = preco
        tempUn = un
    }
    document.querySelector('#profund').value = tempUn
    document.querySelector('#profund2').value = tempPreco
    exibeArea2(array2d)
    }
}

function ordenarVetor() {
    if (vetorOrdenando === false) { // Verifica se o vetor já está sendo ordenado
    vetorOrdenando = true
    ordenar.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está ordenando
    ordenar.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
    ordenarArray2dPorNome(); // Chama a função para ordenar o array2d por nome
    exibeArea2(array2d); // Atualiza a exibição após ordenar
    } else {
    vetorOrdenando = false
    ordenar.style.backgroundColor = ''; // Restaura a cor original do botão
    ordenar.style.boxShadow = ''; // Remove a sombra do botão
    }
}

function ordenarArray2dPorNome() {
        for (let i = 0; i < array2d.length - 1; i++) {
            for (let j = 0; j < array2d.length - 1 - i; j++) {
                // Comparação ignorando maiúsculas/minúsculas
                if (array2d[j][0].toLowerCase() > array2d[j + 1][0].toLowerCase()) {
                    // Troca as posições
                    let temp = array2d[j];
                    array2d[j] = array2d[j + 1];
                    array2d[j + 1] = temp;
            }
        }
    }
}


    function calcularArea2(){
        let tempNome3 = getCookie('tempNome3'); // Obtém o nome temporário do cookie
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        pro = document.querySelector('#profund')
        pro2 = document.querySelector('#profund2')
        nome2 = document.querySelector('#nome2').value || 'Área'; // Define o nome, se estiver vazio usa 'Área'
        nome2 = nome2.trim() // Remove espaços em branco no início e no final do nome
        resM2 = document.querySelector('#resultadoM2')
        resS2 = document.querySelector('#resultadoS2')
        tabela = document.querySelector('table#m2')
        tabela1 = document.querySelector('table#m1')

        tempNome2 = nome2 // Armazena o nome temporário
        tempNome3 = tempNome2 // Armazena o nome temporário para a tabela de soma
        setCookie('tempNome3', tempNome3, 7); // Salva o nome no cookie por 7 dias
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro.value.includes(',')){pro = pro.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro2.value.includes(',')){pro2 = pro2.replace(",", ".")} //Troca virgula por ponto se tiver
        
        alt = Number(alt.value)
        lar = Number(lar.value)
        pro = Number(pro.value)
        pro2 = Number(pro2.value)

        area = alt * lar

        if (pro == '' || pro == null) { // Verifica se o campo de profundidade está vazio
            pro = 1; // Define a profundidade como 1 se estiver vazio
        }

        if (pro2 == '' || pro2 == null) { // Verifica se o campo de profundidade 2 está vazio
            pro2 = 1; // Define a profundidade 2 como 1 se estiver vazio
        }

        area2 = alt * lar * pro // Calcula a área 3D
        area3 = alt * lar * pro2 * pro // Calcula a área 3D para o segundo campo de profundidade

        array2d.push([nome2, alt, lar, area, pro, area2, pro2, area3]) // Adiciona os valores ao array 2D

        typeMed()
        document.querySelector('#largura').value = ''
        document.querySelector('#largura').focus() // Coloca o foco no input novamente

        exibeArea2(array2d) // Chama a função para exibir os resultados  
}

function exibeArea2() {
    let soma2 = 0 // Inicializa a variável de soma
    let somaA = 0 // Inicializa a variável de soma das alturas
    let somaL = 0 // Inicializa a variável de soma das larguras
    let somaP = 0 // Inicializa a variável de soma das profundidades
    let soma3 = 0 // Inicializa a variável de soma 3D
    let soma4 = 0 // Inicializa a variável de soma das áreas 3D
    resM2 = document.querySelector('#resultadoM2')
    resS2 = document.querySelector('#resultadoS2')
    tabela = document.querySelector('table#m2')
    theadM2 = document.querySelector('#theadM2')

    if (vetorOrdenando === true) { // Verifica se o vetor está sendo ordenado
        ordenarArray2dPorNome(); // Ordena o array2d por nome
    }

    resM2.innerHTML = '' // Limpa o conteúdo anterior
    if (tempTypeMed == 4) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>Un</th><th>Un/m²</th><th>R$/m²</th><th>Preço</th></tr>`
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i];
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${un.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td><td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td>${area4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma2 += Number(array2d[i][3]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            soma4 += Number(array2d[i][7]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabela.style.display = 'none'
        menosC2.style.display = 'none'
        export2.style.display = 'none'
        resetC2.style.display = 'none'
        formatoEX.style.display = 'none'
        tabela1.style.display = 'none'
        ordenar.style.display = 'none'
        seletorDeArquivo.style.display = 'inline-block'
        }else{
        tabela.style.display = 'block'
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
        formatoEX.style.display = 'inline-block'
        ordenar.style.display = 'inline-block'
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td><td colspan="2">${soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 3) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>Un</th><th>Un/m²</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3] = array2d[i];
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${un.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td></tr>`;
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabela.style.display = 'none'
        menosC2.style.display = 'none'
        export2.style.display = 'none'
        resetC2.style.display = 'none'
        formatoEX.style.display = 'none'
        tabela1.style.display = 'none'
        ordenar.style.display = 'none'
        seletorDeArquivo.style.display = 'inline-block'
        }else{
        tabela.style.display = 'block'
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
        formatoEX.style.display = 'inline-block'
        ordenar.style.display = 'inline-block'
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else if (tempTypeMed == 2) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>R$/m²</th><th>Preço</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, preco, area3] = array2d[i];
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td>${area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabela.style.display = 'none'
        menosC2.style.display = 'none'
        export2.style.display = 'none'
        resetC2.style.display = 'none'
        formatoEX.style.display = 'none'
        tabela1.style.display = 'none'
        ordenar.style.display = 'none'
        seletorDeArquivo.style.display = 'inline-block'
        }else{
        tabela.style.display = 'block'
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
        formatoEX.style.display = 'inline-block'
        ordenar.style.display = 'inline-block'
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td colspan="2">${soma3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 1) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>Profund.</th><th>m²</th><th>m³</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${profundidade.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td></tr>`;
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabela.style.display = 'none'
        menosC2.style.display = 'none'
        export2.style.display = 'none'
        resetC2.style.display = 'none'
        formatoEX.style.display = 'none'
        tabela1.style.display = 'none'
        ordenar.style.display = 'none'
        seletorDeArquivo.style.display = 'inline-block'
        }else{
        tabela.style.display = 'block'
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
        formatoEX.style.display = 'inline-block'
        ordenar.style.display = 'inline-block'
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area] = array2d[i];
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td> <td>${largura.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td></tr>`;
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
            tabela.style.display = 'none'
            menosC2.style.display = 'none'
            export2.style.display = 'none'
            resetC2.style.display = 'none'
            formatoEX.style.display = 'none'
            tabela1.style.display = 'none'
            ordenar.style.display = 'none'
            seletorDeArquivo.style.display = 'inline-block'
        }else{
            tabela.style.display = 'block'
            menosC2.style.display = 'inline-block'
            export2.style.display = 'inline-block'
            resetC2.style.display = 'inline-block'
            formatoEX.style.display = 'inline-block'
            ordenar.style.display = 'inline-block'
            resS2.innerHTML = `<tr><th colspan="1">Soma:</th><td colspan='1'>${somaA.toLocaleString('pt-BR')}</td><td colspan='1'>${somaL.toLocaleString('pt-BR')}</td><td colspan='1'>${soma2.toLocaleString('pt-BR')}</td></tr>`;
        }
    }
    checarNome() // Chama a função para verificar o nome e exibir a soma por nome // Ordena o array2d por nome
}

function mudouNome() {
    tabela1 = document.querySelector('table#m1')
    if (arrayM1.length >= 2) { // Verifica se o arrayM1 tem mais de um elemento e se o tipo de medição é diferente de 0
    tabela1.style.display = 'block'
    if (tempTypeMed == 1) {
        theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área(m²)</th><th>Área(m³)</th></tr>`; // Atualiza o cabeçalho da tabela'
        } else if (tempTypeMed == 2) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>R$</th></tr>`; // Atualiza o cabeçalho da tabela
        } else if (tempTypeMed == 3) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>Un/m²</th></tr>`; // Atualiza o cabeçalho da tabela
        } else if (tempTypeMed == 4) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>Un/m²</th><th>R$</th></tr>`;
        } else {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th></tr>`; // Atualiza o cabeçalho da tabela
        }
    }
}

function checarNome(){
    
        resM1 = document.querySelector('#resultadoM1')
        resM1.innerHTML = ''
        
        let somaPorNome = {}; // Objeto para armazenar a soma por nome
        let somaPorNome2 = {}; // Objeto para armazenar a soma por nome para área 3D
        let somaPorNome3 = {}; // Objeto para armazenar a soma por nome para área 3D
        arrayM1.length = 0; // Array para armazenar os nomes únicos

        
        if(tempTypeMed == 1 || tempTypeMed == 2 || tempTypeMed == 3 || tempTypeMed == 4) { // Verifica se o tipo de medição é 3D ou monetário
            for (let i = 0; i < array2d.length; i++) {
            const [nome, , , area, , area2, ,area3] = array2d[i];

            let nomeLimpo = nome
            let somaArea2 = nome
            let somaArea3 = nome

            if (!somaPorNome[nomeLimpo]) { // Verifica se o nome já existe no objeto
                somaPorNome[nomeLimpo] = 0; // Inicializa a soma para este nome
            }
            somaPorNome[nomeLimpo] += Number(area); // Adiciona a área à soma correspondente ao nome

            if (!somaPorNome2[somaArea2]) { // Verifica se o nome já existe no objeto
                somaPorNome2[somaArea2] = 0; // Inicializa a soma para este nome
            }
            somaPorNome2[somaArea2] += Number(area2); // Adiciona a área à soma correspondente ao nome

            if (!somaPorNome3[somaArea3]) { // Verifica se o nome já existe no objeto
                somaPorNome3[somaArea3] = 0; // Inicializa a soma para este nome
            }
            somaPorNome3[somaArea3] += Number(area3); // Adiciona a área à soma correspondente ao nome
            }
            if(tempTypeMed == 1){
            for (let nome in somaPorNome) {
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
                arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            }
            } else if (tempTypeMed == 2) {
                for (let nome in somaPorNome) {
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`; // Exibe a soma por nome na tabela
                arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            }
            } else if (tempTypeMed == 3) {
                for (let nome in somaPorNome) {
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
                arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            }
            } else if (tempTypeMed == 4) {
                for (let nome in somaPorNome) {
                arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome], somaPorNome3[nome]]); // Adiciona o nome e a soma ao arrayM1
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome3[nome].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`; // Exibe a soma por nome na tabela
            }
            }
        } else {
            for (let i = 0; i < array2d.length; i++) {
            const [nome, , , area] = array2d[i];

            let nomeLimpo = nome

            if (!somaPorNome[nomeLimpo]) { // Verifica se o nome já existe no objeto
                somaPorNome[nomeLimpo] = 0; // Inicializa a soma para este nome
            }
            somaPorNome[nomeLimpo] += Number(area); // Adiciona a área à soma correspondente ao nome
            }
  
            for (let nome in somaPorNome) {
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
                arrayM1.push([nome, somaPorNome[nome]]); // Adiciona o nome e a soma ao arrayM1
            }
        }
        mudouNome()
}


function resetarC2(){
    tempNome2 = getCookie('tempNome3') || 'Área'; // Obtém o nome temporário do cookie
    resM2.innerHTML = ''
    resS2.innerHTML = ''
    tabela.style.display = 'none'
    document.querySelector('#altura').value = ''
    document.querySelector('#largura').value = ''
    document.querySelector('#nome2').value = tempNome2 // Reseta o campo de nome para o valor temporário
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    tabela1.style.display = 'none'
    ordenar.style.display = 'none'
    seletorDeArquivo.value = ''; // Limpa o seletor de arquivo após a importação
    array2d = [] // Limpa o array 2D
    tempTypeMed = 0
    profund.value = '' // Esconde o campo de profundidade
    profund2.value = '' // Esconde o campo de profundidade 2
    typeMed()
}

function diminuirC2(){
    array2d.pop() // Remove o último elemento do array 2D

     for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        tempNome2 = nome
        
     }
    exibeArea2(array2d) // Atualiza a exibição
}

function exportar() {
    nome2 = '0'
    let nome1 = ''
    checarNome(); // Atualiza o nome temporário
    nome1 = document.querySelector('#nome2').value || 'Área'; // Define o nome para exportação, se estiver vazio usa 'Área'
    nome1 = nome1.trim() // Remove espaços em branco no início e no final do nome
    nome2 = nome1 + obterDataHoraFormatada(); // Define o nome do arquivo com data e hora
    if (!array2d.length) {
        alert('Não há dados para exportar!');
        return;
    }

    if (formatoEX.value == '0'){
        if (tempTypeMed == 1){
            exportar21()
        } else if (tempTypeMed == 2) {
            exportar22()
        } else if (tempTypeMed == 3) {
            exportar23()
        } else if (tempTypeMed == 4) {
            exportar24()
        } else {
            exportar2()
        }
    } else {
        if (tempTypeMed == 1){
            exportar11()
        } else if (tempTypeMed == 2) {
            exportar12()
        } else if (tempTypeMed == 3) {
            exportar13()
        } else if (tempTypeMed == 4) {
            exportar14()
        } else {
            exportar1()
        }
    }

}

function exportar1() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 4px; text-align: center; }
            th { background: #eee; }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
        </tr>
    `;
    // Adiciona as linhas do array2d
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
            </tr>`;
        
    }
    // Soma final
    let soma2 = 0, somaA = 0, somaL = 0;
    for (let i = 0; i < array2d.length; i++) soma2 += Number(array2d[i][3]);
    for (let i = 0; i < array2d.length; i++) somaA += Number(array2d[i][1]);
    for (let i = 0; i < array2d.length; i++) somaL += Number(array2d[i][2]);
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
    </tr>`;
    html += `<tr></tr>`
    html += `<tr><th colspan="4">Soma dos Itens</th></tr>`
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area] = arrayM1[i];
        html += `<tr>
            <th colspan="3">Soma ${nome}:</th>
            <td colspan="1">${area.toLocaleString('pt-BR')}</td>
        </tr>`;
    }
    html += `
    </table>
    </body>
    </html>
    `;
    // Cria um link para download
    let a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = `${nome2}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar11() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 4px; text-align: center; }
            th { background: #eee; }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Profundidade</th>
            <th>Área(m²)</th>
            <th>Área(m³)</th>
        </tr>
    `;
    // Adiciona as linhas do array2d
    let soma2 = 0, somaA = 0, somaL = 0, somaP = 0, soma3 = 0; // Inicializa as variáveis de soma
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${profundidade.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
                <td>${area3.toLocaleString('pt-BR')}</td>
            </tr>`;
    }
    // Soma final
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${somaP.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
        <td>${soma3.toLocaleString('pt-BR')}</td>
    </tr>`;
    html += `<tr></tr>`
    html += `<tr><th colspan="4">Soma dos Itens</th><th>Área(m²)</th><th>Área(m³)</th></tr>`
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        html += `<tr>
            <th colspan="4">Soma ${nome}:</th>
            <td colspan="1">${area.toLocaleString('pt-BR')}</td>
            <td colspan="1">${area3.toLocaleString('pt-BR')}</td>
        </tr>`;
    }
    html += `
    </table>
    </body>
    </html>
    `;
    // Cria um link para download
    let a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = `${nome2}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar12() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 4px; text-align: center; }
            th { background: #eee; }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
            <th>R$/m²</th>
            <th>Preço</th>
        </tr>
    `;
    // Adiciona as linhas do array2d
    let soma2 = 0, somaA = 0, somaL = 0, somaP = 0, soma3 = 0; // Inicializa as variáveis de soma
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma3 += Number(array2d[i][5]);
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
                <td>${profundidade.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                <td>${area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
            </tr>`;
        
    }
    // Soma final
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
        <td colspan="2">${soma3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
    </tr>`;
    html += `<tr></tr>`
    html += `<tr><th colspan="3">Soma dos Itens</th><th>Área</th><th colspan="2">Preço</th></tr>`
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        html += `<tr>
            <th colspan="3">Soma ${nome}:</th>
            <td colspan="1">${area.toLocaleString('pt-BR')}</td>
            <td colspan="2">${area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        </tr>`;
    }
    html += `
    </table>
    </body>
    </html>
    `;
    // Cria um link para download
    let a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = `${nome2}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar13() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 4px; text-align: center; }
            th { background: #eee; }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
            <th>Un</th>
            <th>Un/Área</th>
        </tr>
    `;
    // Adiciona as linhas do array2d
    let soma2 = 0, somaA = 0, somaL = 0, somaP = 0, soma3 = 0; // Inicializa as variáveis de soma
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
                <td>${profundidade.toLocaleString('pt-BR')}</td>
                <td>${area3.toLocaleString('pt-BR')}</td>
            </tr>`;
        
    }
    // Soma final
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
        <td>${somaP.toLocaleString('pt-BR')}</td>
        <td>${soma3.toLocaleString('pt-BR')}</td>
    </tr>`;
    html += `<tr colspan='6'></tr>`
    html += `<tr><th colspan="3">Soma dos Itens</th><th>Área</th><th colspan='2'>Un/Área</th></tr>`
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        html += `<tr>
            <th colspan="3">Soma ${nome}:</th>
            <td>${area.toLocaleString('pt-BR')}</td>
            <td colspan='2'>${area3.toLocaleString('pt-BR')}</td>
        </tr>`;
    }
    html += `
    </table>
    </body>
    </html>
    `;
    // Cria um link para download
    let a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = `${nome2}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar14() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 4px; text-align: center; }
            th { background: #eee; }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
            <th>Un</th>
            <th>Un/Área</th>
            <th>R$</th>
            <th>Preço</th>
        </tr>
    `;
    // Adiciona as linhas do array2d
    let soma2 = 0, somaA = 0, somaL = 0
    let somaP = 0, soma3 = 0, soma4 = 0; // Inicializa as variáveis de soma
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i];
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma2 += Number(array2d[i][3]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            soma4 += Number(array2d[i][7]);
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
                <td>${un.toLocaleString('pt-BR')}</td>
                <td>${area3.toLocaleString('pt-BR')}</td>
                <td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                <td>${area4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
            </tr>`;
    }
    // Soma final
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
        <td>${somaP.toLocaleString('pt-BR')}</td>
        <td>${soma3.toLocaleString('pt-BR')}</td>
        <td colspan='2'>${soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
    </tr>`;
    html += `<tr colspan='8'></tr>`
    html += `<tr><th colspan="3">Soma dos Itens</th><th>Área</th><th colspan='2'>Un/Área</th><th colspan='2'>Preço</th></tr>`
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area2, area3] = arrayM1[i];
        html += `<tr>
            <th colspan="3">Soma ${nome}:</th>
            <td>${area.toLocaleString('pt-BR')}</td>
            <td colspan='2'>${area2.toLocaleString('pt-BR')}</td>
            <td colspan='2'>${area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        </tr>`;
    }
    html += `
    </table>
    </body>
    </html>
    `;
    // Cria um link para download
    let a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = `${nome2}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar2(){
    // Monta o cabeçalho CSV
    let csv = 'Nome;Altura;Largura;Área\n';
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), area.toLocaleString('pt-BR')]);
    }
    // Adiciona a soma final
    let soma2 = 0; // Inicializa a variável de soma
    let somaA = 0; // Inicializa a variável de soma das alturas
    let somaL = 0; // Inicializa a variável de soma das larguras
    for (let i = 0; i < array2d.length; i++) {
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR')]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma dos Itens",'','', "Área"]);
    
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`,'','', area.toLocaleString('pt-BR')]);
    }

    arrayTemp.forEach(function(linha) {
        // Usa ; como separador para compatibilidade com o LibreOffice em pt-BR
        csv += [
            linha[0] !== undefined ? linha[0] : '',
            linha[1] !== undefined ? linha[1] : '',
            linha[2] !== undefined ? linha[2] : '',
            linha[3] !== undefined ? linha[3] : ''
        ].join(';') + '\n';
    });
    // Cria um link para download
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nome2}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar21() {
    // Monta o cabeçalho CSV
    let csv = 'Nome;Altura;Largura;Profundidade;Área(m²);Área(m³)\n';
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), profundidade.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR')]);
    }
    // Adiciona a soma final
    let soma2 = 0; // Inicializa a variável de soma
    let somaA = 0; // Inicializa a variável de soma das alturas
    let somaL = 0; // Inicializa a variável de soma das larguras
    let somaP = 0; // Inicializa a variável de soma das profundidades
    let soma3 = 0; // Inicializa a variável de soma das áreas 3
    for (let i = 0; i < array2d.length; i++) {
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), somaP.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'), soma3.toLocaleString('pt-BR')]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma dos Itens",'','','', 'Área(m²)', 'Área(m³)']);
    
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`,'','','', area.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR')]);
    }

    arrayTemp.forEach(function(linha) {
        // Usa ; como separador para compatibilidade com o LibreOffice em pt-BR
            csv += [
            linha[0] !== undefined ? linha[0] : '',
            linha[1] !== undefined ? linha[1] : '',
            linha[2] !== undefined ? linha[2] : '',
            linha[3] !== undefined ? linha[3] : '',
            linha[4] !== undefined ? linha[4] : '',
            linha[5] !== undefined ? linha[5] : ''
        ].join(';') + '\n';
    });
    // Cria um link para download
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nome2}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar22() {
    // Monta o cabeçalho CSV
    let csv = 'Nome;Altura;Largura;Área;R$/m²;Preço\n';
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), profundidade.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
    }
    // Adiciona a soma final
    let soma2 = 0; // Inicializa a variável de soma
    let somaA = 0; // Inicializa a variável de soma das alturas
    let somaL = 0; // Inicializa a variável de soma das larguras
    let somaP = 0; // Inicializa a variável de soma das profundidades
    let soma3 = 0; // Inicializa a variável de soma das áreas 3
    for (let i = 0; i < array2d.length; i++) {
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma3 += Number(array2d[i][5]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'),'', soma3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma dos Itens",'','','Área','','Preço']);
    
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`,'','', area.toLocaleString('pt-BR'),'', area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),]);
    }

    arrayTemp.forEach(function(linha) {
        // Usa ; como separador para compatibilidade com o LibreOffice em pt-BR
            csv += [
            linha[0] !== undefined ? linha[0] : '',
            linha[1] !== undefined ? linha[1] : '',
            linha[2] !== undefined ? linha[2] : '',
            linha[3] !== undefined ? linha[3] : '',
            linha[4] !== undefined ? linha[4] : '',
            linha[5] !== undefined ? linha[5] : ''
        ].join(';') + '\n';
    });
    // Cria um link para download
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nome2}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar23() {
    // Monta o cabeçalho CSV
    let csv = 'Nome;Altura;Largura;Área;Un;Un/Área\n';
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), profundidade.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR')]);
    }
    // Adiciona a soma final
    let soma2 = 0; // Inicializa a variável de soma
    let somaA = 0; // Inicializa a variável de soma das alturas
    let somaL = 0; // Inicializa a variável de soma das larguras
    let somaP = 0; // Inicializa a variável de soma das profundidades
    let soma3 = 0; // Inicializa a variável de soma das áreas 3
    for (let i = 0; i < array2d.length; i++) {
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]); 
            soma3 += Number(array2d[i][5]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'), somaP.toLocaleString('pt-BR'), soma3.toLocaleString('pt-BR')]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma dos Itens",'','','Área','','Un/Área']);
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area3] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`,'','', area.toLocaleString('pt-BR'),'', area3.toLocaleString('pt-BR')]);
    }
    arrayTemp.forEach(function(linha) {
        // Usa ; como separador para compatibilidade com o LibreOffice em pt-BR
        csv += [
            linha[0] !== undefined ? linha[0] : '',
            linha[1] !== undefined ? linha[1] : '',
            linha[2] !== undefined ? linha[2] : '',
            linha[3] !== undefined ? linha[3] : '',
            linha[4] !== undefined ? linha[4] : '',
            linha[5] !== undefined ? linha[5] : ''
        ].join(';') + '\n';
    });
    // Cria um link para download
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nome2}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function exportar24() {
    // Monta o cabeçalho CSV
    let csv = 'Nome;Altura;Largura;Área;Un;Un/Área;R$;Preço\n';
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3, preco, area4] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), profundidade.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR'), preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), area4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
    }
    // Adiciona a soma final
    let soma2 = 0; // Inicializa a variável de soma
    let somaA = 0; // Inicializa a variável de soma das alturas
    let somaL = 0; // Inicializa a variável de soma das larguras
    let somaP = 0; // Inicializa a variável de soma das profundidades
    let soma3 = 0; // Inicializa a variável de soma das áreas 3
    let soma4 = 0; // Inicializa a variável de soma dos preços
    for (let i = 0; i < array2d.length; i++) {
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            soma4 += Number(array2d[i][7]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'),somaP.toLocaleString('pt-BR'),soma3.toLocaleString('pt-BR'),'',soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma dos Itens",'','','Área','','Un/Área','','Preço']);
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area, area2, area3] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`,'','', area.toLocaleString('pt-BR'),'', area2.toLocaleString('pt-BR'),'', area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
    }
    arrayTemp.forEach(function(linha) {
        // Usa ; como separador para compatibilidade com o LibreOffice em pt-BR
        csv += [
            linha[0] !== undefined ? linha[0] : '',
            linha[1] !== undefined ? linha[1] : '',
            linha[2] !== undefined ? linha[2] : '',
            linha[3] !== undefined ? linha[3] : '',
            linha[4] !== undefined ? linha[4] : '',
            linha[5] !== undefined ? linha[5] : '',
            linha[6] !== undefined ? linha[6] : '',
            linha[7] !== undefined ? linha[7] : ''
        ].join(';') + '\n';
    }
    // Cria um link para download
    );
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nome2}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}




function importarCSVparaArray2d(file) {
    const leitor = new FileReader(); // Cria um novo FileReader
    leitor.onload = function(e) { // Define o que fazer quando o arquivo for carregado
        const conteudo = e.target.result; // Obtém o conteúdo do arquivo
        const linhas = conteudo.split('\n'); // Divide o conteúdo em linhas
        let verifT = linhas.shift();  // Remove o cabeçalho do CSV
        if (verifT.valueOf().includes('Nome;Altura;Largura;Área;Un;Un/Área;R$;Preço')){ // Verifica se o cabeçalho é o esperado
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 8) { // Verifica se há pelo menos 8 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    let profundidade = strNum(partes[4]); // Converte a profundidade para número
                    let area3 = strNum(partes[5]);
                    let preco = strNum(partes[6]); // Converte o preço para número
                    let area4 = strNum(partes[7]); // Converte a área 4 para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, area, profundidade, area3, preco, area4]); // Adiciona os valores ao array 2D
                }
            }
        });
            medType.value = '4'; // Define o tipo de medição como monetário
            tempTypeMed = 4; // Define o tipo de medição como monetário
            tempTypeMed3 = 1
            tempTypeMed2 = 0
            typeMed() // Chama a função para definir o tipo de medição
        } else if (verifT.valueOf().includes('Nome;Altura;Largura;Área;Un;Un/Área')){ // Verifica se o cabeçalho é o esperado
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';
                if (partes.length >= 6) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    let profundidade = strNum(partes[4]); // Converte a profundidade para número
                    let area3 = strNum(partes[5]); // Converte a área 3D para número
                    array2d.push([nome, altura, largura, area, profundidade, area3, 1, area3]); // Adiciona os valores ao array 2D
                    }
                }
            });
            medType.value = '3'; // Define o tipo de medição como monetário
            tempTypeMed = 3; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
        } else if (verifT.valueOf().includes('Nome;Altura;Largura;Área;R$/m²;Preço')){ // Verifica se o cabeçalho é o esperado
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 6) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    let profundidade = strNum(partes[4]); // Converte a profundidade para número
                    let area3 = strNum(partes[5]); // Converte a área 3D para número
                    array2d.push([nome, altura, largura, area, profundidade, area3, 1, area3]); // Adiciona os valores ao array 2D
                    }
                }
            });
            medType.value = '2'; // Define o tipo de medição como monetário
            tempTypeMed = 2; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
        } else if (verifT.valueOf().includes('Nome;Altura;Largura;Profundidade;Área(m²);Área(m³)')){ // Verifica se o cabeçalho é o esperado para 3D
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 6) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    let profundidade = strNum(partes[4]); // Converte a profundidade para número, substituindo vírgula por ponto
                    let area3 = strNum(partes[5]); // Converte a área 3D para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, profundidade, area, area3, 1, area3]); // Adiciona os valores ao array 2D
                    }
                }
            });
            medType.value = '1'; // Define o tipo de medição como monetário
            tempTypeMed = 1; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
        } else if (verifT.valueOf().includes('Nome;Altura;Largura;Área')){ // Verifica se o cabeçalho é o esperado para 2D{
            tempTypeMed = 0; // Define o tipo de medição como 2D
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 4) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, area, 1, area, 1, area]); // Adiciona os valores ao array 2D
                    }
                }
            });
            medType.value = '0'; // Define o tipo de medição como monetário
            tempTypeMed = 0; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
        } else {
            alert('Formato de arquivo inválido!'); // Exibe um alerta se o formato do arquivo não for reconhecido
            seletorDeArquivo.value = ''; // Limpa o seletor de arquivo após a importação
            return; // Interrompe a execução da função
        }
        formataVetor(array2d);
    };
    leitor.readAsText(file, 'utf-8'); // Lê o arquivo como texto
}

function strNum(n){
    if ( n != '' && n != null) {
    n = n.replace(/\./g,''); // Remove os pontos
    n = n.replace(/,/g,'.'); // Substitui as vírgulas por pontos
    n = n.replace(/[^\d.-]/g, ''); // Remove caracteres não numéricos, exceto ponto e traço
    return parseFloat(n); // Converte a string para número
    }
}

function formataVetor(array2d) {
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        if (area == '' || area == null || largura == '' || largura == null || altura == '' || altura == null){   
                array2d.splice(i, 1); // Remove o elemento Soma(paralela) do array2d
                i--; // Decrementa o índice para não pular o próximo elemento
            }
        }
    array2d.pop(); // Remove o último elemento do array2d após a importação

    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, pro, area2, pro2] = array2d[i];
        if (largura > 0 && area > 0) { // Verifica se a largura e a área são maiores que zero
            if (nome !== '' && nome !== null && nome != 'Soma:') {
                    tempNome2 = nome; // Atualiza o nome temporário
            } else {
                tempNome2 = 'Área'; // Se o nome for vazio ou nulo, define como 'Área'
            }
            tempAltura = altura; // Atualiza a altura temporária
            tempProfundidade = pro; // Atualiza a profundidade temporária
            tempProfundidade2 = pro2; // Atualiza a profundidade temporária
        }
    }

exibeArea2(); // Atualiza a tabela na tela
document.querySelector('#nome2').value = tempNome2; // Atualiza o campo de nome com o nome temporário
document.querySelector('#altura').value = tempAltura; // Atualiza o campo de altura com a altura temporária
document.querySelector('#profund').value = tempProfundidade; // Atualiza o campo de profundidade com a profundidade temporária
document.querySelector('#profund2').value = tempProfundidade2; // Atualiza o campo de profundidade 2 com a profundidade temporária
seletorDeArquivo.value = ''; // Limpa o seletor de arquivo após a importação
checarNome()
}

