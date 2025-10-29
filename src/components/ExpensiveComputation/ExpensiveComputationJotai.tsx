import RenderCounter from '@components/RenderCounter/RenderCounter';
import { expensiveFilterAtom } from '@store/jotaiAtom';
import { useAtomValue } from 'jotai';
import './ExpensiveComputation.scss';

function ExpensiveComputationJotai() {
  const expensiveResult = useAtomValue(expensiveFilterAtom);

  const resultCount = expensiveResult.length;

  return (
    <div className="exp-computation">
      <h6 className="exp-computation__title">
        Result count: <strong>{resultCount}</strong>
      </h6>

      <p className="exp-computation__metric">
        * Check console for Performance Measure Time *
      </p>

      <RenderCounter storeKey="Jotai" />
    </div>
  );
}

export default ExpensiveComputationJotai;
