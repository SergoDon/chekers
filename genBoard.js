function generateChekersBoard() {

   let blackColor = `rgba(0,0,0,1)`
   let whiteColor = `rgba(255,255,255,1)`

   let checkerGrayColor = `rgba(190, 190, 190, 1)`
   let checkerRedColor = `rgba(168, 30, 30, 1)`

   let checkerYellowBg = `rgba(255, 240, 0, 1)`
   let checkerBlackBg = `rgba(0, 0, 0, 1)`

   let arrLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
   let arrLength = arrLetters.length;

let line = arrLetters.map( (values, index, arr) => {
   
   let board = arr.map((arrValue, arrIndex) => {
      let x = values;
      let y = arrLength - arrIndex;
      let colorCell = null;
      let isExist = null;
      let colorCheker = null;

      //(arrIndex%2 && x === 'A' || x === 'C' || x === 'E' || x === 'G') ? colorCell = blackColor : colorCell = whiteColor;
      
      if(index%2){ 
          colorCell = arrIndex%2 ? whiteColor : blackColor;
      }  
      else colorCell = arrIndex%2 ? blackColor : whiteColor;
      
      if( arrIndex+1 < 4 ){
         colorCheker = colorCell === blackColor ? checkerGrayColor : null;
         isExist = colorCell === blackColor;
      }
      if(arrIndex+1 > 5){
         colorCheker = colorCell === blackColor ? checkerRedColor : null;
         isExist = colorCell === blackColor; 
      }
      let cheker = {colorCheker, isExist, isSelected: false, isKing: false}

      arrValue = {
         x, 
         y, 
         title: `${x}${y}`,
         colorCell,
         cheker
      }
      return arrValue;
   })
   
   values = board;
   return values;
})
return line;
}

const genBoard = generateChekersBoard();
console.log(genBoard)


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
   

   function genletNumLine (chekenBoard, divType) {
      const line = document.createElement('div')
      
      chekenBoard.forEach((element, indexCb) => {
         
         const lineElement = document.createElement('div')
         line.appendChild(lineElement)
        
         if(divType === 'letter'){
            line.classList.add('letterLine')
            lineElement.classList.add('letters')
            element.forEach( (elementItem) => {
               lineElement.innerText = elementItem.x
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

   chekenBoard.forEach((item) => {
        
      const line = document.createElement('div')
      line.classList.add('borderLine')

      item.forEach((itemCell) => {

         const cell = document.createElement('div')      
         cell.classList = 'itemCell'
         cell.style.backgroundColor = itemCell.colorCell
        
         line.appendChild(cell)

         if(itemCell.cheker.isExist){
            const chekerOnItem = document.createElement('div')
            chekerOnItem.style.background = itemCell.cheker.colorCheker
            chekerOnItem.classList.add('cheker')
            cell.appendChild(chekerOnItem)
         } 

      })

      border.appendChild(line)
   })
}
renderBoard(genBoard);





