import { useZustandStore } from '@store/zustandStore';
import './ActionButton.scss';

function ActionButtonZustand() {
  const incrementNotifications = useZustandStore(
    (state) => state.incrementNotifications
  );
  const fetchData = useZustandStore((state) => state.fetchData);

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Zustand):</h6>
      <button
        className="action-button__button"
        onClick={incrementNotifications}
      >
        Increment Notification
      </button>
      <button className="action-button__button" onClick={fetchData}>
        Fetch Async Data
      </button>
    </div>
  );
}

export default ActionButtonZustand;
