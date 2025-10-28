import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { algorithmFlowcharts } from '../utils/algorithmInfo';

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
    const nodeHeight = 80; // standard height
    const nodeWidth = 160; // standard width for readability
    const verticalSpacing = 130; // ensures clear separation between rows
    const horizontalSpacing = 60; // horizontal offset for routed edges

    const totalHeight = steps.length * verticalSpacing + 70;

    svg.attr('width', containerWidth).attr('height', totalHeight);

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${containerWidth / 2}, 50)`);
    // Separate layers so edges render beneath nodes
    const edgesLayer = g.append('g').attr('class', 'edges-layer');
    const nodesLayer = g.append('g').attr('class', 'nodes-layer');

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

      const group = nodesLayer.append('g')
        .attr('class', 'flowchart-node')
        .style('cursor', 'default');

      if (step.type === 'start' || step.type === 'end') {
        group.append('ellipse')
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
        group.append('polygon')
          .attr('points', points.map(p => p.join(',')).join(' '))
          .attr('fill', '#1e293b')
          .attr('stroke', '#ec4899')
          .attr('stroke-width', 2);
      } else {
        group.append('rect')
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
        .attr('font-size', '13px')
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

            const isDirect = nextIndex === i + 1;

            if (isDirect) {
              // Safe vertical line to immediate next node
              edgesLayer.append('line')
                .attr('x1', x)
                .attr('y1', y + nodeHeight / 2)
                .attr('x2', x)
                .attr('y2', nextY - nodeHeight / 2)
                .attr('stroke', '#06b6d4')
                .attr('stroke-width', 2)
                .attr('stroke-linecap', 'round')
                .attr('marker-end', 'url(#arrowhead)')
                .attr('opacity', 0.7);
            } else {
              // Route around intermediate nodes with elbows
              const exitY = y + nodeHeight / 2;
              const entryY = nextY - nodeHeight / 2;
              const legPadding = 12; // vertical clearance before turning
              const branchOffset =
                (idx % 2 === 0 ? 1 : -1) * (nodeWidth / 2 + horizontalSpacing * (1 + Math.floor(idx / 2)));
            
              const pathD = [
                `M ${x} ${exitY}`,                 // start at bottom center of source
                `V ${exitY + legPadding}`,         // short down
                `H ${branchOffset}`,               // go sideways out
                `V ${entryY - legPadding}`,        // go down near target
                `H ${x}`,                          // go back to target x
                `V ${entryY}`                      // up to target top
              ].join(' ');
            
              edgesLayer.append('path')
                .attr('d', pathD)
                .attr('fill', 'none')
                .attr('stroke', '#06b6d4')
                .attr('stroke-width', 2)
                .attr('stroke-linecap', 'round')
                .attr('stroke-linejoin', 'round')
                .attr('marker-end', 'url(#arrowhead)')
                .attr('opacity', 0.7);
            }
          }
        });
      }
    });

  }, [algorithm]);

  return (
    <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-2 sm:p-6 shadow-lg dark:shadow-none">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Algorithm Flowchart</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
    </div>
  );
}
