import { logInDev } from '@utils/logUtils';
import RenderCounter from '../RenderCounter/RenderCounter';
import { useZustandStore } from '@store/zustandStore';

function UserDisplayZustandWasteful() {
  // NOTE: Subscribing to the entire object
  const appState = useZustandStore((state) => state.appState);
  logInDev('ZUSTAND WASTEFUL: Subscibes to appState: ', appState);

  return (
    <div className="user-display">
      {/* <p>
        Username: <strong>{appState.username}</strong>
      </p>
      <p>
        Notifications:
        <strong>{appState.notificationCount}</strong>
      </p> */}
      <p>
        Hi, I am wasteful which subscribes to the entire{' '}
        <strong>appState</strong> but shows no data
      </p>

      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default UserDisplayZustandWasteful;
