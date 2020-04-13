import React from 'react';
import { Button } from 'reakit';
import { World, nextState, toggleAlive, createWorld } from './game';

const Cell: React.FunctionComponent<{
  alive: boolean;
  size: number;
  x: number;
  y: number;
  setWorld: React.Dispatch<React.SetStateAction<World<boolean>>>;
}> = ({ alive, size, x, y, setWorld }) => (
  <Button
    as="div"
    style={{
      background: alive ? 'black' : 'white',
      width: size,
      height: size,
      border: '1px solid lightgrey',
    }}
    onClick={() => setWorld(world => toggleAlive({ x, y }, world))}
  />
);

const MemoCell = React.memo(Cell);

const WorldComponent: React.FunctionComponent<{
  world: World<boolean>;
  setWorld: React.Dispatch<React.SetStateAction<World<boolean>>>;
}> = ({ world, setWorld }) => {
  return (
    <>
      {world.map((row, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {row.map((cell, x) => (
            <MemoCell
              key={x}
              x={x}
              y={y}
              alive={cell}
              size={10}
              setWorld={setWorld}
            />
          ))}
        </div>
      ))}
    </>
  );
};

const initialWorld = createWorld(50);

function App() {
  const [world, setWorld] = React.useState(initialWorld);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    let interval: number;
    if (started) {
      interval = window.setInterval(() => {
        setWorld(nextState);
      }, 50);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [started]);

  return (
    <div className="App">
      <WorldComponent world={world} setWorld={setWorld} />
      <Button onClick={() => setWorld(initialWorld)}>Reset</Button>
      <Button onClick={() => setWorld(nextState)}>Next</Button>
      <Button onClick={() => setStarted((s) => !s)}>
        {started ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}

export default App;
