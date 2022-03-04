//Init
var cenario_ano = 2009;

const estados_nomes = ["Acre",                "Alagoas",             "Amapá",               "Amazonas",
"Bahia",               "Ceará",               "Distrito Federal",    "Espírito Santo",
"Goiás",               "Maranhão",            "Mato Grosso",         "Mato Grosso do Sul",
"Minas Gerais",        "Pará",                "Paraíba",             "Paraná",
"Pernambuco",          "Piauí",               "Rio de Janeiro",      "Rio Grande do Norte",
"Rio Grande do Sul",   "Rondônia",            "Roraima",             "Santa Catarina",
"São Paulo",           "Sergipe",             "Tocantins"]

window.onload = function() {
    callChart () //cenarios
    updateTable () //cenarios
    createMaps () //cenarios
    callArrecadacaoChart ()
    createArrecadacaoMaps() // mapa de arrecadação
};

var matriculas = []

fetch('https://raw.githubusercontent.com/Euak/data/main/cem/educacao_receitas/matriculas.json').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	matriculas = data
    createMatriculasChart()
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

// var matriculas = JSON.parse(matriculas_df) //Data Frame de Matriulas por Dep. Adm e Etapa


var selected_card_parameter = document.querySelector('input[name="radio_parameters"]:checked').value

function changeCard() {
    selected_card_parameter = document.querySelector('input[name="radio_parameters"]:checked').value

    if(selected_card_parameter == 'arrecadacao') {
        document.getElementById('card_arrecadacao').classList.remove('d-none')
        document.getElementById('card_matriculas').classList.add('d-none')
    } else {
        document.getElementById('card_arrecadacao').classList.add('d-none')
        document.getElementById('card_matriculas').classList.remove('d-none')
        if(Object.keys(map_matriculas["map"]).length === 0) createMatriculasoMap() // Mapa de matrículas
    }
}
