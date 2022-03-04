var intro_arrecadacao = introJs().setOptions({
    steps: [{ //Step 1
        title: 'Desigualdade na Arrecadação',
        element: document.querySelector('#card_arrecadacao'),
        position: 'floating',
        intro: "Esta seção mostra valores referentes às <b>receitas brutas realizadas</b> pelos estados de acordo com o declarado pelo Siconfi. A partir de suas informações podemos entender melhor o efeito da Arrecadação, que atua como um importante parâmetro na definição da capacidade de investimento em educação das redes estaduais e a desigualdade entre elas.",
    }, { //Step 2
        element: document.querySelector('#chart_arrecadacao'),
        position: 'floating',
        intro: "Neste gráfico apresentamos dados sobre a variação da <b>Arrecadação per capita</b> e absoluta das 27 UFs entre <b>2009 e 2020</b>.",
    }, { //Step 3
        element: document.querySelector('#chart_arrecadacao'),
        position: 'bottom',
        intro: "No modo <b>Arrecadação Absoluta</b> podemos perceber que <span class='false-link' href='#a' onmouseover='highlightStateHCArr(1)'>São Paulo</span> é notavelmente o estado que mais concentrou arrecadação de receitas estaduais, porém com um crescimento de apenas <b>4,79%</b> no período.",
    }, { //Step 4
        element: document.querySelector('#chart_arrecadacao'),
        position: 'bottom',
        intro: "Por outro lado, cinco estados (<span class='false-link' href='#a' onmouseover='highlightStateHCArr(22)'>Paraná</span>, <span class='false-link' href='#a' onmouseover='highlightStateHCArr(23)'>Mato Grosso do Sul</span>, <span class='false-link' href='#a' onmouseover='highlightStateHCArr(24)'>Pará</span>, <span class='false-link' href='#a' onmouseover='highlightStateHCArr(25)'>Mato Grosso</span> e <span class='false-link' href='#a' onmouseover='highlightStateHCArr(26)'>Goiás</span>) aumentaram sua arrecadação <b>acima de 50%</b> no período e, consequentemente, o potencial de investimento em educação.",
    }, { //Step 5
        element: document.querySelector('#chart_arrecadacao'),
        position: 'bottom',
        intro: "Destacam-se o crescimento das receitas de <span class='false-link' href='#a' onmouseover='highlightStateHCArr(26)'>Goiás</span> e <span class='false-link' href='#a' onmouseover='highlightStateHCArr(25)'>Mato Grosso</span> que praticamente dobraram seus recursos, aumentando em <b>98,9%</b> e <b>93,9%</b> suas receitas brutas, respectivamente.",
    }, { //Step 6
        element: document.querySelector('#chart_arrecadacao'),
        position: 'bottom',
        intro: `Alternando o modo para <b>Arrecadação Relativa (per capita)</b>, podemos perceber que
        <span class='false-link' href='#a' onmouseover='highlightStateHCArr(2)'>São Paulo</span>
        não mais se destaca entre os estados, apresentando uma arrecadação mediana. Além disso, o estado teve uma queda na arrecadação per capita, assim como
        <span class='false-link' href='#a' onmouseover='highlightStateHCArr(3)'>Espírito Santo</span>,
        <span class='false-link' href='#a' onmouseover='highlightStateHCArr(1)'>Roraima</span> e <span class='false-link' href='#a' onmouseover='highlightStateHCArr(0)'>Acre</span>.`,
    }, { //Step 7
        element: document.querySelector('#chart_arrecadacao'),
        position: 'bottom',
        intro: "Contudo <span class='false-link' href='#a' onmouseover='highlightStateHCArr(25)'>Mato Grosso</span> e <span class='false-link' href='#a' onmouseover='highlightStateHCArr(26)'>Goiás</span> ainda se destacam sobre a variação de Arrecadação entre os estados <b>considerando suas populações</b>. No período, ambos estados tiveram um crescimento de suas receitas per capita de <b>mais de 65%</b>.",
    }, { //Step 8
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Neste mapa apresentamos os valores de receita dos estados distribuídos geograficamente. Nesta visualização podemos perceber como as desigualdades de arrecadação se distribuem no território.",
    }, { //Step 9
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "No modo <b>Variação no tempo</b> o mapa mostra a <b>variação da arrecadação per capita por faixas</b> para o intervalo escolhido. Aqui fica claro como <span class='false-link' href='#a' onmouseout='resetStateArrMap(\"MT\")' onmouseover='highlightStateArrMap(\"MT\")'>Mato Grosso</span> e <span class='false-link' href='#a' onmouseout='resetStateArrMap(\"GO\")' onmouseover='highlightStateArrMap(\"GO\")'>Goiás</span> se destacam do restante dos outros estados no crescimento de suas receitas.",
    }, { //Step 10
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Clicando em um estado, informações mais detalhadas sobre a arrecadação nos dois anos selecionados no intervalo são apresentadas. Além do valor per capita, a evolução dos valores absolutos no período são exibidos em um gráfico.",
    }, { //Step 11
        element: document.querySelector('#row_map_arr'),
        //position: 'right',
        position: 'bottom',
        intro: "Aqui podemos constatar que o estado do <b>Mato Grosso</b> teve um crescimento de receita estável ao longo do período, exceto em 2018. Aumentou sua arrecadação per capita em <b>65%</b> e sua arrecadação absoluta em <b>93,94%</b>.",
    }, { //Step 12
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Já no modo Indicador de desigualdade apresentamos a mesma lógica dos mapas de cenários, em que o indicador tem como referencial o maior valor da série. Deste modo, aqui podemos analisar a desigualdade de arrecadação para um ano específico.",
    }, { //Step 13
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: `<p>Assim, o cálculo deste indicador é:</p>
        <div class='All'>
            <span class='Fraction align-middle'>
                <b>Indicador de Desigualdade</b>
            </span>
            <span class='Fraction align-middle'>
                =
            </span>
            <span class='Fraction'>
                <span class='Numerator'>Arrecadação per capita  Estadual</span>
                <span class='Denominator'>Maior Arrecadação per capita Estadual</span>
            </span>
        </div>`,
    }, { //Step 14
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Em <b>2009</b>, o <b>Acre</b> apresenta o valor de <b>1,00</b> para este indicador, sendo o estado com a <b>maior arrecadação per capita estadual do ano</b>. O estado se destaca com a tonalidade mais forte do mapa.",
    }, { //Step 15
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Assim como no modo anterior, ao clicar no mapa, informações mais detalhadas são exibidas. E aqui vemos que apesar de concentrar apenas <b>0,87%</b> das receitas estaduais, o estado possui apenas <b>0,36%</b> da população brasileira, o que explica em parte o alto valor de receita per capita.",
    }, { //Step 16
        element: document.querySelector('#row_map_arr'),
        position: 'bottom',
        intro: "Já em 2020 vemos que o crescimento do <b>Mato Grosso</b> no período fez com que alcançasse o posto de <b>maior receita per capita</b> do país concentrando <b>3,09%</b> das receitas estaduais e apenas <b>1,67%</b> da população.",
    }, { //Step 17
        element: document.querySelector('#card_arrecadacao'),
        position: 'floating',
        intro: "Podemos, então, constatar que o rápido aumento da arrecadação de um estado, seja por motivos de produção ou variação cambial, determina obrigatoriamente o crescimento dos gastos em Manutenção e Desenvolvimento do Ensino (MDE) para cumprir o mínimo constitucional. Torna-se, assim, um segundo fator para a desigualdade dos estados no que diz respeito às receitas disponíveis em educação.",
    }],
    autoPosition: false,
    tooltipPosition: 'bottom',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    scrollPadding: 0,
    doneLabel: 'Fechar',
    scrollToElement: 'true',
    scrollTo: 'element'
})

