const board = document.getElementById("game-board");
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
let cards = [...cardValues, ...cardValues];
cards.sort(() => 0.5 - Math.random());
let flippedCards = [];
let matchedCards = [];
function renderBoard() {
  board.innerHTML = "";
  cards.forEach((value, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;
    card.innerHTML = `<div class="card-inner">
    <div class="card-front"></div>
    <div class="card-back">${value}</div>
    </div>`;
    card.addEventListener("click", () => flipCard(index));
    board.appendChild(card);
  });
}
function flipCard(index) {
  const cardElement = board.querySelector(`.card[data-index='${index}']`);
  if (cardElement.classList.contains("flipped") || flippedCards.length === 2)
    return;
  cardElement.classList.add("flipped");
  flippedCards.push({ index, value: cards[index] });
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}
function checkForMatch() {
  const [first, second] = flippedCards;
  if (first.value === second.value) {
    matchedCards.push(first.index, second.index);
  } else {
    setTimeout(() => {
      board
        .querySelector(`.card[data-index='${first.index}']`)
        .classList.remove("flipped");
      board
        .querySelector(`.card[data-index='${second.index}']`)
        .classList.remove("flipped");
    }, 1000);
  }
  flippedCards = [];
}
renderBoard();
