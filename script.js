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

// Compara preços



dif1.addEventListener('click', diferenca)
res1 = document.querySelector('section#resultado1')
dif1 = document.querySelector('#dif1')
peso = document.querySelector('#peso')
pes2 = document.querySelector('#pes2')
unm = document.querySelector('#UNM')
voltarUN = document.querySelector('#UN')
containerMedida = document.querySelector('div.containerMedida')

peso.innerHTML = `<option value="0">Unidade</option>`
peso.innerHTML += `<option value="1">Grama</option>`
peso.innerHTML += `<option value="2">Kilo</option>`
peso.innerHTML += `<option value="3">Mililitros</option>`
peso.innerHTML += `<option value="4">Litros</option>`


pes2.innerHTML = `<option value="0">Unidade</option>`
pes2.innerHTML += `<option value="1">Grama</option>`
pes2.innerHTML += `<option value="2">Kilo</option>`
pes2.innerHTML += `<option value="3">Mililitros</option>`
pes2.innerHTML += `<option value="4">Litros</option>`

unm.addEventListener('click', unidadeM)
voltarUN.addEventListener('click', voltarUNM)

tempP1 = 0


    function diferenca(){
        valor1 = document.querySelector('#valor1')
        valor2 = document.querySelector('#valor2')
        peso1 = document.querySelector('#peso1')
        peso2 = document.querySelector('#peso2')
        medidaU1 = document.querySelector('#medidaU1')
        medidaU2 = document.querySelector('#medidaU2')
            if (valor1.value.includes(',')){valor1 = valor1.replace(",", ".")} //Troca virgula por ponto se tiver
            valor1 = Number(valor1.value)
            if (valor2.value.includes(',')){valor2 = valor2.replace(",", ".")} //Troca virgula por ponto se tiver
            valor2 = Number(valor2.value)
            if (peso1.value.includes(',')){peso1 = peso1.replace(",", ".")} //Troca virgula por ponto se tiver
            peso1 = Number(peso1.value)
            if (peso2.value.includes(',')){peso2 = peso2.replace(",", ".")} //Troca virgula por ponto se tiver
            peso2 = Number(peso2.value)
            if (medidaU1.value.includes(',')){medidaU1 = medidaU1.replace(",", ".")} //Troca virgula por ponto se tiver
            medidaU1 = Number(medidaU1.value)
            if (medidaU2.value.includes(',')){medidaU2 = medidaU2.replace(",", ".")} //Troca virgula por ponto se tiver
            medidaU2 = Number(medidaU2.value)

        if (tempP1 == 1){
            res1.style.display = 'block'
            calculaUNPeso(valor1, valor2, peso1, peso2, medidaU1, medidaU2) // Chama a função calculaUNPeso
        }else if(peso1 > 0 && peso2 > 0){ // Verifica se peso1 e peso2 foram preenchidos
            res1.style.display = 'block'
            comparaPeso(valor1, valor2, peso1, peso2, peso, pes2) // Chama a função comparaPeso
        }else{
        res1.style.display = 'block'
        compara(valor1, valor2)
    }
    }

    function compara(valor1, valor2){
        valorP1 = valor1 / peso1
        valorP2 = valor2 / peso2
        dif = valor2 - valor1
        por = (dif * 100) / valor1
        preco1 = valor1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        preco2 = valor2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        dife = dif.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        por = por.toFixed(2).replace('.', ',')
        if (dif > 0){
            res1.innerHTML = `<li>O produto custava <strong>${preco1}</strong> e agora custa <strong>${preco2}</strong>.`
            res1.innerHTML += `<li>Hoje o produto está mais <mark>CARO</mark> ❌`
            res1.innerHTML += `<li>O preço subiu <strong>${dife}</strong> em relação ao preço anterior.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra cima.`
            document.querySelector('mark').style.backgroundColor = 'red'
        }else if (dif < 0){
            res1.innerHTML = `<li>O produto custava <strong>${preco1}</strong> e agora custa <strong>${preco2}</strong>.`
            res1.innerHTML += `<li>Hoje o produto está mais <mark>BARATO</mark> ✅`
            res1.innerHTML += `<li>O preço baixou <strong>${dife}</strong> em relação ao preço anterior.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra baixo.`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else {
            res1.innerHTML = `<p>Hoje o produto está custando o mesmo <mark>preço</mark> ✅</p>`
            document.querySelector('mark').style.backgroundColor = 'green'
        }
    }

    function comparaPeso(valor1, valor2, peso1, peso2, peso, pes2){
        if (peso.value == 0){
            ps = 'un'
            peso = 'unidade'}else if(peso.value == 1){
            ps = 'g' 
            peso = 'grama'}else if(peso.value == 2){
            ps = 'kg'
            peso = 'kilo'}else if(peso.value == 3){
            ps = 'ml'
            peso = 'mililitro'}else if(peso.value == 4){
            ps = 'l'
            peso = 'litro'}

            if (pes2.value == 0){
            ps2 = 'un'
            pes2 = 'unidade'}else if(pes2.value == 1){
            ps2 = 'g' 
            pes2 = 'grama'}else if(pes2.value == 2){
            ps2 = 'kg'
            pes2 = 'kilo'}else if(pes2.value == 3){
            ps2 = 'ml'
            pes2 = 'mililitro'}else if(pes2.value == 4){
            ps2 = 'l'
            pes2 = 'litro'}
        
        if ((peso != 'unidade' && pes2 != 'unidade') && (peso != pes2)){
            comparaPeso2(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2)
        }else{
            comparaPeso1(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2)
    }
    }
    function comparaPeso1(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2){
        if (peso == 'unidade' && pes2 != 'unidade'){
            peso = pes2
            ps = ps2
            temp = 'pesa'
        }else if (peso == 'unidade'){
            temp = 'possui'
        } else {
            temp = 'pesa'
        }

        valorP1 = valor1 / peso1
        valorP2 = valor2 / peso2
        dif = valorP2 - valorP1
        por = (dif * 100) / valorP1
        preco1 = valor1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        preco2 = valor2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP1 = valorP1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP2 = valorP2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        dife = dif.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        por = por.toFixed(2).replace('.', ',')
        if (dif > 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e ${temp} <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e ${temp}  <strong>${peso2}${ps}</strong>, você paga <strong>${precoP2}</strong> por ${peso}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>CARO</mark> ❌`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong>  mais caro por ${peso} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra cima.`
            document.querySelector('mark').style.backgroundColor = 'red'
        }else if (dif < 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e ${temp} <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e ${temp} <strong>${peso2}${ps}</strong>, você paga <strong>${precoP2}</strong> por ${peso}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>BARATO</mark> ✅`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong> mais barato por ${peso} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra baixo.`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else {
            res1.innerHTML = `<p>Hoje o produto está custando o mesmo <mark>preço</mark> por peso✅</p>`
            document.querySelector('mark').style.backgroundColor = 'green'
        }
    
    }

    function comparaPeso2(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2){
        if ((peso == 'grama' && pes2 == 'mililitro') || (peso == 'mililitro' && pes2 == 'grama')){
            comparaPeso21(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2)
        }else{
        comparaPeso22(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2)
        }
    }

    function comparaPeso21(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2){
        valorP1 = valor1 / peso1
        valorP2 = valor2 / peso2
        dif = valorP2 - valorP1
        por = (dif * 100) / valorP1
        preco1 = valor1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        preco2 = valor2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP1 = valorP1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP2 = valorP2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        dife = dif.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        por = por.toFixed(2).replace('.', ',')
        if (dif > 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e pesa <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e pesa <strong>${peso2}${ps2}</strong>, você paga <strong>${precoP2}</strong> por ${pes2}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>CARO</mark> ❌`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong>  mais caro por ${pes2} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra cima.`
            document.querySelector('mark').style.backgroundColor = 'red'
        }else if (dif < 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e pesa <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e pesa <strong>${peso2}${ps2}</strong>, você paga <strong>${precoP2}</strong> por ${pes2}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>BARATO</mark> ✅`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong> mais barato por ${pes2} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra baixo.`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else {
            res1.innerHTML = `<p>Hoje o produto está custando o mesmo <mark>preço</mark> por peso✅</p>`
            document.querySelector('mark').style.backgroundColor = 'green'
        }
    }

    function comparaPeso22(valor1, valor2, peso1, peso2, peso, ps, ps2, pes2){
        valorP1 = valor1 / peso1
        valorP2 = valor2 / peso2
        if (peso == 'grama' || peso == 'mililitro'){
            peso1 = peso1 / 1000
            valorP1 = valorP1 * 1000
        }
        if (pes2 == 'grama' || pes2 == 'mililitro'){
            peso2 = peso2 / 1000
            valorP2 = valorP2 * 1000
        }
        if (peso == 'grama'){
            peso = 'kilo'
            ps = 'kg'
        }else if (peso == 'mililitro'){
            peso = 'litro'
            ps = 'l'}
        if (pes2 == 'grama'){
            pes2 = 'kilo'
            ps2 = 'kg'
        }else if (pes2 == 'mililitro'){
            pes2 = 'litro'
            ps2 = 'l'}
        dif = valorP2 - valorP1
        por = (dif * 100) / valorP1
        preco1 = valor1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        preco2 = valor2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP1 = valorP1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP2 = valorP2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        dife = dif.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        por = por.toFixed(2).replace('.', ',')
        if (dif > 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e pesa <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e pesa <strong>${peso2}${ps2}</strong>, você paga <strong>${precoP2}</strong> por ${pes2}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>CARO</mark> ❌`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong>  mais caro por ${pes2} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra cima.`
            document.querySelector('mark').style.backgroundColor = 'red'
        }else if (dif < 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e pesa <strong>${peso1}${ps}</strong>, você paga <strong>${precoP1}</strong> por ${peso}.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e pesa <strong>${peso2}${ps2}</strong>, você paga <strong>${precoP2}</strong> por ${pes2}.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>BARATO</mark> ✅`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong> mais barato por ${pes2} em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra baixo.`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else {
            res1.innerHTML = `<p>Hoje o produto está custando o mesmo <mark>preço</mark> por peso✅</p>`
            document.querySelector('mark').style.backgroundColor = 'green'
        }
    }

    function unidadeM(){
        unm.style.display = 'none'
        peso.style.display = 'none'
        pes2.style.display = 'none'
        voltarUN.style.display = 'inline-block'
        containerMedida.style.display = 'block'
        tempP1 = 1
    }

    function voltarUNM(){
        unm.style.display = 'inline-block'
        peso.style.display = 'inline-block'
        pes2.style.display = 'inline-block'
        voltarUN.style.display = 'none'
        containerMedida.style.display = 'none'
        tempP1 = 0
    }

    function calculaUNPeso(valor1, valor2, peso1, peso2, medidaU1, medidaU2){
        pesmed1 = medidaU1 * peso1 // Calcula o peso por unidade do primeiro produto
        pesmed2 = medidaU2 * peso2// Calcula o peso por unidade do segundo produto
        valorP1 = valor1 / pesmed1 // Calcula o valor por unidade do primeiro produto
        valorP2 = valor2 / pesmed2 // Calcula o valor por unidade do segundo produto

        dif = valorP2 - valorP1
        por = (dif * 100) / valorP1
        preco1 = valor1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        preco2 = valor2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP1 = valorP1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        precoP2 = valorP2.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        dife = dif.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        por = por.toFixed(2).replace('.', ',')
        if (dif > 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e vem <strong>${peso1}un</strong> com <strong>${medidaU1}m</strong>. No total tem <strong>${pesmed1}m</strong> e você paga <strong>${precoP1}</strong> por <strong>m</strong>.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e vem <strong>${peso2}un</strong> com <strong>${medidaU2}m</strong>. No total tem <strong>${pesmed2}m</strong> e você paga <strong>${precoP2}</strong> por <strong>m</strong>.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>CARO</mark> ❌`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong>  mais caro por <strong>m</strong>. em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra cima.`
            document.querySelector('mark').style.backgroundColor = 'red'
        }else if (dif < 0){
            res1.innerHTML = `<li>O 1º produto custa <strong>${preco1}</strong> e vem <strong>${peso1}un</strong> com <strong>${medidaU1}m</strong>. No total tem <strong>${pesmed1}m</strong> e você paga <strong>${precoP1}</strong> por <strong>m</strong>.`
            res1.innerHTML += `<li>O 2º produto custa <strong>${preco2}</strong> e vem <strong>${peso2}un</strong> com <strong>${medidaU2}m</strong>. No total tem <strong>${pesmed2}m</strong> e você paga <strong>${precoP2}</strong> por <strong>m</strong>.`
            res1.innerHTML += `<li>Portanto o 2º produto está mais <mark>BARATO</mark> ✅`
            res1.innerHTML += `<li>O preço do 2º produto é <strong>${dife}</strong> mais barato por <strong>m</strong>. em ralação ao 1º.`
            res1.innerHTML += `<li class="maior">Uma variação de <strong>${por}%</strong> pra baixo.`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else {
            res1.innerHTML = `<p>Hoje o produto está custando o mesmo <mark>preço</mark> por peso✅</p>`
            document.querySelector('mark').style.backgroundColor = 'green'
        }
    }


//Medição


med2 = document.querySelector('button#med2')
resetC2 = document.querySelector('button#resetC2')
menosC2 = document.querySelector('button#menosC2')
export2 = document.querySelector('button#export2')

med2.addEventListener('click', calcularArea2)
resetC2.addEventListener('click', resetarC2)
menosC2.addEventListener('click', diminuirC2)
export2.addEventListener('click', exportar2)

temp1 = 0
temp21 = 0
var tempNome2
var temp02

    function calcularArea2(){
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        nome2 = document.querySelector('#nome2').value
        resM2 = document.querySelector('#resultadoM2')
        resS2 = document.querySelector('#resultadoS2')
        tabela = document.querySelector('table#m2')
        m3 = document.querySelector('th#m3')
        tabela.style.display = 'block'
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        if (nome2 == '' || nome2 == null){ // Se o nome estiver vazio, define como 'Área'
            nome2 = 'Área'
        }
        if (nome2 != tempNome2){ // Verifica se o nome mudou
            if (tempNome2 != '' && tempNome2 != null && temp02 == true){ // Se não for a primeira vez, remove o nome antigo
                resM2.innerHTML += `<tr><th colspan="3">Soma ${tempNome2}:</th><td> ${temp21.toLocaleString('pt-BR')}</td></tr>`
            }
            tempNome2 = nome2
            temp21 = 0
            temp02 = false
        } else {
            temp02 = true // Se o nome não mudou, mantém a variável como true
            }

        alt = Number(alt.value)
        lar = Number(lar.value)
        area = alt * lar
        temp1 += area
        temp21 += area // Acumula a área para o nome atual
        resM2.innerHTML += `<tr><th>${nome2}<td>${alt.toLocaleString('pt-BR')}</td> <td>${lar.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td></tr>`
        resS2.innerHTML = `<tr><th colspan="3">Soma Total:</th> <td colspan="1">${temp1.toLocaleString('pt-BR')}</td></tr>`
        document.querySelector('#largura').value = ''
        document.querySelector('#largura').focus() // Coloca o foco no input novamente
        menosC2.style.display = 'inline-block'
        export2.style.display = 'inline-block'
        resetC2.style.display = 'inline-block'
        
}

function resetarC2(){
    resM2.innerHTML = ''
    resS2.innerHTML = ''
    temp1 = 0
    tabela.style.display = 'none'
    document.querySelector('#altura').value = ''
    document.querySelector('#largura').value = ''
    document.querySelector('#nome2').value = 'Área'
    nome2 = 'Área'
    tempNome2 = ''
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
}

function diminuirC2(){
    resM2 = document.querySelector('#resultadoM2')
    resS2 = document.querySelector('#resultadoS2')
    tabela = document.querySelector('table#m2')
    if (temp1 > 0){ // Verifica se a área total é maior que zero
        temp1 -= area // Subtrai a última área calculada
        temp21 -= area // Subtrai a última área calculada para o nome atual
        resS2.innerHTML = `<tr><th colspan="3">Soma Total:</th> <td colspan="2">${temp1.toLocaleString('pt-BR')}</td></tr>`
        resM2.deleteRow(resM2.rows.length - 1) // Remove a última linha da tabela
        menosC2.style.display = 'none'
    }
}

function exportar2(){
    nome2 = document.querySelector('#nome2').value
    if(temp02 == true){
    resM2.innerHTML += `<tr><th colspan="3">Soma ${nome2}:</th><td> ${temp21.toLocaleString('pt-BR')}</td></tr>`
    temp02 = false}
    var tabela = document.querySelector('table#m2');
    var rodape = document.querySelector('#resultadoS2');
    if (!tabela) return;

    // Cria uma cópia da tabela para não alterar a original na tela
    var tabelaClone = tabela.cloneNode(true);

    // Adiciona o rodapé como última linha do tbody
    if (rodape.innerHTML.trim() !== '') {
        // Cria um elemento temporário para manipular as linhas do rodapé
        var temp = document.createElement('tbody');
        temp.innerHTML = rodape.innerHTML;
        // Adiciona cada linha do rodapé ao tbody da tabela clonada
        var tbody = tabelaClone.querySelector('tbody') || tabelaClone;
        Array.from(temp.children).forEach(function(tr){
            tbody.appendChild(tr);
     // Define como false para não adicionar novamente
        });
    }

    // Monta o HTML da tabela para exportação
    var html = tabelaClone.outerHTML.replace(/ /g, '%20');

    // Cria um link para download
    var a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + html;
    a.download = `${nome2}.xls`; // Usa o nome fornecido pelo usuário
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
        




res2 = document.querySelector('section#resultado2')
ano = document.querySelector('#anob')
ano.addEventListener('click', anoBissexto)

    function anoBissexto(){
        res2.style.display = 'block'
        ano = Number(document.getElementById('ano').value)
        year  = new Date(ano + 0, 0, 1)
        year1  = new Date(ano + 1, 0, 1)
        const contarDias = (year1 - year) / (1000 * 60 * 60 * 24)
        if (contarDias == 366){
            res2.innerHTML = `O ano de <strong>${ano}</strong> <mark>É BISSEXTO</mark> ✅`
            document.querySelector('mark').style.backgroundColor = 'green'
        }else{
        res2.innerHTML = `O ano de <strong>${ano}</strong> <mark>NÂO É BISSEXTO</mark> ❌`
        document.querySelector('mark').style.backgroundColor = 'red'}
    }

    res3 = document.querySelector('section#resultado3')
    med = document.querySelector('#med1')
    med.addEventListener('click', converterM)


    function converterM(){
        res3.style.display = 'block'
        num = document.querySelector('#medida1')
        if (num.value.includes(',')){num = num.replace(",", ".")} //Troca virgula por ponto se tiver
        num = Number(num.value)

        n1 = num / 1000
        n2 = num / 100
        n3 = num / 10
        n4 = num * 10
        n5 = num * 100
        n6 = num * 1000
        
        
        res3.innerHTML = `<h3>A distância de ${num.toLocaleString('pt-BR')} metros, corresponde a...</h3>`
        res3.innerHTML += `<p>${n1.toLocaleString('pt-BR')} quilômetros (Km)</p>`
        res3.innerHTML += `<p>${n2.toLocaleString('pt-BR')} hectômetros (Hm)</p>`
        res3.innerHTML += `<p>${n3.toLocaleString('pt-BR')} decâmetros (Dam)</p>`
        res3.innerHTML += `<p>${n4.toLocaleString('pt-BR')} decímetros (dm)</p>`
        res3.innerHTML += `<p>${n5.toLocaleString('pt-BR')} centímetros (cm)</p>`    
        res3.innerHTML += `<p>${n6.toLocaleString('pt-BR')} milímetros (mm)</p>` 
    }

res4 = document.querySelector('section#resultado4')
tem = document.querySelector('#tem1')
tem.addEventListener('click', converterT)

    function converterT(){
        res4.style.display = 'block'
        

        num = document.querySelector('#temp1')
        if (num.value.includes(',')){num = num.replace(",", ".")} //Troca virgula por ponto se tiver
        num = Number(num.value)
        
        n1 = num * 9/5 + 32
        n2 = num + 273.15
        
        
        res4.innerHTML = `<h3>A temperatura de ${num.toLocaleString('pt-BR')}°C, corresponde a...</h3>`
        res4.innerHTML += `<p>${n2.toLocaleString('pt-BR')}°K (Kelvin)</p>`
        res4.innerHTML += `<p>${n1.toLocaleString('pt-BR')}°F (Fahrenheit)</p>`
 
    }

    res5 = document.querySelector('section#resultado5')
    vel = document.querySelector('#dolar')
    vel.addEventListener('click', converterV)
    

    function converterV(){
        
        
        res5.style.display = 'block'
        
        cot = document.querySelector('#dolar1')
        if (cot.value.includes(',')){cot = cot.replace(",", ".")} //Troca virgula por ponto se tiver
        cot = Number(cot.value)
        
        num = document.querySelector('#reais1')
        if (num.value.includes(',')){num = num.replace(",", ".")} //Troca virgula por ponto se tiver
        num = Number(num.value)

        dolar = num / cot
        
        res5.style.display = 'block'
        res5.innerHTML = `<p>O dolar está custando ${cot.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>`
        res5.innerHTML += `<p>E você tem ${num.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} que equivale a ${dolar.toLocaleString('pt-BR', {style: 'currency', currency: 'USD'})}</p>`
        
 
    }

    


