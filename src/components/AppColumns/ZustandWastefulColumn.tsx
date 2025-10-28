import UserDisplayZustandWasteful from '@components/UserDisplays/UserDisplayZustandWasteful';
import './Column.scss';
import ActionButtonZustandWasteful from '@components/ActionButtons/ActionButtonZustandWasteful';
import {
  ExpComZustandPartialWithMemo,
  ExpComZustandPartialWithoutMemo,
  ExpComZustandWorst,
} from '@components';

function ZustandWastefulColumn() {
  return (
    <div className="app-column">
      <h2 className="zustand">Zustand Wasteful</h2>
      <h6 className="sub-title">Re-Render</h6>
      <UserDisplayZustandWasteful />
      <ActionButtonZustandWasteful showButtonOne showButtonTwo={false} />

      <h6 className="sub-title">
        Efficiency: Partial Optimization without memo
      </h6>
      <ExpComZustandPartialWithoutMemo />

      <h6 className="sub-title">Efficiency: Worst Case</h6>
      <ExpComZustandWorst />

      <h6 className="sub-title">Efficiency: Partial Optimization with memo</h6>
      <ExpComZustandPartialWithMemo />
    </div>
  );
}

export default ZustandWastefulColumn;
