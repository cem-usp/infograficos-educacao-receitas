//Cria variável o mapa de arrecadação
var map_arrecadacao = {
                        'map': {},
                        'geojson':{},
                        'control':{},
                        'legend':{}
                    }

var array_arr_pc = undefined

var obj_arr_variacao = {}

function getColorArrecadacaoVariacao(d) {
    if(arr_map_mode == 'variacao') {
        return  d >= quantile(Object.values(obj_arr_variacao), .875) ? '#003828' :
                d >= quantile(Object.values(obj_arr_variacao), .75)  ? '#0E5440' :
                d >= quantile(Object.values(obj_arr_variacao), .625) ? '#256F5B' :
                d >= quantile(Object.values(obj_arr_variacao), .50)  ? '#468B78' :
                d >= quantile(Object.values(obj_arr_variacao), .375) ? '#FFCAA4' :
                d >= quantile(Object.values(obj_arr_variacao), .25)  ? '#FFAD70' :
                d >= quantile(Object.values(obj_arr_variacao), .125) ? '#FF6C00' :
                d <  quantile(Object.values(obj_arr_variacao), .125) ? '#A74700' :
                '#808080';
    } else {
        return  d >= 1   ? '#08519c' :
                d >= 0.8  ? '#3182bd' :
                d >= 0.6  ? '#6baed6' :
                d >= 0.4  ? '#bdd7e7' :
                d > 0.0  ? '#eff3ff' :
                '#808080';
    }
}

function updateObjArrVariacao() {
    estados = arrecadacao_map.features

    estados.forEach((estado, iEstado) => {
        let arr_pc_ini = estado.properties["Ar_" + arr_var_ini_year] / estado.properties["Pp_" + arr_var_ini_year]
        let arr_pc_fin = estado.properties["Ar_" + arr_var_fin_year] / estado.properties["Pp_" + arr_var_fin_year]

        obj_arr_variacao[estado.properties.name] = ((arr_pc_fin - arr_pc_ini) / arr_pc_ini)
    });
}

function getIndiceArr(data) {
    if(arr_map_mode == 'variacao') {
        fin_year = document.getElementById("arr_var_fin_ano").value
        ini_year = document.getElementById("arr_var_ini_ano").value

        arr_ini_pc = data["Ar_" + ini_year] / data["Pp_" + ini_year]
        arr_fin_pc = data["Ar_" + fin_year] / data["Pp_" + fin_year]

        indice = (arr_fin_pc / arr_ini_pc) - 1
    } else {
        max_arr_pc = Math.max.apply(null, getArrayArrPc())
        indice = (data["Ar_" + arr_abs_year] / data["Pp_" + arr_abs_year]) / max_arr_pc
    }

    return indice
}

function getArrayArrPc (force = false) {
    if (array_arr_pc === undefined | force == true) {
        array_arr_pc = []
        estados.forEach((estado, iEstado) => {
            let estado_arr_pc = estado.properties['Ar_' + arr_abs_year] / estado.properties['Pp_' + arr_abs_year]
            array_arr_pc.push(estado_arr_pc)
        })
        return array_arr_pc
    } else {
        return array_arr_pc
    }
}

function getVariacaoArr(data) {
    fin_year = document.getElementById("arr_var_fin_ano").value
    ini_year = document.getElementById("arr_var_ini_ano").value

    variacao = (data["Ar_" + fin_year] / data["Ar_" + ini_year]) - 1

    return variacao
}

