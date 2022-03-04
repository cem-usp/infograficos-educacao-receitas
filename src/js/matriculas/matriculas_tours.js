var intro_matriculas = introJs().setOptions({
    steps: [{ //Step 1
        element: document.querySelector('#map_matriculas'),
        title: 'Matrículas como Parâmetro para Redistribuição',
        position: 'right',
        intro: "Este mapa mostra a variação de matrículas do país e a mediana dos estados para as redes e etapas de ensino em um determinado período. Ao passar o mouse sobre um estado, a variação de matrículas daquele território será exibida.",
    }, { //Step 2
        element: document.querySelector('#control_matri'),
        position: 'left',
        intro: "Estes são os controles dos parâmetros do mapa.",
    }, { //Step 3
        element: document.querySelector('#dimensoes_matri'),
        position: 'bottom',
        intro: "Você pode selecionar uma opção de rede e as etapas de ensino serão selecionadas automaticamente",
    }, { //Step 4
        element: document.querySelector('#intervalo_matri'),
        position: 'bottom',
        intro: "Você também pode selecionar um intervalo específico para o cálculo dos valores de variação de matrículas exibidos no mapa.",
    }, { //Step 5
        element: document.querySelector('#map_matriculas'),
        position: 'bottom',
        scrollToElement: false,
        scrollTo: 'tooltip',
        intro: "Podemos perceber no mapa que o número de estudantes matriculados em escolas estaduais teve uma <b>queda de 26,70%</b> no Brasil entre 2009 e 2020.",
    }, { //Step 6
        element: document.querySelector('#chart_matriculas'),
        position: 'top',
        intro: `Neste gráfico, vemos os dados agregados do Brasil e podemos perceber que a <b>rede estadual</b> de todo território saiu de um total de mais de
        <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(1, 0)' onmouseout='matriculas_chart.tooltip.hide()'>20,7 milhões de alunos em 2009</span> para um montante de
        <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(1, 11)' onmouseout='matriculas_chart.tooltip.hide()'>15,2 milhões em 2020</span>.`,
    }, { //Step 7
        element: document.querySelector('#map_matriculas'),
        position: 'right',
        intro: "Somando as matrículas de todas as redes públicas e etapas de ensino básico, verifica-se que houve um <b>decréscimo de 20,51%</b> de matrículas no período. Ou seja, há uma <b>tendência de redução de alunos matriculados na educação básica</b>.",
    }, { //Step 8
        element: document.querySelector('#chart_matriculas'),
        position: 'top',
        intro: "Se em 2009 o total de alunos era de <b>52,6 milhões</b>, 12 anos mais tarde, em 2020, havia um total <b>47,3 milhões</b> de estudantes matriculados.",
    }, { //Step 9
        element: document.querySelector('#chart_matriculas'),
        position: 'top',
        intro: "Comparando agora a evolução da distribuição das matrículas entre as redes, pode-se perceber o <b>aumento da participação das redes municipais frente às estaduais</b>.",
    }, { //Step 10
        element: document.querySelector('#chart_matriculas'),
        position: 'top',
        intro: `Em 2009, as <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(2, 0)' onmouseout='matriculas_chart.tooltip.hide()'>redes municipais</span>
        totalizavam <b>46,24%</b> das matrículas contra <b>39,44%</b> das
        <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(1, 0)' onmouseout='matriculas_chart.tooltip.hide()'>redes estaduais</span>.`,
    }, { //Step 11
        element: document.querySelector('#chart_matriculas'),
        position: 'top',
        intro: `Já em 2020, as <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(2, 11)' onmouseout='matriculas_chart.tooltip.hide()'>redes municipais</span>
        tinham <b>48,44%</b> das matrículas contra <b>32,14%</b> das
        <span class='false-link' href='#a' onmouseover='highlightStateHCMatri(1, 11)' onmouseout='matriculas_chart.tooltip.hide()'>redes estaduais</span>.`,
    }, { //Step 12
        element: document.querySelector('#map_matriculas'),
        position: 'right',
        intro: `<b>10 redes estaduais encolheram em mais de 30%</b> ao longo dos 12 anos.
        Destaque para as redes do  <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"RJ\")' onmouseover='highlightStateMatriMap(\"RJ\")'>Rio de Janeiro</span>,
         <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"MA\")' onmouseover='highlightStateMatriMap(\"MA\")'>Maranhão</span>,
          <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"PB\")' onmouseover='highlightStateMatriMap(\"PB\")'>Paraíba</span> e
           <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"BA\")' onmouseover='highlightStateMatriMap(\"BA\")'>Bahia</span> que tiveram redução de <b>39,50%</b>, <b>39,17%</b>, <b>38,73%</b> e <b>37,69%</b>, respectivamente.`,
    }, { //Step 13
        element: document.querySelector('#map_matriculas'),
        position: 'right',
        intro: `Por outro lado, <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"RR\")' onmouseover='highlightStateMatriMap(\"RR\")'>Roraima</span>,
        <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"AC\")' onmouseover='highlightStateMatriMap(\"AC\")'>Acre</span> e o
        <span class='false-link' href='#a' onmouseout='resetStateMatriMap(\"DF\")' onmouseover='highlightStateMatriMap(\"DF\")'>Distrito Federal</span>
        tiveram suas redes reduzidas em apenas <b>4,88%</b>, <b>4,94%</b> e <b>12,03%</b>, respectivamente. Abaixo da queda mediana de <b>25,29%</b> considerando todas as redes estaduais.`,
    }, { //Step 14
        element: document.querySelector('#card_matriculas'),
        position: 'floating',
        intro: "O número de matrículas é um dos principais parâmetros na definição da redistribuição dos recursos do Fundeb. Entender sua evolução é necessária para examinarmos a importância da complementação da União na redução das desigualdades de recursos para a educação.",
    }],
    autoPosition: false,
    tooltipPosition: 'bottom',
    showBullets: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    // scrollPadding: 100,
    doneLabel: 'Fechar',

})

