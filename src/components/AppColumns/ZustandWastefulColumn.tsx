import UserDisplayZustandWasteful from '@components/UserDisplays/UserDisplayZustandWasteful';
import './Column.scss';
import ActionButtonZustandWasteful from '@components/ActionButtons/ActionButtonZustandWasteful';

function ZustandWastefulColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand Wasteful</h2>
      <UserDisplayZustandWasteful />
      <ActionButtonZustandWasteful showButtonOne showButtonTwo={false} />
    </div>
  );
}

export default ZustandWastefulColumn;
