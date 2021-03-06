let blackColor = `rgb(0,0,0)`;
let whiteColor = `rgb(255,255,255)`;

let checkerGrayColor = `rgb(128,128,128)`;
let checkerRedColor = `rgb(168, 30, 30)`;

let checkerYellowBg = `rgb(255, 240, 50)`;
let checkerBlackBg = `rgb(0, 0, 0)`;

let arrLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cellInMemory = null;
let elementInMemory = null;
let gameHistory = []; //{userId, idFirstCell, idNextCell}
let users = []; //{ username, userId, checkerColor }
let userId = null;
let brokenСheckers = []; //{brokenChecker}
let vragCells = [];

const genBoard = generateChekersBoard();

function curetnUser() {
  const user = users.find((user) => {
    return user.userId === userId;
  });
  return user;
}

function generateChekersBoard() {
  let arrLength = arrLetters.length;

  let line = arrLetters.map((values, index, arr) => {
    let board = arr.map((arrValue, arrIndex) => {
      let x = index + 1;
      let letter = values;
      let y = arrLength - arrIndex;
      let colorCell = null;
      let isExist = false;
      let colorCheker = null;
      let isDisable = true;

      if (index % 2) {
        colorCell = arrIndex % 2 ? whiteColor : blackColor;
        isDisable = arrIndex % 2 ? false : isDisable;
      } else {
        colorCell = arrIndex % 2 ? blackColor : whiteColor;
        isDisable = arrIndex % 2 ? isDisable : false;
      }

      if (arrIndex + 1 < 4) {
        colorCheker = colorCell === blackColor ? checkerGrayColor : null;
        isExist = colorCell === blackColor;
      }
      if (arrIndex + 1 > 5) {
        colorCheker = colorCell === blackColor ? checkerRedColor : null;
        isExist = colorCell === blackColor;
      }
      let cheker = {
        userId: null,
        colorCheker,
        isExist,
        isSelected: false,
        isKing: false,
      };

      arrValue = {
        letter,
        x,
        y,
        id: `${letter}${y}`,
        colorCell,
        cheker,
        isDisable,
      };
      return arrValue;
    });

    values = board;
    return values;
  });
  return line;
}

function genletNumLine(chekenBoard, divType) {
  const line = document.createElement("div");

  chekenBoard.forEach((element, indexCb) => {
    const lineElement = document.createElement("div");
    line.appendChild(lineElement);

    if (divType === "letter") {
      line.classList.add("letterLine");
      lineElement.classList.add("letters");
      element.forEach((elementItem) => {
        lineElement.innerText = elementItem.letter;
      });
    } else {
      lineElement.innerText = chekenBoard.length - indexCb;
      line.classList.add("nmber");
      lineElement.classList.add("numberLine");
    }
  });
  return line;
}

