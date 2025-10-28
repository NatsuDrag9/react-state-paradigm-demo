import UserDisplayZustandWasteful from '@components/UserDisplays/UserDisplayZustandWasteful';
import './Column.scss';
import ActionButtonZustandWasteful from '@components/ActionButtons/ActionButtonZustandWasteful';
import { ExpensiveComputationZustandUnMemoized } from '@components';

function ZustandWastefulColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand Wasteful</h2>
      <h6 className="sub-title">Re-Render</h6>
      <UserDisplayZustandWasteful />
      <ActionButtonZustandWasteful showButtonOne showButtonTwo={false} />

      <h6 className="sub-title">Efficiency: Zustand Unmemoized</h6>
      <ExpensiveComputationZustandUnMemoized />
    </div>
  );
}

export default ZustandWastefulColumn;
