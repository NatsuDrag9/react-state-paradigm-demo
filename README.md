# State Management Paradigm Demonstrator

## Overview

This project provides a comprehensive, side-by-side comparison of three primary state management paradigms in React to reveal crucial differences in performance, granularity, and architecture.

## Getting Started

Install packages using:

```
yarn install
```

Run the program:

```
yarn dev
```

## Paradigms Compared

| Paradigm           | Model                      | State Structure               | Re-render Granularity                    | Key Feature                                     |
| ------------------ | -------------------------- | ----------------------------- | ---------------------------------------- | ----------------------------------------------- |
| **Zustand**        | Selector (Central)         | Single, Complex Object        | Low (Component-level on selector change) | Centralized, controlled actions/thunks          |
| **Jotai**          | Atomic (Signal Philosophy) | Decentralized Primitive Atoms | High (Component-level on atom change)    | Highly composable, integrated with Suspense     |
| **Preact Signals** | Pure Signal (DOM-Bypass)   | Mutable .value Primitives     | Extreme (Can update DOM nodes directly)  | Maximum performance, VDOM reconciliation bypass |

## What This Project Tests

This demonstrator evaluates three critical metrics:

1. **Granularity** - Component render waste and subscription precision
2. **Efficiency** - Computational memoization and optimization requirements
3. **Async Flow** - Architectural patterns for sequential state updates

### Performance Data json file

To generate a json file containing the performance data, paste the following code-snippet in your browser's console:

```javascript
// Get all your performance measures
const measures = performance.getEntriesByType('measure');
const marks = performance.getEntriesByType('mark');

// Format as JSON
const data = {
  measures: measures.map((m) => ({
    name: m.name,
    duration: m.duration,
    startTime: m.startTime,
  })),
  marks: marks.map((m) => ({
    name: m.name,
    startTime: m.startTime,
  })),
};

// Export to file
const blob = new Blob([JSON.stringify(data, null, 2)], {
  type: 'application/json',
});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'performance-data.json';
a.click();
```

## Project Structure

```
├── docs/ # docs and results
│   ├── CONCLUSIONS.md
│   ├── METHODOLOGY.md
│   ├── performance-data.json
│   ├── RESULTS.md
│   └── State Management Paradigm Demonstrator.pdf
├── public/
│   ├── data/
│   │   └── data.json
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ActionButtons/ # Action buttons to trigger state updates
│   │   │   ├── ActionButton.scss
│   │   │   ├── ActionButtonJotai.tsx
│   │   │   ├── ActionButtonSignal.tsx
│   │   │   ├── ActionButtonZustand.tsx
│   │   │   ├── ActionButtonZustandWasteful.tsx
│   │   │   └── types.ts
│   │   ├── AppLayout/ # Layout to neatly categorize test
│   │   │   ├── JotaiColumn.tsx
│   │   │   ├── Layout.scss
│   │   │   ├── SignalColumn.tsx
│   │   │   ├── ZustandColumn.tsx
│   │   │   ├── ZustandRow.tsx
│   │   │   └── ZustandWastefulColumn.tsx
│   │   ├── DataFetchDisplays/ # Async flow and data-fetch
│   │   │   ├── DataFetchDisplay.scss
│   │   │   ├── DataFetchDisplayJotai.tsx
│   │   │   ├── DataFetchDisplaySignal.tsx
│   │   │   ├── DataFetchDisplayZustandOptimal.tsx
│   │   │   └── DataFetchDisplayZustandWasteful.tsx
│   │   ├── ExpensiveComputation/ # For efficiency test
│   │   │   ├── ExpensiveComputation.scss
│   │   │   ├── ExpensiveComputationJotai.tsx
│   │   │   ├── ExpensiveComputationSignal.tsx
│   │   │   ├── ExpensiveComputationZustandBroadSelectorNoMemo.tsx
│   │   │   ├── ExpensiveComputationZustandBroadSelectorWithMemo.tsx
│   │   │   ├── ExpensiveComputationZustandOptimal.tsx
│   │   │   └── ExpensiveComputationZustandPreciseSelectorNoMemo.tsx
│   │   ├── RenderCounter/ # Counts the number of re-renders
│   │   │   ├── RenderCounter.scss
│   │   │   └── RenderCounter.tsx
│   │   ├── UserDisplays/ # For Re-renders and Granularity test
│   │   │   ├── UserDisplay.scss
│   │   │   ├── UserDisplayJotai.tsx
│   │   │   ├── UserDisplaySignal.tsx
│   │   │   ├── UserDisplayZustandOptimal.tsx
│   │   │   └── UserDisplayZustandWasteful.tsx
│   │   └── index.ts
│   ├── definitions/
│   │   └── store.ts # Interface and tyep definitions for the store
│   ├── store/
│   │   ├── jotaiAtom.ts
│   │   ├── preactSignals.ts
│   │   └── zustandStore.ts
│   ├── styles/
│   │   ├── _colors_dark.scss
│   │   ├── _index.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   ├── utils/ # Utilities for the application
│   │   ├── envUtils.ts
│   │   └── logUtils.ts
│   ├── App.scss
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── css-property-order.cjs
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── setup.info
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

```

## Documentation

- **[METHODOLOGY.md](./docs/METHODOLOGY.md)** - Detailed testing methodology and implementation
- **[RESULTS.md](./docs/RESULTS.md)** - Complete performance data and measurements
- **[CONCLUSIONS.md](./docs/CONCLUSIONS.md)** - Key findings and architectural insights

## Key Findings Summary

### Re-render Granularity

- **Zustand**: Requires manual selector optimization
- **Jotai**: Automatic atom-level granularity
- **Signals**: VDOM bypass enables extreme efficiency (1 render)

### Computational Efficiency

- **Zustand**: Component-level memoization (requires useMemo per component)
- **Jotai**: Architectural memoization (derived atoms compute once, shared everywhere)
- **Signals**: Architectural memoization (computed signals update once, shared everywhere)

### Optimization Burden

- **Zustand**: Requires TWO manual optimizations (precise selectors + useMemo)
- **Jotai**: Zero manual optimization required
- **Signals**: Zero manual optimization required

## Performance Impact

In real-world scenarios with expensive computations:

| Scenario              | Zustand (Unoptimized)             | Zustand (Optimized)            | Jotai                        | Signals                      |
| --------------------- | --------------------------------- | ------------------------------ | ---------------------------- | ---------------------------- |
| Wasteful computations | 33% waste rate                    | 0% waste                       | 0% waste                     | 0% waste                     |
| Developer effort      | Low initial, high maintenance     | High initial, high maintenance | Low initial, low maintenance | Low initial, low maintenance |
| Large app risk        | High (easy to miss optimizations) | Low (if disciplined)           | Low (automatic)              | Low (automatic)              |

## When to Use Each

### Choose Zustand When:

- You need a familiar Redux-like pattern
- Your team is experienced with manual optimization
- You have centralized business logic requirements - a global state used by the entire app
- Application complexity is manageable

### Choose Jotai When:

- You want automatic performance optimization
- You prefer composable, granular state atoms for complex components containing multiple children
- You need deep React Suspense integration
- You're building complex, data-heavy UIs

### Choose Preact Signals When:

- Maximum performance is critical (eg, notifications data, feed data, real-time tickers on stock market related charts)
- You want to minimize framework overhead
- VDOM bypass benefits are needed
- You're comfortable with imperative .value API

## Related Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Jotai Documentation](https://jotai.org/)
- [Preact Signals Documentation](https://preactjs.com/guide/v10/signals/)