function attackCheker(startCell, nextCell, boardInArr) {
  const { x: startChekerX, y: startChekerY, id: startCellId } = startCell;
  const { x: nextChekerX, y: nextChekerY, id: nextCellId } = nextCell;
  const curentUser = curetnUser();

  const vragCellSearch = (indOne, indTwo) => {
    let vrag = boardInArr.find((item) => {
      if (curentUser.chekerColor === checkerRedColor) {
        if (
          nextChekerX === startChekerX + indTwo &&
          nextChekerY === startChekerY + indTwo
        ) {
          if (
            item.x === startChekerX + indOne &&
            item.y === startChekerY + indOne
          )
            return item;
        }
        if (
          nextChekerX === startChekerX - indTwo &&
          nextChekerY === startChekerY + indTwo
        ) {
          if (
            item.x === startChekerX - indOne &&
            item.y === startChekerY + indOne
          )
            return item;
        }
      }

      if (curentUser.chekerColor === checkerGrayColor) {
        if (
          nextChekerX === startChekerX - indTwo &&
          nextChekerY === startChekerY - indTwo
        ) {
          if (
            item.x === startChekerX - indOne &&
            item.y === startChekerY - indOne
          )
            return item;
        }
        if (
          nextChekerX === startChekerX + indTwo &&
          nextChekerY === startChekerY - indTwo
        ) {
          if (
            item.x === startChekerX + indOne &&
            item.y === startChekerY - indOne
          )
            return item;
        }
      }
    });

    if (vrag && vragCells.length < 2) {
      vragCells.push(vrag);
      if (
        (nextChekerX === startChekerX + 4 &&
          nextChekerY === startChekerY + 4) ||
        (nextChekerX === startChekerX - 4 && nextChekerY === startChekerY + 4)
      ) {
        vragCellSearch(1, 4);
      }
      if (
        (nextChekerX === startChekerX - 4 &&
          nextChekerY === startChekerY - 4) ||
        (nextChekerX === startChekerX + 4 && nextChekerY === startChekerY - 4)
      ) {
        vragCellSearch(1, 4);
      }
    }
  };

  vragCellSearch(1, 2);
  vragCellSearch(3, 4);

  if (vragCells.length) {
    let [vragCell, vragTwo] = vragCells;

    const brokenChec = (vrag) => {
      if (vrag.cheker.userId === userId || !vrag.cheker.isExist) return;

      const vragBroken = JSON.parse(JSON.stringify(vragCells));
      vragBroken.forEach(
        (item) => (item["numberBroken"] = gameHistory.length + 1)
      );
      vrag !== vragTwo && brokenСheckers.push(vragBroken);

      const nextElement = document.getElementById(nextCellId);
      const startElement = document.getElementById(startCellId);
      const vragElement = document.getElementById(vrag.id);
      const elUserHistory = document.getElementsByName("gameHistory");
      const historyText = elUserHistory[0].childNodes[0];
      const nextElementCheker = document.createElement("div");
      const startElementCheker = startElement.firstChild;
      const vragElementCheker = vragElement.firstChild;

      nextElementCheker.classList.add("cheker");
      nextElementCheker.style.backgroundColor = curentUser.chekerColor;
      startElement.style.backgroundColor = blackColor;

      if (startElementCheker) {
        startElement.removeChild(startElementCheker);
      }

      vragElement.removeChild(vragElementCheker);

      if (!nextElement.firstChild) {
        nextElement.appendChild(nextElementCheker);
      }

      nextCell.cheker.isSelected = true;
      startCell.cheker.isSelected = false;
      startCell.cheker.isExist = false;
      nextCell.cheker.isExist = true;
      vrag.cheker.isExist = false;
      vrag.cheker.colorCheker = null;
      nextCell.cheker.colorCheker = curentUser.chekerColor;

      nextCell.cheker.userId = userId;
      startCell.cheker.userId = null;
      vrag.cheker.userId = null;

      vrag !== vragTwo &&
        history(
          curentUser.userId,
          curentUser.userName,
          startCellId,
          nextCellId
        );

      historyText.innerText = `${curentUserHistor(curentUser)}`;

      if (vragTwo && vragCells.length) {
        brokenChec(vragTwo);
      }

      vrag = null;
      cellInMemory = null;
    };
    brokenChec(vragCell);
  }
}

function checkingCorrectMove(startCell, nextCell) {
  const { x: nextChekerX, y: nextChekerY } = nextCell;
  const {
    cheker: { colorCheker },
    x: startChekerX,
    y: startChekerY,
  } = startCell;

  if (colorCheker === checkerGrayColor) {
    if (startChekerY - nextChekerY > 1 || startChekerY - nextChekerY < 0)
      return true;
    if (startChekerX - nextChekerX > 1 || nextChekerX - startChekerX > 1)
      return true;
  }

  if (colorCheker === checkerRedColor) {
    if (nextChekerY - startChekerY > 1 || nextChekerY - startChekerY < 0)
      return true;
    if (startChekerX - nextChekerX > 1 || nextChekerX - startChekerX > 1)
      return true;
  }
}

function giveNewUserId() {
  let newId = curetnUser().userId;
  let i = 0;
  while (newId === userId) {
    newId = users[i].userId;
    i++;
  }
  userId = newId;
}

