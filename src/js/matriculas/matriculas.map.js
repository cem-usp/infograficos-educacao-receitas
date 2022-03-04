var obj_variacao = {}

var map_matriculas = {
    'map': {},
    'geojson':{},
    'control':{},
    'legend':{}
}

function deduplicateQuantiles() {
    let quantiles = [
                quantile(Object.values(obj_variacao), .875), quantile(Object.values(obj_variacao), .75) , quantile(Object.values(obj_variacao), .625),
                quantile(Object.values(obj_variacao), .50), quantile(Object.values(obj_variacao), .375), quantile(Object.values(obj_variacao), .25),
                quantile(Object.values(obj_variacao), .125), quantile(Object.values(obj_variacao), .0)
            ]

}

function createMatriculasoMap() {
    map_matriculas["map"] = L.map('map_matriculas', {
        zoomSnap: 0.25,
        minZoom: 3.75,
        maxZoom: 5,
        maxBounds: [
            [-37, -115], //southWest
            [37, 20] //northEast
        ]
    }).setView([-115, -50], 3.5)

    getArrVariacao() //Atualiza array de variação

    geojson = L.geoJson(matriculas_map, {
        style: styleMatriculas,
        onEachFeature: onEachFeatureMatri
    }).addTo(map_matriculas["map"]);

    map_matriculas["geojson"] = geojson

    createMatriMapLegend ()
    createMatriMapControl ()

}

function styleMatriculas(feature) {
    return {
        fillColor: getColorMatriculas(obj_variacao[feature.properties.name]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeatureMatri(feature, layer) {
    layer.on({
        mouseover: highlightFeatureMatri,
        mouseout: resetHighlightMatri,
        // click: generateMiniMatriChart
    });
}

function highlightFeatureMatri (e) {
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

    map_matriculas["control"].update(layer.feature.properties);

}

function resetHighlightMatri(e) {
    map_matriculas["geojson"].resetStyle(e.target);
    map_matriculas["control"].update();
}

function getColorMatriculas(d) {
    return  d >= quantile(Object.values(obj_variacao), .875) ? '#1a9850' :
            d >= quantile(Object.values(obj_variacao), .75)  ? '#66bd63' :
            d >= quantile(Object.values(obj_variacao), .625) ? '#a6d96a' :
            d >= quantile(Object.values(obj_variacao), .50)  ? '#d9ef8b' :
            d >= quantile(Object.values(obj_variacao), .375) ? '#fee08b' :
            d >= quantile(Object.values(obj_variacao), .25)  ? '#fdae61' :
            d >= quantile(Object.values(obj_variacao), .125) ? '#f46d43' :
            d >= quantile(Object.values(obj_variacao), .0)   ? '#d73027' :
            '#808080';
}

function getArrVariacao() {
    estados_nomes.forEach((estado, i) => {
        obj_variacao[estado] = getVariacaoMatri(matri_year_ini, matri_year_fin, checks_matri_rede, checks_matri_etapa, estado)
    });
}

function getVariacaoMatri(ano_ini, ano_fin, deps, etapas, uf) {
    let matriculas_ini = matriculas.filter( record =>
        record.UF_Nome === uf &&
        record.Ano === ano_ini &&
        deps.includes(record["Dep. Adm"]) &&
        etapas.includes(record.Etapa)
    )

    let matriculas_fin = matriculas.filter( record =>
        record.UF_Nome === uf &&
        record.Ano === ano_fin &&
        deps.includes(record["Dep. Adm"]) &&
        etapas.includes(record.Etapa)
    )

    let valor_ini = matriculas_ini.reduce((aQtde, cMatri) => aQtde + cMatri.Quantidade, 0)
    let valor_fin = matriculas_fin.reduce((aQtde, cMatri) => aQtde + cMatri.Quantidade, 0)

    let variacao = (valor_ini == 0 && valor_fin == 0) ? 0 : (valor_fin - valor_ini) / valor_ini

    return variacao
}

function getVariacaoMatriGeral() {
    let matriculas_ini = matriculas.filter( record =>
        record.Ano === matri_year_ini &&
        checks_matri_rede.includes(record["Dep. Adm"]) &&
        checks_matri_etapa.includes(record.Etapa)
    )

    let matriculas_fin = matriculas.filter( record =>
        record.Ano === matri_year_fin &&
        checks_matri_rede.includes(record["Dep. Adm"]) &&
        checks_matri_etapa.includes(record.Etapa)
    )

    let valor_ini = matriculas_ini.reduce((aQtde, cMatri) => aQtde + cMatri.Quantidade, 0)
    let valor_fin = matriculas_fin.reduce((aQtde, cMatri) => aQtde + cMatri.Quantidade, 0)

    let variacao = (valor_fin - valor_ini) / valor_ini

    return variacao

}

function createMatriMapLegend () {
    //Legenda
    map_matriculas["legend"] = L.control({position: 'bottomright'});

    map_matriculas["legend"].onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [
                        quantile(Object.values(obj_variacao), .875), quantile(Object.values(obj_variacao), .75) , quantile(Object.values(obj_variacao), .625),
                        quantile(Object.values(obj_variacao), .50), quantile(Object.values(obj_variacao), .375), quantile(Object.values(obj_variacao), .25),
                        quantile(Object.values(obj_variacao), .125), quantile(Object.values(obj_variacao), .0)
                    ]

            labels = [
                        '>= ' + quantile(Object.values(obj_variacao), .875).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .75) .toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .625).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .50) .toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .375).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .25) .toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        '>= ' + quantile(Object.values(obj_variacao), .125).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }),
                        ' < ' + quantile(Object.values(obj_variacao), .125).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })
            ]

        // loop through our density intervals and generate a label with a colored square for each interval
        for (i = 0 ; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorMatriculas(grades[i]) + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    map_matriculas["legend"].addTo(map_matriculas["map"]);

}

