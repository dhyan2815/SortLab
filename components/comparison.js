export function renderComparison() {
  return `
    <div class="section-card">
      <h2 class="section-title">Algorithm Comparison</h2>

      <h3 class="mb-3" style="color: var(--cyan-accent); font-size: 1.25rem;">Time & Space Complexity</h3>
      <div class="table-responsive">
        <table class="complexity-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best Case</th>
              <th>Average Case</th>
              <th>Worst Case</th>
              <th>Space</th>
              <th>Stable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bubble Sort</strong></td>
              <td>O(n)</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>Selection Sort</strong></td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Insertion Sort</strong></td>
              <td>O(n)</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>Merge Sort</strong></td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>Quick Sort</strong></td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n²)</td>
              <td>O(log n)</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Heap Sort</strong></td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(1)</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button id="downloadCSV" class="btn btn-secondary">Download CSV Data</button>
      </div>

      <div class="flowchart-container">
        <h3 style="color: var(--cyan-accent); margin-bottom: 1.5rem;">Algorithm Selection Flowchart</h3>
        <svg width="100%" height="500" viewBox="0 0 800 500">
          <defs>
            <style>
              .flowchart-box { fill: var(--dark-card); stroke: var(--cyan-accent); stroke-width: 2; }
              .flowchart-decision { fill: var(--dark-secondary); stroke: var(--cyan-accent); stroke-width: 2; }
              .flowchart-text { fill: var(--text-primary); font-family: 'Inter', sans-serif; font-size: 14px; }
              .flowchart-line { stroke: var(--cyan-accent); stroke-width: 2; fill: none; }
              .flowchart-arrow { fill: var(--cyan-accent); }
            </style>
          </defs>

          <rect class="flowchart-box" x="300" y="20" width="200" height="50" rx="8" />
          <text class="flowchart-text" x="400" y="50" text-anchor="middle">Start: Need to Sort</text>

          <line class="flowchart-line" x1="400" y1="70" x2="400" y2="100" />
          <polygon class="flowchart-arrow" points="400,100 395,90 405,90" />

          <polygon class="flowchart-decision" points="400,120 500,170 400,220 300,170" />
          <text class="flowchart-text" x="400" y="165" text-anchor="middle">Data Size</text>
          <text class="flowchart-text" x="400" y="185" text-anchor="middle">Small?</text>

          <line class="flowchart-line" x1="300" y1="170" x2="200" y2="170" />
          <text class="flowchart-text" x="240" y="165" text-anchor="middle" style="font-size: 12px;">Yes</text>
          <polygon class="flowchart-arrow" points="200,170 210,165 210,175" />
          <rect class="flowchart-box" x="80" y="145" width="120" height="50" rx="8" />
          <text class="flowchart-text" x="140" y="165" text-anchor="middle">Insertion Sort</text>
          <text class="flowchart-text" x="140" y="185" text-anchor="middle" style="font-size: 11px;">or Bubble Sort</text>

          <line class="flowchart-line" x1="500" y1="170" x2="600" y2="170" />
          <text class="flowchart-text" x="560" y="165" text-anchor="middle" style="font-size: 12px;">No</text>
          <polygon class="flowchart-arrow" points="600,170 590,165 590,175" />

          <polygon class="flowchart-decision" points="650,120 730,170 650,220 570,170" />
          <text class="flowchart-text" x="650" y="165" text-anchor="middle">Stability</text>
          <text class="flowchart-text" x="650" y="185" text-anchor="middle">Required?</text>

          <line class="flowchart-line" x1="650" y1="220" x2="650" y2="280" />
          <text class="flowchart-text" x="665" y="255" text-anchor="start" style="font-size: 12px;">Yes</text>
          <polygon class="flowchart-arrow" points="650,280 645,270 655,270" />
          <rect class="flowchart-box" x="590" y="280" width="120" height="50" rx="8" />
          <text class="flowchart-text" x="650" y="310" text-anchor="middle">Merge Sort</text>

          <line class="flowchart-line" x1="570" y1="170" x2="500" y2="170" x2="500" y2="305" />
          <text class="flowchart-text" x="515" y="175" text-anchor="start" style="font-size: 12px;">No</text>
          <polygon class="flowchart-arrow" points="500,305 495,295 505,295" />

          <polygon class="flowchart-decision" points="500,325 570,365 500,405 430,365" />
          <text class="flowchart-text" x="500" y="360" text-anchor="middle">Memory</text>
          <text class="flowchart-text" x="500" y="380" text-anchor="middle">Limited?</text>

          <line class="flowchart-line" x1="430" y1="365" x2="340" y2="365" />
          <text class="flowchart-text" x="375" y="360" text-anchor="middle" style="font-size: 12px;">Yes</text>
          <polygon class="flowchart-arrow" points="340,365 350,360 350,370" />
          <rect class="flowchart-box" x="240" y="340" width="100" height="50" rx="8" />
          <text class="flowchart-text" x="290" y="370" text-anchor="middle">Heap Sort</text>

          <line class="flowchart-line" x1="500" y1="405" x2="500" y2="440" />
          <text class="flowchart-text" x="515" y="430" text-anchor="start" style="font-size: 12px;">No</text>
          <polygon class="flowchart-arrow" points="500,440 495,430 505,430" />
          <rect class="flowchart-box" x="440" y="440" width="120" height="50" rx="8" />
          <text class="flowchart-text" x="500" y="470" text-anchor="middle">Quick Sort</text>
        </svg>
      </div>
    </div>
  `;
}
