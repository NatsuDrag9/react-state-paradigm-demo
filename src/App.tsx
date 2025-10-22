import {
  JotaiColumn,
  SignalColumn,
  ZustandColumn,
  ZustandWastefulColumn,
} from '@components';
import './App.scss';

function App() {
  return (
    <div className="app">
      {/* Zustand */}
      <ZustandColumn />
      {/* Zustand Wastefule */}
      <ZustandWastefulColumn />
      {/* Jotai */}
      <JotaiColumn />
      {/* Signal */}
      <SignalColumn />
    </div>
  );
}

export default App;
