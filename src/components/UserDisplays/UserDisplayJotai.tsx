import { notificationCountAtom, userNameAtom } from '@store/jotaiAtom';
import { useAtomValue } from 'jotai';
import './UserDisplay.scss';
import RenderCounter from '../RenderCounter/RenderCounter';

function UserDisplayJotai() {
  const name = useAtomValue(userNameAtom);
  const notificationCount = useAtomValue(notificationCountAtom);
  return (
    <div className="user-display">
      <p>
        Username: <strong>{name}</strong>
      </p>
      <p>
        Notifications:
        <strong>{notificationCount}</strong>
      </p>
      <RenderCounter storeKey="Jotai" />
    </div>
  );
}

export default UserDisplayJotai;
