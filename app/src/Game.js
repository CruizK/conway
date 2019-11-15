import React from 'react';
import './Game.css';


function Game() {
  const canvas = React.useRef(null);
  let ctx = null;
  let grid = []

  for(let i = 0; i < 100; i++) {
    grid[i] = [];
    for(let j = 0; j < 100; j++) {
      grid[i][j] = 0;
    }
  }

  const drawGrid = () => {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if(grid[i][j] == 0) {
          ctx.beginPath();
          ctx.fillStyle = "#000"
          ctx.rect(i*32, j*32, 32, 32);
          ctx.stroke();
          ctx.fill();
        }
        if(grid[i][j] == 1) {
          ctx.beginPath();
          ctx.fillStyle = 'white';
          ctx.fillRect(i*32, j*32, 32, 32);
          ctx.stroke();
          ctx.fill();
        }
      }
    }
  }

  const flipTile = (x,y) => {
    grid[Math.floor(x/32)][Math.floor(y/32)] = !grid[Math.floor(x/32)][Math.floor(y/32)];
  }

  const handleCanvasClick = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    flipTile(x, y);
    drawGrid();
  }

  React.useEffect(() => {
    if(canvas.current) {
      ctx = canvas.current.getContext('2d');
      drawGrid();
    }
  }, [canvas])

  return (
    <div className="game">
      <canvas className="" width={641} height={481} ref={canvas} onClick={handleCanvasClick}>

      </canvas>
    </div>
  );
}

export default Game;
