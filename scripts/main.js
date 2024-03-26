// *******🔥 Variables et constantes 🔥*******

const teams = document.querySelector('.teams')
const betsOdd = document.querySelector('.bets-odd')
const betsTable = document.querySelector('.bets-table')
const panier = document.querySelector('.contenu-panier')
const betsMain = document.querySelector('.bets-main')
const panierMatchs = document.querySelector('.matchs-panier')
const nBets = document.querySelector('.nBets')
const lightDark = document.querySelector('.light')
const cote = document.querySelector('.cote')
const argent = document.querySelector('#argent')
const btnEstimate = document.querySelector('.estimate')
const gain = document.querySelector('.gain')
let table = []


//   *******🔥 Déclarations de fonctions en dehors du fetch 🔥*******

// déclaration de fonction visant à cacher le panier s'il est vide, le montrer s'il dispose d'un item

const removePanier = ()=> {
    if (panierMatchs.innerHTML === "") {
        panier.classList.add('hidden')
        
    } else {
        panier.classList.remove('hidden')
    }
}

// déclaration de fonction visant à donner le nombre de bets présents dans le panier

const numberOfBets = () => {
    nBets.innerHTML = panierMatchs.childElementCount
}

// Fonction pour passer en DarkMode

function enableDarkMode() {
    document.querySelector('.bets-main').classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    lightDark.innerHTML = `<i class="fa-solid fa-moon" style="color: #ffffff;"></i>`
}

// Fonction pour désactiver le DarkMode

function disableDarkMode() {
    document.querySelector('.bets-main').classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    lightDark.innerHTML =  `<a class="light" href=""><i class="fa-solid fa-sun" style="color: #ffffff;"></i></a>`
}

 // *******🔥 Fetch du data.json 🔥*******

fetch(`./scripts/datas.json`)
  .then(data => data.json())
  .then(data => {

    // On push les données du fichier Json dans un tableau
   for (let i = 0; i < data.matchs.length; i++) {
    table.push(data.matchs[i])      
        }
        
        console.log(table)
        console.log(table[0].hometeam)


//   *******🔥 Events / Appels  de fonctions dans le fetch 🔥*******


// Event au sein du fetch visant à charger les infos du data.json dans le dom

    for (let i = 0; i < table.length; i++) {
            
        betsTable.innerHTML += 
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

// Event de click au sein du fetch reliant les boutons relatifs aux cotes du betstable vers le panier. Chaque fois que l'on clique sur la cote, on envoie toutes les infos correspondantes à ce bet dans le panier

    betsTable.addEventListener('click', (event)=> {
        let i = parseInt(event.target.getAttribute('data-index'))
        if (event.target.classList.contains('home')) {
            panierMatchs.innerHTML += 
                `<div class="panier-bet">
                    <div class = "choix"> 
                        <div data-index="${i} class="choisi">
                            <a  data-index="${i}">${table[i].hometeam}</a>
                            <a  data-index="${i}" class = "button">${table[i].home_odd}</a>
                        </div>
                        <div class="delete">🗑️</div>
                    </div> 
                    <div class = "info"> 
                    <a  data-index="${i}">${table[i].hometeam}</a> 
                    <a>-</a> 
                    <a  data-index="${i}">${table[i].awayteam}</a>
                    </div> 
                </div>`
            cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].home_odd).toFixed(2)}`
        } else if (event.target.classList.contains('draw')) { panierMatchs.innerHTML += 
                `<div class="panier-bet">
                    <div class = "choix"> 
                        <div data-index="${i} class="choisi">
                            <a  data-index="${i}"> Draw </a>
                            <a  data-index="${i}" class = "button">${table[i].draw_odd}</a>
                        </div>
                        <div class="delete">🗑️</div>
                    </div> 
                    <div class = "info"> 
                    <a  data-index="${i}">${table[i].hometeam}</a> 
                    <a>-</a> 
                    <a  data-index="${i}">${table[i].awayteam}</a>
                    </div>
                </div>`  
            cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].draw_odd).toFixed(2)}`
            } else if (event.target.classList.contains('away')) {
                panierMatchs.innerHTML += 
                    `<div class="panier-bet">
                        <div class = "choix"> 
                            <div data-index="${i} class="choisi">
                                <a  data-index="${i}">${table[i].awayteam}</a>
                                <a  data-index="${i}" class = "button">${table[i].away_odd}</a>
                            </div>
                            <div class="delete">🗑️</div>
                        </div> 
                        <div class = "info"> 
                        <a  data-index="${i}">${table[i].hometeam} </a> 
                        <a> - </a> 
                        <a  data-index="${i}"> ${table[i].awayteam}</a>
                        </div> 
                    </div>`  
                cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].away_odd).toFixed(2)}`
            }
            numberOfBets()
            removePanier()
    });  
             
})

    .catch(err => console.error(err)); 

    // *******🔥 Fin de fetch 🔥******* 

    
 //   *******🔥 Events / Appels  de fonctions en dehors du fetch 🔥*******

// On appelle la fonction pour cacher le panier au chargement de la page

 removePanier()

// Event visant a toggle active/na les cotes dans le betsTable, via un foreach on veille à ce que le toggle ne se fasse que ligne par ligne

    betsTable.addEventListener('click', (event) => {
        // Check if the clicked element is a button within a section
        if (event.target.classList.contains('button') && event.target.closest('.bet')) {
            let sectionContainer = event.target.closest('.bet');
            // Toggle the 'active' class on the clicked button
            event.target.classList.toggle('active');
            
            // Remove the 'active' class from other buttons within the same section
            let buttons = sectionContainer.querySelectorAll('.button');
            buttons.forEach(button => {
                if (button !== event.target && button.classList.contains('active')) {
                    button.classList.remove('active');
                }
            });
        }
    });

// Event ciblant l'icone delete du panier, supprime la div correspondante et déduis également la cote totale du panier.

panierMatchs.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        let coteOfRemovedItem= e.target.previousElementSibling.querySelector('.button')
        cote.innerHTML = `${(parseFloat(cote.innerHTML)/parseFloat(coteOfRemovedItem.innerHTML)).toFixed(2)}`
        e.target.parentElement.parentElement.remove()
    }
        numberOfBets()
        removePanier()
})

// Event de click visant à estimer les gains en fonction de la cote et de la somme donnée par l'utilisateur

    btnEstimate.addEventListener('click', ()=> {
        gain.innerHTML = (parseFloat(argent.value) * parseFloat(cote.innerHTML)).toFixed(2)
        argent.value =""
    })

//   Event visant à charger une nouvelle bg image a chaque chargement via la generation d'un nombre aléatoire entre 1 et 3
        
    window.addEventListener("load", () => {
        let randomNumber = Math.floor(Math.random()*(3-1+1)+1)
        let bg = document.querySelector('.bg')
        bg.innerHTML = `<img src="./img/randombg/bg${randomNumber}.webp" alt=""></img>`
    });

//  Event visant à passer à toggle on / off le dark mode au clique sur l'icone du mode

    lightDark.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        if (document.querySelector('.bets-main').classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();  
        }
    });

// On vérifie si le darkMode est présent dans le localStorage et si oui on le lance au load

    if (localStorage.getItem('darkMode') === 'true') {
        enableDarkMode();
    } 
