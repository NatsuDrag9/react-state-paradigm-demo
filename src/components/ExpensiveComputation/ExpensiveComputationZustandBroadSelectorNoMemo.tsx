import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';

/**
 * CASE 2: Broad Selector + No useMemo
 *
 * - Subscribes to entire appState
 * - No useMemo
 *
 * Behavior:
 * - Username change: Re-renders  Computes unnecessarily  * - Notification change: Re-renders ✅, Computes ✅
 *
 * WORST CASE: Wastes both re-renders and computation on irrelevant changes.
 */
function ExpensiveComputationZustandBroadSelectorNoMemo() {
  const appState = useZustandStore((state) => state.appState);

  // Runs on every render, including when only username changes
  const expensiveResult = expensiveFilterLogic(
    appState.notificationCount,
    'BS + No-memo'
  );

  return (
    <div className="exp-computation exp-computation--worst">
      <h6 className="exp-computation__title">
        Case 2: Broad Selector + No useMemo
      </h6>
      <p className="exp-computation__note">
        Result count: <strong>{expensiveResult.length}</strong>
      </p>
      <p className="exp-computation__note">
        <strong>WORST:</strong> Re-renders AND re-computes on username changes
      </p>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default ExpensiveComputationZustandBroadSelectorNoMemo;
