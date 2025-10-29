# Results

## Test Results Overview

This document presents the complete performance data collected from testing Zustand, Jotai, and Preact Signals across three key metrics: re-render granularity, computational efficiency, and async flow patterns.

## Metric 1: Re-render Granularity Results

### Test Scenario
- Initial render
- 5 notification increment clicks
- 3 username change clicks
- Components display notification count

### Raw Data

| Paradigm | Component Type | Final Render Count | Re-renders on Username Change | Re-renders on Notification Change |
|----------|---------------|-------------------|-------------------------------|----------------------------------|
| Zustand (Optimal Selector) | Subscribes to `notificationCount` only | 6 | 0 (Correct) | 5 (Necessary) |
| Zustand (Wasteful Selector) | Subscribes to entire `appState` object | 9 | 3 (Wasteful) | 5 (Necessary) |
| Jotai | Subscribes to `notificationCountAtom` | 6 | 0 (Correct) | 5 (Necessary) |
| Signals | Reads `sig_notificationCount.value` | 1 | 0 (VDOM Bypass) | 0 (VDOM Bypass) |

### Analysis

#### Zustand Optimal Selector
- **Total Renders:** 6
- **Breakdown:** 1 (initial) + 5 (notifications) + 0 (username)
- **Selector:** `state => state.appState.notificationCount`
- **Result:** Achieves optimal granularity through manual selector precision

#### Zustand Wasteful Selector
- **Total Renders:** 9
- **Breakdown:** 1 (initial) + 5 (notifications) + 3 (username changes)
- **Selector:** `state => state.appState`
- **Result:** 33% wasteful renders due to broad subscription
- **Console Evidence:**
  ```
  ZUSTAND: Changed username...
  ZUSTAND WASTEFUL: Subscribes to appState... (Component re-renders)
  ```

#### Jotai Atomic Subscription
- **Total Renders:** 6
- **Breakdown:** 1 (initial) + 5 (notifications) + 0 (username)
- **Subscription:** `useAtomValue(notificationCountAtom)`
- **Result:** Automatic granularity without manual optimization

#### Signals VDOM Bypass
- **Total Renders:** 1
- **Breakdown:** 1 (initial only)
- **Subscription:** Direct read of `sig_notificationCount.value`
- **Result:** Component function never re-runs; signal updates DOM directly

### Key Findings: Granularity

1. **Zustand requires developer discipline** - Optimal performance achieved only with precise selectors
2. **Jotai provides automatic granularity** - Atom-level subscriptions guarantee precision
3. **Signals maximize efficiency** - VDOM bypass eliminates unnecessary component re-renders
4. **Zustand's risk factor** - Easy to write wasteful selectors, leading to 33% or higher waste

## Metric 2: Computational Efficiency Results

### Test Scenario
- Initial render (count = 0)
- 3 notification increments
- 2 username changes (should NOT trigger computation)
- 1 final notification increment

**Expected Necessary Computations:** 4 (only when notification count changes)

### Raw Data: Filter Execution Counts

| Case | Count Changes | Username Changes | Total Executions | Wasteful Executions | Efficiency |
|------|---------------|------------------|------------------|---------------------|-----------|
| Zustand Case 1: PS + No useMemo | 4 | 0 | 4 | 0 | 100% |
| Zustand Case 2: BS + No useMemo | 4 | 2 | 6 | 2 | 67% |
| Zustand Case 3: BS + useMemo | 4 | 0 | 4 | 0 | 100% (but re-renders) |
| Zustand Case 4: PS + useMemo | 4 | 0 | 4 | 0 | 100% |
| Jotai (Derived Atom) | 4 | 0 | 4 | 0 | 100% |
| Signals (Computed Signal) | 4 | 0 | 4 | 0 | 100% |

Legend:
- **PS** = Precise Selector
- **BS** = Broad Selector

### Detailed Results by Case

#### Case 1: Zustand - Precise Selector + No useMemo

**Console Logs:**
```
Initial: "ZUSTAND (PS + No-memo): Expensive filter logic ran count: 0"
Count 1: "ZUSTAND (PS + No-memo): Expensive filter logic ran count: 1"
Count 2: "ZUSTAND (PS + No-memo): Expensive filter logic ran count: 2"
Username changes: NO LOGS
Count 3: "ZUSTAND (PS + No-memo): Expensive filter logic ran count: 3"
```

