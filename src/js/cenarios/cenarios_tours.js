var intro_complementacao = introJs().setOptions({
    steps: [{ //Step 1
        title: 'O Papel da Complementação da União',
        element: document.querySelector('#container'),
        intro: "Este gráfico está apresentando os dados de receita potencial para educação para 24 unidades federativas em <b>2009</b>. Ele demonstra o fluxo dos recursos nos três cenários.",
    }, { //Step 2
        element: document.querySelector('#container'),
        intro: "Perceba que no <b>Cenário A</b>, onde é apenas considerado o percentual de impostos e transferências vinculados para a educação, o montante de recursos é maior que no <b>Cenário B</b>, onde é totalizado os recursos disponíveis para a rede estadual após a partilha com as redes municipais.",
    }, { //Step 3
        element: document.querySelector('#container'),
        intro: "Este movimento de transferências de recursos <b>dos estados para as redes municipais (Cenário A para o Cenário B)</b> garante que as redes municipais tenham mais recursos disponíveis por aluno, o que contribui para o combate da desigualdade financeira entre seus municípios.",
    }, { //Step 4
        element: document.querySelector('#container'),
        intro: "Porém, isto significa menos recursos disponíveis para as redes estaduais.",
    }, { //Step 5.1
        element: document.querySelector('#container'),
        intro: "Em 2009, o <b>Maranhão</b>, por exemplo, tinha um total de <b>R$ 4.819,30</b> para investir por aluno no <b>Cenário A</b>.",
    }, { //Step 5.2
        element: document.querySelector('#container'),
        intro: "Já no Cenário B, este montante cai para um valor de <b>R$ 2.599</b> por estudante. Uma <b>queda de 46,06%</b> em recursos de investimento em sua rede.",
    }, { //Step 6
        element: document.querySelector('#container'),
        intro: "Outros estados, assim como o Maranhão, possuem <b>perdas de receitas expressivas</b> nesse movimento de redistribuição de recursos com suas redes municipais (do Cenário A para o Cenário B): <b>Alagoas</b> (-41,64%), <b>Ceará</b> (-41,17%), <b>Pará</b> (- 40,53%), <b>Piauí</b> (-34,07%), <b>Bahia</b> (-33,74%), <b>Rio de Janeiro</b> (-32,39%) e <b>Sergipe</b> (-30,61%). Isto demonstra que os estados são perdedores líquidos de receitas com o Fundeb.<br/><i>Passe o mouse sobre os pontos para verificar os valores.</i>",
    }, { //Step 7
        element: document.querySelector('#container'),
        intro: "No <b>Cenário C</b>, com a complementação da União para os estados com menos recursos, o <b>Maranhão</b> tem um aumento da receita potencial por estudante de <b>44,58%</b>, o que significa um total <b>R$ 3.758,13</b> de investimento disponível em educação por aluno.",
    }, { //Step 8
        element: document.querySelector('#container'),
        intro: "Ainda em 2009, receberam complementação da União o estado do <b>Amazonas</b> e do <b>Pará</b>, com ganhos de <b>2,24%</b> e <b>35,89%</b>, respectivamente.",
    }, { //Step 9
        element: document.querySelector('#cenarios_ano'),
        intro: "Este movimento de redistribuição do estado com suas redes municipais (Cenário B) se repete para todas as 24 Unidades Federativas estudadas. Em 2012, 2014, 2018 e 2020.",
    }, { //Step 10
        element: document.querySelector('#container'),
        position: 'right',
        intro: "Em <b>2020</b>, a perda líquida deste mecanismo de redistribuição chega até <b>51,71%</b>, caso do <b>Maranhão</b>. No Cenário A, sua rede estadual detém um valor de <b>R$ 11.400,75</b> para investimento por aluno. Após a redistribuição com as redes municipais este valor passa a ser <b>R$ 5.505,15</b> (Cenário B).",
    }, { //Step 11
        element: document.querySelector('#container'),
        intro: "Outros 6 estados têm uma <b>perda entre 40% e 50%</b> (<b>Ceará</b>, <b>Alagoas</b>, <b>Pará</b>, <b>Bahia</b>, <b>Rio de Janeiro</b> e <b>Piauí</b>). Já <b>Espírito Santo</b>, <b>Paraíba</b>, <b>Pernambuco</b>, <b>Sergipe</b> e <b>Rio Grande Norte</b> perdem entre <b>34,74% e 39,59%</b> de sua receita potencial no Cenário B.",
    }, { //Step 12
        element: document.querySelector('#container'),
        intro: "Apenas <b>Minas Gerais</b> apresenta uma perda menor de 10%. Este estado perde <b>R$ 532,74</b> por estudante na passagem para o Cenário B, o que equivale a um decréscimo de <b>7,06%</b>.",
    }, { //Step 13
        element: document.querySelector('#container'),
        intro: "Novamente em 2020 a complementação da União se mostra fundamental para aliviar a perda das redes estaduais após a partilha. Nesse ano, <b>9 UFs tiveram ganhos com este mecanismo</b> (Cenário C) de 5,54% (Paraíba) a até 40,14% (Maranhão).",
    }, { //Step 14
        intro: "<b>Portanto, através dos dados podemos constatar que a complementação da União (Cenário C) reduz a desigualdade entre os estados sobre os recursos disponíveis para educação pela elevação dos valores de recursos por aluno das redes com menores valores.</b>",
    }],
    tooltipPosition: 'right',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    doneLabel: 'Fechar'
})

