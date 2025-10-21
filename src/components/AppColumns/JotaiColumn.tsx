import ActionButtonJotai from '../ActionButtons/ActionButtonJotai';
import RenderCounter from '../RenderCounter/RenderCounter';
import UserDisplayJotai from '../UserDisplays/UserDisplayJotai';
import { Provider } from 'jotai';
import './Column.scss';

function JotaiColumn() {
  return (
    <Provider>
      <div className="app-column">
        <h2 className="jotai">Jotai</h2>
        <RenderCounter storeKey="Jotai">
          <UserDisplayJotai />
        </RenderCounter>
        <ActionButtonJotai />
      </div>
    </Provider>
  );
}

export default JotaiColumn;
