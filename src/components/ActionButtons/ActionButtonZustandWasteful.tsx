import { useZustandStore } from '@store/zustandStore';
import './ActionButton.scss';

function ActionButtonZustandWasteful() {
  const changeUsername = useZustandStore((state) => state.changeUsername);
  const fetchData = useZustandStore((state) => state.fetchData);

  return (
    <div className="action-button">
      <h6 className="action-button__title">Trigger Actions (Zustand):</h6>
      <button className="action-button__button" onClick={changeUsername}>
        Change Username
      </button>
      <button className="action-button__button" onClick={fetchData}>
        Fetch Async Data
      </button>
    </div>
  );
}

export default ActionButtonZustandWasteful;
