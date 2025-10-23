import { useZustandStore } from '@store/zustandStore';
import './DataFetchDisplay.scss';
import RenderCounter from '../RenderCounter/RenderCounter';

function DataFetchDisplayZustandOptimal() {
  const asyncData = useZustandStore((state) => state.asyncData);
  const isLoading = useZustandStore((state) => state.isLoading);

  return (
    <div className="data-fetch-display">
      {isLoading ? (
        <h6 className="data-fetch-display__title">Fetching Data...</h6>
      ) : (
        <h6 className="data-fetch-display__title">
          Title: <strong>{asyncData?.title ?? 'N/A'}</strong>
        </h6>
      )}
      <RenderCounter storeKey="Zustand" />
    </div>
  );
}

export default DataFetchDisplayZustandOptimal;
