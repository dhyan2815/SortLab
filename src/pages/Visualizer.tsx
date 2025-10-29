import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Loader } from 'lucide-react';
import VisualizationCanvas from '../components/VisualizationCanvas';
import ComplexityTable from '../components/ComplexityTable';
import FlowchartDiagram from '../components/FlowchartDiagram';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { algorithms, AlgorithmKey, SortResult } from '../utils/sortingAlgorithms';
import { downloadCSV } from '../utils/csvExport';
import Footer from '../components/Footer';

export default function Visualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('bubble');
  const [inputData, setInputData] = useState('64, 34, 25, 12, 22, 11, 90');
  const [sortResult, setSortResult] = useState<SortResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'python' | 'java'>('cpp');

  useEffect(() => {
    if (!isPlaying || !sortResult) return;

    if (currentStep >= sortResult.steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, playbackSpeed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, sortResult, playbackSpeed]);

  const parseInput = (input: string): number[] => {
    return input
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n));
  };

  const handleSort = async () => {
    const array = parseInput(inputData);

    if (array.length === 0) {
      alert('Please enter valid numbers separated by commas');
      return;
    }

    if (array.length > 50) {
      alert('Please enter 50 or fewer numbers for optimal visualization');
      return;
    }

    setIsSorting(true);
    setOriginalArray([...array]);
    setCurrentStep(0);
    setIsPlaying(false);

    try {
      const result = await algorithms[selectedAlgorithm].fn(array);
      setSortResult(result);
      setIsSorting(false);
      setIsPlaying(true);
    } catch (error) {
      console.error('Sorting error:', error);
      setIsSorting(false);
    }
  };

  const handlePlayPause = () => {
    if (!sortResult) return;

    if (currentStep >= sortResult.steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleDownloadCSV = () => {
    if (!sortResult) return;

    const estimatedMemory = ((originalArray.length * 8 + 1024) / 1024).toFixed(1);

    downloadCSV({
      algorithm: algorithms[selectedAlgorithm].name,
      arraySize: originalArray.length,
      comparisons: sortResult.comparisons,
      swaps: sortResult.swaps,
      executionTime: sortResult.executionTime,
      memoryUsage: `~${estimatedMemory} KB`,
      inputArray: originalArray.join(', '),
      sortedArray: sortResult.steps[sortResult.steps.length - 1].array.join(', '),
    });
  };

  const currentStepData = sortResult?.steps[currentStep];

  // Sorting Algorithm Code Snippets
  const codeSnippets: Record<AlgorithmKey, Record<'cpp' | 'python' | 'java', string>> = {
    bubble: {
      cpp: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1])
        swap(arr[j], arr[j + 1]);
    }
  }
}`,
      python: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n - 1):
    for j in range(n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
      java: `void bubbleSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`
    },
    selection: {
      cpp: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx])
        minIdx = j;
    }
    swap(arr[i], arr[minIdx]);
  }
}`,
      python: `def selection_sort(arr):
  n = len(arr)
  for i in range(n):
    min_idx = i
    for j in range(i + 1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
      java: `void selectionSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx])
        minIdx = j;
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`
    },
    insertion: {
      cpp: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      python: `def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key`,
      java: `void insertionSort(int arr[]) {
  int n = arr.length;
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`
    },
    merge: {
      cpp: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1, n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
      python: `def merge_sort(arr):
  if len(arr) > 1:
    mid = len(arr) // 2
    L = arr[:mid]
    R = arr[mid:]
    merge_sort(L)
    merge_sort(R)
    i = j = k = 0
    while i < len(L) and j < len(R):
      if L[i] < R[j]:
        arr[k] = L[i]; i += 1
      else:
        arr[k] = R[j]; j += 1
      k += 1
    while i < len(L):
      arr[k] = L[i]; i += 1; k += 1
    while j < len(R):
      arr[k] = R[j]; j += 1; k += 1`,
      java: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[] = new int[n1];
  int R[] = new int[n2];
  for (int i = 0; i < n1; ++i)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; ++j)
    R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`
    },
    quick: {
      cpp: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      python: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[len(arr) // 2]
  left = [x for x in arr if x < pivot]
  middle = [x for x in arr if x == pivot]
  right = [x for x in arr if x > pivot]
  return quick_sort(left) + middle + quick_sort(right)`,
      java: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`
    }
    ,
    heap: {
      cpp: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    std::swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
  for (int i = n - 1; i > 0; i--) {
    std::swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}`,
      python: `def heapify(arr, n, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2
  if l < n and arr[l] > arr[largest]:
    largest = l
  if r < n and arr[r] > arr[largest]:
    largest = r
  if largest != i:
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)

def heap_sort(arr):
  n = len(arr)
  for i in range(n//2 - 1, -1, -1):
    heapify(arr, n, i)
  for i in range(n-1, 0, -1):
    arr[i], arr[0] = arr[0], arr[i]
    heapify(arr, i, 0)`,
      java: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[]) {
  int n = arr.length;
  for (int i = n/2 - 1; i >= 0; i--) heapify(arr, n, i);
  for (int i = n-1; i > 0; i--) {
    int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
    heapify(arr, i, 0);
  }
}`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            All Sorting Algorithm Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize and compare sorting algorithms interactively
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4 shadow-md duration-300 transition-all hover:shadow-lg dark:shadow-none">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Algorithm
                </label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as AlgorithmKey)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  disabled={isSorting || isPlaying}
                >
                  {Object.entries(algorithms).map(([key, { name }]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Data (comma-separated)
                </label>
                <textarea
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  rows={2}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
                  disabled={isSorting || isPlaying}
                />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Maximum 50 numbers</p>
              </div>

              <button
                onClick={handleSort}
                disabled={isSorting || isPlaying}
                className="w-full bg-cyan-600 hover:bg-cyan-800 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md duration-300 transition-all hover:shadow-lg"
              >
                {isSorting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Sorting...</span>
                  </>
                ) : (
                  <span>Sort Data</span>
                )}
              </button>

              {sortResult && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Playback Speed
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="100"
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <span>Fast</span>
                        <span>Slow</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={handlePlayPause}
                        className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Play</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleReset}
                        className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <button
                      onClick={handleDownloadCSV}
                      className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CSV</span>
                    </button>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
                      Step {currentStep + 1} of {sortResult.steps.length}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {currentStepData ? (
              <>
                <VisualizationCanvas step={currentStepData} animate={isPlaying} />

                <PerformanceMetrics
                  comparisons={sortResult!.comparisons}
                  swaps={sortResult!.swaps}
                  executionTime={sortResult!.executionTime}
                  arraySize={originalArray.length}
                />
              </>
            ) : (
              <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center shadow-sm dark:shadow-none">
                <Play className="w-16 h-16 text-gray-400 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">Enter data and click "Sort Data" to begin</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col justify-stretch h-full space-y-6">
            <ComplexityTable algorithm={selectedAlgorithm} />

            {/* Algorithm Code Snippet Component */}
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-md space-y-4 transition-all duration-300 hover:shadow-lg dark:shadow-none">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">
                  Algorithm Code
                </h2>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'cpp' | 'python' | 'java')}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="cpp">C++</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                <code>{codeSnippets[selectedAlgorithm][selectedLanguage]}</code>
              </pre>
            </div>
          </div>

          <div className="flex flex-col justify-stretch h-full">
            {sortResult && <FlowchartDiagram algorithm={selectedAlgorithm} />}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
