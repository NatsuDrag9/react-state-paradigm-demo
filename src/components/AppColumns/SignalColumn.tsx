import UserDisplaySignal from '../UserDisplays/UserDisplaySignal';
import ActionButtonSignal from '../ActionButtons/ActionButtonSignal';
import './Column.scss';

function SignalColumn() {
  return (
    <div className="app-column">
      <h2 className="signal">Signal</h2>
      <UserDisplaySignal />
      <ActionButtonSignal />
    </div>
  );
}

export default SignalColumn;
