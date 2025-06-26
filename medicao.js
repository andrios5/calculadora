
med2 = document.querySelector('button#med2')
resetC2 = document.querySelector('button#resetC2')
menosC2 = document.querySelector('button#menosC2')
export2 = document.querySelector('button#export2')
formatoEX = document.querySelector('#formatoEX')
ordenar = document.querySelector('#ordenarM2')
const seletorDeArquivo = document.getElementById('seletorDeArquivo');

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
var temp02
let vetorOrdenando = false // Variável para controlar se o vetor está sendo ordenado
let array2d = []
let array1d = []
let arrayA = []
let arrayL = []
let arrayM1 = []; // Array para armazenar os nomes únicos

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

function ordenarVetor() {
    if (vetorOrdenando === false) { // Verifica se o vetor já está sendo ordenado
    vetorOrdenando = true
    ordenar.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está ordenando
    ordenar.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
    ordenarArray2dPorNome(); // Chama a função para ordenar o array2d por nome
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

                let temp1 = array1d[j];
                array1d[j] = array1d[j + 1];
                array1d[j + 1] = temp1;

                let tempA = arrayA[j];
                arrayA[j] = arrayA[j + 1];
                arrayA[j + 1] = tempA;

                let tempL = arrayL[j];
                arrayL[j] = arrayL[j + 1];
                arrayL[j + 1] = tempL;
            }
        }
    }
}


    

    function calcularArea2(){
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        nome2 = document.querySelector('#nome2').value || 'Área'; // Define o nome, se estiver vazio usa 'Área'
        nome2 = nome2.trim() // Remove espaços em branco no início e no final do nome
        resM2 = document.querySelector('#resultadoM2')
        resS2 = document.querySelector('#resultadoS2')
        tabela = document.querySelector('table#m2')
        tabela1 = document.querySelector('table#m1')

        tempNome2 = nome2 // Armazena o nome temporário
        

        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        
        /*if (alt.value == '' || alt.value == null || alt.value == '0') { // Verifica se os campos estão vazios
            alt.value = `1`;
        }
        if (lar.value == '' || lar.value == null || lar.value == '0') { // Verifica se os campos estão vazios
            lar.value = `1`;
        }*/
        
        altP = alt.toString().split(/[.,]/)
        larP = lar.toString().split(/[.,]/)

        alt = Number(alt.value)
        lar = Number(lar.value)

        area = alt * lar

        array2d.push([nome2, alt, lar, area]) // Adiciona os valores ao array 2D
        arrayA.push(alt) // Adiciona a altura ao array 1D
        arrayL.push(lar) // Adiciona a largura ao array 1D
        array1d.push(area) // Adiciona a área ao array 1D

        exibeArea2(array2d, array1d) // Chama a função para exibir os resultados
        document.querySelector('#largura').value = ''
        document.querySelector('#largura').focus() // Coloca o foco no input novamente
        
}

