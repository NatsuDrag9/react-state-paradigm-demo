import { sigNotificationCount, sigUsername } from '@store/preactSignals';
import './UserDisplay.scss';

function UserDisplaySignal() {
  return (
    <div className="user-display">
      <p>
        Username: <strong>{sigUsername.value}</strong>
      </p>
      <p>
        Notifications (VDOM Bypass Test):
        <strong>{sigNotificationCount.value}</strong>
      </p>
    </div>
  );
}

export default UserDisplaySignal;