function styleArrecadacao(feature) {
    return {
        fillColor: getColorArrecadacaoVariacao(getIndiceArr(feature.properties)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeatureArr (e) {
    var layer = e.target
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    map_arrecadacao["control"].update(layer.feature.properties);
}

function resetHighlightArr(e) {
    map_arrecadacao["geojson"].resetStyle(e.target);
    map_arrecadacao["control"].update();
}

function getMetricasRelativa(id_state, years) {
    estados = arrecadacao_map.features

    let soma_arr_estados_ini = 0
    let soma_arr_estados_fin = 0
    let soma_pp_estados_ini = 0
    let soma_pp_estados_fin = 0
    let state = null

    estados.forEach((estado, iEstado) => {
        soma_arr_estados_ini += estado.properties["Ar_" + years[0]]
        soma_arr_estados_fin += estado.properties["Ar_" + years[1]]
        soma_pp_estados_ini += estado.properties["Pp_" + years[0]]
        soma_pp_estados_fin += estado.properties["Pp_" + years[1]]

        state = (estado.properties.id == id_state) ? estado : state
    });

    porc_arr_ini = (state.properties["Ar_" + years[0]] / soma_arr_estados_ini)
    porc_pp_ini = (state.properties["Pp_" + years[0]]  / soma_pp_estados_ini)

    porc_arr_fin = (state.properties["Ar_" + years[1]] / soma_arr_estados_fin)
    porc_pp_fin = (state.properties["Pp_" + years[1]]  / soma_pp_estados_fin)

    return {"porc_arr_ini": porc_arr_ini, "porc_pp_ini": porc_pp_ini,
            "porc_arr_fin": porc_arr_fin, "porc_pp_fin": porc_pp_fin}
}

function getMetricasRelativaAbs (id_state, year) {
    let soma_arr = 0
    let soma_pp = 0
    let state = null

    estados = arrecadacao_map.features

    estados.forEach((estado, iEstado) => {
        soma_arr += estado.properties["Ar_" + year]
        soma_pp += estado.properties["Pp_" + year]

        state = (estado.properties.id == id_state) ? estado : state
    });

    porc_arr = (state.properties["Ar_" + year] / soma_arr)
    porc_pp = (state.properties["Pp_" + year]  / soma_pp)

    return {'soma_arr': soma_arr, 'soma_pp': soma_pp, 'porc_arr': porc_arr,
            'porc_pp': porc_pp}
}


//Atualiza mapa na selação do modo e ano
function updateArrMap () {
    map_arrecadacao["map"].eachLayer(function(layer){
        if(layer.options.id != "mapbox/light-v9"){
            layer.remove();
        }
    });

    map_arrecadacao["map"].removeControl(map_arrecadacao["legend"])
    map_arrecadacao["map"].removeControl(map_arrecadacao["control"])

    updateObjArrVariacao() //Atualiza array com as variaçãoes

    geojson = L.geoJson(arrecadacao_map, {
        style: styleArrecadacao,
        onEachFeature: onEachFeatureArr
    }).addTo(map_arrecadacao["map"]);

    map_arrecadacao["geojson"] = geojson

    createArrMapLegend ()
    createArrMapControl ()
    map_arrecadacao["map"].setView([-115, -50], 3.5)
}


//Gráfico de Arrecacao
function createChartArrMap (data) {
    Highcharts.chart('hc_arr_map_' + data.id, {
        chart: {
        height: 110,
        type: 'column'
        },
        title: {
            text: undefined,
            // style: {
            //     'fontSize': '14px/1.5'
            // }
        },
        exporting: {
            enabled: false
        },
        xAxis: {
          categories: [
            '2009',
            '2012',
            '2014',
            '2018',
            '2020'
          ]
        },
        yAxis: {
            title: {
                text: 'Arrecadação em bi R$'
            },

            labels: {
                formatter: function () {
                    return this.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            }},
        },
        legend: {
        		enabled: false,
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br/>',
            pointFormatter: function () {
                return this.y.toLocaleString("pt-br",{style: "currency", currency: "BRL"}) + " bi"
            }
        },
        series: [{
            data: [data['Ar_2009'] / 1000000000, data['Ar_2012'] / 1000000000,  data['Ar_2014'] / 1000000000,
             data['Ar_2018'] / 1000000000, data['Ar_2020'] / 1000000000]
        }]
    });
}

function generateMiniArrChart(e) {
    setTimeout(() => createChartArrMap(e.feature.properties), 1.0*1000); // prints "[object Window]" after 1 second
    map_arrecadacao["map"].zoomOut(5)
}

function onEachFeatureArr(feature, layer) {
    layer.on({
        mouseover: highlightFeatureArr,
        mouseout: resetHighlightArr,
        // click: generateMiniArrChart
    });

    //Popup

    if(arr_map_mode == "variacao") {
        ini_year = document.getElementById("arr_var_ini_ano").value
        fin_year = document.getElementById("arr_var_fin_ano").value

        ini_year_str = ini_year.toString().slice(2, 4)
        fin_year_str = fin_year.toString().slice(2, 4)

        variacao = getVariacaoArr(feature.properties).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })

        metricas_relativas = getMetricasRelativa(feature.properties.id, [ini_year, fin_year])

        arr_ini_pc = (feature.properties["Ar_"+ini_year] / feature.properties["Pp_"+ini_year])
        arr_fin_pc = (feature.properties["Ar_"+fin_year] / feature.properties["Pp_"+fin_year])
        variacao_pc = ((arr_fin_pc / arr_ini_pc) -1).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })


        variacao_abs = ((feature.properties["Ar_"+fin_year] / feature.properties["Ar_"+ini_year]) -1).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })

        layer_template =
            `<b>${feature.properties.id} - ${ini_year}/${fin_year}</b><br/>
            <div class="legend"><b>Variação da arrecadação per capita ${ini_year_str}/${fin_year_str}</b>: ${variacao_pc}<i style="background-color: ${getColorArrecadacaoVariacao(((arr_fin_pc / arr_ini_pc) -1))}"></i></div>
            <p><b>Evolução da arrecadação</b></p>
            <figure class="highcharts-figure my-2" style="height:110px">
                <div id="hc_arr_map_${feature.properties.id}"></div>
            </figure>
            <b>Arrecadação per capita em ${ini_year}</b>: ${arr_ini_pc.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/>
            <b>Arrecadação per capita em ${fin_year}</b>: ${arr_fin_pc.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/><br/>
            <b>Arrecadação absoluta em ${ini_year}</b>: ${feature.properties["Ar_"+ini_year].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/>
            <b>Arrecadação absoluta em ${fin_year}</b>: ${feature.properties["Ar_"+fin_year].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/>
            <b>Variação da arrecadação absoluta ${ini_year_str}/${fin_year_str}</b>: ${variacao_abs}
            `
    } else {
        year = document.getElementById("arrecadacao_abs_ano").value

        arr_abs = feature.properties["Ar_"+year]
        pop_abs = feature.properties["Pp_"+year]
        arr_pc = arr_abs / pop_abs

        metricas_relativas = getMetricasRelativaAbs(feature.properties.id, year)
        arr_pc_desi = getIndiceArr(feature.properties)

        layer_template =
        `<b>${feature.properties.id} - ${year}</b><br/>
        <b>Indicador de desigualdade (Arr. per capita): </b>${arr_pc_desi.toLocaleString('pt-br',{maximumFractionDigits:2})}<br/>
        <p><b>Evolução da arrecadação</b></p>
        <figure class="highcharts-figure my-2" style="height:110px">
            <div id="hc_arr_map_${feature.properties.id}"></div>
        </figure>
        <b>Arrecadação absoluta: </b>${arr_abs.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/>
        <b>Arrecadação relativa: </b>${metricas_relativas.porc_arr.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })}<br/>
        <b>Arrecadação per capita: </b>${arr_pc.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/><br/>
        <b>População absoluta: </b>${pop_abs.toLocaleString('pt-br',{style: undefined})}<br/>
        <b>População relativa: </b>${metricas_relativas.porc_pp.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })}<br/>
        `
    }

    layer.bindPopup(layer_template, {
        'minWidth': 315,
    })
    .on('popupopen', () => {
        lat = map_arrecadacao["map"]._popup.getLatLng()['lat'] + 13
        lng = map_arrecadacao["map"]._popup.getLatLng()['lng'] + 13
        setTimeout(() => map_arrecadacao["map"].setView(L.latLng(lat, lng)), 0); // prints "[object Window]" after 1 second

        generateMiniArrChart(layer)
    })
}

