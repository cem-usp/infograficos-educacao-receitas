//Cria variáveis universais para os 3 mapas
var maps = {
                'a':{
                    'map': {},
                    'geojson':{},
                    'control':{}
                },
                'b':{
                    'map': {},
                    'geojson':{},
                    'control':{}
                },
                'c':{
                    'map': {},
                    'geojson':{},
                    'control':{}
                }
            };

//Cores de preenchimentos dos 3 mapas
var cenariosColors = {
    A: ['#6FA798', '#468B78', '#256F5B', '#0E5440', '#003828'],
    B: ['#FFCAA4', '#FFAD70', '#FF6C00', '#D95C00', '#A74700'],
    C: ['#827FB2', '#585594', '#363377', '#1D1959', '#0B083B']
}
//Atrbui cor para os estados
function getColor(d, letter) {
    letter = letter.toUpperCase()
    return d >= 1 ? cenariosColors[letter][4] :
    d >= 0.8  ? cenariosColors[letter][3] :
    d >= 0.6  ? cenariosColors[letter][2] :
    d >= 0.4  ? cenariosColors[letter][1] :
    d >  0.0  ? cenariosColors[letter][0] :
    '#808080';
}

//Implementa o estilo nos estados
function style(feature, letter) {
    return {
        fillColor: getColor(feature.properties['i__' + cenario_ano + letter.toUpperCase()], letter.toUpperCase()), //Captura a cor passando como parametro o valor do indice, o cenario e o ano
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}

function highlightLayer(layer, letter) {
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    maps[letter]["control"].update(layer.feature.properties);
}

//Mouseover do Highlight dos estados
function highlightFeature(e) {
    var layer = e.target;
    let letter = e.target.options.cenario
    let letterIndex = letter == 'a' ? 0 : letter == 'b' ? 1 : 2
    let otherSeriesIndex = [0, 1, 2]
    otherSeriesIndex.splice(letterIndex, 1)

    if(!['SP', 'RS', 'DF'].includes(e.target.feature.properties.id)){ //Verifica se não é estado sem dados
        let point = cenarios_chart.series[letterIndex].points.filter(obj => {
            return obj.category === e.target.feature.properties.id
        })

        otherSeriesIndex.forEach((serie, iserie) => {
            cenarios_chart.series[serie].setState('inactive')
        });
        cenarios_chart.tooltip.refresh(point[0])
        point[0].setState('hover')
    }

    highlightLayer(layer, letter)
}

//Mouseout do Highlight dos estados
function resetHighlightState(layer) {
    maps[layer.options.cenario]["geojson"].resetStyle(layer);

    maps[layer.options.cenario]["control"].update();
}

//Mouseout do Highlight dos estados
function resetHighlight(e) {

    //Reinicia os estados do gráfico
    let letter = e.target.options.cenario
    let letterIndex = letter == 'a' ? 0 : letter == 'b' ? 1 : 2
    let point = []

    cenarios_chart.tooltip.hide(0)
    cenarios_chart.series.forEach((serie, i) => {
        serie.setState('normal')
    });

    point = cenarios_chart.series[letterIndex].points.filter(obj => {
        return obj.category === e.target.feature.properties.id
    })

    if(point.length > 0) point[0].setState('normal')

    //(point.length > 0) ? point[0].setState('normal') : void(0)

    //Remove o highlight do mapa
    resetHighlightState(e.target)
}

//Zoom nos estados
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//Add listners
function onEachFeature(feature, layer, letter) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}

function getStateLayer(letter, id) {
    var found_layer = null;
    maps[letter]["geojson"].eachLayer( function (layer) {
        if(layer.feature.properties.id == id) {
            found_layer = layer
        }
    })

    return found_layer;
}

function highlightState(letter, uf) {
    highlightLayer(getStateLayer(letter, uf), letter)
}

//Cria o tooltip
function createControl(letter) {
    let map = maps[letter]["map"]

    maps[letter]["control"] = L.control();

    maps[letter]["control"].onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    maps[letter]["control"].update = function (props) {
        this._div.innerHTML = '<h4>Cenário '+ letter.toUpperCase() +' - ' + cenario_ano + '</h4>' + (
            !props ? 'Passe o mouse sobre um estado' :
            ['SP', 'RS', 'DF'].includes(props.id) ? '<h5><b>' + props.name + '</b></h5>Não há dados para este estado' :
            '<h5><b>' + props.name + '</b></h5>Indicador de Desigualdade: ' + props['i__' + cenario_ano + letter.toUpperCase()].toLocaleString('pt-br',{maximumFractionDigits:2}) +
            '<br />Receita potencial por aluno: ' + props['V_' + cenario_ano + letter.toUpperCase()].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        );
    };

    maps[letter]["control"].addTo(maps[letter]["map"]);
}

//Cria os mapas
function createMaps() {
    var letters = ['a', 'b', 'c']

    letters.forEach((letter, i) => {
        maps[letter]["map"] = L.map('map_' + letter, {
            zoomSnap: 0.25,
            minZoom: 3.75,
            maxZoom: 5,
            maxBounds: [
                            [-37, -95],
                            [32, -20]
                        ]
        }).setView([-15, -54], 3.5)

        geojson = L.geoJson(cenariosData, {
            style: function (feature) {
                return style(feature, letter);
            },
            onEachFeature: onEachFeature,
            cenario: letter,
        }).addTo(maps[letter]["map"]);

        //Control
        createControl(letter)

        //Legenda
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 0.4, 0.6, 0.8, 1],
                labels = ['> 0', '0,4', '0,6', '0,8', '1'];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 4; i > -1; i--) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 0.1, letter) + '"></i> ' +
                    labels[i] + '<br>';
            }

            return div;
        };

        legend.addTo(maps[letter]["map"]);

        maps[letter]["geojson"] = geojson

    });

}

//Atualiza os mapas
function updateMaps () {
    var letters = ['a', 'b', 'c']
    letters.forEach((letter, i) => {
        maps[letter]["map"].eachLayer(function(layer){
            if(layer.options.id != "mapbox/light-v9"){
                layer.remove();
            }
        });

        maps[letter]["map"].removeControl(maps[letter]["control"])

        geojson = L.geoJson(cenariosData, {
            style: function (feature) {
                return style(feature, letter);
            },
            onEachFeature: onEachFeature,
            cenario: letter,
        }).addTo(maps[letter]["map"]);

        maps[letter]["geojson"] = geojson

        createControl(letter)
    })
}
