
// =============  GLOBAL SCOPE  ====================

document.addEventListener("DOMContentLoaded", function() {
  getMonsters()
  createMonsterHandler()
  incrementPage()
  decrementPage()
})

let pageNumber = 1

// ==============  API REQUESTS  ====================

// GET MOSTERS FROM API
function getMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then( response => response.json())
  .then( monsters => {
    // console.log(monsters)
    monsters.forEach((monster) => {
      appendMonsterToPage(monster)
    })
  })
}

function postNewMoster(monsterName, monsterAge, monsterDescription) {
  let data = {
    "name": monsterName,
    "age": monsterAge,
    "description": monsterDescription
  }
  debugger
  fetch('http://localhost:3000/monsters/', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(monster => {console.log(monster)})
  // .then(monster => {appendMonsterToPage(monster)})
}

// ================  FUNCTIONS  ========================

// APPEND MONSTER TO PAGE
function appendMonsterToPage(m) {
  let monsterContainer = getMonsterContainer()
  let newMonster = document.createElement('div')
  monsterContainer.appendChild(newMonster)

  let name = document.createElement('h2')
  let age = document.createElement('h4')
  let description = document.createElement('p')

  name.innerHTML = m.name
  age.innerHTML = m.age
  description.innerHTML = m.description

  newMonster.appendChild(name)
  newMonster.appendChild(age)
  newMonster.appendChild(description)
}



function createMonsterHandler() {
  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault()

    let name = document.querySelector("#input-name")
    let age = document.querySelector("#input-age")
    let description = document.querySelector("#input-description")
    postNewMoster(name.value, age.value, description.value)
  })
}

function decrementPage() {
  document.querySelector("#back").addEventListener("click", function(e) {
     if (pageNumber > 1) {pageNumber -= 1}
     clearMonsters()
     getMonsters()
  })
}

function incrementPage() {
  document.querySelector("#forward").addEventListener("click", function(e) {
    if (getMonsterContainer().children.length < 50) {
      let message = document.createElement("h3")
      message.innerHTML = "No More Monsters to Show"
      clearMonsters()
      getMonsterContainer().appendChild(message)
    } else {
      pageNumber += 1
      clearMonsters()
      getMonsters()
    }
  })
}

function clearMonsters() {
  document.querySelector("#create-monster").innerHTML = ""
}

function getMonsterContainer() {
  return document.querySelector("#create-monster")
}
