let blackColor = `rgb(0,0,0)`
let whiteColor = `rgb(255,255,255)`

let checkerGrayColor = `rgb(128,128,128)`
let checkerRedColor = `rgb(168, 30, 30)`

let checkerYellowBg = `rgb(255, 240, 50)`
let checkerBlackBg = `rgb(0, 0, 0)`

let arrLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
let cellInMemory = null
let elementInMemory = null
let gameHistory = []//{userId, idFirstCell, idNextCell}
let users = [] //{ username, userId, checkerColor }
let userId = null

const genBoard = generateChekersBoard();

function curetnUser () {
   const user = users.find( (user) => {
      return user.userId === userId
   })
   return user
}

function generateChekersBoard() {

let arrLength = arrLetters.length;

let line = arrLetters.map( (values, index, arr) => {
   
   let board = arr.map((arrValue, arrIndex) => {
      let x = index+1
      let letter = values;
      let y = arrLength - arrIndex;
      let colorCell = null;
      let isExist = null;
      let colorCheker = null;
      let isDisable = true
     
      if(index%2){ 
          colorCell = arrIndex%2 ? whiteColor : blackColor;
          isDisable = arrIndex%2 ? false : isDisable
      }  
      else {
         colorCell = arrIndex%2 ? blackColor : whiteColor;
         isDisable = arrIndex%2 ? isDisable : false
      } 
      
      if( arrIndex+1 < 4 ){
         colorCheker = colorCell === blackColor ? checkerGrayColor : null;
         isExist = colorCell === blackColor;
      }
      if(arrIndex+1 > 5){
         colorCheker = colorCell === blackColor ? checkerRedColor : null;
         isExist = colorCell === blackColor; 
      }
      let cheker = {userId: null, colorCheker, isExist, isSelected: false, isKing: false}

      arrValue = {
         letter,
         x, 
         y, 
         id: `${letter}${y}`,
         colorCell,
         cheker,
         isDisable,
      }
      return arrValue;
   })
   
   values = board;
   return values;
})
return line;
}

function genletNumLine (chekenBoard, divType) {
   
   const line = document.createElement('div')
   
   chekenBoard.forEach((element, indexCb) => {
      
      const lineElement = document.createElement('div')
      line.appendChild(lineElement)
     
      if(divType === 'letter'){
         line.classList.add('letterLine')
         lineElement.classList.add('letters')
         element.forEach( (elementItem) => {
            lineElement.innerText = elementItem.letter
         })
      } 
      else { 
         lineElement.innerText = chekenBoard.length-indexCb
         line.classList.add('nmber')
         lineElement.classList.add('numberLine')
      }
   })
   return line
}

function checkingCorrectMove (startCell, nextCell) {
   
   const {x: nextChekerX, y: nextChekerY} = nextCell//координаты ячейки на которую кликнули
   const {cheker: { colorCheker }, x: startChekerX, y: startChekerY } = startCell//цевет шашки которой ходим

   
   
   if(colorCheker === checkerGrayColor) {
      if ( (startChekerY - nextChekerY) > 1 || (startChekerY - nextChekerY) < 0) return true
      if ( (startChekerX - nextChekerX) > 1 || (nextChekerX - startChekerX) > 1 ) return true
   }

   if(colorCheker === checkerRedColor) {
      console.log(startCell)
      if ( (nextChekerY - startChekerY) > 1 || (nextChekerY - startChekerY) < 0) return true
      if ( (startChekerX - nextChekerX) > 1 || (nextChekerX - startChekerX) > 1 ) return true
   }
}

function giveNewUserId (){
   let newId = curetnUser().userId
   let i = 0
   while (newId === userId){
      newId = users[i].userId
      i++
   }
   userId = newId
}

