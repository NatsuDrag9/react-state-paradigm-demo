import { sigNotificationCount, sigUsername } from '@store/preactSignals';
import './UserDisplay.scss';

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
    </div>
  );
}

export default UserDisplaySignal;
