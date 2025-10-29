import {
  ExpComZustandOptimal,
  ExpComZustandPartialWithMemo,
  ExpComZustandPartialWithoutMemo,
  ExpComZustandWorst,
} from '@components';
import './Layout.scss';

function ZustandRow() {
  return (
    <div className="app-row">
      <div className="app-row__element">
        <h6 className="sub-title">
          Efficiency: Partial Optimization without memo
        </h6>
        <ExpComZustandPartialWithoutMemo />
      </div>
      <div className="app-row__element">
        <h6 className="sub-title">Efficiency: Worst Case</h6>
        <ExpComZustandWorst />
      </div>
      <div className="app-row__element">
        <h6 className="sub-title">
          Efficiency: Partial Optimization with memo
        </h6>
        <ExpComZustandPartialWithMemo />
      </div>
      <div className="app-row__element">
        <h6 className="sub-title">Efficiency: Zustand Memoized</h6>
        <ExpComZustandOptimal />
      </div>
    </div>
  );
}

export default ZustandRow;
