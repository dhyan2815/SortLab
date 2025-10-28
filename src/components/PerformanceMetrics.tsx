import { Clock, Zap, ArrowLeftRight } from 'lucide-react';

interface PerformanceMetricsProps {
  comparisons: number;
  swaps: number;
  executionTime: number;
  arraySize: number;
}

export default function PerformanceMetrics({
  comparisons,
  swaps,
  executionTime,
  arraySize
}: PerformanceMetricsProps) {
  const estimatedMemory = (arraySize * 8 + 1024) / 1024;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 dark:border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Comparisons</span>
          <ArrowLeftRight className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{comparisons.toLocaleString()}</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 dark:border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Swaps</span>
          <Zap className="w-5 h-5 text-purple-500 dark:text-purple-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{swaps.toLocaleString()}</p>
      </div>

      <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 dark:border-pink-500/20 rounded-lg p-4 hover:border-pink-500/40 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Execution Time</span>
          <Clock className="w-5 h-5 text-pink-500 dark:text-pink-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{executionTime.toFixed(2)} ms</p>
      </div>

      <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 dark:border-amber-500/20 rounded-lg p-4 hover:border-amber-500/40 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Memory Usage</span>
          <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">~{estimatedMemory.toFixed(1)} KB</p>
      </div>
    </div>
  );
}
