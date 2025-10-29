import UserDisplayZustandWasteful from '@components/UserDisplays/UserDisplayZustandWasteful';
import './Layout.scss';
import ActionButtonZustandWasteful from '@components/ActionButtons/ActionButtonZustandWasteful';

function ZustandWastefulColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand Wasteful</h2>
      <h6 className="sub-title">Re-Render</h6>
      <UserDisplayZustandWasteful />
      <ActionButtonZustandWasteful showButtonOne showButtonTwo={false} />
    </div>
  );
}

export default ZustandWastefulColumn;
