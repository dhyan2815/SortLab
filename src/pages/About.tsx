import { BarChart3, Zap, Code, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <BarChart3 className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              About Sort<span className="text-cyan-400">Lab</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              An interactive platform for visualizing and comparing sorting algorithms
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-8 space-y-6 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What is SortLab?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              SortLab is a production-ready web application designed to help students, educators, and developers
              understand how sorting algorithms work through interactive visualizations. By animating the sorting
              process step-by-step, users can observe comparisons, swaps, and the overall behavior of different
              algorithms in real-time.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you're learning algorithms for the first time or teaching computer science concepts,
              SortLab provides an intuitive and engaging way to explore the fundamental building blocks of
              computational problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg p-6 space-y-3 hover:border-cyan-500/40 transition-all duration-200">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Six Algorithms</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Visualize Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort
                with detailed step-by-step animations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-6 space-y-3 hover:border-purple-500/40 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Real-Time Metrics</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Track performance in real-time with metrics including comparisons, swaps, execution time,
                and memory usage estimates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 rounded-lg p-6 space-y-3 hover:border-pink-500/40 transition-all duration-200">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive Controls</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Control playback speed, pause and resume animations, and reset visualizations to explore
                algorithms at your own pace.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-lg p-6 space-y-3 hover:border-amber-500/40 transition-all duration-200">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Export Results</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Download detailed performance data as CSV files for analysis, comparison, or integration
                into reports and presentations.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-8 space-y-6 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-white">Complexity Tables:</span> View time and space
                    complexity for best, average, and worst cases for each algorithm
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-white">Dynamic Flowcharts:</span> Programmatically
                    generated flowchart diagrams illustrate the logical flow of each algorithm
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-white">Responsive Design:</span> Fully optimized
                    for mobile, tablet, and desktop devices with consistent user experience
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-white">Custom Input:</span> Enter your own data
                    sets to see how different algorithms handle various input patterns
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-white">Smooth Animations:</span> D3.js-powered
                    visualizations with natural easing and transitions for clarity
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 dark:border-cyan-500/30 rounded-lg p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-cyan-400 font-medium">
                React
              </span>
              <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-cyan-400 font-medium">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-cyan-400 font-medium">
                D3.js
              </span>
              <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-cyan-400 font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-cyan-400 font-medium">
                Vite
              </span>
            </div>
          </div>

          <div className="text-center text-gray-500 dark:text-gray-500 text-sm pt-8 border-t border-gray-200 dark:border-gray-800">
            <p>Built with attention to detail for optimal learning and exploration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
