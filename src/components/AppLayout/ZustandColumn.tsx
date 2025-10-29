import DataFetchDisplayZustandOptimal from '../DataFetchDisplays/DataFetchDisplayZustandOptimal';
import ActionButtonZustand from '../ActionButtons/ActionButtonZustand';
import UserDisplayZustand from '../UserDisplays/UserDisplayZustandOptimal';
import './Layout.scss';

function ZustandColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand</h2>

      <h6 className="sub-title">Re-Render Granularity</h6>
      <UserDisplayZustand />
      <ActionButtonZustand showButtonOne showButtonTwo={false} />

      <h6 className="sub-title">Async Data Fetch</h6>
      <DataFetchDisplayZustandOptimal />
      <ActionButtonZustand showButtonOne={false} showButtonTwo />
    </div>
  );
}

export default ZustandColumn;
