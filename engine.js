// !!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!! Движок игры !!!!!!!
// !!!!! Не изменять !!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!
(() => {
  const game = window.game;
  const _ = window._;
  const blockSize = 26;

  const defaults = {
    snake: [],
    feed: [],
  };
  const defaultBlock = {
    x: 0,
    y: 0,
    color: 'gray',
  };

  let data = {
    snake: [Object.assign({}, defaultBlock, { color: 'green' })],
    feed: [{ x: 5, y: 7 }, { x: 1, y: 10 }],
  };

  const DIRECTIONS = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
  };

  let key = DIRECTIONS.DOWN;

  setInterval(() => {
    const clonedData = _.cloneDeep(data);
    const data2 = game(clonedData.snake || [], clonedData.feed || [], key, { x: 25, y: 24 });
    clonedData.feed = data2.feed;
    data = _.defaults(clonedData, defaults);
      console.log(data2.snake);
      data.snake = data.snake.map(block => _.defaults(block, defaultBlock));
    data.feed = data.feed.map(block => _.defaults(block, defaultBlock));
    render([].concat(data.feed, data.snake));
  }, Math.max(1000 / Math.abs(gameSpeed), 100));

  function render(points) {
    document.getElementById("main").innerHTML = '';
    (points || []).map(point => {
      const div = document.createElement("div");
      div.style.position = 'absolute';
      div.style.width = blockSize + "px";
      div.style.height = blockSize + "px";
      div.style.left = (blockSize * point.x) + ( (point.x + 1)  ) + "px";
      div.style.top = (blockSize * point.y) + ( (point.y + 1)  ) + "px";
      div.style.background = point.color;

      document.getElementById("main").appendChild(div);
    })
  }

  document.addEventListener('keydown', (e) => {
    if ((e.keyCode === 38) || (e.keyCode === 87)) {
      key = DIRECTIONS.UP
    }
    if ((e.keyCode === 40) || (e.keyCode === 83)) {
      key = DIRECTIONS.DOWN
    }
    if ((e.keyCode === 37) || (e.keyCode === 65)) {
      key = DIRECTIONS.LEFT
    }
    if ((e.keyCode === 39) || (e.keyCode === 68)) {
      key = DIRECTIONS.RIGHT
    }
  });
})();