**Performance Measurements:**
```
Count 0: 2734ms (cumulative)
Count 1: 55132ms (cumulative)
Count 2: 58907ms (cumulative)
Count 3: 73672ms (cumulative)
```

**Result:** Good, but vulnerable to parent re-renders

---

#### Case 2: Zustand - Broad Selector + No useMemo (WORST CASE)

**Console Logs:**
```
Initial: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 0"
Count 1: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 1"
Count 2: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 2"
Username #1: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 2" [WASTEFUL]
Username #2: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 2" [WASTEFUL]
Count 3: "ZUSTAND (BS + No-memo): Expensive filter logic ran count: 3"
```

**Performance Measurements:**
```
Count 0: 2735ms (cumulative)
Count 1: 55133ms (cumulative)
Count 2: 58909ms (cumulative)
Username #1: 62186ms (cumulative) [+3277ms WASTED]
Username #2: 69692ms (cumulative) [+7506ms additional waste]
Count 3: 73674ms (cumulative)
```

**Result:** Worst case - 33% waste rate (2 out of 6 executions unnecessary)

---

#### Case 3: Zustand - Broad Selector + useMemo

**Console Logs:**
```
Initial: "ZUSTAND (BS + memo): Expensive filter logic ran count: 0"
Count 1: "ZUSTAND (BS + memo): Expensive filter logic ran count: 1"
Count 2: "ZUSTAND (BS + memo): Expensive filter logic ran count: 2"
Username changes: NO LOGS [useMemo prevents execution]
Count 3: "ZUSTAND (BS + memo): Expensive filter logic ran count: 3"
```

**Performance Measurements:**
```
Count 0: 2737ms (cumulative)
Count 1: 55135ms (cumulative)
Count 2: 58911ms (cumulative)
Count 3: 73675ms (cumulative)
```

**Result:** Better - useMemo prevents wasteful computation, but component still re-renders unnecessarily

---

#### Case 4: Zustand - Precise Selector + useMemo (OPTIMAL)

**Console Logs:**
```
Initial: "ZUSTAND (PS + Memo): Expensive filter logic ran count: 0"
Count 1: "ZUSTAND (PS + Memo): Expensive filter logic ran count: 1"
Count 2: "ZUSTAND (PS + Memo): Expensive filter logic ran count: 2"
Username changes: NO LOGS
Count 3: "ZUSTAND (PS + Memo): Expensive filter logic ran count: 3"
```

**Performance Measurements:**
```
Count 0: 2738ms (cumulative)
Count 1: 55136ms (cumulative)
Count 2: 58913ms (cumulative)
Count 3: 73676ms (cumulative)
```

**Result:** Best - Full optimization (both selector and computation optimized)

---

#### Case 5: Jotai - Automatic Optimization

**Console Logs:**
```
Initial: "JOTAI: Expensive Filter Logic Ran with Count: 0"
Count 1: "JOTAI: Expensive Filter Logic Ran with Count: 1"
Count 2: "JOTAI: Expensive Filter Logic Ran with Count: 2"
Username changes: NO LOGS [Automatic granularity]
Count 3: "JOTAI: Expensive Filter Logic Ran with Count: 3"
```

**Performance Measurements:**
```
Count 0: 2740ms (cumulative)
Count 1: 77668ms (cumulative)
Count 2: 81271ms (cumulative)
Count 3: 83326ms (cumulative)
```

**Result:** Optimal - Perfect 1:1 execution ratio with state changes, zero manual optimization

---

#### Case 6: Signals - Maximum Optimization

**Console Logs:**
```
Initial: "SIGNAL: Expensive filter logic ran count: 0"
Count 1: "SIGNAL: Expensive filter logic ran count: 1"
Count 2: "SIGNAL: Expensive filter logic ran count: 2"
Username changes: NO LOGS [Automatic granularity]
Count 3: "SIGNAL: Expensive filter logic ran count: 3"
```

**Performance Measurements:**
```
Count 0: 2742ms (cumulative)
Count 1: 86164ms (cumulative)
Count 2: 87271ms (cumulative)
Count 3: 88266ms (cumulative)
```

