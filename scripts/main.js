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

const ifEmptyRemovePanier = ()=> {
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

// fonction qui ajuste la cote totale en divisant la cote la totale par la cote de l'élement supprimé. Cette fonction est à placer dans une fonction ou un élément est supprimé

const adjustCote = (coteOfRemovedItem)=> {
    cote.innerHTML = `${(parseFloat(cote.innerHTML)/parseFloat(coteOfRemovedItem.innerHTML)).toFixed(2)}`
}

// Fonction pour passer en DarkMode

const enableDarkMode = () => {
    document.querySelector('.bets-main').classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    lightDark.innerHTML = `<i class="fa-solid fa-moon" style="color: #ffffff;"></i>`
}

// Fonction pour désactiver le DarkMode

const disableDarkMode = () => {
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
            // Si on choisi l'équipe à domicile, on envoie ces infos dans le panier shop :
            panierMatchs.innerHTML += 
                `<div data-index="${i}" class="panier-bet">
                    <div class = "choix"> 
                        <div data-index="${i}" class="choisi">
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
            // on réinitialise les gains
            gain.innerHTML = "0"
            // On multiplie la cote existante par la cote relative à l'équipe à domicile
            cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].home_odd).toFixed(2)}`
            
        } else if (event.target.classList.contains('draw')) {
            // Si on choisi l'égalité, on envoie ces infos dans le panier shop :
             panierMatchs.innerHTML += 
                `<div data-index="${i}" class="panier-bet">
                    <div class = "choix"> 
                        <div data-index="${i}" class="choisi">
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
                // on réinitialise les gains
                gain.innerHTML = "0"  
                // On multiplie la cote existante par la cote relative à l'égalité
                cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].draw_odd).toFixed(2)}`
            } else if (event.target.classList.contains('away')) {
                // Si on choisi l'équipe extérieure, on envoie ces infos dans le panier shop :
                panierMatchs.innerHTML += 
                    `<div data-index="${i}" class="panier-bet">
                        <div class = "choix"> 
                            <div data-index="${i}" class="choisi">
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
                    // on réinitialise les gains
                    gain.innerHTML = "0"
                    // On multiplie la cote existante par la cote relative à l'équipe extérieure
                    cote.innerHTML = `${(parseFloat(cote.innerHTML)*table[i].away_odd).toFixed(2)}`
            }
            // On vérifie le nombre de paris présent et on update le nombre
            numberOfBets()
            // On vérifie s'il y a des élément dans le panier, s'il n'y en a pas on retire le panier
            ifEmptyRemovePanier()
    });  
             
})

    .catch(err => console.error(err)); 

    // *******🔥 Fin de fetch 🔥******* 

    
 //   *******🔥 Events / Appels  de fonctions en dehors du fetch 🔥*******

// On appelle la fonction pour cacher le panier au chargement de la page

    ifEmptyRemovePanier()

// Event visant a toggle active/na les cotes dans le betsTable, via un foreach on veille à ce que le toggle ne se fasse que ligne par ligne

    betsTable.addEventListener('click', (event) => {
        // On verifie que l'élement ai la classe button et qu'il soit proche de bet
        if (event.target.classList.contains('button') && event.target.closest('.bet')) {
            let sectionContainer = event.target.closest('.bet');
            // on active la classe active
            event.target.classList.toggle('active');
            
            // on retire la classe active des autres .button dans la même section
            let buttons = sectionContainer.querySelectorAll('.button');
            buttons.forEach(button => {
                if (button !== event.target && button.classList.contains('active')) {
                    button.classList.remove('active');
                }
                
            });
            // Si on clique sur un bouton avec classe actif :
            // On verifie qu'il n'y ai pas deux fois le même index de match afin d'éviter de pouvoir avoir plusieurs paris sur le même match
            if (event.target.classList.contains('active')) {
                let i = parseInt(event.target.getAttribute('data-index'));
                let panierBets = document.querySelectorAll('.panier-bet');
                panierBets.forEach(panierBet => {
                    if (parseInt(panierBet.getAttribute('data-index')) === i) {
                        panierBet.remove();
                        // on réinitialise les gains
                        gain.innerHTML = "0"
                // On retire la cote précédente afin d'avoir uniquement la dernière cote ajoutée
                        let coteOfRemovedItem = panierBet.querySelector('.button')
                        adjustCote(coteOfRemovedItem)

                    }
                });
            }
            // Si on clique sur un bouton sans classe actif :
            // On verifie qu'il n'y ai pas deux fois le même index de match afin d'éviter de pouvoir avoir plusieurs paris sur le même match
            if (!event.target.classList.contains('active')) {
                let i = parseInt(event.target.getAttribute('data-index'));
                let panierBets = document.querySelectorAll('.panier-bet');
                panierBets.forEach(panierBet => {
                    if (parseInt(panierBet.getAttribute('data-index')) === i) {
                        
                         panierBet.remove();
                         // on réinitialise les gains
                         gain.innerHTML = "0"
                // On retire la cote précédente afin d'avoir uniquement la dernière cote ajoutée
                        let coteOfRemovedItem = panierBet.querySelector('.button')
                        adjustCote(coteOfRemovedItem)
                    }
                });
            }
            
        }
    });
    
// Event ciblant l'icone delete du panier, supprime la div correspondante et déduis également la cote totale du panier.

panierMatchs.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        let coteOfRemovedItem= event.target.previousElementSibling.querySelector('.button')
        // On retire la cote précédente afin d'avoir uniquement la dernière cote ajoutée
        adjustCote(coteOfRemovedItem)
        // Quand on retire un élément du shop via la poubelle, on désactive le bouton correspondant dans la section betsTable
        let index = parseInt(event.target.parentElement.parentElement.getAttribute('data-index'))
        let buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            if (parseInt(button.getAttribute('data-index')) === index && button.classList.contains('active')) {
                button.classList.remove('active');
            }
        });
        // On retire l'élement
        event.target.parentElement.parentElement.remove()
        // on réinitialise les gains
        gain.innerHTML = "0"
      
        // if ()
    }
        // On vérifie le nombre de paris présent et on update le nombre
        numberOfBets()
        // On vérifie s'il y a des élément dans le panier, s'il n'y en a pas on retire le panier
        ifEmptyRemovePanier()
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
