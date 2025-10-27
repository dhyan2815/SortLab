import Papa from 'papaparse';

export interface CSVData {
  algorithm: string;
  arraySize: number;
  comparisons: number;
  swaps: number;
  executionTime: number;
  memoryUsage: string;
  inputArray: string;
  sortedArray: string;
}

export function downloadCSV(data: CSVData) {
  const csvData = [
    {
      'Algorithm': data.algorithm,
      'Array Size': data.arraySize,
      'Comparisons': data.comparisons,
      'Swaps': data.swaps,
      'Execution Time (ms)': data.executionTime.toFixed(2),
      'Memory Usage': data.memoryUsage,
      'Input Array': data.inputArray,
      'Sorted Array': data.sortedArray,
    }
  ];

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `sort-results-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
