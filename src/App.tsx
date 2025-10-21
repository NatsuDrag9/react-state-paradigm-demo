import {
  ActionButtonJotai,
  ActionButtonSignal,
  ActionButtonZustand,
  RenderCounter,
  UserDisplayJotai,
  UserDisplaySignal,
  UserDisplayZustand,
} from '@components';
import './App.scss';
import { Provider } from 'jotai';

function App() {
  return (
    <div className="app">
      {/* Zustand */}
      <div className="app__zustand">
        <h2 className="app__title zustand">Zustand</h2>
        <RenderCounter storeKey="Zustand">
          <UserDisplayZustand />
        </RenderCounter>
        <ActionButtonZustand />
      </div>
      {/* Jotai */}
      <Provider>
        <div className="app__jotai">
          <h2 className="app__title jotai">Jotai</h2>
          <RenderCounter storeKey="Jotai">
            <UserDisplayJotai />
          </RenderCounter>
          <ActionButtonJotai />
        </div>
      </Provider>
      {/* Signal */}
      <div className="app__signal">
        <h2 className="app__title signal">Signal</h2>
        <RenderCounter storeKey="Signal">
          <UserDisplaySignal />
        </RenderCounter>
        <ActionButtonSignal />
      </div>
    </div>
  );
}

export default App;
