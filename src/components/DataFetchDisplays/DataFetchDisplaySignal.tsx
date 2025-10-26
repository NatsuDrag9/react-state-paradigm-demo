import './DataFetchDisplay.scss';
import RenderCounter from '../RenderCounter/RenderCounter';
import { sigAsyncData, sigIsLoading } from '@store/preactSignals';
import { useSignals } from '@preact/signals-react/runtime';

function DataFetchDisplaySignal() {
  useSignals();

  const isLoading = sigIsLoading.value;
  const asyncData = sigAsyncData.value;

  const dataTitle = asyncData?.title ?? 'N/A';
  return (
    <div className="data-fetch-display">
      {isLoading ? (
        <h6 className="data-fetch-display__title">Fetching Data...</h6>
      ) : (
        <h6 className="data-fetch-display__title">
          Title: <strong>{dataTitle}</strong>
        </h6>
      )}
      <RenderCounter storeKey="Signal" />
    </div>
  );
}
export default DataFetchDisplaySignal;
