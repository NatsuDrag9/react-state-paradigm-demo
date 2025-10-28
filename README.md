## react-state-paradigm-demo

A State Management Paradigm Demonstrator: Compares the three primary approaches—Selector (Centralized), Atomic (Jotai/Recoil), and Pure Signal (Preact Signals)—to reveal crucial differences in performance, rendering granularity, and architecture.

### Getting Started

Install packages using

```
yarn install
```

Run the program:

```
yarn dev
```

### Performance Data json file

To generate a json file containing the performance data, run the following in the browser's console:

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
