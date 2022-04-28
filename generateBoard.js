


// function generateBoard() { 
//    let board = [];

//    for(i = 0; i < arrLetters.length; i++) {
      
//       let row = [];
//       let identI = !!((i+1)%2);

//       for(j = 0; j < arrLetters.length; j++) {
        
//         let x = arrLetters[j];
//         let y = j + 1;
//         let colorCell = null;

//          if(identI){
//             colorCell = y%2 ? blackColor : whiteColor;
//          }
//          else{
//             colorCell = y%2 ? whiteColor : blackColor;
//          }
//         row[j] = { 
//             x, 
//             y, 
//             title: `${x}${y}`,
//             colorCell,
//            cheker: {color: null, isExist: false, isSelected: false, isKing: false}
//       }
        
//       }
   
//       board[i] = row;

//    }
//    return board;
// }
// let genBoard = generateBoard();


function generateBoard() {

   let blackColor = `rgba(0,0,0,1)`
   let whiteColor = `rgba(255,255,255,1)`

   let checkerGrayColor = `rgba(56, 51, 51, 1)`
   let checkerRedColor = `rgba(168, 30, 30, 1)`

   let checkerYellowBg = `rgba(255, 240, 0, 1)`
   let checkerBlackBg = `rgba(0, 0, 0, 1)`

   let arrLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
   let arrLength = arrLetters.length;

let board = arrLetters.map( (values, index, arr) => {
   
   let line =   arr.map((arrValue, arrIndex) => {
      let x = arrValue;
      let y = index + 1;
      let colorCell = null;
      let isExist = null;
      let colorCheker = null;

      //(arrIndex%2 && x === 'A' || x === 'C' || x === 'E' || x === 'G') ? colorCell = blackColor : colorCell = whiteColor;
      
      if(y%2){ 
          colorCell = arrIndex%2 ? blackColor : whiteColor;
      }  
      else colorCell = arrIndex%2 ? whiteColor : blackColor;
      
      if( y < 4 ){
         isExist = colorCell === blackColor ? true : false;
         colorCheker = colorCell === blackColor ? checkerRedColor : null;
      }
      if(y > 5){
         isExist = colorCell === blackColor ? true : false;
         colorCheker = colorCell === blackColor ? checkerGrayColor : null;
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
   
   values = line;
   return values;
})
return board
}

let getBoard = generateBoard();

console.log(getBoard)