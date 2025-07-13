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
mEdicao = document.querySelector('#edicaoM2')
sedition = document.getElementById('sedicaoM2')
document.querySelector('#medType').addEventListener('change', function() {
    tempTypeMed = document.querySelector('#medType').value; // Obtém o valor do tipo de medição selecionado
    typeMed(); // Chama a função para atualizar o tipo de medição
    exibeArea2()
});
const seletorDeArquivo = document.getElementById('seletorDeArquivo');

nome2 = document.querySelector('#nome2')

if (nome2.value == '') { // Verifica se o campo de nome está vazio
    tempNome3 = getCookie('tempNome3'); // Obtém o nome temporário do cookie do item anterior
    nome2.value = tempNome3 || 'Área'; // Define o nome, se estiver vazio usa 'Área'
}

document.querySelector('#largura').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && tempEdicao == 0) { // Verifica se a tecla pressionada é 'Enter' e se não está em edição
        calcularArea2();
    } else if (e.key === 'Enter' && tempEdicao > 0) { // Verifica se a tecla pressionada é 'Enter' e se está em edição
        alterarM2Func()}
});

document.querySelector('#altura').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && tempEdicao == 0) { // Verifica se a tecla pressionada é 'Enter' e se não está em edição
        calcularArea2();
    } else if (e.key === 'Enter' && tempEdicao > 0) { // Verifica se a tecla pressionada é 'Enter' e se está em edição
        alterarM2Func()}
});

document.querySelector('#profund').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && tempEdicao == 0) { // Verifica se a tecla pressionada é 'Enter' e se não está em edição
        calcularArea2();
    } else if (e.key === 'Enter' && tempEdicao > 0) { // Verifica se a tecla pressionada é 'Enter' e se está em edição
        alterarM2Func()}
});

document.querySelector('#profund2').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && tempEdicao == 0) { // Verifica se a tecla pressionada é 'Enter' e se não está em edição
        calcularArea2();
    } else if (e.key === 'Enter' && tempEdicao > 0) { // Verifica se a tecla pressionada é 'Enter' e se está em edição
        alterarM2Func()}
});

