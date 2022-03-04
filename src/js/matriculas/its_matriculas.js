//Get dimensions values checked
var checks_matri_rede = []
var checks_matri_etapa = []
var matri_year_ini = parseInt(document.getElementById('matri_var_ini_ano').value)
var matri_year_fin = parseInt(document.getElementById('matri_var_fin_ano').value)

document.querySelectorAll('input[name="matri_rede"]:checked').forEach((check) => checks_matri_rede.push(check.value))
document.querySelectorAll('input[name="matri_etapa"]:checked').forEach((check) => checks_matri_etapa.push(check.value))

if(checks_matri_etapa.includes('Todas')) checkAll('matri_rede')
if(checks_matri_etapa.includes('Todas')) checkAll('matri_etapa')


document.querySelectorAll('input[name="matri_rede"]').forEach(check => {
    check.addEventListener('change', (e) => {
        checks_matri_rede = []

        // if(document.querySelectorAll('input[name="matri_rede"]:checked').length == 0) {
        //     alert('Selecione ao menos uma rede')
        //     e.target.checked = true
        // }
        // document.querySelectorAll('input[name="matri_rede"]:checked').forEach((check) => checks_matri_rede.push(check.value))

        if(document.querySelector('input[name="matri_rede"]:checked').value == "Todas")
            checks_matri_rede = ["Federal", "Estadual", "Municipal"]
        else
            checks_matri_rede = document.querySelector('input[name="matri_rede"]:checked').value

        switch (document.querySelector('input[name="matri_rede"]:checked').value) {
            case "Federal":
            case "Estadual":
                document.getElementById("matri_ei").checked = false
                document.getElementById("matri_ef").checked = true
                document.getElementById("matri_em").checked = true
                break;
            case "Municipal":
                document.getElementById("matri_ei").checked = true
                document.getElementById("matri_ef").checked = true
                document.getElementById("matri_em").checked = false
                break;
            case "Todas":
                document.getElementById("matri_ei").checked = true
                document.getElementById("matri_ef").checked = true
                document.getElementById("matri_em").checked = true
                break;
            default:

        }

        updateMatriMap ()
    })

})

document.querySelectorAll('input[name="matri_etapa"]').forEach(check => {
    check.addEventListener('change', (e) => {
        checks_matri_etapa = []

        if(document.querySelectorAll('input[name="matri_etapa"]:checked').length == 0) {
            alert('Selecione ao menos uma etapa')
            e.target.checked = true
        }

        document.querySelectorAll('input[name="matri_etapa"]:checked').forEach((check) => checks_matri_etapa.push(check.value))

        updateMatriMap ()
    })

})


//Change ano mapa
document.querySelectorAll('#matri_var_ini_ano, #matri_var_fin_ano').forEach(select =>

    select.addEventListener('change', (e) => {

        matri_year_ini = parseInt(document.getElementById('matri_var_ini_ano').value)
        matri_year_fin = parseInt(document.getElementById('matri_var_fin_ano').value)
        if(e.target.id == 'matri_var_ini_ano') updateMatriYearOptions()
        updateMatriMap()
    })
)

function updateMatriYearOptions () {
    let years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

    start_year = document.getElementById("matri_var_ini_ano")
    final_year = document.getElementById("matri_var_fin_ano")
    final_year_value = final_year.value

    fin_years_options = years.filter(
        (year) => {
            return year > start_year.value
        }
    )

    //Remove todas as opções
    Array.from(final_year.getElementsByTagName("option")).forEach((option) => {
        option.remove()
    });

    //Cria as opções
    fin_years_options.forEach((year_option) => {
        year_option_el = document.createElement("option")
        year_option_el.value = year_option
        year_option_el.innerHTML = year_option
        if(final_year_value == year_option) year_option_el.selected = true
        final_year.appendChild(year_option_el)
    });

    matri_year_fin = parseInt(document.getElementById('matri_var_fin_ano').value)
}
