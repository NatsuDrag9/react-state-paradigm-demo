import { JotaiColumn, SignalColumn, ZustandColumn } from '@components';
import './App.scss';

function App() {
  return (
    <div className="app">
      {/* Zustand */}
      <ZustandColumn />
      {/* Jotai */}
      <JotaiColumn />
      {/* Signal */}
      <SignalColumn />
    </div>
  );
}

export default App;
