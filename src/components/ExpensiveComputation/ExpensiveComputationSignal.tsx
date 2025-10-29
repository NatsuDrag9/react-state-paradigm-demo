import RenderCounter from '@components/RenderCounter/RenderCounter';
import { useSignals } from '@preact/signals-react/runtime';
import { expensiveComputedSignal } from '@store/preactSignals';
import './ExpensiveComputation.scss';

function ExpensiveComputationSignal() {
  useSignals();
  const expensiveResult = expensiveComputedSignal.value;
  const resultCount = expensiveResult.length;

  return (
    <div className="exp-computation">
      <h6 className="exp-computation__title">
        Result count: <strong>{resultCount}</strong>
      </h6>
      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>
      <RenderCounter storeKey="Signal" />
    </div>
  );
}

export default ExpensiveComputationSignal;
