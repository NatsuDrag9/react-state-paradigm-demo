import ActionButtonZustand from '../ActionButtons/ActionButtonZustand';
import RenderCounter from '../RenderCounter/RenderCounter';
import UserDisplayZustand from '../UserDisplays/UserDisplayZustand';
import './Column.scss';

function ZustandColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand</h2>
      <RenderCounter storeKey="Zustand">
        <UserDisplayZustand />
      </RenderCounter>
      <ActionButtonZustand />
    </div>
  );
}

export default ZustandColumn;
