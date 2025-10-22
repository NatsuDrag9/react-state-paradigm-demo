import { useRef } from 'react';
import './RenderCounter.scss';
import { StoreKeys } from '@definitions/store';

export interface RenderCounterProps {
  storeKey: StoreKeys;
  // children: ReactNode;
}

function RenderCounter({ storeKey }: RenderCounterProps) {
  const countRef = useRef(0);
  countRef.current = countRef.current + 1; // Increments on every component function call

  return (
    <div className="render-counter">
      {/* {children} */}
      <div className="render-counter__count-container">
        <p className="render-counter__store">
          State Management Paradigm: <strong>{storeKey}</strong>
        </p>
        <p className="render-counter__count">
          Render Count:{' '}
          <strong className={storeKey.toLowerCase()}>{countRef.current}</strong>
        </p>
      </div>
    </div>
  );
}

export default RenderCounter;
