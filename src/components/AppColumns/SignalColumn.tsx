import UserDisplaySignal from '../UserDisplays/UserDisplaySignal';
import ActionButtonSignal from '../ActionButtons/ActionButtonSignal';
import './Column.scss';
import DataFetchDisplaySignal from '../DataFetchDisplays/DataFetchDisplaySignal';

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
    </div>
  );
}

export default SignalColumn;
