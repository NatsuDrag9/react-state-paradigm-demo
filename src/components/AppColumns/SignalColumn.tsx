import UserDisplaySignal from '../UserDisplays/UserDisplaySignal';
import ActionButtonSignal from '../ActionButtons/ActionButtonSignal';
import './Column.scss';
import DataFetchDisplaySignal from '../DataFetchDisplays/DataFetchDisplaySignal';
import ExpensiveComputationSignal from '@components/ExpensiveComputation/ExpensiveComputationSignal';

function SignalColumn() {
  return (
    <div className="app-column">
      <h2 className="signal">Signal</h2>

      <h6 className="sub-title">Re-Render</h6>
      <UserDisplaySignal />
      <ActionButtonSignal showButtonOne showButtonTwo={false} />

      <h6 className="sub-title">Async Data Fetch</h6>
      <DataFetchDisplaySignal />
      <ActionButtonSignal showButtonOne={false} showButtonTwo />

      <h6 className="sub-title">Efficiency</h6>
      <ExpensiveComputationSignal />
    </div>
  );
}

export default SignalColumn;
