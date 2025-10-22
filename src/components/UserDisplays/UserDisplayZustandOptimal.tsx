import { logInDev } from '@utils/logUtils';
import RenderCounter from '../RenderCounter/RenderCounter';
import { useZustandStore } from '@store/zustandStore';

function UserDisplayZustandOptimal() {
  // const name = useZustandStore((state) => state.appState.username);
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  logInDev(
    'ZUSTAND OPTIMAL: Subscribes to changes in notificationCount',
    notificationCount
  );

  return (
    <div className="user-display">
      {/* <p>
        Username: <strong>{name}</strong>
      </p> */}
      <p>
        Hi, I am optimal as I only subscribe to changes in{' '}
        <strong>notificationCount</strong>
      </p>
      <p>
        Notifications:
        <strong>{notificationCount}</strong>
      </p>

      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default UserDisplayZustandOptimal;