intro_arrecadacao.onbeforechange(function(targetElement) {
    switch (intro_arrecadacao._currentStep) {
        case 1: //Step 2
            arrecadacao_chart.tooltip.hide()
            break;
        case 2: //Step 3
            if(arrecadacaoMode == 'relativa') {
                document.getElementById("arrecadacaoAbsoluta").checked = true // Seleciona o modo absoluta do gráfico
                callArrecadacaoChart() //Trigger o evento do modo do gráfico
            }
            setTimeout( () => {
                highlightStateHCArr(1)
            }, 1000);
            break;
        case 3: //Step 4
            arrecadacao_chart.tooltip.hide()
            break;
        case 4: //Step 5
            if(arrecadacaoMode == 'relativa') {
                document.getElementById("arrecadacaoAbsoluta").checked = true // Seleciona o modo absoluta do gráfico
                callArrecadacaoChart() //Trigger o evento do modo do gráfico
            } else {
                arrecadacao_chart.tooltip.hide()
            }
            break;
        case 5: //Step 6
            if(arrecadacaoMode != 'relativa') {
                document.getElementById("arrecadacaoRelativa").checked = true //  Seleciona o modo relativa do gráfico
                callArrecadacaoChart() //Trigger o evento do modo do gráfico
            }
            break;
        case 7: //Step 8
            if(arr_map_mode != 'variacao') {
                document.getElementById("arrecadacaoVariacaoMapa").checked = true //  Seleciona o modo variação do mapa
                document.getElementById("arrecadacaoVariacaoMapa").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
            }
            if (arr_var_ini_year != 2009 || arr_var_fin_year != 2020) {
                document.getElementById("arr_var_ini_ano").options[0].selected = true
                document.getElementById("arr_var_ini_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
                document.getElementById("arr_var_fin_ano").options[3].selected = true
                document.getElementById("arr_var_fin_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
            }
            break;
        case 10: //Step 11
            getStateLayerArr('MT').openPopup()
            break;
        case 11: //Step 12
            if(arr_map_mode == 'variacao') {
                document.getElementById("arrecadacaoAbsolutaMapa").checked = true //  Seleciona o modo Absoluto do mapa
                document.getElementById("arrecadacaoAbsolutaMapa").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
            }
            if (arr_abs_year != 2009 ) {
                document.getElementById("arrecadacao_abs_ano").options[0].selected = true //  Seleciona o ano de 2009
                document.getElementById("arrecadacao_abs_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
            }
            break;
        case 14: //Step 15
            getStateLayerArr('AC').openPopup()
            break;
        case 15: //Step 16
            document.getElementById("arrecadacao_abs_ano").options[4].selected = true
            document.getElementById("arrecadacao_abs_ano").dispatchEvent(new Event('change')) //Trigger o evento de mudança do modo do mapa
            getStateLayerArr('MT').openPopup()
            break;
        case 16:
            map_arrecadacao["map"]._popup.remove()
            break;
        default:
            ///
    }
})

function highlightStateHCArr(point) {
    arrecadacao_chart.tooltip.refresh([arrecadacao_chart.series[0].points[point], arrecadacao_chart.series[1].points[point], arrecadacao_chart.series[2].points[point]])
}

function highlightStateArrMap(uf) {
    let e = {'target': getStateLayerArr(uf)}
    highlightFeatureArr (e)
}
function resetStateArrMap(uf) {
    let e = {'target': getStateLayerArr(uf)}
    resetHighlightArr (e)
}

function closePopupArrMap() {
    map_arrecadacao["map"]._popup.remove()
    map_arrecadacao["map"].setView([-115, -50], 3.5)
}

var intro_arr_vinculacao = introJs().setOptions({
    steps: [{ //Step 1
        title: 'Desigualdade na Arrecadação',
        element: document.querySelector('#accordionVinculacao'),
        position: 'bottom',
        intro: "Clicando neste botão, a tabela com o posicionamento sobre o <b>percentual mínimo de aplicação em MDE</b> definidos nas constituições de cada estado será apresentada.",
    }, { //Step 2
        element: document.querySelector('#accordionVinculacao'),
        position: 'floating',
        scrollToElement: false,
        scrollPadding: 100,
        scrollTo: 'tooltip',
        intro: "A análise das 27 constituições estaduais mostra que <b>Acre, Amapá, Mato Grosso, Paraná, Rio Grande do Sul e São Paulo</b> definiram a vinculação mínima de percentuais entre <b>25,5% e 32,5%</b> de seus impostos e transferências para despesas em MDE. Ou seja, um <b>valor mínimo maior que o estipulado pela constituição federal</b>.",
    }, { //Step 3
        element: document.querySelector('#rowVincRJ'),
        position: 'bottom',
        intro: "O <b>Rio de Janeiro</b> havia estipulado em sua Constituição Estadual o valor mínimo de <b>35%</b>, mas <b>a decisão foi revogada</b> a partir de uma Adin (Ação direta de inconstitucionalidade) aceita pelo plenário em 2015. Assim, o estado voltou a adotar a norma mínima determinada pela Constituição Federal.",
    },{ //Step 4
        element: document.querySelector('#accordionVinculacao'),
        position: 'floating',
        intro: "Podemos, assim, constatar que a divergência nas regras de vinculação dos recursos estaduais é o primeiro fator que pode levar à desigualdade na receita disponível por aluno da educação básica nos diversos estados.",
    }],
    autoPosition: false,
    tooltipPosition: 'bottom',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    doneLabel: 'Fechar'
})

intro_arr_vinculacao.onbeforechange(function(targetElement) {
    switch (intro_arr_vinculacao._currentStep) {
        case 1: //Step 1
            collapseVinc.show()
            break;
        default:
            ///
    }
})

//Fecha tabela ao sair do Tour
intro_arr_vinculacao.onbeforeexit(function() {
    collapseVinc.hide()
})

//Fecha tabela ao sair do Tour
intro_arr_vinculacao.oncomplete(function() {
    setTimeout(window.scrollBy(0, document.getElementById("card_arrecadacao").getBoundingClientRect().y), 2000)
})
