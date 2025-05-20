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


numVal = 0
numMes = 0
difdia = 0
const dataAtual = new Date(); // Cria um objeto Date com a data atual
let diaDoMes = dataAtual.getDate(); // Obtém o dia do mês atual



document.querySelector('#mais').addEventListener('click', maisUm)
document.querySelector('#menos').addEventListener('click', menosUm)
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#reset2').addEventListener('click', resetMes)

tela = document.querySelector('section.tela')
tela15 = document.querySelector('section.tela15')
tela2 = document.querySelector('section.tela2')
tela25 = document.querySelector('section.tela25')

lerDia() // Chama a função para ler o cookie e exibir o valor na tela
checarDataDia() // Chama a função para verificar se o dia do mês mudou e atualizar o cookie


let contMes = getCookie('diaDia') // Lê o cookie Da contagem do mês
numMes = Number(contMes) // Converte o valor do cookie para número
tela2.innerHTML = `Por mês: ${contMes}` // Mostra o valor do cookie na tela

dataIni = getCookie('dataIn')

if (dataIni > 0){
    if (dataIni < diaDoMes){ // Mostra a data inicial na tela comos dias passados
        difdia = diaDoMes - dataIni 
        tela15.innerHTML = `Dias Passados: ${difdia}<br> Dia Inicial: ${dataIni}`
        tela15.style.display = 'block'
    }else{
    tela15.innerHTML = `Dia Inicial: ${dataIni}` // Mostra a data inicial na tela sem os dias passados
    tela15.style.display = 'block'}
}

function lerDia(){
    const contDiario = getCookie('conDia') // Lê o cookie
    numVal = Number(contDiario) // Converte o valor do cookie para número
    tela.innerHTML = `${contDiario}` // Mostra o valor do cookie na tela
}



function checarDataDia(){
    let testeData = 0 // Variável para armazenar o dia do mês do cookie
    testeData = Number(getCookie('conMes')) // Obtém o dia do mês
    // Verifica se o dia do mês do cookie é diferente do dia atual
    contDiario = getCookie('conDia')
    if (testeData != diaDoMes && contDiario > 0){ // Se o dia do mês do cookie for diferente do dia atual
        diaAnterior = contDiario
        setCookie('diaAnterior', diaAnterior, 30); // Cria o cokie dia anterior
        diaAnterior = getCookie('diaAnterior') // Lê o cookie dia anterior
        tela25.innerHTML = `Dia anterior: ${diaAnterior}` // Mostra dia anterior na tela
        contDiario = `${numVal= 0}` // Incrementa o valor do cookie
        setCookie('conDia', contDiario, 1); // Salva o cookie por 1 dia
        tela.innerHTML = `${contDiario}`} 
    
}


function maisUm(){
    let contDiario = getCookie('conDia') // Lê o cookie
    contDiario = `${numVal+= 1}` // Incrementa o valor do cookie
    setCookie('conDia', contDiario, 1); // Salva o cookie por 1 dia
    tela.innerHTML = `${contDiario}` // Mostra o valor do cookie na tela

    diaDiario = `${diaDoMes}` // Incrementa o valor do cookie
    setCookie('conMes', diaDiario, 30);

    diario = getCookie('diaDia')
    let dataIni = 0
    if (diario == 0){
        dataIni = diaDoMes
        setCookie('dataIn', dataIni, 30)
    }
    dataIni = getCookie('dataIn')
    diario = `${numMes+= 1}` // Incrementa o valor do cookie
    setCookie('diaDia', diario, 30); // Salva o cookie por 1 dia
    if (dataIni < diaDoMes){ // Mostra a data inicial na tela comos dias passados
        difdia = diaDoMes - dataIni 
        tela15.innerHTML = `Dias Passados: ${difdia}<br> Dia Inicial: ${dataIni}`
        tela15.style.display = 'block'
    }else{
    tela15.innerHTML = `Dia Inicial: ${dataIni}` // Mostra a data inicial na tela sem os dias passados
    tela15.style.display = 'block'}
    tela2.innerHTML = `Por mês: ${diario}` 
}

