import { useSetAtom } from 'jotai';
import { notificationCountAtom, asyncDataWriteAtom } from '@store/jotaiAtom';
import './ActionButton.scss';

function ActionButtonJotai() {
  const setNotificationCount = useSetAtom(notificationCountAtom);

  const fetchJotaiData = useSetAtom(asyncDataWriteAtom);

  const incrementNotifications = () => {
    // Jotai update requires reading the current value and setting the new value
    setNotificationCount((prev: number) => prev + 1);
  };

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Jotai):</h6>
      <button
        className="action-button__button"
        onClick={incrementNotifications}
      >
        Increment Notification
      </button>
      <button className="action-button__button" onClick={fetchJotaiData}>
        Fetch Async Data
      </button>
    </div>
  );
}

export default ActionButtonJotai;
