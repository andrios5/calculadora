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
posicao = document.querySelector('#posicaoM2')
profund = document.querySelector('#profund')
profund2 = document.querySelector('#profund2')
lpro = document.querySelector('#lpro')
cpro = document.querySelector('#cpro')
lpro2 = document.querySelector('#lpro2')
cpro2 = document.querySelector('#cpro2')
tabela1 = document.querySelector('table#m1')
tabela2 = document.querySelector('table#m2')
containerM0 = document.querySelector('#containerM0')
containerM1 = document.querySelector('#containerM1')
theadM1 = document.querySelector('#theadM1')
dataMed = document.querySelector('#dataMed')
nomeMed = document.querySelector('#nomeMed')
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

document.querySelector('#altura').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada é 'Enter'
        calcularArea2();
    }
});

document.querySelector('#profund').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada é 'Enter'
        calcularArea2();
    }
});

document.querySelector('#profund2').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada é 'Enter'
        calcularArea2();
    }
});

seletorDeArquivo.addEventListener('change', function(e){
    if (e.target.files.length) {
        const file = e.target.files[0];
        if (file.name.toLowerCase().endsWith('.csv')) {
            importarCSVparaArray2d(file);
        } else if (file.name.toLowerCase().endsWith('.xls')) {
            importarXLSparaArray2d(file);
        } else {
            alert('Formato de arquivo não suportado!');
        }
    }
});

med2.addEventListener('click', calcularArea2)
resetC2.addEventListener('click', resetarC2)
menosC2.addEventListener('click', diminuirC2)
export2.addEventListener('click', exportar)
ordenar.addEventListener('click', ordenarVetor)
posicao.addEventListener('click', posicaoM)


// Supondo que todos os .containerm2 estão dentro de um container, por exemplo, section#m2
const parent = document.querySelector('#m2'); // ou outro container pai dos .containerm2
const containers = parent.querySelectorAll('.containerm2');
let draggingElem = null;

// Cria a área de drop (inicialmente oculta)
let dropArea = document.createElement('div');
dropArea.style.height = '60px';
dropArea.style.background = '#FFD416';
dropArea.style.color = '#8181d3';
dropArea.style.border = '2px dashed #8181d3';
dropArea.style.margin = '10px 0';
dropArea.style.display = 'none';
dropArea.style.alignItems = 'center';
dropArea.style.justifyContent = 'center';
dropArea.style.fontWeight = 'bold';
dropArea.style.textAlign = 'center';
dropArea.textContent = 'Solte aqui para mover para o final';

// Encontra o elemento de referência (ex: botão Somar ou rodapé)
const referencia = document.getElementById('quebraM'); // ou outro elemento ANTES do qual a área deve aparecer
parent.insertBefore(dropArea, referencia);

// Drag and drop nos elementos
containers.forEach(container => {
    container.setAttribute('draggable', 'true');
    container.addEventListener('dragstart', function(e) {
        // Remove classe e opacidade de todos antes de iniciar
        containers.forEach(c => {
            c.classList.remove('dragging');
            c.style.opacity = '';
        });
        draggingElem = container;
        container.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
        setTimeout(() => container.style.opacity = '0.5', 0);
        dropArea.style.display = 'flex'; // Mostra a área de drop
    });
    container.addEventListener('dragend', function() {
        draggingElem = null;
        container.classList.remove('dragging');
        container.style.opacity = '';
        dropArea.style.display = 'none'; // Esconde a área de drop
        // Garante limpeza em todos
        containers.forEach(c => {
            c.classList.remove('dragging');
            c.style.opacity = '';
        });
    });
});

// Eventos da área de drop
dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropArea.style.background = '#6969AD';
    dropArea.style.color = '#FFD416';
    dropArea.style.border = '2px dashed #FFD416';
});
dropArea.addEventListener('dragleave', function(e) {
    dropArea.style.background = '#FFD416';
    dropArea.style.color = '#8181d3';
    dropArea.style.border = '2px dashed #8181d3';
});
dropArea.addEventListener('drop', function(e) { // Evento de drop
    e.preventDefault();
    dropArea.style.background = '#FFD416';
    dropArea.style.color = '#8181d3';
    dropArea.style.border = '2px dashed #8181d3';
    if (draggingElem) {
        parent.insertBefore(draggingElem, dropArea);
        draggingElem.classList.remove('dragging');
        draggingElem.style.opacity = '';
        draggingElem = null;
        dropArea.style.display = 'none';
        // Garante limpeza em todos
        containers.forEach(c => {
            c.classList.remove('dragging');
            c.style.opacity = '';
        });
    }

    let tempAltura = 0; // Atualiza a altura temporária
    let tempProfundidade = 0; // Atualiza a profundidade temporária
    let tempProfundidade2 = 0; // Atualiza a profundidade temporária
    let tempNome2 = 'Área'; // Se o nome for vazio ou nulo, define como 'Área'
    let tempLar = 0; // Atualiza a largura temporária
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, pro, area2, pro2] = array2d[i];
        
            tempAltura = altura; // Atualiza a altura temporária
            tempProfundidade = pro; // Atualiza a profundidade temporária
            tempProfundidade2 = pro2; // Atualiza a profundidade temporária
            tempNome2 = nome; // Se o nome for vazio ou nulo, define como 'Área'
            tempLar = largura; // Atualiza a largura temporária
            
        }
        document.querySelector('#nome2').value = tempNome2; // Atualiza o campo de nome com o nome temporário
        document.querySelector('#altura').value = tempAltura; // Atualiza o campo de altura com a altura temporária
        document.querySelector('#profund').value = tempProfundidade; // Atualiza o campo de profundidade com a profundidade temporária
        document.querySelector('#profund2').value = tempProfundidade2; // Atualiza o campo de profundidade 2 com a profundidade temporária
        document.querySelector('#largura').value = tempLar; // Atualiza o campo de largura com a largura temporária
        alteraInput()
});