//Cria os mapas
function createArrecadacaoMaps() {
    map_arrecadacao["map"] = L.map('map_arrecadacao', {
        zoomSnap: 0.25,
        minZoom: 3.75,
        maxZoom: 5,
        maxBounds: [
                        [-37, -115], //southWest
                        [37, 20] //northEast
                    ]
    }).setView([-115, -50], 3.5)

    updateObjArrVariacao() //Atualiza array com as variaçãoes

    geojson = L.geoJson(arrecadacao_map, {
        style: styleArrecadacao,
        onEachFeature: onEachFeatureArr
    }).addTo(map_arrecadacao["map"]);

    map_arrecadacao["geojson"] = geojson

    createArrMapLegend ()
    createArrMapControl ()

}

function createArrMapLegend () {
    //Legenda
    map_arrecadacao["legend"] = L.control({position: 'bottomright'});

    map_arrecadacao["legend"].onAdd = function (map) {

    updateObjArrVariacao() //Atualiza array com as variaçãoes

        var div = L.DomUtil.create('div', 'info legend'),
        grades = (arr_map_mode != 'variacao') ? [1, 0.8, 0.6, 0.4, 0.1] :
            [
                quantile(Object.values(obj_arr_variacao), .875),
                quantile(Object.values(obj_arr_variacao), .75),
                quantile(Object.values(obj_arr_variacao), .625),
                quantile(Object.values(obj_arr_variacao), .50),
                quantile(Object.values(obj_arr_variacao), .375),
                quantile(Object.values(obj_arr_variacao), .25),
                quantile(Object.values(obj_arr_variacao), .125),
                (quantile(Object.values(obj_arr_variacao), .0) - 1)]

            labels = (arr_map_mode != 'variacao') ? ['1', '0,8', '0,6', '0,4', '> 0'] :
                [
                    '>= ' + quantile(Object.values(obj_arr_variacao), .875).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .75).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .625).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .50).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .375).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .25).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    '>= ' + quantile(Object.values(obj_arr_variacao), .125).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                    ' < ' + quantile(Object.values(obj_arr_variacao), .125).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })
                ];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorArrecadacaoVariacao(grades[i]) + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    map_arrecadacao["legend"].addTo(map_arrecadacao["map"]);

}

