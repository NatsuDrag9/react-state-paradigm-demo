import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';

/**
 * CASE 1: Precise Selector + No useMemo
 *
 * - Uses precise selector (only notificationCount)
 * - No useMemo - recomputes on EVERY render
 *
 * Behavior:
 * - Username change: No re-render, No computation
 * - Notification change: Re-renders, Computes
 * - Parent re-render: Re-renders, Computes unnecessarily
 *
 * This would waste computation if parent component re-renders for other reasons.
 */
function ExpensiveComputationZustandPreciseSelectorNoMemo() {
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  //  Runs on every render of this component
  const expensiveResult = expensiveFilterLogic(
    notificationCount,
    'Ps + No-memo'
  );

  return (
    <div className="exp-computation exp-computation--suboptimal">
      <h6 className="exp-computation__title">
        Case 1: Precise Selector + No useMemo
      </h6>
      <p className="exp-computation__note">
        Result count: <strong>{expensiveResult.length}</strong>
      </p>
      <p className="exp-computation__note">
        <strong>Good selector</strong>, but recomputes on every render
      </p>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default ExpensiveComputationZustandPreciseSelectorNoMemo;