formatoEX.innerHTML = `<option value="0">CSV</option>`
formatoEX.innerHTML += `<option value="1">XLS</option>`
formatoEX.innerHTML += `<option value="2">DOC</option>`
formatoEX.innerHTML += `<option value="3">PDF</option>`
formatoEX.value = getCookie("formatoEXC") || 0

var tempNome2
let vetorOrdenando = false // Variável para controlar se o vetor está sendo ordenado
let array2d = []
let arrayM1 = []; // Array para armazenar os nomes únicos
let tempTypeMed = 0 // Variável para armazenar o tipo de medição selecionado
let tempTypeMed2 = 0
let tempTypeMed3 = 0 // Variável para armazenar o tipo de medição selecionado
let tempData = ''


typeMed ()
dataMedicao ()

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

        return `${dia}/${mes}/${ano}`
  
}

function dataMedicao () {
    dataMed.innerHTML = tempData || obterDataHoraFormatada(); // Obtém a data de medição do cookie
}


function typeMed() {
    medType = document.querySelector('#medType')
    if (tempTypeMed == 1) {
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a profundidade'
    lpro.innerHTML = 'Profundidade: '
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
        
    } else if (tempTypeMed == 2) { //R$
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite o preço'
    lpro.innerHTML = 'Preço: '
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2

    if (tempTypeMed3 == 1) {
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
    }
    tempTypeMed3 = 0;
    tempTypeMed2 = 1;
    } else if (tempTypeMed == 3) { //UN
    cpro.style.display = 'inline-flex' // Esconde o campo de profundidade
    profund.placeholder = 'Digite a unidade'
    lpro.innerHTML = 'Unidade: '
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    } else if (tempTypeMed == 4) {
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a Unidade'
    lpro.innerHTML = 'Unidade:'
    profund2.placeholder = 'Digite o preço'
    lpro2.innerHTML = 'Preço: '
    cpro2.style.display = 'inline-flex' // Esconde o campo de profundidade 2

    if (tempTypeMed2 == 1) {
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
    }
    tempTypeMed3 = 1
    tempTypeMed2 = 0
    }
    else {
    cpro.style.display = 'none' // Esconde o campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    medType.innerHTML = `<option value="0">M² (Medição Quadrada)</option>`
    medType.innerHTML += `<option value="1">M³ (Medição Cubica)</option>`
    medType.innerHTML += `<option value="3">UN (Medição com Unidade)</option>`
    medType.innerHTML += `<option value="2">R$ (Medição com Valor)</option>`
    medType.innerHTML += `<option value="4">UN + R$ (Unidade e Valor)</option>`
    }
}

function inverteVetor(array2d) {
    if(array2d.length > 0){
    array2dTemp = []; // Cria um novo array temporário
    let tempPreco = 0
    let tempUn = 0
    let area2Calc = 0; // Variável para armazenar o valor de area2 calculado
    let area3Calc = 0; // Variável para armazenar o valor de area3 calculado
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, preco, area2, un, area3] = array2d[i];
        array2dTemp.push([nome, altura, largura, area, un, area2, preco, area3]); // Adiciona os valores ao array temporário
        }

    array2d.length = 0; // Limpa o array original
    for (let i = 0; i < array2dTemp.length; i++) {
        const [nome, altura, largura, area, un, area2, preco, area3] = array2dTemp[i];
        area2Calc = Number(area) * Number(un); // Calcula area2 sem sobrescrever
        area3Calc = area2Calc * Number(preco); // Usa o valor calculado de area2
        array2d.push([nome, altura, largura, area, un, area2Calc, preco, area3Calc]); // Adiciona os valores do array temporário ao array original
        tempPreco = preco;
        tempUn = un;
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
        setCookie('tempNome3', tempNome3, 30); // Salva o nome no cookie por 30 dias
        
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
            pro = 0; // Define a profundidade como 1 se estiver vazio
        }

        if (pro2 == '' || pro2 == null) { // Verifica se o campo de profundidade 2 está vazio
            pro2 = 0; // Define a profundidade 2 como 0 se estiver vazio
        }

        area2 = alt * lar * pro // Calcula a área 3D
        area3 = alt * lar * pro2 * pro // Calcula a área 3D para o segundo campo de profundidade

        array2d.push([nome2, alt, lar, area, pro, area2, pro2, area3]) // Adiciona os valores ao array 2D

        typeMed()

       
        exibeArea2(array2d) // Chama a função para exibir os resultados
        noScroll()
        alteraInput(); // Chama a função para alterar o input

}

