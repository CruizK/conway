import React from 'react';
import './Game.css';

const WIDTH = 100;
const HEIGHT = 100;
const TILE_SIZE = 32;

function Game() {
  const canvas = React.useRef(null);
  let ctx = null;
  let grid = []

  for(let i = 0; i < WIDTH; i++) {
    grid[i] = [];
    for(let j = 0; j < HEIGHT; j++) {
      grid[i][j] = 0;
    }
  }

  const drawGrid = () => {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        drawTile(i, j, grid[i][j]);
      }
    }
  }

  const drawTile = (i, j, val) => {
    ctx.beginPath();
    ctx.fillStyle = val == 0 ? "#000" : "#FFF";
    ctx.rect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    ctx.fill();
  }

  const playTurn = () => {
    let changeQueue = [];
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        let sum = getAdjacents(i, j);

        // Reproduction Case
        if(grid[i][j] == 0 && sum == 3) {
          changeQueue.push({i,j, val: 1});
        }
        // Lives to next Generation
        else if(grid[i][j] == 1 && (sum == 3 || sum == 2)) {
          changeQueue.push({i,j, val:1});
        }
        // Underpopulation Case
        else if(grid[i][j] == 1 && sum < 2) {
          changeQueue.push({i,j, val:0});
        }
        // Overpopulation Case
        else if(grid[i][j] == 1 && sum > 3) {
          changeQueue.push({i,j, val:0});
        }
      }
    }

    for(let i = 0; i < changeQueue.length; i++) {
      let q = changeQueue[i];
      grid[q.i][q.j] = q.val;
      drawTile(q.i, q.j, q.val);
    }

  }

  const getAdjacents = (i,j) => {
    let sum = 0;
    if(i > 0 && j > 0) {
      
    }
    sum += getTile(i-1, j-1);
    sum += getTile(i-1, j);
    sum += getTile(i-1, j+1);
    sum += getTile(i, j-1);
    sum += getTile(i, j+1);
    sum += getTile(i+1, j-1);
    sum += getTile(i+1, j);
    sum += getTile(i+1, j+1);
    return sum;
  }

  const getTile = (x,y) => {
    if(x < 0 || y < 0) {
      return 0;
    }
    if(x >= WIDTH || y >= HEIGHT) {
      return 0;
    }
    return grid[x][y];
  }

  const flipTile = (x,y) => {
    grid[x][y] = !grid[x][y];
  }

  const handleCanvasClick = (e) => {
    let x = Math.floor(e.clientX/TILE_SIZE);
    let y = Math.floor(e.clientY/TILE_SIZE);;
    
    flipTile(x, y);
    drawTile(x, y, grid[x][y]);
  }

  React.useEffect(() => {
    if(canvas.current) {
      ctx = canvas.current.getContext('2d');
      console.log("RUNNING THAT SHOULD ONLY HAPPEN ONCE REEE");
      drawGrid();
    }
  }, [canvas])

  return (
    <div className="game">
      <div className="canvas-container">
        <canvas className="canvas" width={WIDTH*32+2} height={HEIGHT*32+2} ref={canvas} onClick={handleCanvasClick}>

        </canvas>
      </div>
      <button onClick={() => setInterval(playTurn, 1000)}>Play Turn</button>
    </div>
  );
}

export default Game;
