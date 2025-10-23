import { useZustandStore } from '@store/zustandStore';
import './ActionButton.scss';
import { ActionButtonProps } from './types';

function ActionButtonZustand({
  showButtonOne = true,
  showButtonTwo = false,
}: ActionButtonProps) {
  const incrementNotifications = useZustandStore(
    (state) => state.incrementNotifications
  );
  const fetchData = useZustandStore((state) => state.fetchData);

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Zustand):</h6>
      {showButtonOne && (
        <button
          className="action-button__button"
          onClick={incrementNotifications}
        >
          Increment Notification
        </button>
      )}
      {showButtonTwo && (
        <button className="action-button__button" onClick={fetchData}>
          Fetch Async Data
        </button>
      )}
    </div>
  );
}

export default ActionButtonZustand;