function cellClick(id) {
  const selectedElement = document.getElementById(id);
  const userLine = document.getElementsByClassName("curentUser");
  const divCheker = selectedElement.childNodes[0];
  const boardInArr = genBoard.flat();
  const curentUser = curetnUser();

  const selectedСell = boardInArr.find((selectedElement) => {
    return selectedElement.id === id;
  });

  const selectCheker = () => {
    if (divCheker) {
      elementInMemory = document.getElementById(id);
      cellInMemory = boardInArr.find((selectedElement) => {
        return selectedElement.id === id;
      });

      if (cellInMemory.cheker.userId !== curentUser.userId) {
        cellInMemory = null;
        return;
      }
      curentElemenId = cellInMemory.id;

      cellInMemory.cheker.isSelected = true;
      selectedElement.style.backgroundColor = checkerYellowBg;
    }
  };

  if (cellInMemory && divCheker) {
    elementInMemory.style.backgroundColor = blackColor;
    selectCheker();
    selectedElement.style.backgroundColor = blackColor;

    cellInMemory = null;
    return;
  }

  if (divCheker) {
    selectCheker();
  } else if (selectedСell.isDisable && cellInMemory) {
    if (cellInMemory.cheker.isSelected && !divCheker) {
      attackCheker(cellInMemory, selectedСell, boardInArr);

      if (cellInMemory) {
        if (checkingCorrectMove(cellInMemory, selectedСell)) return 0;

        selectedСell.cheker.colorCheker = cellInMemory.cheker.colorCheker;

        const elUserHistory = document.getElementsByName("gameHistory");
        const historyText = elUserHistory[0].childNodes[0];
        const checker = document.createElement("div");
        const childElementInMemory = elementInMemory.childNodes[0];

        checker.classList.add("cheker");
        checker.style.backgroundColor = selectedСell.cheker.colorCheker;
        elementInMemory.style.backgroundColor = blackColor;

        cellInMemory.cheker.isSelected = false;
        cellInMemory.cheker.isExist = false;
        selectedСell.cheker.isExist = true;
        selectedСell.cheker.userId = curentUser.userId;
        cellInMemory.cheker.userId = null;

        selectedElement.appendChild(checker);
        elementInMemory.removeChild(childElementInMemory);

        cellInMemory = null;
        vragCells.length = 0 && vragCells.length;

        giveNewUserId();

        userLine[0].innerText = curetnUser().userName;
        userLine[0].setAttribute("style", `color:${curetnUser().chekerColor}`);

        history(
          curentUser.userId,
          curentUser.userName,
          elementInMemory.id,
          selectedElement.id
        );
        //Version 1 - elUserHistory[0].innerText = `${curentUser.userName}: ${curentUserHistor(curentUser)}`
        historyText.innerText = `${curentUserHistor(curentUser)}`;
      }
    }
  }
}

function renderBoard(chekenBoard) {
  let body = document.getElementById("chekersBody");
  let conteiner = document.createElement("div");
  let wrapper = document.createElement("div");
  let border = document.createElement("div");

  conteiner.classList.add("conteiner");
  wrapper.classList.add("wrapper");
  border.classList.add("border");

  body.appendChild(conteiner);
  conteiner.appendChild(genletNumLine(chekenBoard, "letter"));
  conteiner.appendChild(wrapper);
  wrapper.appendChild(genletNumLine(chekenBoard));
  wrapper.appendChild(border);
  wrapper.appendChild(genletNumLine(chekenBoard));
  conteiner.appendChild(genletNumLine(chekenBoard, "letter"));

  chekenBoard.forEach((item) => {
    const line = document.createElement("div");
    line.classList.add("borderLine");

    item.forEach((itemCell) => {
      const {
        colorCell,
        id,
        isDisable,
        cheker: { isExist, colorCheker },
      } = itemCell;

      const cell = document.createElement("div");

      cell.classList = "itemCell";
      cell.style.backgroundColor = colorCell;
      cell.onclick = () => cellClick(id);
      cell.setAttribute("id", id);

      line.appendChild(cell);

      if (isExist) {
        const chekerOnItem = document.createElement("div");
        chekerOnItem.style.background = colorCheker;
        chekerOnItem.classList.add("cheker");
        cell.appendChild(chekerOnItem);
      }
    });

    border.appendChild(line);
  });
}

function renderUser() {
  const user = curetnUser();

  const elem = document.getElementById("chekersBody");
  const curentUser = document.createElement("div");
  curentUser.innerText = user.userName;
  curentUser.style.color = user.checkerColor;

  curentUser.classList.add("curentUser");
  elem.appendChild(curentUser);
}

addNewPlayers("Artem");

