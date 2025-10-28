import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';
import { useMemo } from 'react';

// NOTE: This is the optimal way to use Zustand so not creating a separate Wasteful and Optimal component

function ExpensiveComputationZustandMemoized() {
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  // const expensiveResult = useZustandStore((state) =>
  //   state.expensiveComputedSelector(notificationCount)
  // );

  //NOTE: This ensures the logic only runs when 'notificationCount' changes, even if the component re-renders for other reasons
  const expensiveResult = useMemo(
    () => expensiveFilterLogic(notificationCount, true),
    [notificationCount]
  );

  const resultCount = expensiveResult.length;

  return (
    <div className="exp-computation">
      <h6 className="exp-computation__title">
        Expensive filter result count: <strong>{resultCount}</strong>
      </h6>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default ExpensiveComputationZustandMemoized;
