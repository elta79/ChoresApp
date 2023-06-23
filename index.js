import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://choresapp-13750-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

const choresListInDB = ref(database, "choresList")

const inputEl = document.getElementById("input-el")
const buttonEl = document.getElementById("button-el")
const listEl = document.getElementById("list-el")

buttonEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(choresListInDB, inputValue)
    clearInputField()
})

onValue(choresListInDB, function(snapshot){
    if (snapshot.exists()){
        let choresArray = Object.entries(snapshot.val())
        clearListEl()
        
    
        for (let i = 0; i<choresArray.length; i++){
            let currentChore = choresArray[i]
            appendChoreToListEl(currentChore)
    
        }
    } else {
        listEl.innerHTML = "No chores...yet"
    }
    
})
function clearListEl() {
    listEl.innerHTML = ""
}

function clearInputField(){
    inputEl.value=""
}

function appendChoreToListEl(chore){
    let choreID = chore[0]
    let choreValue = chore[1]

    let newEl = document.createElement("li")
    newEl.textContent = choreValue

    newEl.addEventListener("click", function(){
        let exactLocationOfChoreInDB = ref(database, `choresList/${choreID}`)
        remove(exactLocationOfChoreInDB)
    })

    listEl.append(newEl)
}