function cellClick(id) {
   
   const selectedElement = document.getElementById(id)
   const userLine = document.getElementsByClassName('curentUser')
   const divCheker = selectedElement.childNodes[0]
   const boardInArr = genBoard.flat()
   const curentUser = curetnUser()

   const selectedСell = boardInArr.find( (selectedElement) => {
      return selectedElement.id === id
   } )
   
   const selectCheker = () => {
      if(divCheker) {
         elementInMemory = document.getElementById(id)
         cellInMemory = boardInArr.find( (selectedElement) => {
            return selectedElement.id === id
         } )

         if(cellInMemory.cheker.userId !== curentUser.userId) {
            cellInMemory = null
            return
         } 

         cellInMemory.cheker.isSelected = true
         selectedElement.style.backgroundColor = checkerYellowBg
      } 
   }

   

   if(cellInMemory && divCheker) {
      elementInMemory.style.backgroundColor = blackColor
      selectCheker()
      selectedElement.style.backgroundColor = blackColor
          
      cellInMemory = null
      return     
   } 

   if(divCheker) {
      selectCheker()
   }   

   else if (selectedСell.isDisable && cellInMemory) {
      if(cellInMemory.cheker.isSelected && !divCheker) {   
         if (checkingCorrectMove (cellInMemory, selectedСell)) return
         
         selectedСell.cheker.colorCheker = cellInMemory.cheker.colorCheker
         
         const elUserHistory = document.getElementsByName('gameHistory')
         const checker = document.createElement('div')
         const childElementInMemory = elementInMemory.childNodes[0]

         checker.classList.add('cheker')
         checker.style.backgroundColor = selectedСell.cheker.colorCheker
         elementInMemory.style.backgroundColor = blackColor

         cellInMemory.cheker.isSelected = false
         selectedСell.cheker.userId = curentUser.userId
         cellInMemory.cheker.userId = null

         selectedElement.appendChild(checker)
         elementInMemory.removeChild(childElementInMemory)

         cellInMemory = null
        
         giveNewUserId()

         userLine[0].innerText = curetnUser().userName
         userLine[0].setAttribute('style', `color:${curetnUser().chekerColor}`)
         //elUserHistory[0].innerText = 
      

         history(curentUser.userId, curentUser.userName, elementInMemory.id, selectedElement.id)

         elUserHistory[0].innerText = `${curentUser.userName}: ${curentUserHistor(curentUser)}`
      }  
   } 
}

function renderBoard(chekenBoard) {

   let body = document.getElementById('chekersBody')
   let conteiner = document.createElement('div')
   let wrapper = document.createElement('div')
   let border = document.createElement('div')
   
   conteiner.classList.add('conteiner')
   wrapper.classList.add('wrapper')
   border.classList.add('border')

   
   body.appendChild(conteiner)
   conteiner.appendChild(genletNumLine(chekenBoard, 'letter'))
   conteiner.appendChild(wrapper)
   wrapper.appendChild(genletNumLine(chekenBoard))
   wrapper.appendChild(border)
   wrapper.appendChild(genletNumLine(chekenBoard))
   conteiner.appendChild(genletNumLine(chekenBoard, 'letter'))
   

   

   chekenBoard.forEach((item) => {

      const line = document.createElement('div')
      line.classList.add('borderLine')

      item.forEach((itemCell) => {

         const {colorCell, id, isDisable, cheker: {isExist, colorCheker}} = itemCell

         const cell = document.createElement('div') 

         cell.classList = 'itemCell'
         cell.style.backgroundColor = colorCell
         cell.onclick = () => cellClick(id)
         cell.setAttribute('id', id)
         
         

         line.appendChild(cell)

         if(isExist) {
            const chekerOnItem = document.createElement('div')
            chekerOnItem.style.background = colorCheker
            chekerOnItem.classList.add('cheker')
            cell.appendChild(chekerOnItem)
         } 

      })

      border.appendChild(line)
   })
}

function renderUser(){
   const user = curetnUser ()
   
   const elem = document.getElementById('chekersBody')
   const curentUser = document.createElement('div')
   curentUser.innerText = user.userName
   curentUser.style.color = user.checkerColor


   curentUser.classList.add('curentUser')
   elem.appendChild(curentUser)
}

addNewPlayers ('Artem')

function addNewPlayers (userName){
   
   let chekerColor = !!users.length ? checkerRedColor : checkerGrayColor

   userId = uuidv4()
   
   genBoard.forEach( (element) => {
      element.forEach( (el, index) => {
         if(users.length < 1) {
            if(index+1 < 4) el.cheker.userId = userId
         } else if(index+1 > 5) el.cheker.userId = userId
      } )
   })

   users.push( {userName, userId, chekerColor} )

   if(users.length < 2) { 
      addNewPlayers ('Sergey')
      
   } else {
      renderUser()
      renderBoard(genBoard)
      renderGameHistory()
   }
}

function history(userId, userName, idStartCell, idFinishCell){
   gameHistory.push( {userId, userName, idStartCell, idFinishCell} )
}

function renderGameHistory(){
   const element = document.getElementById('chekersBody')
   const elUserHistory = document.createElement('div')
   elUserHistory.classList.add('elUserHistory')
   elUserHistory.setAttribute('name', 'gameHistory' )

   element.appendChild(elUserHistory)
}

function curentUserHistor(curentUser){
   let text = ""
   gameHistory.forEach( (qwe) => {
      if (qwe.userId === curentUser.userId){
         text = text + '|' + qwe.idStartCell + '>>>' + qwe.idFinishCell + '|'
      }
   })
   return text
}
  





