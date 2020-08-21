const board = document.getElementsByClassName("board-container")
const playerTextContainer = document.getElementsByClassName("player-text-container")
const playerIndicatorText = document.getElementsByClassName("player-indicator-text")[0]
const playerMarkings = document.getElementsByClassName("player-mark")

document.addEventListener('DOMContentLoaded', () => {
    boardFunctionality()   
})

let playerOneName = "Player 1"
let playerTwoName = "Player 2"

playerIndicatorText.innerText = `${playerOneName}'s turn`

let isPlayerOne = true

let isBoardOn = true

const toggleBoard = (status) => isBoardOn = status

let scoreRecorder = {
    player1: [],
    player2: [],
}

const boardFunctionality = () => {
        return board[0].addEventListener('click', (event) => {
    
            let selectedColumn = event.target.classList[1]
            let selectedRow = event.target.classList[2]
            let selectedSlot = document.getElementsByClassName(`player-mark ${selectedColumn} ${selectedRow}`)
    
            if (isBoardOn === true) fillSlot(selectedSlot)
    
        })
    
}

let playerTurnIndicator = (playerName) => {
    playerIndicatorText.innerText = `${playerName}'s turn`
}

const fillSlot = (selectedSlot) => {
    console.log(isBoardOn)
     if (isEmptySlot(selectedSlot[0])){
        if (isPlayerOne){
            recordMark("player1")
            switchPlayer()
            playerTurnIndicator(playerTwoName)
            checkWinner("player1", playerOneName)
            selectedSlot[0].innerText = "X"
        }
        else{
            recordMark("player2")
            switchPlayer()
            playerTurnIndicator(playerOneName)
            checkWinner("player2", playerTwoName)
            return selectedSlot[0].innerText = "O"
        }
    }
}

const recordMark = (player) => {
    let selectedSlotNumber = (parseInt(event.target.classList[3]))
    for (let c in winnerCombos){
        if (winnerCombos[c].find((num) => num === selectedSlotNumber)){
            scoreRecorder[player].push(+c)
        }
    }
    scoreRecorder[`${player}`].sort()
}

const switchPlayer = () => {
    isPlayerOne ? isPlayerOne = false : isPlayerOne = true
}

const isEmptySlot = (selectedSlot) =>{
    return selectedSlot.innerText==="" ? true : false
}

const checkWinner = (player, name) => {
    let playerScore =  scoreRecorder[`${player}`]
    console.log(playerScore)
    let winnerFound = (playerScore, i) => {
            if (playerScore[i] === playerScore[i+1] &&
                playerScore[i+1] === playerScore[i+2] &&
                playerScore[i+2] === playerScore[i]){
                    return true
            } else false
        }
    for (let i = 0; i < playerScore.length - 2; i++){
        if (winnerFound(playerScore, i)){
            declareWinner(name)
        } else if (!winnerFound(playerScore, i) && (playerScore.length >= 13)){
            catsGame()
        } else if (scoreRecorder.player1.length>=12 && scoreRecorder.player2.length>=12){
            catsGame()
        }
    }

}
const catsGame = () => {
    toggleBoard(false)
    playerIndicatorText.innerHTML = `Cat's game! ${playAgainClicker}`
}

const declareWinner = (name) => {
    toggleBoard(false)
    return playerIndicatorText.innerHTML = `${name} wins! ${playAgainClicker}`
}

const playAgainClicker = `<h3 class="play-again" onClick=newGame()>play again?</h3>`

const newGame = () => {
    clearBoard()   
    toggleBoard(true)
    isPlayerOne = true
    playerIndicatorText.innerText = `${playerOneName}'s turn` 

}
const clearBoard = () => {
    for (let i of playerMarkings){
        i.innerText=""
    }
    scoreRecorder.player1 = []
    scoreRecorder.player2 = []
}

const winnerCombos = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [1, 4, 7],
    5: [2, 5, 8],
    6: [3, 6, 9],
    7: [1, 5, 9],
    8: [3, 5, 7],
}
