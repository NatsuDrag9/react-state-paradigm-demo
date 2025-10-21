import { useZustandStore } from '@store/zustandStore';

function UserDisplayZustand() {
  const name = useZustandStore((state) => state.appState.username);
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  return (
    <div className="user-display">
      <p>
        Username: <strong>{name}</strong>
      </p>
      <p>
        Notifications:
        <strong>{notificationCount}</strong>
      </p>
    </div>
  );
}

export default UserDisplayZustand;
