import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterLogic, useZustandStore } from '@store/zustandStore';
import './ExpensiveComputation.scss';

function ExpensiveComputationZustandUnMemoized() {
  const notificationCount = useZustandStore(
    (state) => state.appState.notificationCount
  );

  // const expensiveResult = useZustandStore((state) =>
  //   state.expensiveComputedSelector(notificationCount)
  // );

  // NOTE: Runs everytime the component re-renders
  const expensiveResult = expensiveFilterLogic(notificationCount, false);

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

export default ExpensiveComputationZustandUnMemoized;
