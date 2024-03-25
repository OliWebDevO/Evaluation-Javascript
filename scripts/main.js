
// ******* Variables et constantes *******
const teams = document.querySelector('.teams')
const betsOdd = document.querySelector('.bets-odd')
const betsTable = document.querySelector('.bets-table')
const panier = document.querySelector('.contenu-panier')
const betsMain = document.querySelector('.bets-main')
const panierMatchs = document.querySelector('.matchs-panier')
let table = []

 // ******* Fetch du jason *******

fetch(`./scripts/datas.json`)
  .then(data => data.json())
  .then(data => {

    // On push les données du fichier Json dans un tableau
   for (let i = 0; i < data.matchs.length; i++) {
    table.push(data.matchs[i])      
        }
        
        console.log(table)
        console.log(table[0].hometeam)


        
//   ******* Déclarations de fonctions dans le fetch *******

        // fonction pour print un ou plusieurs matchs 

        function printInfo (where, i) {
           where.innerHTML += 
                        `<div class="bet">
                            <div class = "team"> 
                                <a  data-index="${i}">${table[i].hometeam}</a> 
                                <a>-</a> 
                                <a  data-index="${i}">${table[i].awayteam}</a>
                            </div> 
                            <div class = "odds"> 
                                <a  data-index="${i}" class = "button home">${table[i].home_odd}</a> 
                                <a  data-index="${i}" class = "button draw">${table[i].draw_odd}</a>
                                <a  data-index="${i}" class = "button away">${table[i].away_odd}</a>
                            </div>
                        </div>`
        }


        // if (betsTable.innerHTML === "") {
        //     for (let i = 0; i < table.length; i++) {
        //     printInfo(betsTable, i)
        //     }
        // }
       
            betsTable.addEventListener('click', (event)=> {
                let i = parseInt(event.target.getAttribute('data-index'))
                if (event.target.classList.contains('home')) {
                    panierMatchs.innerHTML += 
                        `<div class="panier-bet">
                            <div class = "choix"> 
                                <a  data-index="${i}">${table[i].hometeam}</a> 
                                <a  data-index="${i}" class = "button">${table[i].home_odd}</a> 
                            </div> 
                            <div class = "info"> 
                            <a  data-index="${i}">${table[i].hometeam}</a> 
                            <a>-</a> 
                            <a  data-index="${i}">${table[i].awayteam}</a>
                            </div> 
                        </div>`  
                } else if (event.target.classList.contains('draw')) { panierMatchs.innerHTML += 
                    `<div class="panier-bet">
                        <div class = "choix"> 
                            <a  data-index="${i}"> Draw </a> 
                            <a  data-index="${i}" class = "button">${table[i].draw_odd}</a>
                        </div> 
                        <div class = "info"> 
                        <a  data-index="${i}">${table[i].hometeam}</a> 
                        <a>-</a> 
                        <a  data-index="${i}">${table[i].awayteam}</a>
                        </div> 
                    </div>`  
                    } else if (event.target.classList.contains('away')) {
                        panierMatchs.innerHTML += 
                        `<div class="panier-bet">
                            <div class = "choix"> 
                                <a  data-index="${i}">${table[i].awayteam}</a> 
                                <a  data-index="${i}" class = "button">${table[i].away_odd}</a> 
                            </div> 
                            <div class = "info"> 
                            <a  data-index="${i}">${table[i].hometeam}</a> 
                            <a>-</a> 
                            <a  data-index="${i}">${table[i].awayteam}</a>
                            </div> 
                        </div>`  
                    }
            });
        
      
        
        
        //   ******* Events / Appels  de fonctions *******
        if (betsTable.innerHTML === "") {
            for (let i = 0; i < table.length; i++) {
            printInfo(betsTable, i)
            }
        }

        // betsTable.addEventListener('click', (event)=> {
        //     if (event.target.classList.contains('button')) {
        //         let index = parseInt(event.target.getAttribute('data-index'))
        //         console.log(index)
        //        printInfo(panierMatchs,index)   
        //     }
        // });

        // addMatch()
    
                  
    })

    .catch(err => console.error(err)); 

    // ******* Fin de fetch ******* 

    

//   ******* Déclarations de fonctions en dehors du fetch *******

  // fonction pour remove un match du panier

  const removePanier = ()=> {
    if (panierMatchs.innerHTML === "") {
        panier.classList.add('hidden')
        
    } else {
        panier.classList.remove('hidden')
    }
}

 //   ******* Events / Appels  de fonctions en dehors du fetch *******
 removePanier()
        // Event de toggle bouton actif
        
        
        betsTable.addEventListener('click', (event)=> {
        
            // On check si on est bien sur un bouton
            if (event.target.classList.contains('button')) {
                removePanier()
                // On vérifie si le bouton a déjà une classe active
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active') 
                    // On vérifie si l'élément cliqué n'a pas déjà une classe active 
                } else {
                    // Si mon container a un autre enfant que celui sur lequel je suis en train de cliquer qui possède déjà la classe active
                    if (betsTable.querySelector('.active')) {
                        betsTable.querySelector('.active').classList.remove('active') 
                    }
                    // Si mon wrapper n'a aucun enfant qui a la classe active alors ... 
                    event.target.classList.add('active')
                }
                
            }
            })
        
        
            
  
        //   ******* Brouillon *******

  