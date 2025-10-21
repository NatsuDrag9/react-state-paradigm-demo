import {
  incrementSignalNotifications,
  fetchSignalData,
} from '@store/preactSignals';
import './ActionButton.scss';

function ActionButtonSignal() {
  // Actions are imported directly and called

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Signal):</h6>
      <button
        className="action-button__button"
        onClick={incrementSignalNotifications}
      >
        Increment Notification
      </button>
      <button className="action-button__button" onClick={fetchSignalData}>
        Fetch Async Data
      </button>
    </div>
  );
}

export default ActionButtonSignal;