seletorDeArquivo.addEventListener('change', function(e){ // Evento para importar o arquivo
    if (e.target.files.length) { // Verifica se há arquivos selecionados
        const file = e.target.files[0]; // Obtém o primeiro arquivo selecionado
        if (file.name.toLowerCase().endsWith('.csv')) { // Verifica se o arquivo é CSV
            importarCSVparaArray2d(file);
        } else if (file.name.toLowerCase().endsWith('.xls')) { // Verifica se o arquivo é XLS
            importarXLSparaArray2d(file);
        } else { // Se o arquivo não for CSV ou XLS, exibe um alerta
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

// Drag and drop para reordenar os elementos
const parent = document.querySelector('.containerBTN'); // Seleciona o container .containerBTN
const containers = parent.querySelectorAll('.containerm2'); // Seleciona todos os elementos com a classe .containerm2 dentro do container pai
let draggingElem = null; // Variável para armazenar o elemento que está sendo arrastado

// Cria a área de drop (inicialmente oculta)
let dropArea = document.createElement('div'); // Cria um novo elemento div para a área de drop
dropArea.className = 'drop-area'; // Define a classe para a área de drop
dropArea.style.display = 'none'; // Esconde a área de drop inicialmente
dropArea.textContent = 'Solte aqui para reorganizar'; // Texto padrão da área de drop

// Adiciona a área de drop no final da containerBTN
parent.appendChild(dropArea); // Adiciona a área de drop ao final do container pai

// Drag and drop nos elementos
containers.forEach(container => { // Itera sobre cada container com a classe .containerm2
    container.setAttribute('draggable', 'true');
    container.addEventListener('dragstart', function(e) {
        // Remove classe e opacidade de todos antes de iniciar
        containers.forEach(c => { // Itera sobre todos os containers
            c.classList.remove('dragging'); // Remove a classe de arrasto
            c.style.opacity = ''; // Restaura a opacidade original
        });
        draggingElem = container; // Armazena o elemento que está sendo arrastado
        container.classList.add('dragging'); // Adiciona a classe de arrasto ao elemento atual
        e.dataTransfer.effectAllowed = 'move'; // Permite o efeito de arrasto
        e.dataTransfer.setData('text/plain', ''); // Necessário para o drag and drop funcionar corretamente
        setTimeout(() => container.style.opacity = '0.5', 0); // Define a opacidade do elemento arrastado
        dropArea.style.display = 'flex'; // Mostra a área de drop
    });
    
    container.addEventListener('dragend', function() { // Evento de dragend
        draggingElem = null; // Limpa a variável de arrasto
        container.classList.remove('dragging'); // Remove a classe de arrasto do elemento atual
        container.style.opacity = ''; // Restaura a opacidade original
        dropArea.style.display = 'none'; // Esconde a área de drop
        // Garante limpeza em todos
        containers.forEach(c => { // Itera sobre todos os containers
            c.classList.remove('dragging'); // Remove a classe de arrasto
            c.style.opacity = ''; // Restaura a opacidade original
        });
    });

    // Permite drop em outros containers
    container.addEventListener('dragover', function(e) { // Evento de dragover
        e.preventDefault(); // Previne o comportamento padrão do navegador
        if (draggingElem && draggingElem !== container) { // Verifica se há um elemento sendo arrastado e se não é o próprio container
            container.style.borderLeft = '3px solid var(--cor3)'; // Destaca o container atual com uma borda
        }
    });

    container.addEventListener('dragleave', function(e) { // Evento de dragleave
        container.style.borderLeft = ''; // Remove a borda de destaque do container
    });

    container.addEventListener('drop', function(e) { // Evento de drop
        e.preventDefault(); // Previne o comportamento padrão do navegador
        container.style.borderLeft = ''; // Remove a borda de destaque do container
        if (draggingElem && draggingElem !== container) { // Verifica se há um elemento sendo arrastado e se não é o próprio container
            parent.insertBefore(draggingElem, container); // Insere o elemento arrastado antes do container atual
            draggingElem.classList.remove('dragging'); // Remove a classe de arrasto do elemento arrastado
            draggingElem.style.opacity = ''; // Restaura a opacidade original
            draggingElem = null; // Limpa a variável de arrasto
            dropArea.style.display = 'none'; // Esconde a área de drop
            // Garante limpeza em todos
            containers.forEach(c => { // Itera sobre todos os containers
                c.classList.remove('dragging'); // Remove a classe de arrasto
                c.style.opacity = ''; // Restaura a opacidade original
            });
        }
    });
});

// Eventos da área de drop
dropArea.addEventListener('dragover', function(e) { // Evento de dragover
    e.preventDefault(); // Previne o comportamento padrão do navegador
    dropArea.classList.add('drag-over'); // Adiciona a classe de destaque para a área de drop
});
dropArea.addEventListener('dragleave', function(e) { // Evento de dragleave
    dropArea.classList.remove('drag-over'); // Remove a classe de destaque da área de drop
});
dropArea.addEventListener('drop', function(e) { // Evento de drop
    e.preventDefault(); // Previne o comportamento padrão do navegador
    dropArea.classList.remove('drag-over'); // Remove a classe de destaque da área de drop
    if (draggingElem) { // Verifica se há um elemento sendo arrastado
        // Move o elemento para antes da área de drop (no final da containerBTN)
        parent.insertBefore(draggingElem, dropArea); // Insere o elemento arrastado antes da área de drop
        draggingElem.classList.remove('dragging'); // Remove a classe de arrasto do elemento arrastado
        draggingElem.style.opacity = ''; // Restaura a opacidade original
        draggingElem = null; // Limpa a variável de arrasto
        dropArea.style.display = 'none'; // Esconde a área de drop
        // Garante limpeza em todos
        containers.forEach(c => { // Itera sobre todos os containers
            c.classList.remove('dragging'); // Remove a classe de arrasto
            c.style.opacity = ''; // Restaura a opacidade original
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
        alteraInput() // Chama a função para alterar os inputs com os valores temporários
});

formatoEX.innerHTML = `<option value="0">CSV</option>`
formatoEX.innerHTML += `<option value="1">XLS</option>`
formatoEX.innerHTML += `<option value="2">DOC</option>`
formatoEX.innerHTML += `<option value="3">PDF</option>`
formatoEX.value = getCookie("formatoEXC") || 0

var tempNome2 // Variável para armazenar o nome temporário
let vetorOrdenando = false // Variável para controlar se o vetor está sendo ordenado
let array2d = [] // Array para armazenar os dados das medições
let arrayM1 = []; // Array para armazenar os nomes únicos
let tempTypeMed = 0 // Variável para armazenar o tipo de medição selecionado
let tempTypeMed2 = 0 // Variável para armazenar o tipo de medição selecionado
let tempTypeMed3 = 0 // Variável para armazenar o tipo de medição selecionado
let tempData = '' // Variável para armazenar a data temporária
let tempEdicao = 0 // Variável para armazenar o estado de edição

typeMed () // Chama a função para definir o tipo de medição
dataMedicao () // Chama a função para exibir a data de medição

function obterDataHoraFormatada() { // Função para obter a data e hora formatadas
  const data = new Date(); // Cria um novo objeto Date com a data e hora atual
  // Garante que números menores que 10 tenham um zero à esquerda
  const padZero = (numero) => String(numero).padStart(2, '0');
  // Extrai as partes da data
  const dia = padZero(data.getDate()); // getDate() retorna o dia do mês de 1 a 31
  const mes = padZero(data.getMonth() + 1); // getMonth() retorna de 0-11
  const ano = data.getFullYear(); // getFullYear() retorna o ano completo
  // Extrai as partes da hora
  const horas = padZero(data.getHours()); // getHours() retorna a hora de 0 a 23
  const minutos = padZero(data.getMinutes()); // getMinutes() retorna os minutos de 0 a 59
  const segundos = padZero(data.getSeconds()); // getSeconds() retorna os segundos de 0 a 59
    return `${dia}/${mes}/${ano}` // Retorna a data formatada como 'DD/MM/AAAA'
}

function dataMedicao () { // Função para exibir a data de medição
    dataMed.innerHTML = tempData || obterDataHoraFormatada(); // Obtém a data de medição do cookie
}

function typeMed() { // Função para definir o tipo de medição
    medType = document.querySelector('#medType') // Seleciona o elemento de tipo de medição
    if (tempTypeMed == 1) { // M³
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a profundidade' // Define o placeholder do campo de profundidade
    lpro.innerHTML = 'Profundidade: ' // Define o texto do rótulo do campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
        
    } else if (tempTypeMed == 2) { // R$
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite o preço' // Define o placeholder do campo de profundidade
    lpro.innerHTML = 'Preço: ' // Define o texto do rótulo do campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    if (tempTypeMed3 == 1) { // Verifica se precisa inverter o vetor
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
    }
    tempTypeMed3 = 0; // Reseta o tipo de medição 3
    tempTypeMed2 = 1; // Reseta o tipo de medição 2
    } else if (tempTypeMed == 3) { // UN
    cpro.style.display = 'inline-flex' // Esconde o campo de profundidade
    profund.placeholder = 'Digite a unidade' // Define o placeholder do campo de profundidade
    lpro.innerHTML = 'Unidade: ' // Define o texto do rótulo do campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    } else if (tempTypeMed == 4) { // UN + R$
    cpro.style.display = 'inline-flex' // Exibe o campo de profundidade
    profund.placeholder = 'Digite a Unidade' // Define o placeholder do campo de profundidade
    lpro.innerHTML = 'Unidade:' // Define o texto do rótulo do campo de profundidade
    profund2.placeholder = 'Digite o preço' // Define o placeholder do campo de profundidade 2
    lpro2.innerHTML = 'Preço: ' // Define o texto do rótulo do campo de profundidade 2
    cpro2.style.display = 'inline-flex' // Esconde o campo de profundidade 2
    if (tempTypeMed2 == 1) { // Verifica se precisa inverter o vetor
        inverteVetor(array2d); // Inverte o vetor se o tipo de medição for 4
    }
    tempTypeMed3 = 1 // Reseta o tipo de medição 3
    tempTypeMed2 = 0 // Reseta o tipo de medição 2
    }
    else { // M²
    cpro.style.display = 'none' // Esconde o campo de profundidade
    cpro2.style.display = 'none' // Esconde o campo de profundidade 2
    medType.innerHTML = `<option value="0">M² (Medição Quadrada)</option>` // Define as opções do tipo de medição
    medType.innerHTML += `<option value="1">M³ (Medição Cubica)</option>` // Adiciona a opção de medição cúbica
    medType.innerHTML += `<option value="3">UN (Medição com Unidade)</option>` // Adiciona a opção de medição com unidade
    medType.innerHTML += `<option value="2">R$ (Medição com Valor)</option>` // Adiciona a opção de medição com valor
    medType.innerHTML += `<option value="4">UN + R$ (Unidade e Valor)</option>` // Adiciona a opção de medição com unidade e valor
    }
}

function inverteVetor(array2d) { // Função para inverter o vetor array2d quando o tipo de medição for 4 ou 2
    if(array2d.length > 0){ // Verifica se o array2d não está vazio
    array2dTemp = []; // Cria um novo array temporário
    let tempPreco = 0 // Variável para armazenar o preço temporário
    let tempUn = 0 // Variável para armazenar a unidade temporária
    let area2Calc = 0; // Variável para armazenar o valor de area2 calculado
    let area3Calc = 0; // Variável para armazenar o valor de area3 calculado
    for (let i = 0; i < array2d.length; i++) { // Itera sobre cada elemento do array2d
        const [nome, altura, largura, area, preco, area2, un, area3] = array2d[i]; // Desestrutura os valores do array2d
        array2dTemp.push([nome, altura, largura, area, un, area2, preco, area3]); // Adiciona os valores ao array temporário
        }

    array2d.length = 0; // Limpa o array original
    for (let i = 0; i < array2dTemp.length; i++) { // Itera sobre cada elemento do array temporário
        const [nome, altura, largura, area, un, area2, preco, area3] = array2dTemp[i]; // Desestrutura os valores do array temporário
        area2Calc = Number(area) * Number(un); // Calcula area2 sem sobrescrever
        area3Calc = area2Calc * Number(preco); // Usa o valor calculado de area2
        array2d.push([nome, altura, largura, area, un, area2Calc, preco, area3Calc]); // Adiciona os valores do array temporário ao array original
        tempPreco = preco; // Armazena o preço temporário
        tempUn = un; // Armazena a unidade temporária
    }
    document.querySelector('#profund').value = tempUn // Atualiza o campo de profundidade com a unidade temporária
    document.querySelector('#profund2').value = tempPreco // Atualiza o campo de profundidade 2 com o preço temporário
    exibeArea2(array2d)
    }
}

function ordenarVetor() { // Função para ordenar o vetor array2d por nome
    if (vetorOrdenando === false) { // Verifica se o vetor já está sendo ordenado
    vetorOrdenando = true // Define a variável como verdadeira para indicar que o vetor está sendo ordenado
    ordenar.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está ordenando
    ordenar.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
    ordenarArray2dPorNome(); // Chama a função para ordenar o array2d por nome
    exibeArea2(array2d); // Atualiza a exibição após ordenar
    } else { // Se o vetor já está sendo ordenado, desfaz a ordenação
    vetorOrdenando = false // Define a variável como falsa para indicar que o vetor não está mais sendo ordenado
    ordenar.style.backgroundColor = ''; // Restaura a cor original do botão
    ordenar.style.boxShadow = ''; // Remove a sombra do botão
    }
}

function ordenarArray2dPorNome() { // Função para ordenar o array2d por nome
        for (let i = 0; i < array2d.length - 1; i++) { // Itera sobre o array2d
            for (let j = 0; j < array2d.length - 1 - i; j++) { // Itera sobre o array2d novamente
                // Comparação ignorando maiúsculas/minúsculas
                if (array2d[j][0].toLowerCase() > array2d[j + 1][0].toLowerCase()) {
                    // Troca as posições
                    let temp = array2d[j]; // Armazena o elemento atual em uma variável temporária
                    array2d[j] = array2d[j + 1]; // Substitui o elemento atual pelo próximo
                    array2d[j + 1] = temp; // Substitui o próximo elemento pelo elemento armazenado na variável temporária
            }
        }
    }
}

function calcularArea2(){ // Função para calcular a área 2D ou 3D
        let tempNome3 = getCookie('tempNome3'); // Obtém o nome temporário do cookie
        alt = document.querySelector('#altura') // Seleciona o campo de altura
        lar = document.querySelector('#largura') // Seleciona o campo de largura
        pro = document.querySelector('#profund') // Seleciona o campo de profundidade
        pro2 = document.querySelector('#profund2') // Seleciona o campo de profundidade 2
        nome2 = document.querySelector('#nome2').value || 'Área'; // Define o nome, se estiver vazio usa 'Área'
        nome2 = nome2.trim() // Remove espaços em branco no início e no final do nome
        resM2 = document.querySelector('#resultadoM2') // Seleciona o elemento de resultado M2
        resS2 = document.querySelector('#resultadoS2') // Seleciona o elemento de resultado S2
        tabela = document.querySelector('table#m2') // Seleciona a tabela M2
        tabela1 = document.querySelector('table#m1') // Seleciona a tabela M1

        tempNome2 = nome2 // Armazena o nome temporário
        tempNome3 = tempNome2 // Armazena o nome temporário para a tabela de soma
        setCookie('tempNome3', tempNome3, 30); // Salva o nome no cookie por 30 dias
        
        if (alt.value.includes(',')){alt = alt.replace(",", ".")} //Troca virgula por ponto se tiver
        if (lar.value.includes(',')){lar = lar.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro.value.includes(',')){pro = pro.replace(",", ".")} //Troca virgula por ponto se tiver
        if (pro2.value.includes(',')){pro2 = pro2.replace(",", ".")} //Troca virgula por ponto se tiver
        
        alt = Number(alt.value) // Converte o valor de altura para número
        lar = Number(lar.value) // Converte o valor de largura para número
        pro = Number(pro.value) // Converte o valor de profundidade para número
        pro2 = Number(pro2.value) // Converte o valor de profundidade 2 para número

        area = alt * lar // Calcula a área 2D

        if (pro == '' || pro == null) { // Verifica se o campo de profundidade está vazio
            pro = 0; // Define a profundidade como 1 se estiver vazio
        }
        if (pro2 == '' || pro2 == null) { // Verifica se o campo de profundidade 2 está vazio
            pro2 = 0; // Define a profundidade 2 como 0 se estiver vazio
        }

        area2 = alt * lar * pro // Calcula a área 3D
        area3 = alt * lar * pro2 * pro // Calcula a área 3D para o segundo campo de profundidade
        array2d.push([nome2, alt, lar, area, pro, area2, pro2, area3]) // Adiciona os valores ao array 2D

        typeMed() // Chama a função para definir o tipo de medição
        exibeArea2(array2d) // Chama a função para exibir os resultados
        noScroll() // Chama a função para não rolar a tela
        alteraInput(); // Chama a função para alterar o input
}

function alteraInput() { // Função para alterar o input após calcular a área
        // Seleciona todos os inputs dentro do container desejado
        const container = document.querySelector('#m2'); // ou outro container pai
        const inputs = container.querySelectorAll('input');
        // O último input exibido:
        const ultimoInput = inputs[inputs.length - 1]; // Seleciona o último input
        ultimoInput.value = ''; // Limpa o valor do último input
        ultimoInput.focus(); // Coloca o foco no último input
}

let tempPosicao = 1 // Variável para controlar a posição do container
function posicaoM() { // Função para alternar a posição do container
    if (tempPosicao == 1) { // Verifica se a posição atual é 1
        tempPosicao = 0; // Altera a posição para 0
        posicao.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está ativo
        posicao.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
        document.getElementById('containerM0').style.height = '50vh'; // Define a altura máxima do container para 70vh
        document.getElementById('containerM1').style.maxHeight = '25vh';
    } else {
        tempPosicao = 1; // Altera a posição para 1
        posicao.style.backgroundColor = ''; // Restaura a cor original do botão
        posicao.style.boxShadow = ''; // Remove a sombra do botão
        noScroll(); // Chama a função para não rolar a tela
        document.getElementById('containerM0').style.height = 'auto'; // Define a altura do container para auto
        document.getElementById('containerM1').style.maxHeight = 'none'; // Remove a altura máxima do container
    }
}

function noScroll() { // Função para não rolar a tela
    cont2 = document.getElementById('containerM0') // Seleciona o container M0
    let altura1 = tabela2.offsetHeight; // Obtém a altura da tabela M2
    let altura2 = cont2.offsetHeight; // Obtém a altura do container M0
     if(tempPosicao == 1){ // Verifica se a posição é 1
        let larguraDaTela = window.innerWidth; // Obtém a largura da tela
        if (larguraDaTela <= 360) { // Se a largura da tela for menor ou igual a 360px
            let tempScroll = altura2 + 100 // Define um valor temporário de rolagem
        window.scrollTo(0, tempScroll);} else if (larguraDaTela <= 420) {window.scrollTo(0, altura2 - 150);} else if (larguraDaTela <= 750) {window.scrollTo(0, altura2 - 200);} else {window.scrollTo(0, altura2 - 300);}; // Rola a tela para a altura do container M0
    } else {
        cont2.scrollTo(0, altura1) // Rola o container M0 para a altura da tabela M2
    }
}

function exibeArea2() {
    let soma2 = 0 // Inicializa a variável de soma
    let somaA = 0 // Inicializa a variável de soma das alturas
    let somaL = 0 // Inicializa a variável de soma das larguras
    let somaP = 0 // Inicializa a variável de soma das profundidades
    let soma3 = 0 // Inicializa a variável de soma 3D
    let soma4 = 0 // Inicializa a variável de soma das áreas 3D
    resM2 = document.querySelector('#resultadoM2') // Seleciona o elemento de resultado M2
    resS2 = document.querySelector('#resultadoS2') // Seleciona o elemento de resultado S2
    tabela = document.querySelector('table#m2') // Seleciona a tabela M2
    theadM2 = document.querySelector('#theadM2') // Seleciona o cabeçalho da tabela M2
    document.querySelector('h3.edicao').style.display = 'none'; // Esconde o título de edição
    document.querySelector('button.edicao').style.display = 'none'; // Esconde o botão de edição
    if (vetorOrdenando === true) { // Verifica se o vetor está sendo ordenado
        ordenarArray2dPorNome(); // Ordena o array2d por nome
    }

    resM2.innerHTML = '' // Limpa o conteúdo anterior
    if (tempTypeMed == 4) { // Verifica se o tipo de medição é 4 (UN + R$)
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>un</th><th>m²</th><th>un/m²</th><th>R$/un</th><th>Preço</th></tr>`
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i];
            let linha = document.createElement('tr');
            // Garantir que os valores sejam números antes de formatar
            const alturaNum = Number(altura) || 0;
            const larguraNum = Number(largura) || 0;
            const areaNum = Number(area) || 0;
            const unNum = Number(un) || 0;
            const area3Num = Number(area3) || 0;
            const precoNum = Number(preco) || 0;
            const area4Num = Number(area4) || 0;
            
            linha.innerHTML = `<th>${nome}</th><td>${alturaNum.toLocaleString('pt-BR')}</td><td>${larguraNum.toLocaleString('pt-BR')}</td><td>${unNum.toLocaleString('pt-BR')}</td><td class='cSoma'>${areaNum.toLocaleString('pt-BR')}</td><td class='cSoma'>${area3Num.toLocaleString('pt-BR')}</td><td>${precoNum.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td class='cSoma'>${area4Num.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
            // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            somaA += Number(array2d[i][1]) || 0;
            somaL += Number(array2d[i][2]) || 0;
            soma2 += Number(array2d[i][3]) || 0;
            somaP += Number(array2d[i][4]) || 0;
            soma3 += Number(array2d[i][5]) || 0;
            soma4 += Number(array2d[i][7]) || 0;
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{ // Se não estiver vazio, exibe a tabela cheia
        tabelaCheia() 
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td><td colspan="2">${soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 3) { // Verifica se o tipo de medição é 3 (UN)
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>un</th><th>m²</th><th>un/m²</th></tr>`;
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, un, area3] = array2d[i]; 
            let linha = document.createElement('tr');
            linha.innerHTML = `<th>${nome}</th><td>${altura.toLocaleString('pt-BR')}</td><td>${largura.toLocaleString('pt-BR')}</td><td>${un.toLocaleString('pt-BR')}</td><td>${area.toLocaleString('pt-BR')}</td><td>${area3.toLocaleString('pt-BR')}</td>`;
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
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{ // Se não estiver vazio, exibe a tabela cheia
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else if (tempTypeMed == 2) { // Verifica se o tipo de medição é 2 (R$)
        theadM2.innerHTML = `<tr><th>Nome</th><th>Altura</th><th>Largura</th><th>m²</th><th>R$/m²</th><th>Preço</th></tr>`;
        for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, preco, area3] = array2d[i];
            let linha = document.createElement('tr');
            // Garantir que os valores sejam números antes de formatar
            const alturaNum = Number(altura) || 0;
            const larguraNum = Number(largura) || 0;
            const areaNum = Number(area) || 0;
            const precoNum = Number(preco) || 0;
            const area3Num = Number(area3) || 0;
            linha.innerHTML = `<th>${nome}</th><td>${alturaNum.toLocaleString('pt-BR')}</td><td>${larguraNum.toLocaleString('pt-BR')}</td><td>${areaNum.toLocaleString('pt-BR')}</td><td>${precoNum.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td><td>${area3Num.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>`;
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
            // Só chama editarLinhaM2 se não estiver editando já
            if (!linha.classList.contains('editando')) {
                    editarLinhaM2(i);
                }
            });
            resM2.appendChild(linha);
            soma2 += Number(array2d[i][3]) || 0;
            somaA += Number(array2d[i][1]) || 0;
            somaL += Number(array2d[i][2]) || 0;
            soma3 += Number(array2d[i][5]) || 0;
        }
        if (array2d.length == 0) { // Verifica se o array2d está vazio
        tabelaVazia()
        }else{ // Se não estiver vazio, exibe a tabela cheia
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td colspan="2">${soma3.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`;
        }
    } else if (tempTypeMed == 1) { // Verifica se o tipo de medição é 1 (M³)
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
        }else{ // Se não estiver vazio, exibe a tabela cheia
        tabelaCheia()
        resS2.innerHTML = `<tr><th>Soma:</th><td>${somaA.toLocaleString('pt-BR')}</td><td>${somaL.toLocaleString('pt-BR')}</td><td>${somaP.toLocaleString('pt-BR')}</td><td>${soma2.toLocaleString('pt-BR')}</td><td>${soma3.toLocaleString('pt-BR')}</td></tr>`;
        }
    } else { // Se o tipo de medição for M²
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
        }else{ // Se não estiver vazio, exibe a tabela cheia
            tabelaCheia()
            resS2.innerHTML = `<tr><th colspan="1">Soma:</th><td colspan='1'>${somaA.toLocaleString('pt-BR')}</td><td colspan='1'>${somaL.toLocaleString('pt-BR')}</td><td colspan='1'>${soma2.toLocaleString('pt-BR')}</td></tr>`;
        }
    }
    checarNome() // Chama a função para verificar o nome e exibir a soma por nome
}

function tabelaVazia() { // Função para exibir a tabela vazia
    tabela.style.display = 'none'
    containerM0.style.display = 'none'
    menosC2.style.display = 'none'
    export2.style.display = 'none'
    resetC2.style.display = 'none'
    formatoEX.style.display = 'none'
    tabela1.style.display = 'none'
    ordenar.style.display = 'none'
    posicao.style.display = 'none'
    mEdicao.style.display = 'none'
    seletorDeArquivo.style.display = 'inline-block'
}

function tabelaCheia() { // Função para exibir a tabela cheia
    tabela.style.display = 'block'
    containerM0.style.display = 'block'
    menosC2.style.display = 'inline-block'
    export2.style.display = 'inline-block'
    resetC2.style.display = 'inline-block'
    formatoEX.style.display = 'inline-block'
    ordenar.style.display = 'inline-block'
    posicao.style.display = 'inline-block'
    mEdicao.style.display = 'inline-block'
}

// Função para editar uma linha da tabela M2
function editarLinhaM2(index) {
    exibeArea2(); // Fecha qualquer edição anterior
    const tabela = document.querySelector('#resultadoM2'); // Seleciona a tabela de resultados M2
    const linha = tabela.children[index]; // Seleciona a linha correspondente ao índice
    tempEdicao = 2 // Define o tipo de edição como 2 (edição de M2)
    btnEdicao(); // Chama a função para exibir a área de edição
    document.querySelector('h3.edicao').style.display = 'block'; // Exibe o título de edição
    document.querySelector('h3.edicao').textContent = 'Modo de Edição'; // Exibe o título de edição
    document.querySelector('button.edicao').style.display = 'block'; // Exibe o botão de edição
    if (!linha) return; // Verifica se a linha existe
    linha.classList.add('editando'); // Adiciona a classe 'editando' à linha para indicar que está em modo de edição

    document.querySelector('button.edicao').addEventListener('click', function() { // Adiciona um evento de clique ao botão de edição
        exibeArea2(); // Fecha qualquer edição anterior
    });

    // Descobre os campos editáveis de acordo com o tipo de medição
    let camposEditaveis = [];
    if (typeof tempTypeMed === 'undefined' || tempTypeMed === 0) {
        camposEditaveis = [0, 1, 2];
    } else if (tempTypeMed == 1) {
        camposEditaveis = [0, 1, 2, 3];
    } else if (tempTypeMed == 2) {
        camposEditaveis = [0, 1, 2, 4];
    } else if (tempTypeMed == 3) {
        camposEditaveis = [0, 1, 2, 3];
    } else if (tempTypeMed == 4) {
        camposEditaveis = [0, 1, 2, 3, 6];
    }
    let inputRefs = []; // Array para armazenar referências aos inputs criados
    const dados = array2d[index].slice(); // Cria uma cópia dos dados da linha selecionada
    for (let i = 0; i < linha.children.length; i++) { // Itera sobre as células da linha
        const celula = linha.children[i]; // Seleciona a célula atual
        if (camposEditaveis.includes(i)) { // Verifica se o índice da célula está nos campos editáveis
            const input = document.createElement('input'); // Cria um novo input
            input.type = (i === 0) ? 'text' : 'number'; // Define o tipo do input como texto para o nome e número para os outros campos
            input.value = dados[i] !== undefined ? dados[i] : ''; // Define o valor do input como o valor correspondente do array2d ou vazio se não existir
            input.style.width = '80px';
            input.style.backgroundColor = '#f0f0f0';
            input.style.border = '1px solid #ccc';
            celula.textContent = '';
            celula.appendChild(input); // Adiciona o input à célula
            inputRefs[i] = input; // Armazena a referência do input no array inputRefs
            input.addEventListener('click', function(e) { e.stopPropagation(); }); // Impede a propagação do evento de clique para evitar fechar a edição
            input.addEventListener('focus', function() { this.select(); }); // Seleciona o texto do input ao focar nele
        }
    }

    // Botão Alterar
    const btnAlterar = document.createElement('button'); // Cria o botão de alterar
    btnAlterar.textContent = 'Alterar'; // Define o texto do botão
    btnAlterar.style.backgroundColor = '#6969AD'; // Cor verde para o botão de salvar
    btnAlterar.style.color = '#FFD416'; // Cor do texto do botão
    btnAlterar.onclick = function(e) { // Define a ação ao clicar no botão
        e.stopPropagation();
        camposEditaveis.forEach(function(idx) { // Itera sobre os campos editáveis
            if (inputRefs[idx]) { // Verifica se o input existe
                array2d[index][idx] = inputRefs[idx].value; // Atualiza o valor correspondente no array2d com o valor do input
            }
        });
        
        const [nome, altura, largura, area, pro, area2, pro2] = array2d[index]; // Desestrutura os valores atualizados do array2d
        array2d[index] = [nome, altura, largura, altura * largura, pro, altura * largura * pro, pro2, altura * largura * pro * pro2]; // Recalcula a área e atualiza o array2d
        exibeArea2(); // Atualiza a exibição da tabela
    };
    btnAlterar.addEventListener('click', function(e) { e.stopPropagation(); }); // Impede a propagação do evento de clique para evitar fechar a edição
    linha.appendChild(btnAlterar); // Adiciona o botão de alterar à linha

    // Botão deletar
    const btnDeletar = document.createElement('button'); // Cria o botão de deletar
    btnDeletar.textContent = 'Deletar'; // Define o texto do botão
    btnDeletar.onclick = function(e) { // Define a ação ao clicar no botão
        e.stopPropagation(); // Impede a propagação do evento de clique para evitar fechar a edição
        array2d.splice(index, 1); // Remove a linha do array2d
        exibeArea2(); // Atualiza a tabela
    };
    btnDeletar.addEventListener('click', function(e) { e.stopPropagation(); }); // Impede a propagação do evento de clique para evitar fechar a edição
    linha.appendChild(btnDeletar); // Adiciona o botão de deletar à linha

    // Permite salvar com Enter em qualquer input, chamando o botão 'Alterar'
    camposEditaveis.forEach(function(idx) { // Itera sobre os campos editáveis
        if (inputRefs[idx]) { // Verifica se o input existe
            inputRefs[idx].addEventListener('keydown', function(e) { // Adiciona um evento de tecla pressionada ao input
                if (e.key === 'Enter') { // Verifica se a tecla pressionada é Enter
                    btnAlterar.click(); // Simula o clique no botão de alterar
                }
            });
        }
    });
}



function mudouNome() { // Função para verificar se o nome foi alterado
    tabela1 = document.querySelector('table#m1') // Seleciona a tabela M1
    if (arrayM1.length >= 2) { // Verifica se o arrayM1 tem mais de um elemento e se o tipo de medição é diferente de 0
    tabela1.style.display = 'block' // Exibe a tabela M1
    containerM1.style.display = 'block' // Exibe o container M1
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

function checarNome(){ // Função para verificar o nome e exibir a soma por nome
        resM1 = document.querySelector('#resultadoM1') // Seleciona o elemento de resultado M1
        resM1.innerHTML = '' // Limpa o conteúdo anterior do resultado M1
        sedition.innerHTML = '' // Limpa o conteúdo anterior do seletor
        let somaPorNome = {}; // Objeto para armazenar a soma por nome
        let somaPorNome2 = {}; // Objeto para armazenar a soma por nome para área 3D
        let somaPorNome3 = {}; // Objeto para armazenar a soma por nome para área 3D
        arrayM1.length = 0; // Array para armazenar os nomes únicos

        for (let i = 0; i < array2d.length; i++) { // Itera sobre o array2d
        const [nome, , , area, , area2, ,area3] = array2d[i]; // Desestrutura os valores do array2d
        let nomeLimpo = nome // Cria uma variável para armazenar o nome limpo
        let somaArea2 = nome // Cria uma variável para armazenar a soma da área 2
        let somaArea3 = nome // Cria uma variável para armazenar a soma da área 3

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

        if(tempTypeMed == 1){ // Verifica se o tipo de medição é 1 (M³)
        for (let nome in somaPorNome) { // Itera sobre os nomes no objeto somaPorNome
            resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
            arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            let item = document.createElement('option'); // Cria um elemento span para exibir o nome
            item.text = nome; // Define o texto do span como o nome
            item.value = nome; // Define o valor do span como o nome
            sedition.appendChild(item) // Adiciona o item ao seletor
        }

        } else if (tempTypeMed == 2) { // Verifica se o tipo de medição é 2 (R$)
            for (let nome in somaPorNome) { // Itera sobre os nomes no objeto somaPorNome
            resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`; // Exibe a soma por nome na tabela
            arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            let item = document.createElement('option'); // Cria um elemento span para exibir o nome
            item.text = nome; // Define o texto do span como o nome
            item.value = nome; // Define o valor do span como o nome
            sedition.appendChild(item) // Adiciona o item ao seletor

        }
        } else if (tempTypeMed == 3) { // Verifica se o tipo de medição é 3 (UN)
            for (let nome in somaPorNome) { // Itera sobre os nomes no objeto somaPorNome
            resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
            arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome]]); // Adiciona o nome e a soma ao arrayM1
            let item = document.createElement('option'); // Cria um elemento span para exibir o nome
            item.text = nome; // Define o texto do span como o nome
            item.value = nome; // Define o valor do span como o nome
            sedition.appendChild(item) // Adiciona o item ao seletor

        }
        } else if (tempTypeMed == 4) { // Verifica se o tipo de medição é 4 (UN + R$)
            for (let nome in somaPorNome) { // Itera sobre os nomes no objeto somaPorNome
            arrayM1.push([nome, somaPorNome[nome], somaPorNome2[nome], somaPorNome3[nome]]); // Adiciona o nome e a soma ao arrayM1
            resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome2[nome].toLocaleString('pt-BR')}</td><td>${somaPorNome3[nome].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td></tr>`; // Exibe a soma por nome na tabela
            let item = document.createElement('option'); // Cria um elemento span para exibir o nome
            item.text = nome; // Define o texto do span como o nome
            item.value = nome; // Define o valor do span como o nome
            sedition.appendChild(item) // Adiciona o item ao seletor

        }
        } else { // Se o tipo de medição for M²
            for (let nome in somaPorNome) { // Itera sobre os nomes no objeto somaPorNome
                arrayM1.push([nome, somaPorNome[nome]]); // Adiciona o nome e a soma ao arrayM1
                resM1.innerHTML += `<tr><th>Soma ${nome.toLocaleString('pt-BR')}:</th><td>${somaPorNome[nome].toLocaleString('pt-BR')}</td></tr>`; // Exibe a soma por nome na tabela
                let item = document.createElement('option'); // Cria um elemento span para exibir o nome
                item.text = nome; // Define o texto do span como o nome
                item.value = nome; // Define o valor do span como o nome
                sedition.appendChild(item) // Adiciona o item ao seletor
            }
        }
    mudouNome() // Chama a função para verificar se o nome foi alterado
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

function diminuirC2(){ // Função para diminuir o tamanho da tabela M2
     for (let i = 0; i < array2d.length; i++) { // Itera sobre o array2d
        const [nome, altura, largura, area, un, area3, preco, area4] = array2d[i]; // Desestrutura os valores do array2d
        tempNome2 = nome // Armazena o nome temporário
        document.getElementById('altura').value = altura // Define o valor do campo de altura
        document.getElementById('largura').value = largura // Define o valor do campo de largura
        document.getElementById('profund').value = un // Define o valor do campo de profundidade
        document.getElementById('profund2').value = preco // Define o valor do campo de profundidade 2
     }
    array2d.pop() // Remove o último elemento do array 2D
    exibeArea2(array2d) // Atualiza a exibição
}

function exportar() { // Função para exportar os dados da tabela M2
    nome2 = '0' // Inicializa o nome do arquivo com '0'
    let nome1 = '' // Inicializa o nome temporário
    checarNome(); // Atualiza o nome temporário
    nome1 = nomeMed.value || document.querySelector('#nome2').value || 'Área'; // Define o nome para exportação, se estiver vazio usa 'Área'
    nome1 = nome1.trim() // Remove espaços em branco no início e no final do nome
    nome2 = nome1 + obterDataHoraFormatada(); // Define o nome do arquivo
    
    if (!array2d.length) { // Verifica se o array2d está vazio
        alert('Não há dados para exportar!'); // Exibe um alerta se não houver dados
        return; // Interrompe a execução da função se não houver dados
    }

    if (formatoEX.value == '0'){ // Verifica se o formato de exportação é 0 (CSV)
        if (tempTypeMed == 1){ // Verifica se o tipo de medição é 1 (M³)
            exportar21(nome1, nome2)
        } else if (tempTypeMed == 2) { // Verifica se o tipo de medição é 2 (R$)
            exportar22(nome1, nome2)
        } else if (tempTypeMed == 3) { // Verifica se o tipo de medição é 3 (UN)
            exportar23(nome1, nome2)
        } else if (tempTypeMed == 4) { // Verifica se o tipo de medição é 4 (UN + R$)
            exportar24(nome1, nome2)
        } else { // Se o tipo de medição for M²
            exportar2(nome1, nome2)
        }
        setCookie('formatoEXC', 0, 30) // Define o cookie para o formato de exportação como 0 (CSV)
    } else if (formatoEX.value == '1') { // Verifica se o formato de exportação é 1 (XLS)
        if (tempTypeMed == 1){ // Verifica se o tipo de medição é 1 (M³)
            exportar11()
        } else if (tempTypeMed == 2) { // Verifica se o tipo de medição é 2 (R$)
            exportar12()
        } else if (tempTypeMed == 3) { // Verifica se o tipo de medição é 3 (UN)
            exportar13()
        } else if (tempTypeMed == 4) { // Verifica se o tipo de medição é 4 (UN + R$)
            exportar14()
        } else { // Se o tipo de medição for M²
            exportar1()
        }
        setCookie('formatoEXC', 1, 30) // Define o cookie para o formato de exportação como 1 (XLS)
    } else if (formatoEX.value == '2') { // Verifica se o formato de exportação é 2 (DOCX)
        exportarParaDocx(); // Exporta para documento Word
    } else { // Se o formato de exportação for PDF
        exportarParaPDF(); // Exporta para PDF
    }

}

function exportarParaPDF() { // Função para exportar os dados da tabela M2 para PDF
    const tabela = document.querySelector('table#m2'); // Seleciona a tabela M2
    if (!tabela) { // Verifica se a tabela existe
        alert('Tabela não encontrada!'); // Exibe um alerta se a tabela não for encontrada
        return; // Interrompe a execução da função se a tabela não for encontrada
    }
    // Extrai os dados da tabela
    const linhas = Array.from(tabela.querySelectorAll('tr')).map(tr => // Seleciona todas as linhas da tabela
        Array.from(tr.querySelectorAll('th,td')).map(td => td.textContent) // Extrai o texto de cada célula
    );
    // Separa cabeçalho e corpo
    const head = [linhas[0]]; // Armazena o cabeçalho da tabela
    const body = []; // Armazena o corpo da tabela

    for (let i = 1; i < linhas.length; i++) { // Itera sobre as linhas a partir da segunda
        const linha = linhas[i]; // Seleciona a linha atual
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
        } else { // Caso contrário, adiciona a linha normal
            body.push(linha);
        }
    }
    // Cria o PDF
    const { jsPDF } = window.jspdf; // Importa a biblioteca jsPDF
    const doc = new jsPDF(); // Cria uma nova instância do jsPDF
    doc.setFont('Arial', 'normal'); // Define a fonte Arial normal
    doc.setFontSize(16); // Define o tamanho da fonte como 16
    doc.text(`${nomeMed.value || document.querySelector('#nome2').value || 'Área'} ${obterDataHoraFormatada()}`, 105, 15, { align: 'center' }); // Adiciona o título ao PDF, centralizado
    doc.autoTable({ // Cria a tabela no PDF
    head: head, // Cabeçalho da tabela
    body: body, // Corpo da tabela
    startY: 25, // Posição inicial Y da tabela
    styles: { font: 'Arial', fontSize: 12 }, // Estilos da tabela
    headStyles: { // Estilos do cabeçalho
        fillColor: [187, 187, 187], // fundo amarelo (RGB)
        textColor: [0, 0, 0],   // texto azul escuro (RGB)
        fontStyle: 'bold' // texto em negrito
    },
    tableWidth: 'auto', // Largura da tabela automática
    margin: { left: 10, right: 10 } // Margens esquerda e direita de 10
    });
    doc.save(`${nomeMed.value || document.querySelector('#nome2').value || 'Área'}${obterDataHoraFormatada()}.pdf`); // Salva o PDF com o nome especificado
}


async function exportarParaDocx() { // Função para exportar os dados da tabela M2 para um documento Word (DOCX)
    const tabela = document.querySelector('table#m2'); // Seleciona a tabela M2
    if (!tabela) { // Verifica se a tabela existe
        alert('Tabela não encontrada!'); // Exibe um alerta se a tabela não for encontrada
        return; // Interrompe a execução da função se a tabela não for encontrada
    }
    // Extrai os dados da tabela para um array
    const linhas = Array.from(tabela.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th,td')).map(td => td.textContent)
    );
    // Função para criar uma célula com fonte Arial e tamanho 24pt
    function makeCell(text) { // Função para criar uma célula com o texto formatado
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
    } else if (tempTypeMed == 3 || tempTypeMed == 2 || tempTypeMed == 1) { // Verifica se o tipo de medição é 3, 2 ou 1
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
        return new docx.TableCell({ // Cria uma célula com o texto formatado
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
    const docxRows = linhas.map(row => // Mapeia cada linha da tabela
        new docx.TableRow({ // Cria uma nova linha para o docx
            children: row.map(cell => makeCell(cell)), // Mapeia cada célula da linha para criar uma célula formatada
        })
    );
    // Cria o documento
    const doc = new docx.Document({ // Cria um novo documento Word
        sections: [{ // Define as seções do documento
            properties: {}, // Propriedades da seção
            children: [ // Conteúdo do documento
                new docx.Paragraph({ // Cria um parágrafo para o título
                    text: `${nomeMed.value || document.querySelector('#nome2').value || 'Área'} ${obterDataHoraFormatada()}`, // Define o texto do título
                    heading: docx.HeadingLevel.HEADING_1, // Define o nível do cabeçalho
                    font: 'Arial', // Define a fonte como Arial
                    size: 20, // 10pt = 20 half-points
                    style: 'Title' // Define o estilo do parágrafo como Título
                }),
                new docx.Table({ // Cria uma tabela no documento
                    rows: docxRows, // Define as linhas da tabela
                    width: { size: 100, type: docx.WidthType.PERCENTAGE } // Define a largura da tabela como 100% da página
                }),
            ],
        }],
    });
    // Gera o arquivo e faz o download
    const blob = await docx.Packer.toBlob(doc); // Gera o blob do documento Word
    const a = document.createElement('a'); // Cria um link para download
    a.href = URL.createObjectURL(blob); // Cria um URL para o blob
    a.download = `${nomeMed.value || document.querySelector('#nome2').value || 'Área'}${obterDataHoraFormatada()}.docx`; // Define o nome do arquivo para download
    document.body.appendChild(a); // Adiciona o link ao corpo do documento
    a.click(); // Simula o clique no link para iniciar o download
    document.body.removeChild(a); // Remove o link do corpo do documento após o download
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
            <th>un</th>
            <th>Área</th>
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
            <th>un</th>
            <th>Área</th>
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
                <td>${un.toLocaleString('pt-BR')}</td>
                <td>${area.toLocaleString('pt-BR')}</td>
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
        <td>${somaP.toLocaleString('pt-BR')}</td>
        <td>${soma2.toLocaleString('pt-BR')}</td>
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
    let csv = '\uFEFF' +   `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;un;Área;un/Área\n`;
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'),profundidade.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR')]);
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
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'),somaP.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'), soma3.toLocaleString('pt-BR')]);
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
    let csv = '\uFEFF' +  `Medição:;${nome1};${obterDataHoraFormatada()}\nNome;Altura;Largura;un;Área;un/Área;R$/un;Preço\n`;
    // Adiciona as linhas do array2d
    let arrayTemp = []
    for (let i = 0; i < array2d.length; i++) {
            const [nome, altura, largura, area, profundidade, area3, preco, area4] = array2d[i];
            arrayTemp.push([nome, altura.toLocaleString('pt-BR'), largura.toLocaleString('pt-BR'), profundidade.toLocaleString('pt-BR'), area.toLocaleString('pt-BR'), area3.toLocaleString('pt-BR'), preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), area4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
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
    arrayTemp.push(["Soma:", somaA.toLocaleString('pt-BR'), somaL.toLocaleString('pt-BR'),somaP.toLocaleString('pt-BR'), soma2.toLocaleString('pt-BR'),soma3.toLocaleString('pt-BR'),'',soma4.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})]);
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
        if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;un;área;un/área;r$/un;preço')){ // Verifica se o cabeçalho é o esperado
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
                    array2d.push([nome, altura, largura, profundidade, area, area3, preco, area4]); // Adiciona os valores ao array 2D
                }
            }
        });

            
        } else if (verifT.valueOf().toLowerCase().includes('nome;altura;largura;un;área;un/área')){ // Verifica se o cabeçalho é o esperado
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
                    array2d.push([nome, altura, largura, profundidade, area, area3, 0, 0]); // Adiciona os valores ao array 2D
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
                let profundidade = strNum(celulas[4].textContent);
                let area = strNum(celulas[3].textContent);
                let area3 = strNum(celulas[5].textContent);
                let preco = strNum(celulas[6].textContent);
                let area4 = strNum(celulas[7].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, profundidade, area, area3, preco, area4]);
                }
            // XLS tipo 3 (6 colunas, un/unÁrea)
            } else if (cabecalho.length >= 6 && celulas.length >= 6 && cabecalho.includes('un/Área')) {
                let nome = celulas[0].textContent.trim();
                let altura = strNum(celulas[1].textContent);
                let largura = strNum(celulas[2].textContent);
                let profundidade = strNum(celulas[4].textContent);
                let area = strNum(celulas[3].textContent);
                let area3 = strNum(celulas[5].textContent);
                if (nome && !isNaN(altura) && !isNaN(largura) && !isNaN(area)) {
                    array2d.push([nome, altura, largura, profundidade, area, area3, 0, 0]);
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

deletarM2 = document.querySelector('#deletarM2'); // Botão de deletar
alterarM2 = document.querySelector('#alterarM2'); // Botão de alterar
let tempSedition = ''; // Variável para armazenar o seletor de edição
mEdicao.addEventListener('click', btnEdicao) 
function btnEdicao(){
    if (tempEdicao == 0) {
        exibeArea2(); // Fecha a edição simples
        tempEdicao = 1; // Ativa o modo de edição
        mEdicao.style.backgroundColor = '#8f7501'; // Muda a cor do botão para indicar que está editando
        mEdicao.style.boxShadow = 'inset 0 0 15px #00000080'; // Adiciona sombra ao botão
        seletorDeArquivo.disabled = true;
        medType.disabled = true;
        ordenarM2.disabled = true; // Desabilita o botão de ordenar
        menosC2.style.display = 'none'; // Esconde o botão de menos
        med2.style.display = 'none'; // Esconde o botão de mais
        document.querySelector('h3.edicao').style.display = 'block'; // Exibe o título de edição
        document.querySelector('h3.edicao').textContent = 'Modo de Edição Multi Itens'; // Atualiza o título de edição
        deletarM2.style.display = 'none'; // Esconde o botão de deletar
        alterarM2.style.display = 'none'; // Esconde o botão de alterar
        sedition.style.display = 'inline-block'; // Exibe o seletor de edição
        sedition.value = ''; // Limpa o seletor de edição
        document.querySelector('h3#selecao').style.display = 'block'; // Exibe o título de seleção
        document.querySelector('.containerBTN').style.display = 'none'; // Exibe o container de botões
        multiEdicao();
    } else if (tempEdicao == 1) {
        tempEdicao = 0; // Desativa o modo de edição
        mEdicao.style.backgroundColor = ''; // Restaura a cor original do botão
        mEdicao.style.boxShadow = ''; // Remove a sombra do botão
        seletorDeArquivo.disabled = false;
        medType.disabled = false;
        ordenarM2.disabled = false; // Habilita o botão de ordenar
        menosC2.style.display = 'inline-block'; // Exibe o botão de menos
        med2.style.display = 'inline-block'; // Exibe o botão de mais
        document.querySelector('h3.edicao').style.display = 'none'; // Esconde o título de edição
        deletarM2.style.display = 'none'; // Esconde o botão de deletar
        alterarM2.style.display = 'none'; // Esconde o botão de alterar
        sedition.style.display = 'none'; // Esconde o seletor de edição
        sedition.value = ''; // Limpa o seletor de edição
        document.querySelector('h3#selecao').style.display = 'none'; // Esconde o título de seleção
        document.querySelector('.containerBTN').style.display = 'block'; // Exibe o container de botões
        exibeArea2(); // Atualiza a tabela na tela
    } else if (tempEdicao == 2) {
        tempEdicao = 0; // Desativa o modo de edição
        mEdicao.style.backgroundColor = ''; // Restaura a cor original do botão
        mEdicao.style.boxShadow = ''; // Remove a sombra do botão
        seletorDeArquivo.disabled = false;
        medType.disabled = false;
        ordenarM2.disabled = false; // Habilita o botão de ordenar
        menosC2.style.display = 'inline-block'; // Exibe o botão de menos
        med2.style.display = 'inline-block'; // Exibe o botão de mais
        deletarM2.style.display = 'none'; // Esconde o botão de deletar
        alterarM2.style.display = 'none'; // Esconde o botão de alterar
        document.querySelector('h3.edicao').style.display = 'none'; // Esconde o título de edição
        sedition.value = ''; // Limpa o seletor de edição
        sedition.style.display = 'none'; // Esconde o seletor de edição
        document.querySelector('h3#selecao').style.display = 'none'; // Esconde o título de seleção
        document.querySelector('.containerBTN').style.display = 'block'; // Exibe o container de botões
    }
}

function multiEdicao() {
    if (tempEdicao == 1) {
        // Desabilita os campos de entrada
        sedition.addEventListener('change', function() {
            tempSedition = sedition.value; // Atualiza o valor do seletor de edição
            deletarM2.style.display = 'inline-block'; // Exibe o botão de deletar
            alterarM2.style.display = 'inline-block'; // Exibe o botão de alterar
            document.getElementById('nome2').value = tempSedition; // Atualiza o campo de nome com o valor do seletor de edição
            document.querySelector('.containerBTN').style.display = 'block'; // Exibe o container de botões
            altura.value = ''; // Limpa o campo de altura
            largura.value = ''; // Limpa o campo de largura
            profund.value = ''; // Limpa o campo de profundidade
            profund2.value = ''; // Limpa o campo de profundidade 2
        });
    }
}

deletarM2.addEventListener('click', deletarM2Func); // Adiciona o evento de clique para deletar
alterarM2.addEventListener('click', alterarM2Func); // Adiciona o evento de clique para alterar

function deletarM2Func() {
    if (tempSedition !== '' || tempSedition !== null) {
        for (let i = 0; i < array2d.length; i++) {
            if (array2d[i][0] === tempSedition) { // Verifica se o nome do item corresponde ao seletor de edição
                array2d.splice(i, 1); // Remove o item do array2d
                i--; // Decrementa o índice para não pular o próximo elemento
            }
        }
    }
    if (array2d.length > 0){
        for (let i = 0; i < array2d.length; i++) {
            const [nome, alt, lar, area, profundidade, area3, preco, area4] = array2d[i];
            document.getElementById('nome2').value = nome; // Atualiza o campo de nome com o nome do item
            setCookie('tempNome3', nome, 30);
            altura.value = alt; // Atualiza o campo de altura com a altura do item
            largura.value = lar; // Atualiza o campo de largura com a largura do item
            profund.value = profundidade; // Atualiza o campo de profundidade com a profundidade
            profund2.value = preco; // Atualiza o campo de profundidade 2 com a profundidade 2 do item
        }
        tempEdicao = 0; // Desativa o modo de edição
        btnEdicao(); // Chama a função de edição
    } else {
        tempEdicao = 1; // Desativa o modo de edição
        btnEdicao(); // Chama a função de edição
    }
}

function alterarM2Func() {
    if (tempSedition !== '' || tempSedition !== null) {
        for (let i = 0; i < array2d.length; i++) {
            if (array2d[i][0] === tempSedition) { // Verifica se o nome do item corresponde ao seletor de edição
                if (document.getElementById('nome2').value != '' || document.getElementById('nome2').value != array2d[i][0]){array2d[i][0] = document.getElementById('nome2').value;} // Atualiza o nome do item
                if (altura.value != ''){array2d[i][1] = Number(altura.value.replace(',', '.'));} // Atualiza a altura do item
                if (largura.value != ''){array2d[i][2] = Number(largura.value.replace(',', '.'));} // Atualiza a largura do item
                if (profund.value != ''){array2d[i][4] = Number(profund.value.replace(',', '.'));} // Atualiza a profundidade do item
                if (profund2.value != ''){array2d[i][6] = Number(profund2.value.replace(',', '.'));} // Atualiza a profundidade 2 do item
                array2d[i][3] = Number(array2d[i][1]) * Number(array2d[i][2]); // Calcula a área 3D
                array2d[i][5] = Number(array2d[i][4]) * Number(array2d[i][3]); // Calcula a área 3D
                array2d[i][7] = Number(array2d[i][6]) * Number(array2d[i][5]); // Calcula o preço
            }
        }
    }
    tempEdicao = 0; // Desativa o modo de edição
    btnEdicao(); // Chama a função de edição
}