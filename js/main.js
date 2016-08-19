jQuery(document).ready(function ($) {
	var point,
		snake,
		food,
		field,
		random,
		snakeMove;

	function Point(x, y) {
		this.x = x;
		this.y = y;
	}

	function Food() {
		this.x = random.getRandomPositionX();
		this.y = random.getRandomPositionY();
		this.color = 'red';
	}

	field = {
		table: $('#table-space'),
		rows: $('#table-space').find('tr'),
		height: $('#table-space').find('tr').length - 1,
		width: $($('#table-space').find('tr')[0]).find('td').length - 1
	}

	random = {
		getRandomPositionX: function () {
			return Math.round(Math.random() * field.width);
		},

		getRandomPositionY: function () {
			return Math.round(Math.random() * field.height);
		},

		getRandomColor: function () {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		},

		getRandomDirection: function () {
			var randomNum = Math.ceil(Math.random() * 4);
			switch (randomNum) {
			case 1:
				return 'left';
			case 2:
				return 'right';
			case 3:
				return 'top';
			case 4:
				return 'bottom';
			default:
				return 'left';
			}
		}
	}

	snake = {
		length: 10,
		direction: random.getRandomDirection(),
		points: [],
		head: new Point(random.getRandomPositionX(), random.getRandomPositionY()),
		eat: function () {
			snake.points.unshift(null);
			snake.points[0] = new Point(food.x, food.y, snake.head.color);
			delete food;
			food = new Food();
			this.foodOnSnakeWayCheck();
			food.drawPoint();
		},
		drawSnakeBody: function () {
			var length = this.length;
			var x = this.head.x;
			var y = this.head.y;
			var headColor = this.head.color;
			for (var i = 1, index = 0; i < this.length; i++) {
				switch (this.direction) {
				case 'left':
					x = this.head.x + i;
					break;
				case 'right':
					x = this.head.x - i;
					break;
				case 'top':
					y = this.head.y + i;
					break;
				case 'bottom':
					y = this.head.y - i;
					break;
				}
				this.points[index] = new Point(x, y, headColor);
				this.points[index++].drawPoint();
			}
		},
		foodOnSnakeWayCheck: function () {
			for (i = 0; i < snake.points.length; i++) {
				if (food.x == snake.points[i].x && food.y == snake.points[i].y) {
					delete food;
					food = new Food();
					this.foodOnSnakeWayCheck();
				}
			}
		},
		move: function () {
			this.points.unshift(null);
			this.points[0] = new Point(this.head.x, this.head.y, this.head.color);
			this.points[0].drawPoint();
			switch (this.direction) {
			case 'left':
				// if (snake.head.equals(food, -1)) {
				// 	snake.eat();
				// 	if (snake.head.x - 2 < 0) snake.head.x = field.width;
				// 	else snake.head.x -= 2;
				// 	break;
				// }
				// if (snake.head.x - 1 < 0) snake.head.x = field.width;
				// else snake.head.x--;
				// if (snake.points[snake.points.length - 1].x + 1 == food.x && snake.points[snake.points.length - 1].y == food.y) {
				// 	snake.points[snake.points.length] = new Point(food.x, food.y, snake.head.color);

				// 	snake.points[snake.points.length - 1].drawPoint();
				// 	delete food;
				// 	food = new Point();
				// 	food.chooseRandomPoint();
				// }
				this.headMoving(-1, 0);
				break;
			case 'right':
				// if (snake.head.equals(food, 1)) {
				// 	snake.eat();
				// 	if (snake.head.x + 2 > field.width) snake.head.x = 0;
				// 	else snake.head.x += 2;
				// 	break;
				// }
				// if (snake.head.x + 1 > field.width) snake.head.x = 0;
				// else snake.head.x++;
				this.headMoving(1, 0);
				break;
			case 'top':
				// if (snake.head.equals(food, 0, -1)) {
				// 	snake.eat();
				// 	if (snake.head.y - 2 < 0) snake.head.y = field.height;
				// 	else snake.head.y -= 2;
				// 	break;
				// }
				// if (snake.head.y - 1 < 0) snake.head.y = field.height;
				// else snake.head.y--;
				this.headMoving(0, -1);
				break;
			case 'bottom':
				// if (snake.head.equals(food, 0, 1)) {
				// 	snake.eat();
				// 	if (snake.head.y + 2 > field.height) snake.head.y = 0;
				// 	else snake.head.y += 2;
				// 	break;
				// }
				// if (snake.head.y + 1 > field.height) snake.head.y = 0;
				// else snake.head.y++;
				this.headMoving(0, 1);
				break;
			}
			for (i = 0; i < this.points.length; i++) {
				if (this.head.x == this.points[i].x && this.head.y == this.points[i].y) {
					clearInterval(snakeMove);
					alert('End! lenght=' + this.points.length);
					return;
				}
			}
			this.head.drawPoint();
			pop = this.points.pop();
			field.rows.eq(pop.y).find('td').eq(pop.x).css('background', 'transparent');
		},
		headMoving: function (xNext, yNext) {
			var head,
				size,
				next,
				n = 1;

			if (xNext != 0) {
				head = this.head.x;
				size = field.width;
				next = xNext;
			} else {
				head = this.head.y;
				size = field.height;
				next = yNext;
			}

			if (snake.head.equals(food, xNext, yNext)) {
				snake.eat();
				n *= 2;
			}

			if (head + next * n < 0) head = size;
			else if (head + next * n > size) head = 0;
			else head += next * n;

			if (xNext != 0) this.head.x = head;
			else this.head.y = head;
			return;
		}
	}

	Point.prototype.drawPoint = function () {
		field.rows.eq(this.y).find('td').eq(this.x).css('background', this.color);
	}

	Point.prototype.color = '#181';
	Point.prototype.equals = function (Obj, x, y) {
		if (x !== undefined) {

			var nextStepX = x;
		} else {
			nextStepX = 0;
		}
		if (y !== undefined) {

			var nextStepY = y;
		} else {
			nextStepY = 0;
		}
		return this.x + nextStepX === Obj.x && this.y + nextStepY === Obj.y;
	}

	$('body').keydown(function (event) {
		if (event.keyCode == 37) {
			snake.direction = 'left';
		} else if (event.keyCode == 38) {
			snake.direction = 'top';
		} else if (event.keyCode == 39) {
			snake.direction = 'right';
		} else if (event.keyCode == 40) {
			snake.direction = 'bottom';
		}
	});

	point = new Point();
	Food.prototype = point;
	food = new Food();
	food.drawPoint();
	snake.head.drawPoint();
	snake.drawSnakeBody();
	snakeMove = setInterval(function () {
		snake.move();
	}, 100);

});

