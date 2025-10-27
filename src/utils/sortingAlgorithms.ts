export interface SortStep {
    array: number[];
    comparing?: number[];
    swapping?: number[];
    sorted?: number[];
    pivot?: number;
  }
  
  export interface SortResult {
    steps: SortStep[];
    comparisons: number;
    swaps: number;
    executionTime: number;
  }
  
  export async function bubbleSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
  
    steps.push({ array: [...array] });
  
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        steps.push({ array: [...array], comparing: [j, j + 1] });
  
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          steps.push({ array: [...array], swapping: [j, j + 1] });
        }
      }
      const sorted = Array.from({ length: i + 1 }, (_, idx) => array.length - 1 - idx);
      steps.push({ array: [...array], sorted });
    }
  
    steps.push({ array: [...array], sorted: array.map((_, i) => i) });
    const executionTime = performance.now() - startTime;
  
    return { steps, comparisons, swaps, executionTime };
  }
  
  export async function selectionSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];
  
    steps.push({ array: [...array] });
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
  
      for (let j = i + 1; j < array.length; j++) {
        comparisons++;
        steps.push({ array: [...array], comparing: [minIdx, j], sorted: [...sorted] });
  
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
  
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        swaps++;
        steps.push({ array: [...array], swapping: [i, minIdx], sorted: [...sorted] });
      }
  
      sorted.push(i);
      steps.push({ array: [...array], sorted: [...sorted] });
    }
  
    sorted.push(array.length - 1);
    steps.push({ array: [...array], sorted });
    const executionTime = performance.now() - startTime;
  
    return { steps, comparisons, swaps, executionTime };
  }
  
  export async function insertionSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [0];
  
    steps.push({ array: [...array], sorted: [0] });
  
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
  
      steps.push({ array: [...array], comparing: [i], sorted: [...sorted] });
  
      while (j >= 0 && array[j] > key) {
        comparisons++;
        steps.push({ array: [...array], comparing: [j, j + 1], sorted: [...sorted] });
  
        array[j + 1] = array[j];
        swaps++;
        steps.push({ array: [...array], swapping: [j, j + 1], sorted: [...sorted] });
        j--;
      }
  
      if (j >= 0) comparisons++;
      array[j + 1] = key;
      sorted.push(i);
      steps.push({ array: [...array], sorted: [...sorted] });
    }
  
    const executionTime = performance.now() - startTime;
    return { steps, comparisons, swaps, executionTime };
  }
  
  export async function mergeSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
  
    steps.push({ array: [...array] });
  
    function merge(left: number, mid: number, right: number) {
      const leftArr = array.slice(left, mid + 1);
      const rightArr = array.slice(mid + 1, right + 1);
  
      let i = 0, j = 0, k = left;
  
      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        steps.push({ array: [...array], comparing: [left + i, mid + 1 + j] });
  
        if (leftArr[i] <= rightArr[j]) {
          array[k] = leftArr[i];
          i++;
        } else {
          array[k] = rightArr[j];
          j++;
        }
        swaps++;
        steps.push({ array: [...array], swapping: [k] });
        k++;
      }
  
      while (i < leftArr.length) {
        array[k] = leftArr[i];
        swaps++;
        steps.push({ array: [...array], swapping: [k] });
        i++;
        k++;
      }
  
      while (j < rightArr.length) {
        array[k] = rightArr[j];
        swaps++;
        steps.push({ array: [...array], swapping: [k] });
        j++;
        k++;
      }
  
      const sorted = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);
      steps.push({ array: [...array], sorted });
    }
  
    function mergeSortHelper(left: number, right: number) {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    }
  
    mergeSortHelper(0, array.length - 1);
    steps.push({ array: [...array], sorted: array.map((_, i) => i) });
    const executionTime = performance.now() - startTime;
  
    return { steps, comparisons, swaps, executionTime };
  }
  
  export async function quickSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
  
    steps.push({ array: [...array] });
  
    function partition(low: number, high: number): number {
      const pivot = array[high];
      steps.push({ array: [...array], pivot: high });
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({ array: [...array], comparing: [j, high], pivot: high });
  
        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            [array[i], array[j]] = [array[j], array[i]];
            swaps++;
            steps.push({ array: [...array], swapping: [i, j], pivot: high });
          }
        }
      }
  
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      swaps++;
      steps.push({ array: [...array], swapping: [i + 1, high] });
      return i + 1;
    }
  
    function quickSortHelper(low: number, high: number) {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    }
  
    quickSortHelper(0, array.length - 1);
    steps.push({ array: [...array], sorted: array.map((_, i) => i) });
    const executionTime = performance.now() - startTime;
  
    return { steps, comparisons, swaps, executionTime };
  }
  
  export async function heapSort(arr: number[]): Promise<SortResult> {
    const startTime = performance.now();
    const steps: SortStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
  
    steps.push({ array: [...array] });
  
    function heapify(n: number, i: number) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n) {
        comparisons++;
        steps.push({ array: [...array], comparing: [left, largest] });
        if (array[left] > array[largest]) {
          largest = left;
        }
      }
  
      if (right < n) {
        comparisons++;
        steps.push({ array: [...array], comparing: [right, largest] });
        if (array[right] > array[largest]) {
          largest = right;
        }
      }
  
      if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        swaps++;
        steps.push({ array: [...array], swapping: [i, largest] });
        heapify(n, largest);
      }
    }
  
    const n = array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      swaps++;
      steps.push({ array: [...array], swapping: [0, i] });
  
      const sorted = Array.from({ length: n - i }, (_, idx) => n - 1 - idx);
      steps.push({ array: [...array], sorted });
  
      heapify(i, 0);
    }
  
    steps.push({ array: [...array], sorted: array.map((_, i) => i) });
    const executionTime = performance.now() - startTime;
  
    return { steps, comparisons, swaps, executionTime };
  }
  
  export const algorithms = {
    bubble: { name: 'Bubble Sort', fn: bubbleSort },
    selection: { name: 'Selection Sort', fn: selectionSort },
    insertion: { name: 'Insertion Sort', fn: insertionSort },
    merge: { name: 'Merge Sort', fn: mergeSort },
    quick: { name: 'Quick Sort', fn: quickSort },
    heap: { name: 'Heap Sort', fn: heapSort },
  };
  
  export type AlgorithmKey = keyof typeof algorithms;
  