function menosUm(){
    let contDiario = getCookie('conDia') // Lê o cookie
    contDiario = `${numVal-= 1}` // Incrementa o valor do cookie
    setCookie('conDia', contDiario, 1); // Salva o cookie por 1 dia
    tela.innerHTML = `${contDiario}` // Mostra o valor do cookie na tela
    diario = `${numMes-= 1}` // Incrementa o valor do cookie
    setCookie('diaDia', diario, 30); // Salva o cookie por 1 dia
    tela2.innerHTML = `Por mês: ${diario}`
}

function reset(){
    let contDiario = getCookie('conDia') // Lê o cookie
    contDiario = `${numVal= 0}` // Incrementa o valor do cookie
    setCookie('conDia', contDiario, 1); // Salva o cookie por 1 dia
    tela.innerHTML = `${contDiario}` // Mostra o valor do cookie na tela
}

function resetMes(){
    diario = `${numMes= 0}` // Incrementa o valor do cookie
    setCookie('diaDia', diario, 30); // Salva o cookie por 1 dia
    tela2.innerHTML = `Por mês: ${diario}`
    dataIni = 0
    setCookie('dataIn', dataIni, 30)
    tela15.style.display = 'none'
    tela25.style.display = 'none'
}


diaAnterior = getCookie('diaAnterior')
tela25.innerHTML = `Dia anterior: ${diaAnterior}`
if (diaAnterior > 0){tela25.style.display = 'block'}else{tela25.style.display = 'none'}


dif1.addEventListener('click', diferenca)
res1 = document.querySelector('section#resultado1')
dif1 = document.querySelector('#dif1')
peso = document.querySelector('#peso')
pes2 = document.querySelector('#pes2')

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



    function diferenca(){
        valor1 = document.querySelector('#valor1')
        valor2 = document.querySelector('#valor2')
        peso1 = document.querySelector('#peso1')
        peso2 = document.querySelector('#peso2')
            if (valor1.value.includes(',')){valor1 = valor1.replace(",", ".")} //Troca virgula por ponto se tiver
            valor1 = Number(valor1.value)
            if (valor2.value.includes(',')){valor2 = valor2.replace(",", ".")} //Troca virgula por ponto se tiver
            valor2 = Number(valor2.value)
            if (peso1.value.includes(',')){peso1 = peso1.replace(",", ".")} //Troca virgula por ponto se tiver
            peso1 = Number(peso1.value)
            if (peso2.value.includes(',')){peso2 = peso2.replace(",", ".")} //Troca virgula por ponto se tiver
            peso2 = Number(peso2.value)
        
        if (peso1 > 0 && peso2 > 0){ // Verifica se peso1 e peso2 foram preenchidos
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


//Medição

med = document.querySelector('#med')
med.addEventListener('click', calcularArea)
temp1 = 0
    function calcularArea(){
        alt = document.querySelector('#altura')
        lar = document.querySelector('#largura')
        pro = document.querySelector('#profundidade')
        resM = document.querySelector('#resultadoM')
        resS = document.querySelector('#resultadoS')
        tabela = document.querySelector('table')
        m3 = document.querySelector('th#m3')
        tabela.style.display = 'block'
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro.value.includes(',')){pro = pro.replace(",", ".")} //Troca virgula por ponto se tiver
        alt = Number(alt.value)
        lar = Number(lar.value)
        pro = Number(pro.value)
        if (pro == 0 || pro == '' || pro == null){
        area = alt * lar
        temp1 += area
        resM.innerHTML += `<tr><td>${alt.toLocaleString('pt-BR')}</td> <td>${lar.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td></tr>`
        resS.innerHTML = `<tr><th colspan="2">Soma:</th> <td colspan="2">${temp1.toLocaleString('pt-BR')}</td></tr>`
        document.querySelector('#largura').value = ''
    }else{
        m3.style.display = 'block'
        tabela.style.width = '400px'
        area = alt * lar * pro
        temp1 += area
        resM.innerHTML += `<tr><td>${alt.toLocaleString('pt-BR')}</td> <td>${lar.toLocaleString('pt-BR')}</td> <td>${area.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td></tr>`
        resS.innerHTML = `<tr><th colspan="2">Soma:</th> <td colspan="2">${temp1.toLocaleString('pt-BR')}</td></tr>`
        document.querySelector('#profundidade').value = ''
    }
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

    