function addNewPlayers(userName) {
  let chekerColor = !!users.length ? checkerRedColor : checkerGrayColor;

  userId = uuidv4();

  genBoard.forEach((element) => {
    element.forEach((el, index) => {
      if (users.length < 1) {
        if (index + 1 < 4) el.cheker.userId = userId;
      } else if (index + 1 > 5) el.cheker.userId = userId;
    });
  });

  users.push({ userName, userId, chekerColor });

  if (users.length < 2) {
    addNewPlayers("Sergey");
  } else {
    renderUser();
    renderBoard(genBoard);
    renderGameHistory();
  }
}

function history(userId, userName, idStartCell, idFinishCell) {
  gameHistory.push({ userId, userName, idStartCell, idFinishCell });
}

function renderGameHistory() {
  const element = document.getElementById("chekersBody");
  const elUserHistory = document.createElement("div");
  const historyText = document.createElement("div");

  elUserHistory.classList.add("elUserHistory");
  historyText.classList.add("historyText");

  elUserHistory.setAttribute("name", "gameHistory");
  elUserHistory.setAttribute("id", "gameHistory");
  historyText.setAttribute("name", "historyText");

  element.appendChild(elUserHistory);
  elUserHistory.appendChild(historyText);
  renderButton();
}

function curentUserHistor(curentUser) {
  //Version 1 -
  //let text = ""
  // let arr = gameHistory.filter( (item) => item.userId === curentUser.userId )
  // arr.map((item) => text =  text + '|' + item.idStartCell + '>>>' + item.idFinishCell + '|')

  let text = gameHistory.reduce((uccum, item) => {
    return (
      uccum +
      item.userName +
      ":" +
      "|" +
      item.idStartCell +
      ">>>" +
      item.idFinishCell +
      "| "
    );
  }, "");
  return text;
}

function renderButton() {
  const historyLine = document.getElementById("gameHistory");
  const button = document.createElement("button");

  button.classList.add("button");
  button.setAttribute("id", "btn");
  button.setAttribute("onclick", "cancelMove(genBoard)");
  button.innerText = "Отмена";

  historyLine.appendChild(button);
}

function cancelMove() {
  if (!gameHistory.length) return;
  let {
    idStartCell: idStart,
    idFinishCell: idFinish,
    userId: curentUserid,
  } = gameHistory.pop();
  const board = genBoard.flat();

  const startCellOption = board.find(({ id }) => id === idStart);
  const finishCellOption = board.find(({ id }) => id === idFinish);
  let startCell = document.getElementById(idStart);
  let finishCell = document.getElementById(idFinish);

  let historyText = document.getElementsByName("historyText");
  const userLine = document.getElementsByClassName("curentUser");

  userId = curentUserid;
  const checker = document.createElement("div");
  checker.classList.add("cheker");
  checker.style.backgroundColor = curetnUser().chekerColor;

  startCellOption.cheker.colorCheker = curetnUser().chekerColor;
  startCellOption.cheker.userId = curentUserid;
  finishCellOption.cheker.userId = null;
  finishCellOption.cheker.isExist = false;

  const [firstClildNod] = finishCell.childNodes;
  if (firstClildNod) {
    finishCell.removeChild(firstClildNod);
  }

  startCell.appendChild(checker);

  if (brokenСheckers.length > 0) {
    let [lastBrok, lastBrokTwo] = brokenСheckers[brokenСheckers.length - 1];
    console.log("lastBrokTwo", lastBrokTwo);

    const cancelBroken = (lastBroken) => {
      if (lastBroken && lastBroken.numberBroken === gameHistory.length + 1) {
        const lastBrokenCell = document.getElementById(lastBroken.id);
        const brokenCheker = document.createElement("div");
        brokenCheker.style.backgroundColor = lastBroken.cheker.colorCheker;
        brokenCheker.classList.add("cheker");

        lastBrokenOption = board.find(({ id }) => id === lastBroken.id);
        lastBrokenOption.cheker.isExist = true;
        lastBrokenOption.cheker.userId = lastBroken.cheker.userId;

        lastBrokenCell.appendChild(brokenCheker);
        brokenСheckers.pop();
      }
    };

    cancelBroken(lastBrok);

    if (lastBrokTwo) {
      cancelBroken(lastBrokTwo);
    }
  }
  userLine[0].innerText = curetnUser().userName;
  historyText[0].innerText = `${curentUserHistor()}`;
}
