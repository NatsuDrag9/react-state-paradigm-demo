import { useSetAtom } from 'jotai';
import { notificationCountAtom, asyncDataWriteAtom } from '@store/jotaiAtom';
import './ActionButton.scss';
import { logInDev } from '@utils/logUtils';
import { ActionButtonProps } from './types';

function ActionButtonJotai({
  showButtonOne = true,
  showButtonTwo = false,
}: ActionButtonProps) {
  const setNotificationCount = useSetAtom(notificationCountAtom);

  const fetchJotaiData = useSetAtom(asyncDataWriteAtom);

  const incrementNotifications = () => {
    // Jotai update requires reading the current value and setting the new value
    logInDev('JOTAI: incremented notifications');
    setNotificationCount((prev: number) => prev + 1);
  };

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Jotai):</h6>
      {showButtonOne && (
        <button
          className="action-button__button"
          onClick={incrementNotifications}
        >
          Increment Notification
        </button>
      )}
      {showButtonTwo && (
        <button className="action-button__button" onClick={fetchJotaiData}>
          Fetch Async Data
        </button>
      )}
    </div>
  );
}

export default ActionButtonJotai;