function exibeArea2(array2d, array1d) {
    let soma2 = 0 // Inicializa a variável de soma
    let somaA = 0 // Inicializa a variável de soma das alturas
    let somaL = 0 // Inicializa a variável de soma das larguras
    resM2 = document.querySelector('#resultadoM2')
    resS2 = document.querySelector('#resultadoS2')
    tabela = document.querySelector('table#m2')

    if (vetorOrdenando === true) { // Verifica se o vetor está sendo ordenado
        ordenarArray2dPorNome(); // Ordena o array2d por nome
    }


    
    resM2.innerHTML = '' // Limpa o conteúdo anterior
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area] = array2d[i];
            
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td> <td>${largura.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td></tr>`;
        }
    

    

    for (let i = 0; i < array1d.length; i++) {
        soma2 += Number(array1d[i]);
    }

    for (let i = 0; i < arrayA.length; i++) {
        somaA += Number(arrayA[i]);
    }

    for (let i = 0; i < arrayL.length; i++) {
        somaL += Number(arrayL[i]);
    }
    
    if (array1d.length == 0) { // Verifica se o array1d está vazio
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
    resS2.innerHTML = `<tr><th colspan="1">Soma:</th><td colspan='1'>${somaA.toLocaleString('pt-BR')}</td><td colspan='1'>${somaL.toLocaleString('pt-BR')}</td><td colspan='1' id="m121">${soma2.toLocaleString('pt-BR')}</td></tr>`;
    }

    checarNome() // Chama a função para verificar o nome e exibir a soma por nome // Ordena o array2d por nome
}

function mudouNome() {
    tabela1 = document.querySelector('table#m1')
    if (arrayM1.length >= 2) { // Verifica se o nome foi alterado
    tabela1.style.display = 'block'
    }
}

function checarNome(){
    
        resM1 = document.querySelector('#resultadoM1')
        resM1.innerHTML = ''
        
        let somaPorNome = {}; // Objeto para armazenar a soma por nome
        arrayM1.length = 0; // Array para armazenar os nomes únicos

        for (let i = 0; i < array2d.length; i++) {
            const [nome, , , area] = array2d[i];

            let nomeLimpo = nome

            if (!somaPorNome[nomeLimpo]) { // Verifica se o nome já existe no objeto
                somaPorNome[nomeLimpo] = 0; // Inicializa a soma para este nome
            }
            somaPorNome[nomeLimpo] += Number(area); // Adiciona a área à soma correspondente ao nome
        }
        
        // Exemplo de exibição no console:
        for (let nome in somaPorNome) {
            resM1.innerHTML += `<tr><th colspan="1">Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
            arrayM1.push([nome, somaPorNome[nome]]); // Adiciona o nome e a soma ao arrayM1
        }
        mudouNome()
}


function resetarC2(){
    resM2.innerHTML = ''
    resS2.innerHTML = ''
    tabela.style.display = 'none'
    document.querySelector('#altura').value = ''
    document.querySelector('#largura').value = ''
    document.querySelector('#nome2').value = 'Área'
    nome2 = 'Área'
    tempNome2 = ''
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    tabela1.style.display = 'none'
    ordenar.style.display = 'none'
    seletorDeArquivo.style.display = 'inline-block'
    array2d = [] // Limpa o array 2D
    array1d = [] // Limpa o array 1D
    arrayA = [] // Limpa o array de alturas
    arrayL = [] // Limpa o array de larguras
}

function diminuirC2(){
    array1d.pop() // Remove o último elemento do array 1D
    array2d.pop() // Remove o último elemento do array 2D
    arrayA.pop() // Remove o último elemento do array de alturas
    arrayL.pop() // Remove o último elemento do array de larguras
     for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        tempNome2 = nome
        
     }
    temp02 = true
    exibeArea2(array2d, array1d) // Atualiza a exibição
}

