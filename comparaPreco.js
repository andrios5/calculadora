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