function createArrMapControl () {
    map_arrecadacao["control"] = L.control();

    map_arrecadacao["control"].onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    map_arrecadacao["control"].update = function (props) {
        this._div.innerHTML = (arr_map_mode == 'variacao') ? '<h5 class="text-center"><b>Variação da Arrecadação per capita por Faixas</b><h5/>' :
                                '<h5 class="text-center"><b>Arrecadação per Capita</b><h5/>'
        this._div.innerHTML += '<h5 class="text-center">Unidade Federativas, ' +
        ((arr_map_mode == 'variacao') ? arr_var_ini_year + ' - ' + arr_var_fin_year : arr_abs_year) + '</h5>'

        this._div.innerHTML += (arr_map_mode == 'variacao') ? '<br/><b>Variação Mediana</b>: ' + median(Object.values(obj_arr_variacao)).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }) +'<br/>' : ''
        this._div.innerHTML += (arr_map_mode == 'variacao' && props) ?
            '<b>Variação em '+props.name+'</b>: ' + obj_arr_variacao[props.name].toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }) +'<br/>' : ''

        this._div.innerHTML += '<br/><p class="text-center"><i>(Clique em um estado)</i></p>'

    };

    map_arrecadacao["control"].addTo(map_arrecadacao["map"]);

}

function getStateLayerArr(id) {
    var found_layer = null;
    map_arrecadacao["geojson"].eachLayer( function (layer) {
        if(layer.feature.properties.id == id) {
            found_layer = layer
        }
    })

    return found_layer;
}