function alteraInput() {
            // Seleciona todos os inputs dentro do container desejado
        const container = document.querySelector('#m2'); // ou outro container pai
        const inputs = container.querySelectorAll('input');

        // O último input exibido:
        const ultimoInput = inputs[inputs.length - 1];

        ultimoInput.value = ''; // Limpa o valor do último input
        ultimoInput.focus(); // Coloca o foco no último input
}

let tempPosicao = 1
function posicaoM() {
    if (tempPosicao == 1) {
        tempPosicao = 0;
        posicao.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está ativo
        posicao.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
        
        document.getElementById('containerM0').style.height = '50vh'; // Define a altura máxima do container para 70vh
        document.getElementById('containerM1').style.maxHeight = '25vh';
    } else {
        tempPosicao = 1;
        posicao.style.backgroundColor = ''; // Restaura a cor original do botão
        posicao.style.boxShadow = ''; // Remove a sombra do botão
        noScroll(); // Chama a função para não rolar a tela
        document.getElementById('containerM0').style.height = 'auto'; // Define a altura do container para auto
        document.getElementById('containerM1').style.maxHeight = 'none';
    }
}

function noScroll() {
    cont2 = document.getElementById('containerM0')
    let altura1 = tabela2.offsetHeight;
    let altura2 = cont2.offsetHeight;
     if(tempPosicao == 1){
        let larguraDaTela = window.innerWidth;
        if (larguraDaTela <= 360) {
            let tempScroll = altura2 + 100
        window.scrollTo(0, tempScroll);} else if (larguraDaTela <= 420) {window.scrollTo(0, altura2 - 150);} else if (larguraDaTela <= 750) {window.scrollTo(0, altura2 - 200);} else {window.scrollTo(0, altura2 - 300);};
    } else {
        cont2.scrollTo(0, altura1)
    }
    
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
    document.querySelector('h3.edicao').style.display = 'none';
    if (vetorOrdenando === true) { // Verifica se o vetor está sendo ordenado
        ordenarArray2dPorNome(); // Ordena o array2d por nome
    }

    resM2.innerHTML = '' // Limpa o conteúdo anterior
    if (tempTypeMed == 4) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>un</th><th>un/m²</th><th>R$/un</th><th>Preço</th></tr>`
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i];
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td  class='cSoma'>${area.toLocaleString('pt-BR')}</td><td>${un.toLocaleString('pt-BR')}</td><td  class='cSoma'>${area3.toLocaleString('pt-BR')}</td><td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td class='cSoma'>${area4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
    // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma2 += Number(array2d[i][3]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
            soma4 += Number(array2d[i][7]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td><td colspan="2">${soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 3) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>un</th><th>un/m²</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3] = array2d[i];
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${un.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
    // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else if (tempTypeMed == 2) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>R$/m²</th><th>Preço</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, preco, area3] = array2d[i];
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td>${area3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
    // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td colspan="2">${soma3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 1) {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>Profund.</th><th>m²</th><th>m³</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${profundidade.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
    // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
            somaP += Number(array2d[i][4]);
            soma3 += Number(array2d[i][5]);
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        seletorDeArquivo.style.display = 'inline-block'
        }else{
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else {
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th></tr>`; // Atualiza o cabeçalho da tabela
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area] = array2d[i];
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td> <td>${largura.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
    // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            soma2 += Number(array2d[i][3]);
            somaA += Number(array2d[i][1]);
            somaL += Number(array2d[i][2]);
        }

        if (array2d.length == 0) { // Verifica se o array2d está vazio
            tabelaVazia()
        }else{
            tabelaCheia()
            resS2.innerHTML = `<tr><th colspan="1">Soma:</th><td colspan='1'>${somaA.toLocaleString('pt-BR')}</td><td colspan='1'>${somaL.toLocaleString('pt-BR')}</td><td colspan='1'>${soma2.toLocaleString('pt-BR')}</td></tr>`;
        }
    }
    checarNome() // Chama a função para verificar o nome e exibir a soma por nome // Ordena o array2d por nome
}

