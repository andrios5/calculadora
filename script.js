
        




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

    


