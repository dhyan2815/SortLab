import { algorithmComplexity } from '../../src/utils/algorithmInfo';

interface ComplexityTableProps {
  algorithm: string;
}

export default function ComplexityTable({ algorithm }: ComplexityTableProps) {
  const complexity = algorithmComplexity[algorithm];

  if (!complexity) return null;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-4">Time & Space Complexity</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Case</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-gray-300">Best Case</td>
              <td className="py-3 px-4 text-cyan-400 font-mono font-medium">{complexity.best}</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-gray-300">Average Case</td>
              <td className="py-3 px-4 text-cyan-400 font-mono font-medium">{complexity.average}</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-gray-300">Worst Case</td>
              <td className="py-3 px-4 text-cyan-400 font-mono font-medium">{complexity.worst}</td>
            </tr>
            <tr className="hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-gray-300">Space Complexity</td>
              <td className="py-3 px-4 text-cyan-400 font-mono font-medium">{complexity.space}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
