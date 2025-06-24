
med2 = document.querySelector('button#med2')
resetC2 = document.querySelector('button#resetC2')
menosC2 = document.querySelector('button#menosC2')
export2 = document.querySelector('button#export2')

med2.addEventListener('click', calcularArea2)
resetC2.addEventListener('click', resetarC2)
menosC2.addEventListener('click', diminuirC2)
export2.addEventListener('click', exportar2)



var tempNome2
var temp02
let array2d = []
let array1d = []


    function calcularArea2(){
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        nome2 = document.querySelector('#nome2').value
        resM2 = document.querySelector('#resultadoM2')
        resS2 = document.querySelector('#resultadoS2')
        tabela = document.querySelector('table#m2')
        tabela.style.display = 'block'

        if (alt.value == '' || alt.value == null || lar.value == '' || lar.value == null) { // Verifica se os campos estão vazios
            alert('Por favor, preencha todos os campos.')
            return;
        }
        
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        if (nome2 == '' || nome2 == null){ // Se o nome estiver vazio, define como 'Área'
            nome2 = 'Área'
        }
        
        if (nome2 != tempNome2){ // Verifica se o nome mudou
            if (tempNome2 != '' && tempNome2 != null && temp02 == true){ // Se não for a primeira vez, remove o nome antigo
                let temp = 0
                for (let i = 0; i < array2d.length; i++) {
                    const [nome, altura, largura, area] = array2d[i];
                    if (nome == tempNome2) { // Verifica se o nome é igual ao nome temporário
                        if(largura == '' || largura == null || area == '' || area == null){
                            array2d.splice(i, 1); // Apaga o elemento soma com o mesmo nome do array2d
                            array1d.splice(i, 1); // Apaga o elemento soma com o mesmo nome do array1d
                            i--;}
                        else{temp += area;}
                    }
                }
                array2d.push([tempNome2, temp])
                array1d.push(0)
            }
            tempNome2 = nome2
            arrayTemp = []
            temp02 = false
        } else {
            temp02 = true // Se o nome não mudou, mantém a variável como true
            }

        alt = Number(alt.value)
        lar = Number(lar.value)
        area = alt * lar

        array2d.push([nome2, alt, lar, area]) // Adiciona os valores ao array 2D
        array1d.push(area) // Adiciona a área ao array 1D

        exibeArea2(array2d, array1d) // Chama a função para exibir os resultados
        document.querySelector('#largura').value = ''
        document.querySelector('#largura').focus() // Coloca o foco no input novamente
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
}

function exibeArea2(array2d, array1d) {
    let soma2 = 0 // Inicializa a variável de soma
    resM2 = document.querySelector('#resultadoM2')
    resS2 = document.querySelector('#resultadoS2')
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
    resS2.innerHTML = `<tr><th colspan="3">Soma Total:</th><td colspan='1'>${soma2.toLocaleString('pt-BR')}</td></tr>`;
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
    array2d = [] // Limpa o array 2D
    array1d = [] // Limpa o array 1D
}

function diminuirC2(){
    array1d.pop() // Remove o último elemento do array 1D
    array2d.pop() // Remove o último elemento do array 2D
     for (let i = 0; i < array2d.length; i++) {
        const [nome, altura, largura, area] = array2d[i];
        if(largura == '' || largura == null || area == '' || area == null){
            temp02 = true
            tempNome2 = nome
        }
     }
    exibeArea2(array2d, array1d) // Atualiza a exibição
}

function exportar2(){
    nome2 = document.querySelector('#nome2').value || 'area2d';

    if (!array2d.length) {
        alert('Não há dados para exportar!');
        return;
    }

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
    let soma2 = 0; // Inicializa a variável de soma 
    for (let i = 0; i < array1d.length; i++) {
        soma2 += Number(array1d[i]);
    }
    arrayTemp.push(["Soma Total:", soma2.toLocaleString('pt-BR')]);

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