function tabelaVazia() {
    tabela.style.display = 'none'
    containerM0.style.display = 'none'
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    tabela1.style.display = 'none'
    ordenar.style.display = 'none'
    posicao.style.display = 'none'
    seletorDeArquivo.style.display = 'inline-block'
}

function tabelaCheia() {
    tabela.style.display = 'block'
    containerM0.style.display = 'block'
    menosC2.style.display = 'inline-block'
    export2.style.display = 'inline-block'
    resetC2.style.display = 'inline-block'
    formatoEX.style.display = 'inline-block'
    ordenar.style.display = 'inline-block'
    posicao.style.display = 'inline-block'
}

// Função para editar uma linha da tabela M2
function editarLinhaM2(index) {
    exibeArea2(); // Fecha qualquer edição anterior
    document.querySelector('h3.edicao').style.display = 'block'; // Exibe o título de edição
    const tabela = document.querySelector('#resultadoM2');
    const linha = tabela.children[index];
    if (!linha) return;

    linha.classList.add('editando');

    // Descobre os campos editáveis de acordo com o tipo de medição
    let camposEditaveis = [];
    if (typeof tempTypeMed === 'undefined' || tempTypeMed === 0) {
        camposEditaveis = [0, 1, 2];
    } else if (tempTypeMed == 1) {
        camposEditaveis = [0, 1, 2, 3];
    } else if (tempTypeMed == 2) {
        camposEditaveis = [0, 1, 2, 4];
    } else if (tempTypeMed == 3) {
        camposEditaveis = [0, 1, 2, 4];
    } else if (tempTypeMed == 4) {
        camposEditaveis = [0, 1, 2, 4, 6];
    }
    let inputRefs = [];
    const dados = array2d[index].slice();
    for (let i = 0; i < linha.children.length; i++) {
        const celula = linha.children[i];
        if (camposEditaveis.includes(i)) {
            const input = document.createElement('input');
            input.type = (i === 0) ? 'text' : 'number';
            input.value = dados[i] !== undefined ? dados[i] : '';
            input.style.width = '80px';
            input.style.backgroundColor = '#f0f0f0';
            input.style.border = '1px solid #ccc';
            celula.textContent = '';
            celula.appendChild(input);
            inputRefs[i] = input;
            input.addEventListener('click', function(e) { e.stopPropagation(); });
            input.addEventListener('focus', function() { this.select(); });
        }
    }

    

    // Botão Alterar
    const btnAlterar = document.createElement('button');
    btnAlterar.textContent = 'Alterar';
    btnAlterar.style.backgroundColor = '#6969AD'; // Cor verde para o botão de salvar
    btnAlterar.style.color = '#FFD416'; // Cor do texto do botão
    btnAlterar.onclick = function(e) {
        e.stopPropagation();
        camposEditaveis.forEach(function(idx) {
            if (inputRefs[idx]) {
                array2d[index][idx] = inputRefs[idx].value;
            }
        });
        
        const [nome, altura, largura, area, pro, area2, pro2] = array2d[index];
        array2d[index] = [nome, altura, largura, altura * largura, pro, altura * largura * pro, pro2, altura * largura * pro * pro2]; //
        exibeArea2();
    };
    btnAlterar.addEventListener('click', function(e) { e.stopPropagation(); });
    linha.appendChild(btnAlterar);

    // Botão deletar
    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = 'Deletar';
    btnDeletar.onclick = function(e) {
        e.stopPropagation();
        array2d.splice(index, 1); // Remove a linha do array2d
        exibeArea2(); // Atualiza a tabela
    };
    btnDeletar.addEventListener('click', function(e) { e.stopPropagation(); });
    linha.appendChild(btnDeletar);

    // Permite salvar com Enter em qualquer input, chamando o botão 'Alterar'
    camposEditaveis.forEach(function(idx) {
        if (inputRefs[idx]) {
            inputRefs[idx].addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    btnAlterar.click();
                }
            });
        }
    });
}

// Função para editar/capturar clique na linha da tabela m1
function editarLinhaM1(index) {
    // Busca o nome diretamente da primeira célula da linha exibida
    const resM1 = document.querySelector('#resultadoM1');
    const linha = resM1.children[index];
    let nome = '';
    if (linha && linha.children.length > 0) {
        nome = linha.children[0].textContent;
    } else if (arrayM1[index] && arrayM1[index][0]) {
        nome = arrayM1[index][0];
    } else {
        nome = 'Nome não encontrado';
    }
    alert('Nome da linha: ' + nome);
    // Aqui você pode implementar edição ou outra ação desejada
}

// Ao exibir a tabela m1, torne as linhas clicáveis



