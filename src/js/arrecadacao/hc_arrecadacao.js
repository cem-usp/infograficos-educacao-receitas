var options_arrecadacao = {
    title: {
        text: 'Evolução da Arrecadação 2020/2009'
    },

    subtitle: {
        text: 'Fonte: CEM'
    },

    yAxis: [{ // Primary yAxis
        title: {
            text: 'Variação 20/09',
            style: {
                color: "#f1a340"
            }
        },
        labels: {
            formatter: function () {
                return this.value * 100 + '%';
            },
            style: {
                color: "#f1a340"
            }
        },
    },{// Secondary yAxis
        title: {
            text: 'Arrecadação per capita',
            style: {
                color: "#0B083B"
            }
        },

        labels: {
            formatter: function () {
                return this.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            },
            style: {
                color: "#827FB2"
            }
        },
        opposite: true
    }],

    xAxis: {
        categories: []
    },

    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br/>',
        shared: true
    },

    series: [],

    colors: ["#827FB2", "#0B083B", "#f1a340"]
}

var arrecadacao_chart = Highcharts.chart('hc_container_arrecadacao', options_arrecadacao);

function callArrecadacaoChart () {
    arrecadacaoMode = document.querySelector('input[name="radioArrecadacaoGrafico"]:checked').value
    if(arrecadacaoMode == 'relativa') {
        file = 'evo_arr_relativa_grafico.csv'
        options_arrecadacao.yAxis[1].title.text = 'Arrecadação per capita'
    } else {
        file = 'evo_arr_absoluta_grafico.csv'
        options_arrecadacao.yAxis[1].title.text = 'Arrecadação Absoluta (em bilhões R$)'
    }

    Highcharts.ajax({
        url: 'https://raw.githubusercontent.com/Euak/data/main/cem/educacao_receitas/' + file,
        dataType: 'text',
        success: function(data) {
            // Split the lines
            var lines = data.split('\n');
            var series = []
            var i = 0

            options_arrecadacao.xAxis.categories = []

            lines.forEach(function(line, lineNo) {
                var items = line.split(',');
                if (lineNo == 0) {
                    items.forEach(function(item, itemNo) {
                        if (itemNo > 0 && itemNo < 3) { //Configura as séries de coluna
                            series.push({
                                type: 'column',
                                name: item,
                                data: [],
                                yAxis: 1,
                                tooltip: {
                                    pointFormatter: function () {
                                        return '<b>' + this.series.name + '</b>: ' + this.y.toLocaleString("pt-br",{style: "currency", currency: "BRL"}) +
                                        (arrecadacaoMode == 'absoluta' ? ' bi' : '') + '<br>'
                                    }
                                }
                            });
                        } else if (itemNo == 3) { //Configura a série de linha
                            series.push({
                                type: 'spline',
                                name: item,
                                data: [],
                                marker: {
                                    lineWidth: 2,
                                    lineColor: options_arrecadacao.colors[2],
                                    fillColor: 'white'
                                },
                                yAxis: 0,
                                 tooltip: {
                                     pointFormatter: function () {
                                         return '<b>' + this.series.name + '</b>: ' + this.y.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
                                     }
                                 }
                            });
                        }
                    });
                } else {
                    if(items[0] !== '') {
                        options_arrecadacao.xAxis.categories.push(items[0]);
                        if(arrecadacaoMode == 'absoluta') { //Dividir por 1 bi se absoluta
                            series[0].data.push(parseFloat(items[1] / 1000000000));
                            series[1].data.push(parseFloat(items[2] / 1000000000));
                        } else {
                            series[0].data.push(parseFloat(items[1]));
                            series[1].data.push(parseFloat(items[2]));
                        }
                        series[2].data.push(parseFloat(items[3]));
                    }
                }

            });

            options_arrecadacao.series = series;
            arrecadacao_chart.update(options_arrecadacao, true, true, {
                duration: 800
            });
        },
        error: function (e, t) {
            console.error(e, t);
        }
    });
}
