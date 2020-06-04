function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => res.json() ) //arrow function menor ainda
    .then( states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>` // ${} = interpolar
        }
        
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

   // console.log(event.target.value) //pegando o valor do event

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState]
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then( (res) => res.json() ) //arrow function menor ainda
    .then( cities => {

        for( const city of cities ){ //declarando uma variável na função
            citySelect.innerHTML += `<option value ="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
        
    })

}

document.querySelector("select[name=uf]")
document.addEventListener("change", getCities) //passando a função por referência