//Atualiza mapa na selação do modo e ano
function updateMatriMap () {
    map_matriculas["map"].eachLayer(function(layer){
        if(layer.options.id != "mapbox/light-v9"){
            layer.remove();
        }
    });

    //map_arrecadacao["map"].removeControl(map_arrecadacao["control"])
    map_matriculas["legend"].remove(map_matriculas["legend"])

    getArrVariacao() //Atualiza array de variação

    geojson = L.geoJson(matriculas_map, {
        style: styleMatriculas,
        onEachFeature: onEachFeatureMatri
    }).addTo(map_matriculas["map"]);

    map_matriculas["geojson"] = geojson
    map_matriculas["control"].update();

    createMatriMapLegend ()

    // createArrMapControl ()

    map_matriculas["map"].setView([-115, -50], 3.5)
}

function createMatriMapControl () {
    let map = map_matriculas["map"]

    map_matriculas["control"] = L.control();

    map_matriculas["control"].onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    map_matriculas["control"].update = function (props) {

        if(props) variacao = getVariacaoMatri(matri_year_ini, matri_year_fin,
            checks_matri_rede, checks_matri_etapa, props.name).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 })

        this._div.innerHTML = '<h4>Variação das Matrículas</h4><h4>Unidades Federativas, '+matri_year_ini+' - '+matri_year_fin+'</h4>' +
                '<b>Variação Brasil</b>: ' + getVariacaoMatriGeral().toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }) +'<br/>'+
                '<b>Variação Mediana</b>: ' + median(Object.values(obj_variacao)).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }) +'<br/><br/>'+ (
                    !props ? 'Passe o mouse sobre um estado' :
                    '<h5><b>' + props.name + '</b></h5>' +
                    '<h5><b>Variação de Matrículas</b>: ' + variacao.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits:2 }) + '</h5>'
                );

    };

    map_matriculas["control"].addTo(map_matriculas["map"]);

}

function getStateLayerMatri(id) {
    var found_layer = null;
    map_matriculas["geojson"].eachLayer( function (layer) {
        if(layer.feature.properties.id == id) {
            found_layer = layer
        }
    })

    return found_layer;
}
