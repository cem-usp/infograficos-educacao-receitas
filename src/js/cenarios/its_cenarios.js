document.getElementById('cenarios_ano').addEventListener('change', () => {
    cenario_ano = document.getElementById('cenarios_ano').value
    callChart ()
    updateTable ()
    updateMaps ()
});


//Tabela
function updateTable() {
    ano = document.getElementById("cenarios_ano").value
    document.getElementById("tbl_ano").innerHTML = ano

    let cens = ["A", "B", "C"]

    cens.forEach(item => {
        menor = cenarios_metrics[ano][item]["menor"].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        media = cenarios_metrics[ano][item]["media"].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        maior = cenarios_metrics[ano][item]["maior"].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        amplitude = cenarios_metrics[ano][item]["amplitude"].toLocaleString('pt-br',{minimumFractionDigits:2})
        gini = cenarios_metrics[ano][item]["GINI"].toLocaleString('pt-br',{minimumFractionDigits:2})

        document.getElementById(item+"_menor").innerHTML = menor
        document.getElementById(item+"_media").innerHTML = media
        document.getElementById(item+"_maior").innerHTML = maior
        document.getElementById(item+"_amplitude").innerHTML = amplitude
        document.getElementById(item+"_gini").innerHTML = gini
    });

}

function resetCenariosHCStates() {
    cenarios_chart.series.forEach((serie) => {
        serie.points.forEach((point) => {
            (serie.visible) ? point.setState('normal') : void(0)
        });

    });
}
