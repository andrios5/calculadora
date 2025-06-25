
med2 = document.querySelector('button#med2')
resetC2 = document.querySelector('button#resetC2')
menosC2 = document.querySelector('button#menosC2')
export2 = document.querySelector('button#export2')
formatoEX = document.querySelector('#formatoEX')
const seletorDeArquivo = document.getElementById('seletorDeArquivo');
seletorDeArquivo.addEventListener('change', function(e){
if (e.target.files.length) { // Verifica se algum arquivo foi selecionado
        importarCSVparaArray2d(e.target.files[0]);
    }
});

med2.addEventListener('click', calcularArea2)
resetC2.addEventListener('click', resetarC2)
menosC2.addEventListener('click', diminuirC2)
export2.addEventListener('click', exportar)

formatoEX.innerHTML = `<option value="0">CSV</option>`
formatoEX.innerHTML += `<option value="1">XLS</option>`

var tempNome2
var temp02
let array2d = []
let array1d = []
let arrayA = []
let arrayL = []


    function calcularArea2(){
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        nome2 = document.querySelector('#nome2').value || 'Área'; // Define o nome, se estiver vazio usa 'Área'
        nome2 = nome2.trim() // Remove espaços em branco no início e no final do nome
        resM2 = document.querySelector('#resultadoM2')
        resS2 = document.querySelector('#resultadoS2')
        tabela = document.querySelector('table#m2')

        if (alt.value == '' || alt.value == null || lar.value == '' || lar.value == null) { // Verifica se os campos estão vazios
            alert('Por favor, preencha todos os campos.')
            return;
        }
        
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        

        checarNome()
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
    
    resM2.innerHTML = '' // Limpa o conteúdo anterior
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area] = array2d[i];
            if(largura == '' || largura == null || area == '' || area == null){
                resM2.innerHTML += `<tr><th colspan="3">Soma ${nome}:</th><td> ${altura.toLocaleString('pt-BR')}</td></tr>`
            } else {
            resM2.innerHTML += `<tr><th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td> <td>${largura.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td></tr>`;
        }
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
    
    if (soma2 == 0) {
    tabela.style.display = 'none'
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    seletorDeArquivo.style.display = 'inline-block'
    }else{
    tabela.style.display = 'block'
    menosC2.style.display = 'inline-block'
    export2.style.display = 'inline-block'
    resetC2.style.display = 'inline-block'
    formatoEX.style.display = 'inline-block'
    seletorDeArquivo.style.display = 'none'
    resS2.innerHTML = `<tr><th colspan="1">Soma:</th><td colspan='1'>${somaA.toLocaleString('pt-BR')}</td><td colspan='1'>${somaL.toLocaleString('pt-BR')}</td><td colspan='1'>${soma2.toLocaleString('pt-BR')}</td></tr>`;
    }

    
}

function checarNome(){
    
    if (nome2 != tempNome2){ // Verifica se o nome mudou
            if (tempNome2 != '' && tempNome2 != null && temp02 == true){ // Se não for a primeira vez, remove o nome antigo
                let temp = 0
                for (let i = 0; i < array2d.length; i++) { // Percorre o array2d
                    const [nome, altura, largura, area] = array2d[i]; // Desestrutura o array2d
                    if (nome == tempNome2) { // Verifica se o nome é igual ao nome temporário
                        if(largura == '' || largura == null && area == '' || area == null){ // Se a largura e a área forem vazias ou nulas
                            array2d.splice(i, 1); // Apaga o elemento soma com o mesmo nome do array2d
                            array1d.splice(i, 1); // Apaga o elemento soma com o mesmo nome do array1d
                            arrayA.splice(i, 1); // Apaga a altura da soma com o mesmo nome do arrayA
                            arrayL.splice(i, 1); // Apaga a largura da soma com o mesmo nome do arrayL
                            i-- // Decrementa o índice para não pular o próximo elemento
                        }
                        else{temp += area;} // Soma a área se a largura e a área não forem vazias ou nulas
                    }
                }
                array2d.push([tempNome2, temp])
                array1d.push(0)
                arrayA.push(0) // Adiciona a altura da soma ao arrayA
                arrayL.push(0) // Adiciona a largura da soma ao arrayL
            }
            tempNome2 = nome2
            arrayTemp = []
            temp02 = false
        } else {
            temp02 = true // Se o nome não mudou, mantém a variável como true
        }
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
    checarNome(); // Atualiza o nome temporário
    nome2 = document.querySelector('#nome2').value || 'Área'; // Define o nome para exportação, se estiver vazio usa 'Área'
    nome2 = nome2.trim() // Remove espaços em branco no início e no final do nome
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
        if (largura == '' || largura == null || area == '' || area == null) {
            html += `<tr>
                <th colspan="3">Soma ${nome}:</th>
                <td>${altura.toLocaleString('pt-BR')}</td>
            </tr>`;
        } else {
            html += `<tr>
                <td>${nome}</td>
                <td>${altura.toLocaleString('pt-BR')}</td>
                <td>${largura.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
            </tr>`;
        }
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
            if(largura == '' || largura == null || area == '' || area == null){
                arrayTemp.push([`Soma ${nome}:`, altura.toLocaleString('pt-BR')])
            } else {
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), area.toLocaleString('pt-BR')]);
        
    }
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
        array2d.pop(); // Remove o último elemento do array2d após a importação
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
            let nome1 = nome.replace(/^Soma\s*/i, '').replace(/:$/, '').trim(); // Remove "Soma" e ":" do nome
            let altura1 = altura
            array2d.splice(i, 1);
            array2d.splice(i, 0,[nome1, altura1, '', '']); // Adiciona o nome e a altura ao array2d
        } else if (largura > 0 && area > 0) { // Verifica se a largura e a área são maiores que zero
        if (altura !== '' && altura !== null) {
                arrayA.push(altura); // Adiciona a altura ao array de alturas
        }
        if (largura !== '' && largura !== null) {
                arrayL.push(largura); // Adiciona a largura ao array de larguras
        }
        if (area !== '' && area !== null) {
                array1d.push(area); // Adiciona a área ao array 1D
                tempNome2 = nome; // Atualiza o nome temporário
        } 
    }
    temp02 = true; // Define a variável como true para indicar que o nome foi atualizado
    exibeArea2(array2d, array1d); // Atualiza a tabela na tela
}
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