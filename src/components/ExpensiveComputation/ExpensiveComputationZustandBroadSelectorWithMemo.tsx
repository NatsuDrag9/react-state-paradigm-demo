import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';
import { useMemo } from 'react';

/**
 * CASE 3: Broad Selector + useMemo
 *
 * - Subscribes to entire appState
 * - Uses useMemo with precise dependency
 *
 * Behavior:
 * - Username change: Re-renders  Skips computation  * - Notification change: Re-renders  Computes  *
 * BETTER: Saves computation but still has unnecessary re-renders.
 */
function ExpensiveComputationZustandBroadSelectorWithMemo() {
  const appState = useZustandStore((state) => state.appState);

  // Only recomputes when notificationCount changes
  const expensiveResult = useMemo(
    () => expensiveFilterLogic(appState.notificationCount, 'BS + memo'),
    [appState.notificationCount]
  );

  return (
    <div className="exp-computation exp-computation--partial">
      <h6 className="exp-computation__title">
        Case 3: Broad Selector + useMemo
      </h6>
      <h6 className="exp-computation__title">
        Result count: <strong>{expensiveResult.length}</strong>
      </h6>
      <p className="exp-computation__note">
        <strong>Saves</strong> computation but still re-renders on username
        changes
      </p>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default ExpensiveComputationZustandBroadSelectorWithMemo;
