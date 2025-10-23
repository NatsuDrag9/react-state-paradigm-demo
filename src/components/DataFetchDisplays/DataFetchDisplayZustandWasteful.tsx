import { useZustandStore } from '@store/zustandStore';
import './DataFetchDisplay.scss';

function DataFetchDisplayZustandWasteful() {
  const { asyncData, isLoading } = useZustandStore((state) => ({
    asyncData: state.asyncData,
    isLoading: state.isLoading,
  }));

  return (
    <div className="data-fetch-display">
      {isLoading ? (
        <h6 className="data-fetch-display__title">Fetching Data...</h6>
      ) : (
        <h6 className="data-fetch-display__title">
          Title: <strong>{asyncData?.title ?? 'N/A'}</strong>
        </h6>
      )}
    </div>
  );
}

export default DataFetchDisplayZustandWasteful;
