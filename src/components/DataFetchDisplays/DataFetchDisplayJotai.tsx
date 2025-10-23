import { useAtomValue } from 'jotai';
import './DataFetchDisplay.scss';
import { asyncDataAtom, isLoadingAtom } from '@store/jotaiAtom';
import RenderCounter from '../RenderCounter/RenderCounter';

function DataFetchDisplayJotai() {
  const asyncData = useAtomValue(asyncDataAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  return (
    <div className="data-fetch-display">
      {isLoading ? (
        <h6 className="data-fetch-display__title">Fetching Data...</h6>
      ) : (
        <h6 className="data-fetch-display__title">
          Title: <strong>{asyncData?.title ?? 'N/A'}</strong>
        </h6>
      )}
      <RenderCounter storeKey="Jotai" />
    </div>
  );
}
export default DataFetchDisplayJotai;
