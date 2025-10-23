import './DataFetchDisplay.scss';
import RenderCounter from '../RenderCounter/RenderCounter';
import { sigAsyncData, sigIsLoading } from '@store/preactSignals';

function DataFetchDisplaySignal() {
  return (
    <div className="data-fetch-display">
      {sigIsLoading.value ? (
        <h6 className="data-fetch-display__title">Fetching Data...</h6>
      ) : (
        <h6 className="data-fetch-display__title">
          Title: <strong>{sigAsyncData.value?.title ?? 'N/A'}</strong>
        </h6>
      )}
      <RenderCounter storeKey="Signal" />
    </div>
  );
}
export default DataFetchDisplaySignal;
