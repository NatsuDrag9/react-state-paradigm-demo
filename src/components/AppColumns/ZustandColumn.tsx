import ActionButtonZustand from '../ActionButtons/ActionButtonZustand';
import UserDisplayZustand from '../UserDisplays/UserDisplayZustandOptimal';
import './Column.scss';

function ZustandColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand</h2>
      <UserDisplayZustand />
      <ActionButtonZustand showButtonOne showButtonTwo={false} />
    </div>
  );
}

export default ZustandColumn;