intro_matriculas.onbeforechange(function(targetElement) {
    switch (intro_matriculas._currentStep) {
        case 4: //Step 5

            //Seleciona opção de rede Todas
            document.getElementById("matri_est").checked = true
            document.getElementById("matri_est").dispatchEvent(new Event('change'))

            //Seleciona Ano Inicial: 2009 e Ano Final: 2020
            document.getElementById("matri_var_ini_ano").options[0].selected = true
            document.getElementById("matri_var_ini_ano").dispatchEvent(new Event('change'))
            document.getElementById("matri_var_fin_ano").options[10].selected = true
            document.getElementById("matri_var_fin_ano").dispatchEvent(new Event('change'))
            break;
        case 6: //Step 7

            //Seleciona opção de rede Todas
            document.getElementById("matri_todas").checked = true
            document.getElementById("matri_todas").dispatchEvent(new Event('change'))

            //Seleciona Ano Inicial: 2009 e Ano Final: 2020
            document.getElementById("matri_var_ini_ano").options[0].selected = true
            document.getElementById("matri_var_ini_ano").dispatchEvent(new Event('change'))
            document.getElementById("matri_var_fin_ano").options[10].selected = true
            document.getElementById("matri_var_fin_ano").dispatchEvent(new Event('change'))
            break;
        case 11: //Step 12

            //Seleciona opção de rede Estadual
            document.getElementById("matri_est").checked = true
            document.getElementById("matri_est").dispatchEvent(new Event('change'))

            //Seleciona Ano Inicial: 2009 e Ano Final: 2020
            document.getElementById("matri_var_ini_ano").options[0].selected = true
            document.getElementById("matri_var_ini_ano").dispatchEvent(new Event('change'))
            document.getElementById("matri_var_fin_ano").options[10].selected = true
            document.getElementById("matri_var_fin_ano").dispatchEvent(new Event('change'))
            break;
        default:
            //
    }
})

function highlightStateHCMatri(serie, point) {
    matriculas_chart.tooltip.refresh(matriculas_chart.series[serie].points[point])
}

function highlightStateMatriMap(uf) {
    let e = {'target': getStateLayerMatri(uf)}
    highlightFeatureMatri (e)
}
function resetStateMatriMap(uf) {
    let e = {'target': getStateLayerMatri(uf)}
    resetHighlightMatri (e)
}
