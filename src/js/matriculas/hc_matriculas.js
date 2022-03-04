//Cria series para o gráfico
var series_matriculas = []
var redes_labels = ["Federal", "Estadual", "Municipal", "Privada"]
var matriculas_anos = []

function createMatriculasChart() {
    for (let iAno = 2009; iAno < 2021; iAno++) matriculas_anos.push(iAno)

    redes_labels.forEach((rede) => {
        series_by_ano = []

        matriculas_anos.forEach((iAno) => {
            let serie_ano = matriculas.filter( matricula => matricula.Ano === iAno && matricula["Dep. Adm"] == rede)
            .reduce((aQtde, cMatri) => aQtde + cMatri.Quantidade, 0)

            series_by_ano.push(serie_ano)

        });

        let serie = {
            name: rede,
            data: series_by_ano
        }

        series_matriculas.push(serie)
    });


    matriculas_chart = Highcharts.chart('chart_matriculas', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Evolução das Matrículas na Educação Básica (2009 - 2020)'
        },
        xAxis: {
            categories: matriculas_anos
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Nº de Matrículas'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormatter: function() {
              return '<b>' + this.series.name
                    + '</b> <br/> Nº Matrículas: ' + this.y.toLocaleString('pt-BR') + '<br/>Proporção: ' + ((this.y / this.stackTotal)*100).toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        useGrouping: false
      }) + '%';
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    // enabled: true
                }
            }
        },
        series: series_matriculas
    });

}
