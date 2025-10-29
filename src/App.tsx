import {
  ActionButtonJotai,
  ActionButtonSignal,
  ExpensiveComputationJotai,
  ExpensiveComputationSignal,
  JotaiColumn,
  SignalColumn,
  ZustandColumn,
  ZustandWastefulColumn,
} from '@components';
import './App.scss';
import ZustandRow from '@components/AppLayout/ZustandRow';

function App() {
  return (
    <div className="app">
      <h2 className="app__title">
        Performance Testing of State Management Paradigms
      </h2>
      <div className="app__section">
        <h4 className="app__sub-title">
          Re-Render Granularity and Async Data Fetch
        </h4>
        <div className="app__column-container">
          {/* Zustand */}
          <ZustandColumn />
          {/* Zustand Wasteful */}
          <ZustandWastefulColumn />
          {/* Jotai */}
          <JotaiColumn />
          {/* Signal */}
          <SignalColumn />
        </div>
      </div>

      <div className="app__section">
        <h4 className="app__sub-title">Zustand Efficiency:</h4>
        <ZustandRow />
      </div>

      <div className="app__section with-border">
        <h4 className="app__sub-title">Jotai Efficiency: </h4>
        <ExpensiveComputationJotai />
        <ActionButtonJotai showButtonOne showButtonTwo={false} />
      </div>

      <div className="app__section with-border">
        <h4 className="app__sub-title">Signal Efficiency: </h4>
        <ExpensiveComputationSignal />
        <ActionButtonSignal showButtonOne showButtonTwo={false} />
      </div>
    </div>
  );
}

export default App;
