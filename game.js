function checkLose(firstBlock, field) {
	if (firstBlock.x > field.x || firstBlock.y > field.y || firstBlock.x < 0 || firstBlock.y < 0){
		return true;
	}

	return false;
}

// Не изменять!!!
const DIRECTIONS = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

// Не изменять!!!
const COLOR = {
  GREEN: 'green',
  RED: 'red',
  CUSTOM: '#450098',
};


// Скорость игры
// Можешь сделать медленнее или быстрее
var gameSpeed = 3;


// snake -- массив тела змеи
// snake[index] -- блок тела змеи
// snake[index].x -- координата по горизонтали
// snake[index].y -- координата по вертикали
// snake[index].color -- цвет блока
//
// feed -- массив еды для змеи
// feed[index] -- блок одной еды
// feed[index].x -- координата по горизонтали
// feed[index].y -- координата по вертикали
// feed[index].color -- цвет блока
//
// direction -- направление по которому хочет двигаться пользователь
// Может быть:
// DIRECTIONS.UP - игрок нажал стрелочку вверх или w
// DIRECTIONS.DOWN - игрок нажал стрелочку вниз или s
// DIRECTIONS.RIGHT - игрок нажал стрелочку вправа или d
// DIRECTIONS.LEFT - игрок нажал стрелочку влево или a
//
// Функция game будет вызываться на каждый шаг игры
function game(snake, feed, direction, field) {

   var firstBlock = snake[0]; // Голова змеи

//                 ЗАДАНИК!!!
//  Нужно написать написать код, для того, чтобы
//             змея съела всю еду


  // Можешь посмотреть в консоли
  console.log('foodItem:', foodItem, 'firstBlock:', firstBlock);
  var i = 0;
  while( i < feed.length ){
  	var foodItem = feed[i];  // еда для змеи
	  if(foodItem !== undefined){
		  if(firstBlock.x === foodItem.x){
			  if(firstBlock.y === foodItem.y){
					foodItem.x = Math.round(Math.random() * 30 + 1);
					foodItem.y = Math.round(Math.random() * 30 + 1);

					
					//snake+= [1];
					var newBlock = {
						x: snake[0].x,
						y: snake[0].y,
						color: COLOR.RED,
					}
					snake.push(newBlock);
					

				}

		  }
	  }
	  i = i + 1;
  }
  var l = snake.length - 1;
 
  while(l > 0){
  	snake[l].x = snake[l - 1].x;
    snake[l].y = snake[l - 1].y;
    l--;
  }



  // Двигаем змею в зависимости от того, каке направление выбрал игрок
  if (direction === DIRECTIONS.UP) {
    firstBlock.y -= 1;
    
  }
  if (direction === DIRECTIONS.DOWN) {
    firstBlock.y += 1;
    
  }
  if (direction === DIRECTIONS.RIGHT) {
    firstBlock.x += 1;
     
  }
  if (direction === DIRECTIONS.LEFT) {
    firstBlock.x -= 1;
    
  }

  if (checkLose(firstBlock, field)) {
  	console.log('lose');
  	snake = [{x: 10, y: 10}];
  } 

  // Меняем цвет, если клеточка по горизонтали чётная
  if (firstBlock.x % 2 === 0) {
    firstBlock.color = COLOR.GREEN;
  } else {
    firstBlock.color = COLOR.CUSTOM;
  }


  // Возвращаем данные для игры
  return {
    snake: snake,
    feed: feed,
  }
}