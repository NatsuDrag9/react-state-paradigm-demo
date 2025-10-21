import UserDisplaySignal from '../UserDisplays/UserDisplaySignal';
import RenderCounter from '../RenderCounter/RenderCounter';
import ActionButtonSignal from '../ActionButtons/ActionButtonSignal';
import './Column.scss';

function SignalColumn() {
  return (
    <div className="app-column">
      <h2 className="signal">Signal</h2>
      <RenderCounter storeKey="Signal">
        <UserDisplaySignal />
      </RenderCounter>
      <ActionButtonSignal />
    </div>
  );
}

export default SignalColumn;
