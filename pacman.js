let right = true; // which way pacman is looking

const pacArray = [
	['./PacMan1.png', './PacMan2.png'],
	['./PacMan3.png', './PacMan4.png'],
];
const pacMen = [];

function setToRandom(scale) {
	return {
		x: Math.random() * scale,
		y: Math.random() * scale,
	};
}

function makePac() {
	let velocity = setToRandom(20);
	let position = setToRandom(200);

	let game = document.getElementById('game');
	let newimg = document.createElement('img');
	newimg.style.position = 'absolute';
	newimg.src = './PacMan1.png';
	newimg.width = 100;

	newimg.style.top = setToRandom(10).y;
	newimg.style.left = setToRandom(200).x;

	game.appendChild(newimg);

	return {
		position,
		velocity,
		newimg,
		closed: Math.floor(Math.random() * 2),
	};
}

function update() {
	pacMen.forEach((item) => {
		checkCollisions(item);
		item.position.x += item.velocity.x;
		item.position.y += item.velocity.y;

		item.newimg.style.left = item.position.x;
		item.newimg.style.top = item.position.y;
		item.newimg.src = chooseImage(item);
		//pass velocity
	});
	setTimeout(update, 100);
}

function checkCollisions(item) {
	let maxWidth = window.innerWidth;
	let maxHeight = window.innerHeight;

	if (
		item.position.x + item.velocity.x + item.newimg.width > maxWidth ||
		item.position.x + item.velocity.x < 0
	) {
		item.velocity.x = -item.velocity.x;
		right = !right;
	}

	if (
		item.position.y + item.velocity.y + item.newimg.height > maxHeight ||
		item.position.y + item.velocity.y < 0
	) {
		item.velocity.y = -item.velocity.y;
	}
}

//all images switch when the any of the items hit the wall need to pass item as parameters
//

function chooseImage(item) {
	let active;
	if (item.velocity.x < 0) {
		active = pacArray[1];
	}
	if (item.velocity.x > 0) {
		active = pacArray[0];
	}
	item.closed = item.closed ? 0 : 1;
	return active[item.closed];
}

function makeOne() {
	pacMen.push(makePac());
}
