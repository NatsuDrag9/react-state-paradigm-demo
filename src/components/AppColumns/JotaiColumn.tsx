import ActionButtonJotai from '../ActionButtons/ActionButtonJotai';
import UserDisplayJotai from '../UserDisplays/UserDisplayJotai';
import { Provider } from 'jotai';
import './Column.scss';
import DataFetchDisplayJotai from '@components/DataFetchDisplays/DataFetchDisplayJotai';
import ExpensiveComputationJotai from '@components/ExpensiveComputation/ExpensiveComputationJotai';

function JotaiColumn() {
  return (
    <Provider>
      <div className="app-column">
        <h2 className="jotai">Jotai</h2>

        <h6 className="sub-title">Re-Render</h6>
        <UserDisplayJotai />
        <ActionButtonJotai showButtonOne showButtonTwo={false} />

        <h6 className="sub-title">Async Data Fetch</h6>
        <DataFetchDisplayJotai />
        <ActionButtonJotai showButtonOne={false} showButtonTwo />

        <h6 className="sub-title">Efficiency</h6>
        <ExpensiveComputationJotai />
      </div>
    </Provider>
  );
}

export default JotaiColumn;
