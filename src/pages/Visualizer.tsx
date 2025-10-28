import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Loader } from 'lucide-react';
import VisualizationCanvas from '../components/VisualizationCanvas';
import ComplexityTable from '../components/ComplexityTable';
import FlowchartDiagram from '../components/FlowchartDiagram';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { algorithms, AlgorithmKey, SortResult } from '../../src/utils/sortingAlgorithms';
import { downloadCSV } from '../../src/utils/csvExport';

export default function Visualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('bubble');
  const [inputData, setInputData] = useState('64, 34, 25, 12, 22, 11, 90');
  const [sortResult, setSortResult] = useState<SortResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [originalArray, setOriginalArray] = useState<number[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">All Sorting Algorithm Visualizer</h1>
          <p className="text-gray-600 dark:text-gray-400">Visualize and compare sorting algorithms interactively</p>
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
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
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
          <div className="flex flex-col justify-stretch h-full">
            <ComplexityTable algorithm={selectedAlgorithm} />
          </div>
          <div className="flex flex-col justify-stretch h-full">
            {sortResult && <FlowchartDiagram algorithm={selectedAlgorithm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
