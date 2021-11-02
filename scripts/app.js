
// Assgining local variables
const results_pop = document.querySelector('[data-game-results]')
const results_popBox = document.getElementById('resultsMsg')
const replayBtn = document.getElementById('replayBtn')
const O_mark = 'o'
const X_mark = 'x'
let O_turn
//Assign Winning Combinations
const Wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [2,4,6],[0,4,8]
]
//Get Our game board var
const gameBoard = document.getElementById("gameboard");
// select all out boxs
const boxElements = document.querySelectorAll('[data-box]');
//Replay event Handle
replayBtn.addEventListener('click',()=>{
    Start()
})
//Start Game
Start()
//Handle our click events for each box
function Start(params) {
    O_turn = false
    boxElements.forEach(box =>{
        box.classList.remove(O_mark)
        box.classList.remove(X_mark)
        box.removeEventListener('click',handle)
        box.addEventListener('click',handle,{once:true})
    });
    Refesh()
    results_popBox.classList.remove('show')
}   
//Handling the click event
function handle(e){
    const box = e.target
    const currentPlayerlab = O_turn ?O_mark : X_mark
    MarkBox(box,currentPlayerlab)
    if(Analyze(currentPlayerlab)){
        ResultsPop_up(false)
    }else if(isDraw())
    {
        ResultsPop_up(true)
    }else
    {
        Swap()
        Refesh()
    }
   
}
function ResultsPop_up(detern){
    if(detern){
        results_pop.innerText ="Draw!!!"
    }else{
        var winlab =  O_turn ?"O":"X" 
        results_pop.innerText = winlab+" Wins!!!"
    }
    results_popBox.classList.add('show')
}
function MarkBox(box, currentPlayerlab){
    box.classList.add(currentPlayerlab)
}
function Swap(){
    O_turn = !O_turn
}
function Refesh(){
    gameBoard.classList.remove(O_mark)
    gameBoard.classList.remove(X_mark)
    if(O_turn){
        gameBoard.classList.add(O_mark)
    }else{
        gameBoard.classList.add(X_mark)
    }
}
function Analyze(currentPlayerlab){
    return Wins.some(combination =>{
        return combination.every(index =>{
            return boxElements[index].classList.contains(currentPlayerlab);
        })
    })
}
function isDraw(){
    return [...boxElements].every(index =>{
        return index.classList.contains(X_mark) ||
        index.classList.contains(O_mark)
    })
}