let squares = document.getElementById("squares");
let animation = document.getElementById("animation");
let clickHTML = document.getElementById("clicks").innerHTML;
let resultHTML = document.getElementById("result");
let treasure = Math.floor(Math.random() * 32) + 1;
let clicks = 3;

function clickSquare(index) {
	if (clicks > 0) {
		clicks -= 1;
		clickHTML.innerHTML = clicks;
		document.getElementById("square" + index).style.backgroundColor = "rgba(0, 0, 0, 0.4)";
		calculateRelative(index);
	}
}
function openChest(index) {
	// alert("You got gold!")
	let square = document.getElementById("chest" + index);
	square.style.pointerEvents = "none";
	square.classList.add("show");
	setTimeout(() => {
		showResult();
	}, 1000);
}

function calculateRelative(index) {
	let row = Math.ceil(index / 8);
	let treasureRow = Math.ceil(treasure / 8);
	let column = index - 8 * (row - 1);
	let treasureCol = treasure - 8 * (treasureRow - 1);
	console.log(row, column, treasureRow, treasureCol, treasure);
	let text = "";
	if (row < treasureRow) {
		text += "Xuống dưới tí nữa! ";
	}
	if (row > treasureRow) {
		text += "Hơi thấp quá đấy! ";
	}
	if (column < treasureCol) {
		text += "Qua phải một ít!";
	}
	if (column > treasureCol) {
		text += "Nó ở bên trái cơ!";
	}
	resultHTML.innerHTML = `<span class='warning'>${text}</span>`;
	if (row === treasureRow && column === treasureCol) {
		openChest(index);
		resultHTML.innerHTML = "Ồ!!";
	} else if (clicks === 0) {
		resultHTML.classList.add("lost");
		resultHTML.innerHTML = "Thua rồi!";
	}
}
function renderSquares() {
	let squareHTML = "";
	for (let i = 1; i < 33; i++) {
		if (i === treasure) {
			squareHTML += `<div class="square" id="square${i}" onclick="clickSquare(${i})"><span class="num">${i}</span><img src="images/chest.png" class="chest" width=80 id="chest${i}" /></div>`;
		} else {
			squareHTML += `<div class="square" id="square${i}" onclick="clickSquare(${i})"><span class="num">${i}</span></div>`;
		}
	}
	squares.innerHTML = squareHTML;
}
function showResult() {
	animation.style.display = "flex";
	animation.style.animation = "fadein 0.5s ease-in forwards";
	animation.innerHTML += `<div class="meme"><img src="images/pic1.png" class="fade1 meme" height=200 /></div>`;

	animation.innerHTML += `<div class="meme"><img src="images/pic2.png" class="fade2" height=200 /></div>`;

	animation.innerHTML += `<div class="meme"><img src="images/pic3.png" class="fade3 meme" height=200 /></div>`;

	animation.innerHTML += `<div class="meme"><img src="images/pic4.png" class="fade4 meme" height=200 /></div>`;
	setTimeout(() => {
		animation.onclick = reset;
	}, 8000);
}

function reset() {
	animation.style.display = "none";
	animation.innerHTML = "";
	animation.style.animation = "";
	animation.onclick = null;
	treasure = Math.floor(Math.random() * 32) + 1;
	clicks = 3;
	clickHTML.innerHTML = clicks;
	resultHTML.innerHTML = "Hehe, chọn chỗ để đào kho báu đi nào!";
	resultHTML.classList = "";
	renderSquares();
}

renderSquares();
