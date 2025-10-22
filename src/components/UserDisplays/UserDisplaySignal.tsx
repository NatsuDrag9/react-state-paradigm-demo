import { sigNotificationCount, sigUsername } from '@store/preactSignals';
import './UserDisplay.scss';
import RenderCounter from '../RenderCounter/RenderCounter';

function UserDisplaySignal() {
  return (
    <div className="user-display">
      <p>
        Username: <strong>{sigUsername}</strong>
      </p>
      <p>
        Notifications (VDOM Bypass Test):
        <strong>{sigNotificationCount}</strong>
      </p>
      <RenderCounter storeKey="Signal" />
    </div>
  );
}

export default UserDisplaySignal;
