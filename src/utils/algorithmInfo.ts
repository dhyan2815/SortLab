export interface ComplexityInfo {
    best: string;
    average: string;
    worst: string;
    space: string;
  }
  
  export const algorithmComplexity: Record<string, ComplexityInfo> = {
    bubble: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    selection: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    insertion: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    merge: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
    },
    quick: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
    },
    heap: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
    },
  };
  
  export interface FlowchartStep {
    id: string;
    text: string;
    type: 'start' | 'process' | 'decision' | 'end';
    next?: string[];
  }
  
  export const algorithmFlowcharts: Record<string, FlowchartStep[]> = {
    bubble: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'i = 0 to n-1', type: 'process', next: ['3'] },
      { id: '3', text: 'j = 0 to n-i-1', type: 'process', next: ['4'] },
      { id: '4', text: 'arr[j] > arr[j+1]?', type: 'decision', next: ['5', '6'] },
      { id: '5', text: 'Swap arr[j] and arr[j+1]', type: 'process', next: ['6'] },
      { id: '6', text: 'Increment j', type: 'process', next: ['3', '7'] },
      { id: '7', text: 'Increment i', type: 'process', next: ['2', '8'] },
      { id: '8', text: 'End', type: 'end' },
    ],
    selection: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'i = 0 to n-1', type: 'process', next: ['3'] },
      { id: '3', text: 'min_idx = i', type: 'process', next: ['4'] },
      { id: '4', text: 'j = i+1 to n', type: 'process', next: ['5'] },
      { id: '5', text: 'arr[j] < arr[min_idx]?', type: 'decision', next: ['6', '7'] },
      { id: '6', text: 'min_idx = j', type: 'process', next: ['7'] },
      { id: '7', text: 'Increment j', type: 'process', next: ['4', '8'] },
      { id: '8', text: 'Swap arr[i] and arr[min_idx]', type: 'process', next: ['9'] },
      { id: '9', text: 'Increment i', type: 'process', next: ['2', '10'] },
      { id: '10', text: 'End', type: 'end' },
    ],
    insertion: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'i = 1 to n', type: 'process', next: ['3'] },
      { id: '3', text: 'key = arr[i], j = i-1', type: 'process', next: ['4'] },
      { id: '4', text: 'j ≥ 0 AND arr[j] > key?', type: 'decision', next: ['5', '6'] },
      { id: '5', text: 'arr[j+1] = arr[j], j--', type: 'process', next: ['4'] },
      { id: '6', text: 'arr[j+1] = key', type: 'process', next: ['7'] },
      { id: '7', text: 'Increment i', type: 'process', next: ['2', '8'] },
      { id: '8', text: 'End', type: 'end' },
    ],
    merge: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'Divide array into halves', type: 'process', next: ['3'] },
      { id: '3', text: 'Array size > 1?', type: 'decision', next: ['4', '5'] },
      { id: '4', text: 'Recursively sort left and right', type: 'process', next: ['5'] },
      { id: '5', text: 'Merge sorted halves', type: 'process', next: ['6'] },
      { id: '6', text: 'Compare and copy smallest', type: 'process', next: ['7'] },
      { id: '7', text: 'All elements merged?', type: 'decision', next: ['6', '8'] },
      { id: '8', text: 'End', type: 'end' },
    ],
    quick: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'Select pivot element', type: 'process', next: ['3'] },
      { id: '3', text: 'Partition array around pivot', type: 'process', next: ['4'] },
      { id: '4', text: 'Place pivot in correct position', type: 'process', next: ['5'] },
      { id: '5', text: 'More than 1 element?', type: 'decision', next: ['6', '7'] },
      { id: '6', text: 'Recursively sort left and right', type: 'process', next: ['5'] },
      { id: '7', text: 'End', type: 'end' },
    ],
    heap: [
      { id: '1', text: 'Start', type: 'start', next: ['2'] },
      { id: '2', text: 'Build max heap', type: 'process', next: ['3'] },
      { id: '3', text: 'Heapify from n/2-1 to 0', type: 'process', next: ['4'] },
      { id: '4', text: 'Swap root with last element', type: 'process', next: ['5'] },
      { id: '5', text: 'Reduce heap size', type: 'process', next: ['6'] },
      { id: '6', text: 'Heapify root', type: 'process', next: ['7'] },
      { id: '7', text: 'Heap size > 1?', type: 'decision', next: ['4', '8'] },
      { id: '8', text: 'End', type: 'end' },
    ],
  };
  