intro_complementacao.onbeforechange(function(targetElement) {
    resetCenariosHCStates()
    switch (intro_complementacao._currentStep) {
        case 0: //Step 1
            document.getElementById("cenarios_ano").options[0].selected = true // Seleciona o ano 2009
            document.getElementById("cenarios_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança de ano do cenário
            break;
        case 1: //Step 2
            cenarios_chart.series[2].hide()
            break;
        case 4: //Step 5.1
            cenarios_chart.tooltip.refresh(cenarios_chart.series[0].points[8])
            cenarios_chart.series[0].points[8].setState('hover')
            break;
        case 5: //Step 5.2
            cenarios_chart.tooltip.refresh(cenarios_chart.series[1].points[8])
            cenarios_chart.series[1].points[8].setState('hover')
            break;
        case 6: //Step 6
            cenarios_chart.tooltip.hide()
            cenarios_chart.series[2].hide()
            break;
        case 7: //Step 7
            cenarios_chart.series[2].show()
            cenarios_chart.series[2].points[8].setState('hover')
            cenarios_chart.tooltip.refresh(cenarios_chart.series[2].points[8])
            break;
        case 8: //Step 8
            cenarios_chart.tooltip.hide()
            cenarios_chart.series[2].points[2].setState('hover')
            cenarios_chart.series[2].points[12].setState('hover')
            cenarios_chart.series[2].setState('hover')
            break;
        case 10: //Step 10
            cenarios_chart.series[2].hide()
            document.getElementById("cenarios_ano").options[4].selected = true // Seleciona o ano 2020
            document.getElementById("cenarios_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança de ano do cenário
            cenarios_chart.series[0].points[8].setState('hover')
            cenarios_chart.series[1].points[8].setState('hover')
            // cenarios_chart.tooltip.refresh(cenarios_chart.series[0].points[8])
            break;
        case 11: //Step 11
            break;
        case 12: //Step 12
            cenarios_chart.series[0].points[9].setState('hover')
            cenarios_chart.series[1].points[9].setState('hover')
            cenarios_chart.tooltip.refresh(cenarios_chart.series[1].points[9])
            cenarios_chart.series[2].hide()
            break;
        case 13: //Step 13
            cenarios_chart.series[2].show()
            cenarios_chart.series[2].points[8].setState('hover')
            cenarios_chart.series[2].points[13].setState('hover')
            cenarios_chart.tooltip.hide()
            break;
        default:

    }
});

intro_complementacao.onexit(function() {
  resetCenariosHCStates()
});

var intro_efeito_reds = introJs().setOptions({
    steps: [{ //Step 1
        title: 'Os Efeitos da Redistribuição e Complementação',
        element: document.querySelector('#tbl_cenarios'),
        intro: "Esta tabela apresenta os indicadores sobre a desigualdade dos recursos potenciais para educação considerando as 24 UFs analisadas para o ano selecionado na caixa de seleção acima.",
    }, { //Step 2
        element: document.querySelector('#tbl_cenarios'),
        intro: "Por esta tabela podemos perceber que a <b>complementação da União</b> (Cenário C) eleva o piso do valor aluno/ano e reduz a desigualdade entre os estados.",
    }, { //Step 3
        element: document.querySelector('#tbl_cenarios'),
        intro: "Em 2009, por exemplo, o menor valor aluno/ano foi <b>aumentado em 24,88%</b> e passou de <b>R$ 2.599,30</b> para <b>R$ 3.245,94</b>.",
    }, { //Step 4
        element: document.querySelector('#tbl_cenarios'),
        intro: "Outros indicadores sobre a desigualdade entre os estados também apontam para uma amortização. Em 2009, a <b>Amplitude</b> passou de <b>2,92</b> (Cenário B) para <b>2,34</b> (Cenário C) após a complementação da União. E o <b>Índice Gini</b>* diminuiu de 0,161 para 0,125.<br><small>*Indicador que mede a desigualdade em um conjunto de valores. Sendo o quão mais próximo de 0, menor é a desigualdade neste conjunto.</small>"
    }, { //Step 5
        element: document.querySelector('#cenarios_ano'),
        intro: "Esta tendência de <b>aumento da desigualdade</b> no Cenário B e a <b>suavização da discrepância entre os estados</b> no Cenário C após a complementação da União evidenciadas pelos indicadores de Amplitude e Índice Gini podem ser constatadas para todos os anos analisados.",
    }, { //Step 6
        //element: document.querySelector('#tbl_cenarios'),
        title: 'Achado-chave',
        intro: "<b>Os valores dos indicadores apresentados na tabela para todos os anos analisados apontam que a complementação da União além de aumentar o piso do valor aluno/ano também contribui para reduzir a desigualdade do grupo como um todo.</b>",
    }, ],
    tooltipPosition: 'left',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    doneLabel: 'Fechar'
})

intro_efeito_reds.onbeforechange(function(targetElement) {
    resetStylesTblCenarios()
    switch (intro_efeito_reds._currentStep) {
        case 2: //Step 3
            document.getElementById("cenarios_ano").options[0].selected = true // Seleciona o ano 2009
            document.getElementById("cenarios_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança de ano do cenário
            document.getElementById('B_menor').classList.add('table-danger')
            document.getElementById('C_menor').classList.add('table-danger')
            break;
        case 3: //Step 4
            document.getElementById('B_amplitude').classList.add('table-danger')
            document.getElementById('B_gini').classList.add('table-danger')
            document.getElementById('C_amplitude').classList.add('table-danger')
            document.getElementById('C_gini').classList.add('table-danger')
            break;
        default:
    }
})

function resetStylesTblCenarios() {
    document.getElementById('B_menor').classList.remove('table-danger')
    document.getElementById('C_menor').classList.remove('table-danger')

    document.getElementById('B_amplitude').classList.remove('table-danger')
    document.getElementById('B_gini').classList.remove('table-danger')
    document.getElementById('C_amplitude').classList.remove('table-danger')
    document.getElementById('C_gini').classList.remove('table-danger')
}

intro_efeito_reds.onexit(function() {
  resetStylesTblCenarios()
});


//A desigualdade distribuída espacialmente
var intro_desi_espacial = introJs().setOptions({
    steps: [{ //Step 1
        title: 'A desigualdade distribuída espacialmente',
        element: document.getElementById('row_cenarios_maps'),
        intro: "Podemos também verificar através dos mapas como a desigualdade entre as redes estaduais é distribuída no território brasileiro e quais são os efeitos do Fundeb e da complementação da União nesta desigualdade.",
    }, { //Step 2
        element: document.querySelector('#row_cenarios_maps'),
        intro: "Cada mapa reflete a cor de um dos cenários apresentados no gráfico acima. <b style='color:#1b9f79'>Cenário A - Verde</b>; <b style='color:#dc6004'>Cenário B - Laranja</b> e <b style='color:#736fb3'>Cenário C - Roxo</b>.",
    }, { //Step 3
        element: document.querySelector('#row_cenarios_maps'),
        intro: `<p>A tonalidade da cor de cada estado varia de acordo com o <b>Indicador de Desigualdade</b> que é calculado a partir do valor da receita potencial daquela rede estadual. Assim, o cálculo é</p>
        <div class='All'>
            <span class='Fraction align-middle'>
                <b>Indicador de Desigualdade</b>
            </span>
            <span class='Fraction align-middle'>
                =
            </span>
            <span class='Fraction'>
                <span class='Numerator'>Receita Potencial da Rede Estadual</span>
                <span class='Denominator'>Maior Receita Potencial</span>
            </span>
        </div>`,
    }, { //Step 4
        element: document.querySelector('#row_cenarios_maps'),
        intro: "Este indicador também pode ser lido como a proporção que determinado estado possui em relação ao estado com o maior valor de receita potencial por aluno."
    }, { //Step 5
        element: document.querySelector('#map_a'),
        position: "bottom",
        intro: "Assim, em <b>2009</b> no <b>Cenário A</b>, a rede de educação do <b>Espírito Santo</b> apresenta o valor de <b>1,00</b> (valor máximo) para o indicador de desigualdade. Ou seja, é o estado que apresenta a <b>maior receita potencial por aluno</b> para o Cenário A em 2009.",
    }, { //Step 6
        element: document.querySelector('#map_a'),
        position: "bottom",
        intro: "Já a rede do estado de <b>Minas Gerais</b> é a que apresenta a <b>menor receita potencial por aluno</b> neste cenário. E, portanto, apresenta o <b>menor valor no indicador de desigualdade</b> deste mapa, <b>0,44</b>. Em outras palavras, em 2009, no Cenário A, Minas Gerais tinha apenas <b>44%</b> da capacidade de investimento por aluno que o estado do Espírito Santo possuía.",
    }, { //Step 7
        element: document.querySelector('#map_b'),
        position: "bottom",
        intro: "Esta configuração se modifica no <b>Cenário B</b> após a partilha com as redes municipais. Neste cenário é o estado do <b>Maranhão</b> que detém a menor receita potencial por aluno e, consequentemente, o menor indicador de desigualdade com o valor de <b>0,34</b>.",
    }, { //Step 8
        element: document.querySelector('#map_b'),
        position: "bottom",
        intro: "Já <b>Minas Gerais</b> apresenta neste cenário um indicador de desigualdade mediano com o valor de <b>0,53</b>.",
    }, { //Step 9
        element: document.querySelector('#map_c'),
        position: "bottom",
        intro: "Com a complementação da União no <b>Cenário C</b>, vemos a mudança da tonalidade do <b>Maranhão</b> e <b>Pará</b>, o que torna o mapa mais homogêneo e indica a redução na desigualdade da capacidade de investimento na educação. Os estados apresentam valores do indicador de desigualdade de <b>0,49</b> e <b>0,47</b>, respectivamente.",
    }, { //Step 10
        element: document.querySelector('#row_cenarios_maps'),
        intro: "Assim, este indicador representado pela tonalidade das cores dos estados no mapa nos informa o quão desiguais são os estados em relação ao potencial de investimento para suas redes de educação.",
    }, { //Step 11
        element: document.querySelector('#row_cenarios_maps'),
        intro: "O mapa que apresenta uma tonalidade de cor mais <b>homogênea</b> indica, portanto, que há <b>maior igualdade</b> de capacidade de investimento naquele cenário para o ano selecionado. Já um mapa com tonalidade mais <b>heterogênea</b> indica que há <b>maior desigualdade</b> entre os estados.",
    }, { //Step 12
        element: document.querySelector('#cenarios_body'),
        intro: "Com auxílio do gráfico também podemos comparar a situação de um estado em relação aos outros em termos de <b>valores monetários</b>. Quando passamos o mouse sobre um estado de um dos mapas, o ponto no gráfico daquele estado e cenário é realçado e seus valores monetários exibidos no gráfico.",
    }, { //Step 13
        element: document.querySelector('#cenarios_body'),
        intro: "O contrário também é verdade. Quando passamos o mouse sobre um ponto do gráfico, o estado no mapa do cenário daquele ponto é destacado e seu indicador de desigualdade é exibido no mapa. Deste modo podemos ver como as capacidades de investimentos se localizam em <b>termos geográficos</b> (pelo mapa) e em <b>valores monetários</b> (pelo gráfico).",
    }, { //Step 14
        element: document.querySelector('#row_cenarios_maps'),
        intro: "<b>Analisando os mapas nos diferentes anos analisados podemos verificar que os estados do Norte e Nordeste, ainda que com exceções, tendem a sofrer mais com a redistribuição para suas redes municipais (Cenário B). Contudo, a complementação da União (Cenário C) alivia consideravelmente este desequilíbrio na capacidade de investimento em educação entre as regiões.</b>",
    }, ],
    //autoPosition: 'none',
    tooltipPosition: 'floating',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    doneLabel: 'Fechar'
})

intro_desi_espacial.onbeforechange(function(targetElement) {
    switch (intro_desi_espacial._currentStep) {
        case 4: //Step 5
            resetHighlightState(getStateLayer('a', 'MG'))
            highlightLayer(getStateLayer('a', 'ES'), 'a')
            break;
        case 5: //Step 6
            resetHighlightState(getStateLayer('a', 'ES'))
            resetHighlightState(getStateLayer('b', 'MA'))
            highlightLayer(getStateLayer('a', 'MG'), 'a')
            break;
        case 6: //Step 7
            resetHighlightState(getStateLayer('a', 'MG'))
            resetHighlightState(getStateLayer('b', 'MG'))
            highlightLayer(getStateLayer('b', 'MA'), 'b')
            break;
        case 7: //Step 8
            resetHighlightState(getStateLayer('b', 'MA'))
            highlightLayer(getStateLayer('b', 'MG'), 'b')
            break;
        case 8: //Step 9
            resetHighlightState(getStateLayer('b', 'MG'))
            break;
        default:
    }
})
