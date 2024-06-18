var searchBtn = document.getElementById("search-btn")
var clearBtn = document.getElementById("clear-btn")
const searchInput = document.getElementById("search-input")

function clear(){
    document.getElementById("form").reset()
    function resetResult(){
        const removeChilds = (parent) => {
            while (parent.lastChild) {
                parent.removeChild(parent.lastChild);
            }
        };
        removeChilds(document.getElementById("results"))
    }
    resetResult()
}

function displayRecommendations(){

    fetch('travel_recommendation_api.json')
    .then(function(response){
        return response.json()
    })
    .then(function(obj){
        var beaches = obj.beaches
        var countries = obj.countries
        var temples = obj.temples
        var Brazil = countries.filter(country => (country.name === "Brazil"))
        const searchWord = document.getElementById("search-input").value
        function search(){
            resetResult()
            document.getElementById("results").innerHTML+= 
                    `<div class="bar"></div>`
            if(searchWord.toLowerCase() == "beach" || searchWord.toLowerCase() == "beaches"){
                beaches.forEach(function(beach){
                    var beachImage = document.createElement("img")
                    beachImage.classList.add("result-image")
                    beachImage.setAttribute("src", beach.imageUrl)
        
                    var beachName = document.createElement("h2")
                    beachName.textContent = beach.name
        
                    var beachDescription = document.createElement("p")
                    beachDescription.textContent = beach.description
        
                    document.getElementById("results").innerHTML+= 
                    ` 
                        <div class="card">
                            <img src="${beach.imageUrl}">
                            <h3>${beach.name}</h3>
                            <p>${beach.description}</p>
                            <button id="visit-btn">Visit</button>
                        </div>  
                    `
                })
            }
            else if(searchWord.toLowerCase() == "temple" || searchWord.toLowerCase() == "temples"){
                temples.forEach(function(temple){
                    document.getElementById("results").innerHTML+= 
                    `
                        <div class="card">
                            <img src="${temple.imageUrl}">
                            <h3>${temple.name}</h3>
                            <p>${temple.description}</p>
                            <button id="visit-btn">Visit</button>
                        </div>  
                    `
        
                })
            }
            else if(searchWord == `Brazil` || searchWord == 'Australia' || searchWord == 'Japan'){

                var searchedCountry = countries.filter(country => (country.name == `${searchWord}`))
                var city = searchedCountry.map(({cities}) => (cities))
                var city1 = city[0]
                city1.forEach(function(city){
                    document.getElementById("results").innerHTML+= 
                    `
                        <div class="card">
                            <img src="${city.imageUrl}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                            <button id="visit-btn">Visit</button>
                        </div>  
                    `
                })
            }
            else if(searchWord ==''){
                document.getElementById("results").innerHTML = `<p>Please enter a location</p>`
            }
            else{
                document.getElementById("results").innerHTML = `<p style="color: red">Unable to get location</p>`
            }
            function resetResult(){
                const removeChilds = (parent) => {
                    while (parent.lastChild) {
                        parent.removeChild(parent.lastChild);
                    }
                };
                removeChilds(document.getElementById("results"))
            }
        }
        search()
       

    })
}