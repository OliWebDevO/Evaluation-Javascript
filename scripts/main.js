
// ******* Variables et constantes *******
const teams = document.querySelector('.teams')
const betsOdd = document.querySelector('.bets-odd')
const betsTable = document.querySelector('.bets-table')
const panier = document.querySelector('.contenu-panier')

// ******* Fetch du jason *******

fetch(`./scripts/datas.json`)
  .then(data => data.json())
  .then(data => {

    console.log(data.matchs[0])

    for (let i = 0; i < data.matchs.length; i++) {
            betsTable.innerHTML += 
                `<div class="bet">
                    <div class = "team"> 
                        <a>${data.matchs[i].hometeam}</a> 
                        <a>-</a> 
                        <a>${data.matchs[i].awayteam}</a>
                    </div> 
                    <div class = "odds"> 
                        <a>${data.matchs[i].home_odd}</a> 
                        <a>${data.matchs[i].draw_odd}</a>
                        <a>${data.matchs[i].away_odd}</a>
                    </div>
                </div>`
        }
})
  .catch(err => console.error(err));



//   ******* Déclarations de fonctions *******





//   ******* Events / Appels  de fonctions *******






//   ******* Brouillon *******