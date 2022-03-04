var teste = null;
var arr_map_mode = document.querySelector('input[name="radioArrecadacaoMapa"]:checked').value
var arr_abs_year = document.getElementById('arrecadacao_abs_ano').value
var arr_var_ini_year = document.getElementById('arr_var_ini_ano').value
var arr_var_fin_year = document.getElementById('arr_var_fin_ano').value

//Change ano mapa
document.querySelectorAll('#arr_var_ini_ano, #arr_var_fin_ano, #arrecadacao_abs_ano').forEach(select =>

    select.addEventListener('change', (e) => {
        if(e.target.id == "arr_var_ini_ano" || e.target.id == "arr_var_fin_ano"){
            arr_var_ini_year = document.getElementById('arr_var_ini_ano').value
            arr_var_fin_year = document.getElementById('arr_var_fin_ano').value
            if(e.target.id == "arr_var_ini_ano")
                updateYearOptions()
        }

        if(e.target.id == 'arrecadacao_abs_ano') {
            arr_abs_year = document.getElementById('arrecadacao_abs_ano').value
            getArrayArrPc(true)
        }

        updateArrMap()
    })
)

//changeArrMapMode
document.querySelectorAll('#arrecadacaoVariacaoMapa, #arrecadacaoAbsolutaMapa').forEach(select => {
    select.addEventListener('change', (e) => {
        arr_map_mode = document.querySelector('input[name="radioArrecadacaoMapa"]:checked').value
        updateArrMap()

        //toogle select
        if(arr_map_mode == 'absoluta') {
            document.getElementById('arr_abs_radio').classList.remove('d-none')
            document.getElementById('arr_var_radio').classList.add('d-none')
            arr_abs_year = document.getElementById('arrecadacao_abs_ano').value
            getArrayArrPc(true)
        } else {
            document.getElementById('arr_var_radio').classList.remove('d-none')
            document.getElementById('arr_abs_radio').classList.add('d-none')
        }

    })
})

function updateYearOptions () {
    let years = [2009, 2012, 2014, 2018, 2020]

    start_year = document.getElementById("arr_var_ini_ano")
    final_year = document.getElementById("arr_var_fin_ano")
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

    arr_var_fin_year = document.getElementById('arr_var_fin_ano').value

}

var collapseVinc = new bootstrap.Collapse(document.getElementById('tblVinculacao'), {
  toggle: false
})