function exportar() {
    nome2 = '0'
    temp02 = true; // Garante que o nome seja atualizado antes da exportação
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
    exportar2()} else {
        exportar1(); // Chama a função de exportação para XLS
    }

    diminuirC2(); // Chama a função para remover o último elemento após a exportação
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
    for (let i = 0; i < array1d.length; i++) soma2 += Number(array1d[i]);
    for (let i = 0; i < arrayA.length; i++) somaA += Number(arrayA[i]);
    for (let i = 0; i < arrayL.length; i++) somaL += Number(arrayL[i]);
    html += `<tr>
        <th>Soma:</th>
        <td>${somaA.toLocaleString('pt-BR')}</td>
        <td>${somaL.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
    </tr>`;

    html += `<tr></tr>`

    html += `<tr><th colspan="4">Soma Parcial dos Itens</th></tr>`

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
    for (let i = 0; i < array1d.length; i++) {
        soma2 += Number(array1d[i]);
    }
    for (let i = 0; i < arrayA.length; i++) {
        somaA += Number(arrayA[i]);
    }
    for (let i = 0; i < arrayL.length; i++) {
        somaL += Number(arrayL[i]);
    }
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR')]);
    arrayTemp.push([]); // Adiciona uma linha vazia para separação
    arrayTemp.push(["Soma Parcial dos Itens"]);
    
    for (let i = 0; i < arrayM1.length; i++) {
        const [nome, area] = arrayM1[i];
        arrayTemp.push([`Soma ${nome}:`, '', '', area.toLocaleString('pt-BR')]);
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

function importarCSVparaArray2d(file) {
    const leitor = new FileReader(); // Cria um novo FileReader
    leitor.onload = function(e) { // Define o que fazer quando o arquivo for carregado
        const conteudo = e.target.result; // Obtém o conteúdo do arquivo
        const linhas = conteudo.split('\n'); // Divide o conteúdo em linhas
        linhas.shift();  // Remove o cabeçalho do CSV
        linhas.forEach(linha => { // Percorre cada linha do CSV
            if (linha.trim() !== '') { // Verifica se a linha não está vazia
                const partes = linha.split(';'); // Divide a linha em partes usando o separador ';'
                if (partes.length >= 4) { // Verifica se há pelo menos 4 partes
                    let nome = partes[0]; // Obtém o nome da primeira parte
                    let altura = Number(partes[1].replace(',', '.')); // Converte a altura para número, substituindo vírgula por ponto
                    let largura = Number(partes[2].replace(',', '.')); // Converte a largura para número, substituindo vírgula por ponto
                    let area = Number(partes[3].replace(',', '.')); // Converte a área para número, substituindo vírgula por ponto
                    array2d.push([nome, altura, largura, area]); // Adiciona os valores ao array 2D
                }
            }
        });
        formataVetor(array2d); // Chama a função para calcular a soma das alturas e larguras
        
    };
    leitor.readAsText(file, 'utf-8'); // Lê o arquivo como texto
}

function formataVetor(array2d) {
    array1d.length = 0;
    arrayA.length = 0;
    arrayL.length = 0;

    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        if (largura == '' || largura == null && area == '' || area == null){   
                array2d.splice(i, 1); // Remove o elemento Soma(paralela) do array2d
                i--; // Decrementa o índice para não pular o próximo elemento
            }
            
        }
    array2d.pop(); // Remove o último elemento do array2d após a importação

    for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
         if (largura > 0 && area > 0) { // Verifica se a largura e a área são maiores que zero
        if (altura !== '' && altura !== null) {
                arrayA.push(altura); // Adiciona a altura ao array de alturas
                tempAltura = altura; // Atualiza a altura temporária
        }
        if (largura !== '' && largura !== null) {
                arrayL.push(largura); // Adiciona a largura ao array de larguras
        }
        if (area !== '' && area !== null) {
                array1d.push(area); // Adiciona a área ao array 1D
                
        }
        if (nome !== '' && nome !== null && nome != 'Soma:') {
                tempNome2 = nome; // Atualiza o nome temporário
        } else {
            tempNome2 = 'Área'; // Se o nome for vazio ou nulo, define como 'Área'
        }
    }
    
    
}

exibeArea2(array2d, array1d); // Atualiza a tabela na tela
document.querySelector('#nome2').value = tempNome2; // Atualiza o campo de nome com o nome temporário
document.querySelector('#altura').value = tempAltura; // Atualiza o campo de altura com a altura temporária
seletorDeArquivo.value = ''; // Limpa o seletor de arquivo após a importação
checarNome()
}



// Medição 3D

med3 = document.querySelector('button#med3')
resetC3 = document.querySelector('button#resetC3')
menosC3 = document.querySelector('button#menosC3')
export3 = document.querySelector('button#export3')