function mudouNome() {
    tabela1 = document.querySelector('table#m1')
    if (arrayM1.length >= 2) { // Verifica se o arrayM1 tem mais de um elemento e se o tipo de medição é diferente de 0
    tabela1.style.display = 'block'
    containerM1.style.display = 'block'
    if (tempTypeMed == 1) {
        theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área(m²)</th><th>Área(m³)</th></tr>`; // Atualiza o cabeçalho da tabela'
        } else if (tempTypeMed == 2) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>R$</th></tr>`; // Atualiza o cabeçalho da tabela
        } else if (tempTypeMed == 3) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>un/m²</th></tr>`; // Atualiza o cabeçalho da tabela
        } else if (tempTypeMed == 4) {
            theadM1.innerHTML = `<tr><th>Soma dos Itens</th><th>Área</th><th>un/m²</th><th>R$</th></tr>`;
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
        mudouNome()
}
}

function editarLinhaM1(nome) {
    alert(nome)
        exibeArea2(); // Fecha qualquer edição anterior
        const tabelaM1 = document.querySelector('#resultadoM1');
        const linhaM1 = tabelaM1.children[nome];
        if (!linhaM1) return;
        alert(nome)
    }


function resetarC2(){
    /*tempNome2 = getCookie('tempNome3') || 'Área'; // Obtém o nome temporário do cookie
    resM2.innerHTML = ''
    resS2.innerHTML = ''
    tabela.style.display = 'none'
    containerM0.style.display = 'none'
    document.querySelector('#altura').value = ''
    document.querySelector('#largura').value = ''
    document.querySelector('#nome2').value = tempNome2 // Reseta o campo de nome para o valor temporário
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    tabela1.style.display = 'none'
    containerM1.style.display = 'none'
    ordenar.style.display = 'none'
    posicao.style.display = 'none'
    seletorDeArquivo.value = ''; // Limpa o seletor de arquivo após a importação
    array2d = [] // Limpa o array 2D
    tempTypeMed = 0
    tempTypeMed2 = 0
    tempTypeMed3 = 0
    tempData = ''
    vetorOrdenando = true // Reseta o estado de ordenação
    ordenarVetor()
    tempPosicao = 0
    posicaoM()
    profund.value = '' // Esconde o campo de profundidade
    profund2.value = '' // Esconde o campo de profundidade 2
    nomeMed.value = ''
    typeMed()
    dataMedicao()
    formatoEX.value = getCookie("formatoEXC") || '0'; // Reseta o formato de exportação para o padrão*/
    window.location.reload()
}

function diminuirC2(){
     for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i];
        tempNome2 = nome
        document.getElementById('altura').value = altura
        document.getElementById('largura').value = largura
        document.getElementById('profund').value = un
        document.getElementById('profund2').value = preco
     }
    array2d.pop() // Remove o último elemento do array 2D
    exibeArea2(array2d) // Atualiza a exibição
}

function exportar() {
    nome2 = '0'
    let nome1 = ''
    checarNome(); // Atualiza o nome temporário
    nome1 = nomeMed.value || document.querySelector('#nome2').value || 'Área'; // Define o nome para exportação, se estiver vazio usa 'Área'
    nome1 = nome1.trim() // Remove espaços em branco no início e no final do nome
    
    nome2 = nome1 + obterDataHoraFormatada(); // Define o nome do arquivo
    
    if (!array2d.length) {
        alert('Não há dados para exportar!');
        return;
    }

    if (formatoEX.value == '0'){
        if (tempTypeMed == 1){
            exportar21(nome1, nome2)
        } else if (tempTypeMed == 2) {
            exportar22(nome1, nome2)
        } else if (tempTypeMed == 3) {
            exportar23(nome1, nome2)
        } else if (tempTypeMed == 4) {
            exportar24(nome1, nome2)
        } else {
            exportar2(nome1, nome2)
        }
        setCookie('formatoEXC', 0, 30)
    } else if (formatoEX.value == '1') {
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
        setCookie('formatoEXC', 1, 30)
    } else if (formatoEX.value == '2') {
        exportarParaDocx(); // Exporta para documento Word
    } else {
        exportarParaPDF(); // Exporta para PDF
    }

}



function exportarParaPDF() {
    const tabela = document.querySelector('table#m2');
    if (!tabela) {
        alert('Tabela não encontrada!');
        return;
    }

    // Extrai os dados da tabela
    const linhas = Array.from(tabela.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th,td')).map(td => td.textContent)
    );

    

    // Separa cabeçalho e corpo
    const head = [linhas[0]];
    const body = [];

    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i];
    // Detecta linha de soma com preço (ajuste conforme seu texto)
        if (linha[0] && linha[0].toLowerCase().includes('soma') && linha.length >= 6) {
            // Exemplo: soma ocupa as colunas 4 e 5 (ajuste conforme sua tabela)
            body.push([
                linha[0], // Ex: "Soma:"
                linha[1],
                linha[2],
                linha[3],
                linha[4],
                linha[5], // Ex: "R$ 100,00"
                { content: linha[6], colSpan: 2, styles: { halign: 'center' } }, // ocupa 2 colunas
                '', // célula vazia para o colSpan
            ]);
        } else {
            body.push(linha);
        }
    }
    // Cria o PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('Arial', 'normal');
    doc.setFontSize(16);
    doc.text(`${nomeMed.value || document.querySelector('#nome2').value || 'Área'} ${obterDataHoraFormatada()}`, 105, 15, { align: 'center' });

    doc.autoTable({
    head: head,
    body: body,
    startY: 25,
    styles: { font: 'Arial', fontSize: 12 },
    headStyles: {
        fillColor: [187, 187, 187], // fundo amarelo (RGB)
        textColor: [0, 0, 0],   // texto azul escuro (RGB)
        fontStyle: 'bold'
    },
    tableWidth: 'auto',
    margin: { left: 10, right: 10 }
    });

    doc.save(`${nomeMed.value || document.querySelector('#nome2').value || 'Área'}${obterDataHoraFormatada()}.pdf`);
}


async function exportarParaDocx() {
    const tabela = document.querySelector('table#m2');
    if (!tabela) {
        alert('Tabela não encontrada!');
        return;
    }

    // Extrai os dados da tabela para um array
    const linhas = Array.from(tabela.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th,td')).map(td => td.textContent)
    );

    // Função para criar uma célula com fonte Arial e tamanho 24pt
    
    function makeCell(text) {
        if (tempTypeMed == 4) {
        return new docx.TableCell({
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: text,
                            font: 'Arial',
                            size: 22 // 16pt = 32 half-points
                        })
                    ]
                })
            ]
        });
    } else if (tempTypeMed == 3 || tempTypeMed == 2 || tempTypeMed == 1) {
        return new docx.TableCell({
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: text,
                            font: 'Arial',
                            size: 24 // 12pt = 24 half-points
                        })
                    ]
                })
            ]
        });
    } else {
        return new docx.TableCell({
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: text,
                            font: 'Arial',
                            size: 26 // 12pt = 24 half-points
                        })
                    ]
                })
            ]
        });
    }
}


    // Cria as linhas da tabela para o docx
    const docxRows = linhas.map(row =>
        new docx.TableRow({
            children: row.map(cell => makeCell(cell)),
        })
    );

    // Cria o documento
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    text: `${nomeMed.value || document.querySelector('#nome2').value || 'Área'} ${obterDataHoraFormatada()}`,
                    heading: docx.HeadingLevel.HEADING_1,
                    font: 'Arial',
                    size: 20, // 10pt = 20 half-points
                    style: 'Title'
                }),
                new docx.Table({
                    rows: docxRows,
                    width: { size: 100, type: docx.WidthType.PERCENTAGE }
                }),
            ],
        }],
    });

    // Gera o arquivo e faz o download
    const blob = await docx.Packer.toBlob(doc);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${nomeMed.value || document.querySelector('#nome2').value || 'Área'}${obterDataHoraFormatada()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            <th>Medição:</th>
            <td colspan='2'>${nomeMed.value || document.querySelector('#nome2').value || 'Área'}</td>
            <td>${obterDataHoraFormatada()}</td>
        </tr>
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
            <th>Medição:</th>
            <td colspan='4'>${nomeMed.value || document.querySelector('#nome2').value || 'Área'}</td>
            <td>${obterDataHoraFormatada()}</td>
        </tr>
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
            <th>Medição:</th>
            <td colspan='4'>${nomeMed.value || document.querySelector('#nome2').value || 'Área'}</td>
            <td>${obterDataHoraFormatada()}</td>
        </tr>
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
            <th>Medição:</th>
            <td colspan='4'>${nomeMed.value || document.querySelector('#nome2').value || 'Área'}</td>
            <td>${obterDataHoraFormatada()}</td>
        </tr>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
            <th>un</th>
            <th>un/Área</th>
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
    html += `<tr></tr>`
    html += `<tr><th colspan="3">Soma dos Itens</th><th>Área</th><th colspan='2'>un/Área</th></tr>`
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
            <th>Medição:</th>
            <td colspan='6'>${nomeMed.value || document.querySelector('#nome2').value || 'Área'}</td>
            <td>${obterDataHoraFormatada()}</td>
        </tr>
        <tr>
            <th>Nome</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Área</th>
            <th>un</th>
            <th>un/Área</th>
            <th>R$/un</th>
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
    html += `<tr><th colspan="3">Soma dos Itens</th><th>Área</th><th colspan='2'>un/Área</th><th colspan='2'>Preço</th></tr>`
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

function exportar2(nome1, nome2) {
    // Monta o cabeçalho CSV
    let csv = '\uFEFF' +  `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;Área\n`;
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
    for (let i = 0; i < array2d.length; i++) soma2 += Number(array2d[i][3]);
    for (let i = 0; i < array2d.length; i++) somaA += Number(array2d[i][1]);
    for (let i = 0; i < array2d.length; i++) somaL += Number(array2d[i][2]);
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

function exportar21(nome1, nome2) {
    // Monta o cabeçalho CSV
    let csv = '\uFEFF' +  `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;Profundidade;Área(m²);Área(m³)\n`;
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

function exportar22(nome1, nome2) {
    // Monta o cabeçalho CSV
    let csv = '\uFEFF' +  `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;Área;R$/m²;Preço\n`;
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

function exportar23(nome1, nome2) {
    // Monta o cabeçalho CSV
    let csv = '\uFEFF' +   `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;Área;un;un/Área\n`;
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
    arrayTemp.push(["Soma dos Itens",'','','Área','','un/Área']);
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

function exportar24(nome1, nome2) {
    // Monta o cabeçalho CSV
    let csv = '\uFEFF' +  `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;Área;un;un/Área;R$/un;Preço\n`;
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
    arrayTemp.push(["Soma dos Itens",'','','Área','','un/Área','','Preço']);
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
        let verifT = ''; // Inicializa a variável de verificação
        let tempCabecalho = linhas.shift(); // Remove o cabeçalho do CSV
        if (tempCabecalho.valueOf().toLowerCase().includes('medição:')){ // Verifica se o cabeçalho é o esperado
            nomeMed.value = tempCabecalho.split(';')[1]; // Define o nome da medição
            tempData = tempCabecalho.split(';')[2]; // Define a data da medição
            verifT = linhas.shift();  // Remove o cabeçalho do CSV
        } else {
            verifT = tempCabecalho; // Se não for o cabeçalho esperado, armazena para verificação posterior
        }
        if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;área;un;un/área;r$/un;preço')){ // Verifica se o cabeçalho é o esperado
            medType.value = '4'; // Define o tipo de medição como monetário
            tempTypeMed = 4; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
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

            
        } else if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;área;un;un/área')){ // Verifica se o cabeçalho é o esperado
            medType.value = '3'; // Define o tipo de medição como monetário
            tempTypeMed = 3; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
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
                    array2d.push([nome, altura, largura, area, profundidade, area3, 0, 0]); // Adiciona os valores ao array 2D
                    }
                }
            });


        } else if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;área;r$/m²;preço')){ // Verifica se o cabeçalho é o esperado
            medType.value = '2'; // Define o tipo de medição como monetário
            tempTypeMed = 2; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
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
                    array2d.push([nome, altura, largura, area, profundidade, area3, 0, 0]); // Adiciona os valores ao array 2D
                    }
                }
            });
            

        } else if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;profundidade;área(m²);área(m³)')){ // Verifica se o cabeçalho é o esperado para 3D            
            medType.value = '1'; // Define o tipo de medição como monetário
            tempTypeMed = 1; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 6) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let profundidade = strNum(partes[4]); // Converte a profundidade para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    let area3 = strNum(partes[5]); // Converte a área 3D para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, profundidade, area, area3, 0, 0]); // Adiciona os valores ao array 2D
                    }
                }
            });


        } else if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;área')){ // Verifica se o cabeçalho é o esperado para 2D
            medType.value = '0'; // Define o tipo de medição como monetário
            tempTypeMed = 0; // Define o tipo de medição como monetário
            typeMed() // Chama a função para definir o tipo de medição
            tempTypeMed = 0; // Define o tipo de medição como 2D
            linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 4) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = strNum(partes[1]); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = strNum(partes[2]); // Converte a largura para número, substituindo vírgula por ponto
                    let area = strNum(partes[3]); // Converte a área para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, area, 0, 0, 0, 0]); // Adiciona os valores ao array 2D
                    }
                }
            });

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
            let tempAltura = 0; // Atualiza a altura temporária
            let tempProfundidade = 0; // Atualiza a profundidade temporária
            let tempProfundidade2 = 0; // Atualiza a profundidade temporária
            let tempNome2 = 'Área'; // Se o nome for vazio ou nulo, define como 'Área'
            let tempLar = 0; // Atualiza a largura temporária
    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area, pro, area2, pro2] = array2d[i];
        if (typeof area !== "number"|| typeof largura !== "number" || typeof altura !== 'number' || nome == '' || nome == null || nome == 'Soma:') {   
                array2d.splice(i, 1); // Remove o elemento Soma(paralela) do array2d
                i--; // Decrementa o índice para não pular o próximo elemento
            } else {
            tempAltura = altura; // Atualiza a altura temporária
            tempProfundidade = pro; // Atualiza a profundidade temporária
            tempProfundidade2 = pro2; // Atualiza a profundidade temporária
            tempNome2 = nome; // Se o nome for vazio ou nulo, define como 'Área'
            tempLar = largura; // Atualiza a largura temporária
            }
        }

exibeArea2(); // Atualiza a tabela na tela
document.querySelector('#nome2').value = tempNome2; // Atualiza o campo de nome com o nome temporário
document.querySelector('#altura').value = tempAltura; // Atualiza o campo de altura com a altura temporária
document.querySelector('#profund').value = tempProfundidade; // Atualiza o campo de profundidade com a profundidade temporária
document.querySelector('#profund2').value = tempProfundidade2; // Atualiza o campo de profundidade 2 com a profundidade temporária
document.querySelector('#largura').value = tempLar; // Atualiza o campo de largura com a largura temporária

console.log(seletorDeArquivo.value.replace(/C:\\fakepath\\/i, '')); // Exibe o nome do arquivo selecionado no console
checarNome()
dataMedicao()
alteraInput()
}

function importarXLSparaArray2d(file) {
    const leitor = new FileReader();
    leitor.onload = function(e) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = e.target.result;
        const tabela = tempDiv.querySelector('table');
        if (!tabela) {
            alert('Arquivo não contém tabela!');
            return;
        }
        const linhas = tabela.querySelectorAll('tr');
        // Detecta o tipo de tabela pelo cabeçalho
        let cabecalho = [];
        if (linhas.length > 0) {
            cabecalho = Array.from(linhas[0].querySelectorAll('th,td')).map(td => td.textContent.trim());
        }

        if (cabecalho.includes("Medição:")) {
            nomeMed.value = cabecalho[1]; // Define o nome da medição
            tempData = cabecalho[2]; // Define a data da medição
            cabecalho = Array.from(linhas[1].querySelectorAll('th,td')).map(td => td.textContent.trim());
        }

        if (cabecalho.includes('un/Área') && cabecalho.includes('R$/un') && cabecalho.length >= 8) {
            medType.value = '4'; tempTypeMed = 4; tempTypeMed3 = 1; tempTypeMed2 = 0;
        } else if (cabecalho.includes('un/Área')) {
            medType.value = '3'; tempTypeMed = 3;
        } else if (cabecalho.includes('R$/m²')) {
            medType.value = '2'; tempTypeMed = 2;
        } else if (cabecalho.includes('Profundidade')) {
            medType.value = '1'; tempTypeMed = 1;
        } else {
            medType.value = '0'; tempTypeMed = 0;
        }
        typeMed();
        
        // Importação para cada formato conhecido
        for (let i = 1; i < linhas.length; i++) { // começa do 1 para pular o cabeçalho
            const celulas = linhas[i].querySelectorAll('td, th');
            // XLS tipo 4 (com 8 colunas)
            if (celulas[0] && celulas[0].textContent.trim().toLowerCase().includes('soma dos itens')) { // Verifica se é a linha de soma dos itens
                break;
            }
            if (cabecalho.length >= 8 && celulas.length >= 8) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let area = strNum(celulas[3].textContent);
                let profundidade = strNum(celulas[4].textContent);
                let area3 = strNum(celulas[5].textContent);
                let preco = strNum(celulas[6].textContent);
                let area4 = strNum(celulas[7].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, area, profundidade, area3, preco, area4]);
                }
            // XLS tipo 3 (6 colunas, un/unÁrea)
            } else if (cabecalho.length >= 6 && celulas.length >= 6 && cabecalho.includes('un/Área')) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let area = strNum(celulas[3].textContent);
                let profundidade = strNum(celulas[4].textContent);
                let area3 = strNum(celulas[5].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, area, profundidade, area3, 0, 0]);
                }
            // XLS tipo 2 (6 colunas, R$/m² e Preço)
            } else if (cabecalho.length >= 6 && celulas.length >= 6 && cabecalho.includes('R$/m²')) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let area = strNum(celulas[3].textContent);
                let profundidade = strNum(celulas[4].textContent);
                let area3 = strNum(celulas[5].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, area, profundidade, area3, 0, 0]);
                }
            // XLS tipo 1 (6 colunas, Profundidade, Área(m²), Área(m³))
            } else if (cabecalho.length >= 6 && celulas.length >= 6 && cabecalho.includes('Profundidade')) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let profundidade = strNum(celulas[4].textContent);
                let area = strNum(celulas[3].textContent);
                let area3 = strNum(celulas[5].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, profundidade, area, area3, 0, 0]);
                }
            // XLS tipo 0 (4 colunas)
            } else if (cabecalho.length >= 4 && celulas.length >= 4) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let area = strNum(celulas[3].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, area, 0, 0, 0, 0]);
                }
            }
        }
        // Detecta e ajusta tipo de medição

        formataVetor(array2d);
    };
    leitor.readAsText(file, 'utf-8');
}