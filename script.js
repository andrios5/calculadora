
        




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

// ===== Conversor R$ → US$ (COM API) =====
    res5 = document.querySelector('section#resultado5')
    vel = document.querySelector('#dolar')
    vel.addEventListener('click', converterV)
    
    async function converterV(){
        // Mostra a seção de resultado com uma mensagem de carregamento
        res5.style.display = 'block'
        res5.innerHTML = `<p>Buscando cotação atual do dólar...</p>`
        
        // Pega o valor digitado em REAIS
        let numInput = document.querySelector('#reais1').value
        
        // Troca vírgula por ponto se tiver
        if (numInput.includes(',')){
            numInput = numInput.replace(",", ".")
        }
        
        let num = Number(numInput)

        // Se o usuário não digitou nada ou digitou zero, avisa para preencher
        if (num <= 0 || isNaN(num)) {
            res5.innerHTML = `<p>Por favor, insira um valor válido em R$.</p>`
            return // Para a execução da função aqui
        }

        try {
            // Consulta o valor real na API
            const resposta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
            const dados = await resposta.json()
            
            // Pega o preço de compra do dólar retornado pela API
            const cot = Number(dados.USDBRL.bid)

            // Faz o cálculo
            const dolar = num / cot
            
            // Imprime na tela do mesmo jeito que você tinha feito
            res5.innerHTML = `<p>O dolar está custando ${cot.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>`
            res5.innerHTML += `<p>E você tem ${num.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} que equivale a ${dolar.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>`
            
        } catch (erro) {
            // Se o usuário estiver sem internet ou a API cair
            res5.innerHTML = `<p style="color: red;">Erro ao consultar cotação. Verifique sua conexão.</p>`
            console.error(erro)
        }
    }


    // ===== Conversor de Dados =====
(function () {
    var input = document.getElementById('dados1');
    var select = document.getElementById('dadosUnidade');
    var btn = document.getElementById('dadosBtn');
    var resultado = document.getElementById('resultado6');
    var ulByte = document.getElementById('dadosByte');
    var ulBit = document.getElementById('dadosBit');

    // Unidades com fator de conversão para BITS (unidade base)
    var unidades = [
        { nome: 'Bit',          sigla: 'bit',  fator: 1 },
        { nome: 'Kibit',        sigla: 'Kbit', fator: 1024 },
        { nome: 'Mibit',        sigla: 'Mbit', fator: 1024 * 1024 },
        { nome: 'Gibit',        sigla: 'Gbit', fator: 1024 * 1024 * 1024 },
        { nome: 'Tibit',        sigla: 'Tbit', fator: 1024 * 1024 * 1024 * 1024 },
        { nome: 'Byte',         sigla: 'B',    fator: 8 },
        { nome: 'Kilobyte',     sigla: 'KB',   fator: 8 * 1024 },
        { nome: 'Megabyte',     sigla: 'MB',   fator: 8 * 1024 * 1024 },
        { nome: 'Gigabyte',     sigla: 'GB',   fator: 8 * 1024 * 1024 * 1024 },
        { nome: 'Terabyte',     sigla: 'TB',   fator: 8 * 1024 * 1024 * 1024 * 1024 }
    ];

    // Preenche o select
    unidades.forEach(function (u) {
        var opt = document.createElement('option');
        opt.value = u.fator;
        opt.textContent = u.nome;
        select.appendChild(opt);
    });

    // Unidades de resultado
    var byteUnits = [
        { nome: 'Byte',     sigla: 'B',  fator: 8 },
        { nome: 'Kilobyte', sigla: 'KB', fator: 8 * 1024 },
        { nome: 'Megabyte', sigla: 'MB', fator: 8 * 1024 * 1024 },
        { nome: 'Gigabyte', sigla: 'GB', fator: 8 * 1024 * 1024 * 1024 },
        { nome: 'Terabyte', sigla: 'TB', fator: 8 * 1024 * 1024 * 1024 * 1024 }
    ];

    var bitUnits = [
        { nome: 'Bit',     sigla: 'bit',  fator: 1 },
        { nome: 'Kibit',   sigla: 'Kbit', fator: 1024 },
        { nome: 'Mibit',   sigla: 'Mbit', fator: 1024 * 1024 },
        { nome: 'Gibit',   sigla: 'Gbit', fator: 1024 * 1024 * 1024 },
        { nome: 'Tibit',   sigla: 'Tbit', fator: 1024 * 1024 * 1024 * 1024 }
    ];

    function formatar(valor) {
        if (valor === 0) return '0';
        if (valor < 0.0001 && valor > 0) return valor.toExponential(3);
        return valor.toLocaleString('pt-BR', { maximumFractionDigits: 6 });
    }

    function converter() {
        var valor = parseFloat(input.value);
        if (isNaN(valor) || valor <= 0) {
            resultado.style.display = 'none';
            return;
        }

        var fatorSelecionado = Number(select.value);
        // Converte tudo para BITS (unidade base)
        var totalBits = valor * fatorSelecionado;

        // Preenche coluna Byte
        ulByte.innerHTML = '';
        byteUnits.forEach(function (u) {
            var resultadoUnit = totalBits / u.fator;
            var li = document.createElement('li');
            li.innerHTML = '<span>' + u.sigla + '</span><span>' + formatar(resultadoUnit) + '</span>';
            ulByte.appendChild(li);
        });

        // Preenche coluna Bit
        ulBit.innerHTML = '';
        bitUnits.forEach(function (u) {
            var resultadoUnit = totalBits / u.fator;
            var li = document.createElement('li');
            li.innerHTML = '<span>' + u.sigla + '</span><span>' + formatar(resultadoUnit) + '</span>';
            ulBit.appendChild(li);
        });

        resultado.style.display = 'block';
    }

    btn.addEventListener('click', converter);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') converter();
    });
})();

// ===== Conversor US$ → R$ (COM API) =====
    res51 = document.querySelector('section#resultado7')
    vel2 = document.querySelector('#reais12')
    vel2.addEventListener('click', converterVS)
    
    async function converterVS(){
        // Mostra a seção de resultado com uma mensagem de carregamento
        res51.style.display = 'block'
        res51.innerHTML = `<p>Buscando cotação atual do dólar...</p>`
        
        // Pega o valor digitado em REAIS
        let numInput2 = document.querySelector('#reais11').value
        
        // Troca vírgula por ponto se tiver
        if (numInput2.includes(',')){
            numInput2 = numInput2.replace(",", ".")
        }
        
        let num2 = Number(numInput2)

        // Se o usuário não digitou nada ou digitou zero, avisa para preencher
        if (num2 <= 0 || isNaN(num2)) {
            res51.innerHTML = `<p>Por favor, insira um valor válido em R$.</p>`
            return // Para a execução da função aqui
        }

        try {
            // Consulta o valor real na API
            const resposta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
            const dados = await resposta.json()
            
            // Pega o preço de compra do dólar retornado pela API
            const cot = Number(dados.USDBRL.bid)

            // Faz o cálculo
            const reais3 = cot * num2
            
            // Imprime na tela do mesmo jeito que você tinha feito
            res51.innerHTML = `<p>O dolar está custando ${cot.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>`
            res51.innerHTML += `<p>E você tem ${num2.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} que equivale a ${reais3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>`
            
        } catch (erro) {
            // Se o usuário estiver sem internet ou a API cair
            res51.innerHTML = `<p style="color: red;">Erro ao consultar cotação. Verifique sua conexão.</p>`
            console.error(erro)
        }
    }



