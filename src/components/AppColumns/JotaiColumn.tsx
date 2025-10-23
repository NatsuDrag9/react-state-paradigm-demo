import ActionButtonJotai from '../ActionButtons/ActionButtonJotai';
import UserDisplayJotai from '../UserDisplays/UserDisplayJotai';
import { Provider } from 'jotai';
import './Column.scss';

function JotaiColumn() {
  return (
    <Provider>
      <div className="app-column">
        <h2 className="jotai">Jotai</h2>
        <UserDisplayJotai />
        <ActionButtonJotai showButtonOne showButtonTwo={false} />
      </div>
    </Provider>
  );
}

export default JotaiColumn;
