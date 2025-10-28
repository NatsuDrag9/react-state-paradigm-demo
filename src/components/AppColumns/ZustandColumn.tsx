import DataFetchDisplayZustandOptimal from '../DataFetchDisplays/DataFetchDisplayZustandOptimal';
import ActionButtonZustand from '../ActionButtons/ActionButtonZustand';
import UserDisplayZustand from '../UserDisplays/UserDisplayZustandOptimal';
import './Column.scss';
import ExpensiveComputationZustandMemoized from '@components/ExpensiveComputation/ExpensiveComputationZustandMemoized';

function ZustandColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand</h2>

      <h6 className="sub-title">Re-Render</h6>
      <UserDisplayZustand />
      <ActionButtonZustand showButtonOne showButtonTwo={false} />

      <h6 className="sub-title">Async Data Fetch</h6>
      <DataFetchDisplayZustandOptimal />
      <ActionButtonZustand showButtonOne={false} showButtonTwo />

      <h6 className="sub-title">Efficiency: Zustand Memoized</h6>
      <ExpensiveComputationZustandMemoized />
    </div>
  );
}

export default ZustandColumn;