**Result:** Optimal - Perfect 1:1 execution ratio with VDOM bypass benefits

### Key Findings: Efficiency

1. **Zustand's Two-Fold Optimization Burden:**
   - Case 1 (PS + No memo): Good but vulnerable
   - Case 2 (BS + No memo): 33% waste - WORST
   - Case 3 (BS + memo): Saves computation but still re-renders
   - Case 4 (PS + memo): Fully optimized - requires BOTH optimizations

2. **Performance Impact of Poor Optimization:**
   - Case 2 executed 50% more computations than necessary (6 vs 4)
   - In this demo: ~3ms wasted per unnecessary computation
   - In real apps with 100ms computations × 10 components: seconds of CPU time wasted

3. **Architectural Memoization:**
   - **Jotai:** Derived atom computes once, all components share cached result
   - **Signals:** Computed signal updates once, all components read cached value
   - **Zustand:** Each component manages its own memoization (component-level, not architectural)

## Metric 3: Async Flow Results

### Test Scenario
- Click "Fetch Data" button
- Monitor component re-renders during async operation
- Track console logs for execution order

### Raw Data: Component Re-renders During Async Fetch

| Paradigm | Component | Re-renders per Fetch | Optimization Level |
|----------|-----------|---------------------|-------------------|
| Zustand | DataFetchDisplayZustandOptimal | 2 | Optimal (precise selectors) |
| Jotai | DataFetchDisplayJotai | 2 | Optimal (atomic subscriptions) |
| Signals | DataFetchDisplaySignal | 2 | Optimal (signal reads) |

### Console Logs: Execution Flow

#### Zustand
```
ZUSTAND: 1. Loading: true
[Component re-renders: isLoading = true]
[Wait 1000ms]
ZUSTAND: 2. Data Set, Loading: false
[Component re-renders: asyncData set, isLoading = false]
```

**Architecture:** Logic resides in centralized store actions

#### Jotai
```
JOTAI: 1. Loading: true
[Component re-renders: isLoadingAtom = true]
[Wait 1000ms]
JOTAI: 2. Data Set, Loading: false
[Component re-renders: asyncDataAtom set, isLoadingAtom = false]
```

**Architecture:** Logic resides in write-only atoms

#### Signals
```
SIGNAL: 1. Loading: true
[Component re-renders: sig_isLoading = true]
[Wait 1000ms]
SIGNAL: 2. Data Set, Loading: false
[Component re-renders: sig_asyncData set, sig_isLoading = false]
```

**Architecture:** Logic resides in exported functions

### Key Findings: Async Flow

1. **All three paradigms achieve optimal 2-render pattern** when properly implemented
2. **Architectural differences** in where async logic lives:
   - Zustand: Centralized in store
   - Jotai: Distributed in write-only atoms
   - Signals: External functions

3. **Scalability in large applications:**
   - **Signals/Jotai:** Each feature has isolated state (sigIsLoading, sigUserList, sigCartData)
   - **Zustand:** Risk of large monolithic store requiring careful selector management

## Summary Statistics

### Optimization Requirements

| Paradigm | Manual Optimizations Required | Risk Factor |
|----------|------------------------------|-------------|
| Zustand | 2 (precise selectors + useMemo) | High (easy to miss) |
| Jotai | 0 (architectural) | Low (automatic) |
| Signals | 0 (architectural) | Low (automatic) |

### Performance Waste Comparison

| Scenario | Zustand (Unoptimized) | Zustand (Optimized) | Jotai | Signals |
|----------|----------------------|---------------------|-------|---------|
| Wasteful renders | Up to 33% | 0% | 0% | 0% (+ VDOM bypass) |
| Wasteful computations | Up to 33% | 0% | 0% | 0% |
| Total optimization effort | Low initial, high maintenance | High initial, high maintenance | Low initial, low maintenance | Low initial, low maintenance |

### Large Application Scalability

When dealing with complex UIs with many state variables:

**Zustand:**
- Requires discipline across entire team
- One poorly written selector can cause cascading performance issues
- Complexity grows with application size

**Jotai:**
- Performance is architectural, not discipline-dependent
- Scales naturally with application complexity
- Atomic composition prevents interdependencies

**Signals:**
- Maximum performance through VDOM bypass
- Natural isolation between signal groups
- Scales with minimal overhead
