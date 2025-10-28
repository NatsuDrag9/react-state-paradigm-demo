import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';
import { useMemo } from 'react';

/**
 * CASE 4: Precise Selector + useMemo (OPTIMAL)
 *
 * - Uses precise selector (only notificationCount)
 * - Uses useMemo
 *
 * Behavior:
 * - Username change: No re-render, No computation
 * - Notification change: Re-renders, Computes
 *
 * BEST: Zero waste - component only updates when data it displays changes.
 */

// NOTE: This is the optimal way to use Zustand so not creating a separate Wasteful and Optimal component

function ExpensiveComputationZustandOptimal() {
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  // const expensiveResult = useZustandStore((state) =>
  //   state.expensiveComputedSelector(notificationCount)
  // );

  //NOTE: This ensures the logic only runs when 'notificationCount' changes, even if the component re-renders for other reasons
  const expensiveResult = useMemo(
    () => expensiveFilterLogic(notificationCount, 'PS + Memo'),
    [notificationCount]
  );

  const resultCount = expensiveResult.length;

  return (
    <div className="exp-computation">
      <h6 className="exp-computation__title">
        Case 4: Precise Selector + useMemo
      </h6>
      <p className="exp-computation__note">
        Result count: <strong>{resultCount}</strong>
      </p>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <p className="exp-computation__note">
        <strong>BEST:</strong> No unnecessary re-renders or computations
      </p>
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default ExpensiveComputationZustandOptimal;
