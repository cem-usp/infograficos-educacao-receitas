var options_cenarios = {
    title: {
        text: 'Cenários'
    },

    subtitle: {
        text: 'Fonte: CEM'
    },

    yAxis: {
        title: {
            text: 'Valor por Aluno'
        },

        labels: {
            formatter: function () {
                return this.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            }
        },
    },

    xAxis: {
        categories: []
    },

    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top'
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormatter: function () {
            return '<b>' + this.category + '</b>: ' + this.y.toLocaleString("pt-br",{style: "currency", currency: "BRL"})
        },
    },

    series: [],

    colors: ["#1b9f79", "#dc6004", "#736fb3"],

    plotOptions: {
        series: {
            point: {
                events: {
                    mouseOver: function (e) {
                            letter = this.series.name.charAt(this.series.name.length - 1).toLowerCase()
                            uf = this.category
                            highlightLayer(getStateLayer(letter, uf), letter)
                    },
                    mouseOut: function (e) {
                            letter = this.series.name.charAt(this.series.name.length - 1).toLowerCase()
                            uf = this.category
                            resetHighlightState(getStateLayer(letter, uf))
                    }
                }
            }
        }
    }
}

var cenarios_chart = Highcharts.chart('container', options_cenarios);

function callChart () {
    Highcharts.ajax({
        url: 'https://raw.githubusercontent.com/Euak/data/main/cem/educacao_receitas/cenarios.csv',
        dataType: 'text',
        success: function(data) {
            // Split the lines
            var lines = data.split('\r\n');
            var series = []
            var i = 0

            lines.forEach(function(line, lineNo) {
                var items = line.split(',');

                if (lineNo == 0) {
                    items.forEach(function(item, itemNo) {
                        if (itemNo > 1) {
                            series.push({
                                name: item,
                                data: []
                            });
                        }
                    });
                } else {

                    if(items[0] == document.getElementById("cenarios_ano").value){
                        options_cenarios.xAxis.categories.push(items[1]);
                        series[0].data.push(parseFloat(items[2]));
                        series[1].data.push(parseFloat(items[3]));
                        series[2].data.push(parseFloat(items[4]));
                    }

                }

            });
            options_cenarios.series = series;
            cenarios_chart.update(options_cenarios, true, true, {
                duration: 800
            });
        },
        error: function (e, t) {
            console.error(e, t);
        }
    });
}
