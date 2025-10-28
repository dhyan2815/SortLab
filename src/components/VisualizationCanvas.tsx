import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SortStep } from '../../src/utils/sortingAlgorithms';

interface VisualizationCanvasProps {
  step: SortStep;
  animate?: boolean;
}

export default function VisualizationCanvas({ step, animate = true }: VisualizationCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !step.array.length) return;

    const svg = d3.select(svgRef.current);
    const container = svgRef.current.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = Math.min(400, window.innerHeight * 0.5);

    const margin = { top: 20, right: 20, bottom: 40, left: 20 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    svg.attr('width', containerWidth).attr('height', containerHeight);

    const g = svg.selectAll('g.main-group').data([null]);
    const gEnter = g.enter().append('g').attr('class', 'main-group');
    const gMerge = gEnter.merge(g as any).attr('transform', `translate(${margin.left},${margin.top})`);

    const maxValue = d3.max(step.array) || 1;
    const xScale = d3.scaleBand()
      .domain(step.array.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);

    const bars = gMerge.selectAll('rect')
      .data(step.array, (d: any, i: number) => `bar-${i}`);

    bars.exit()
      .transition()
      .duration(animate ? 200 : 0)
      .attr('height', 0)
      .attr('y', height)
      .remove();

    const barsEnter = bars.enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i.toString()) || 0)
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('rx', 2);

    const barsUpdate = barsEnter.merge(bars as any);

    barsUpdate
      .transition()
      .duration(animate ? 400 : 0)
      .ease(d3.easeCubicInOut)
      .attr('x', (_, i) => xScale(i.toString()) || 0)
      .attr('y', (d: number) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d: number) => height - yScale(d))
      .attr('fill', (_: number, i: number) => {
        if (step.sorted?.includes(i)) return '#06b6d4';
        if (step.pivot === i) return '#f59e0b';
        if (step.comparing?.includes(i)) return '#ec4899';
        if (step.swapping?.includes(i)) return '#8b5cf6';
        return '#4b5563';
      });

    const labels = gMerge.selectAll('text')
      .data(step.array, (d: any, i: number) => `label-${i}`);

    labels.exit().remove();

    const labelsEnter = labels.enter()
      .append('text')
      .attr('x', (_, i) => (xScale(i.toString()) || 0) + xScale.bandwidth() / 2)
      .attr('y', height + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#9ca3af')
      .attr('font-size', '12px')
      .attr('font-weight', '500');

    labelsEnter.merge(labels as any)
      .transition()
      .duration(animate ? 400 : 0)
      .ease(d3.easeCubicInOut)
      .attr('x', (_, i) => (xScale(i.toString()) || 0) + xScale.bandwidth() / 2)
      .text((d: number) => d);

  }, [step, animate]);

  return (
    <div className="w-full bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800 shadow-md dark:shadow-none duration-300 transition-all hover:shadow-lg">
      <svg ref={svgRef} className="w-full" style={{ minHeight: '300px' }}></svg>

      <div className="flex flex-wrap gap-4 mt-4 justify-center text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-pink-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Pivot</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Sorted</span>
        </div>
      </div>
    </div>
  );
}
