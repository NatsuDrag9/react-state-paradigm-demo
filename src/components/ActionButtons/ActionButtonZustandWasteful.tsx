import { useZustandStore } from '@store/zustandStore';
import './ActionButton.scss';
import { ActionButtonProps } from './types';

function ActionButtonZustandWasteful({
  showButtonOne = true,
  showButtonTwo = false,
}: ActionButtonProps) {
  const changeUsername = useZustandStore((state) => state.changeUsername);
  const fetchData = useZustandStore((state) => state.fetchData);

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Zustand):</h6>
      {showButtonOne && (
        <button className="action-button__button" onClick={changeUsername}>
          Change Username
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

export default ActionButtonZustandWasteful;
