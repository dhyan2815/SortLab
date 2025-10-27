import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { algorithmFlowcharts } from '../../src/utils/algorithmInfo';

interface FlowchartDiagramProps {
  algorithm: string;
}

export default function FlowchartDiagram({ algorithm }: FlowchartDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const steps = algorithmFlowcharts[algorithm];
    if (!steps) return;

    const svg = d3.select(svgRef.current);
    const container = svgRef.current.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const nodeHeight = 60;
    const nodeWidth = 180;
    const verticalSpacing = 80;
    const horizontalSpacing = 40;

    const totalHeight = steps.length * verticalSpacing + 100;

    svg.attr('width', containerWidth).attr('height', totalHeight);

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${containerWidth / 2}, 50)`);

    const defs = svg.append('defs');
    const marker = defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('refX', 9)
      .attr('refY', 3)
      .attr('orient', 'auto');

    marker.append('polygon')
      .attr('points', '0 0, 10 3, 0 6')
      .attr('fill', '#06b6d4');

    steps.forEach((step, i) => {
      const y = i * verticalSpacing;
      const x = 0;

      let shape;
      const group = g.append('g')
        .attr('class', 'flowchart-node')
        .style('cursor', 'default');

      if (step.type === 'start' || step.type === 'end') {
        shape = group.append('ellipse')
          .attr('cx', x)
          .attr('cy', y)
          .attr('rx', nodeWidth / 2)
          .attr('ry', nodeHeight / 2)
          .attr('fill', '#1e293b')
          .attr('stroke', '#06b6d4')
          .attr('stroke-width', 2);
      } else if (step.type === 'decision') {
        const points = [
          [x, y - nodeHeight / 2],
          [x + nodeWidth / 2, y],
          [x, y + nodeHeight / 2],
          [x - nodeWidth / 2, y],
        ];
        shape = group.append('polygon')
          .attr('points', points.map(p => p.join(',')).join(' '))
          .attr('fill', '#1e293b')
          .attr('stroke', '#ec4899')
          .attr('stroke-width', 2);
      } else {
        shape = group.append('rect')
          .attr('x', x - nodeWidth / 2)
          .attr('y', y - nodeHeight / 2)
          .attr('width', nodeWidth)
          .attr('height', nodeHeight)
          .attr('rx', 8)
          .attr('fill', '#1e293b')
          .attr('stroke', '#06b6d4')
          .attr('stroke-width', 2);
      }

      group.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#f3f4f6')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .style('pointer-events', 'none')
        .each(function() {
          const text = d3.select(this);
          const words = step.text.split(' ');
          const lineHeight = 14;
          const numLines = Math.ceil(words.length / 3);
          const startY = y - ((numLines - 1) * lineHeight) / 2;

          let currentLine = '';
          let lineNum = 0;

          words.forEach((word, i) => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            if (i % 3 === 0 && i > 0) {
              text.append('tspan')
                .attr('x', x)
                .attr('y', startY + lineNum * lineHeight)
                .text(currentLine);
              currentLine = word;
              lineNum++;
            } else {
              currentLine = testLine;
            }
          });

          text.append('tspan')
            .attr('x', x)
            .attr('y', startY + lineNum * lineHeight)
            .text(currentLine);
        });

      if (step.next && step.next.length > 0) {
        step.next.forEach((nextId, idx) => {
          const nextStep = steps.find(s => s.id === nextId);
          if (nextStep) {
            const nextIndex = steps.indexOf(nextStep);
            const nextY = nextIndex * verticalSpacing;

            g.append('line')
              .attr('x1', x)
              .attr('y1', y + nodeHeight / 2)
              .attr('x2', x)
              .attr('y2', nextY - nodeHeight / 2)
              .attr('stroke', '#06b6d4')
              .attr('stroke-width', 2)
              .attr('marker-end', 'url(#arrowhead)')
              .attr('opacity', 0.7);
          }
        });
      }
    });

  }, [algorithm]);

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-4">Algorithm Flowchart</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
    </div>
  );
}