med3.addEventListener('click', calcularArea3)
resetC3.addEventListener('click', resetarC3)
menosC3.addEventListener('click', diminuirC3)
export3.addEventListener('click', exportar3)
temp2 = 0
temp3 = 0
    function calcularArea3(){
        alt3 = document.querySelector('#alturam3')
        lar3 = document.querySelector('#larguram3')
        pro3 = document.querySelector('#profundidadem3')
        resM3 = document.querySelector('#resultadoM3')
        resS3 = document.querySelector('#resultadoS3')
        tabela3 = document.querySelector('table#m3')
        tabela3.style.display = 'block'
        export3.style.display = 'inline-block'
       
        
        if (alt3.value.includes(',')){alt3 = alt3.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar3.value.includes(',')){lar3 = lar3.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro3.value.includes(',')){pro3 = pro3.replace(",", ".")} //Troca virgula por ponto se tiver
        alt3 = Number(alt3.value)
        lar3 = Number(lar3.value)
        pro3 = Number(pro3.value)
        
        aream2 = alt3 * lar3
        area3 = alt3 * lar3 * pro3
        temp3 += aream2
        temp2 += area3
        resM3.innerHTML += `<tr><td>${alt3.toLocaleString('pt-BR')}</td> <td>${lar3.toLocaleString('pt-BR')}</td><td>${pro3.toLocaleString('pt-BR')}</td><td>${aream2.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td></tr>`
        resS3.innerHTML = `<tr><th colspan="3">Soma:</th><td>${temp3.toLocaleString('pt-BR')}</td><td>${temp2.toLocaleString('pt-BR')}</td></tr>`
        document.querySelector('#profundidadem3').value = ''
        document.querySelector('#profundidadem3').focus() // Coloca o foco no input novamente
        menosC3.style.display = 'inline-block'
        resetC3.style.display = 'inline-block'
}

    function resetarC3(){
        resM3.innerHTML = ''
        resS3.innerHTML = ''
        temp2 = 0
        temp3 = 0
        tabela3.style.display = 'none'
        document.querySelector('#alturam3').value = ''
        document.querySelector('#larguram3').value = ''
        document.querySelector('#profundidadem3').value = ''
        menosC3.style.display = 'none'
        resetC3.style.display = 'none'
    }

function diminuirC3(){
    resM3 = document.querySelector('#resultadoM3')
    resS3 = document.querySelector('#resultadoS3')
    tabela3 = document.querySelector('table#m3')
    if (temp2 > 0){ // Verifica se a área total é maior que zero
        temp3 -= aream2 // Subtrai a última área calculada
        temp2 -= area3 // Subtrai a última área calculada
        resS3.innerHTML = `<tr><th colspan="3">Soma:</th><td>${temp3.toLocaleString('pt-BR')}</td><td colspan="2">${temp2.toLocaleString('pt-BR')}</td></tr>`
        resM3.deleteRow(resM3.rows.length - 1) // Remove a última linha da tabela
        menosC3.style.display = 'none'
    }
}

function exportar3(){
   
    var tabela3 = document.querySelector('table#m3');
    var rodape = document.querySelector('#resultadoS3');
    if (!tabela3) return;

    // Cria uma cópia da tabela para não alterar a original na tela
    var tabelaClone = tabela3.cloneNode(true);

    // Adiciona o rodapé como última linha do tbody
    if (rodape && rodape.innerHTML.trim() !== '') {
        // Cria um elemento temporário para manipular as linhas do rodapé
        var temp = document.createElement('tbody');
        temp.innerHTML = rodape.innerHTML;
        // Adiciona cada linha do rodapé ao tbody da tabela clonada
        var tbody = tabelaClone.querySelector('tbody') || tabelaClone;
        Array.from(temp.children).forEach(function(tr){
            tbody.appendChild(tr);
        });
    }

    // Monta o HTML da tabela para exportação
    var html = tabelaClone.outerHTML.replace(/ /g, '%20');

    // Cria um link para download
    var a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + html;
    a.download = 'area3d.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}