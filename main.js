import './style.css';
import { algorithmCodes } from './algorithms/codes.js';
import { sortingAlgorithms } from './algorithms/sorting.js';
import { renderVisualization } from './visualization/visualizer.js';
import { renderComparison } from './components/comparison.js';

let currentAlgorithm = '';
let currentData = [];
let isSorting = false;

function initializeApp() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="container">
      <div class="hero-section">
        <h1 class="hero-title">Algorithm Visualizer</h1>
        <p class="hero-subtitle">Compare and visualize sorting algorithms in real-time</p>
      </div>

      <div class="section-card">
        <h2 class="section-title">Select Algorithm</h2>
        <div class="row g-3">
          <div class="col-md-6">
            <label for="algorithmSelect" class="form-label">Choose a sorting algorithm</label>
            <select id="algorithmSelect" class="form-select">
              <option value="">Select an algorithm...</option>
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="heap">Heap Sort</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="dataInput" class="form-label">Enter comma-separated numbers</label>
            <input type="text" id="dataInput" class="form-control" placeholder="e.g., 64, 34, 25, 12, 22, 11, 90">
          </div>
          <div class="col-12">
            <button id="sortBtn" class="btn btn-primary" disabled>Sort Data</button>
            <button id="randomBtn" class="btn btn-secondary ms-2">Generate Random Data</button>
          </div>
        </div>
      </div>

      <div id="visualizationSection" class="section-card" style="display: none;">
        <h2 class="section-title">Visualization</h2>
        <div id="visualizationContainer" class="visualization-container"></div>
        <div id="statsContainer" class="stats-container"></div>
      </div>

      <div id="codeSection" class="section-card" style="display: none;">
        <div class="toggle-container">
          <h2 class="section-title">Algorithm Implementation</h2>
          <button id="toggleCodeBtn" class="toggle-btn">
            <span>Show Code</span>
            <span>▼</span>
          </button>
        </div>
        <div id="codeContent" class="code-section">
          <div class="code-tabs">
            <button class="code-tab active" data-lang="python">Python</button>
            <button class="code-tab" data-lang="cpp">C++</button>
            <button class="code-tab" data-lang="java">Java</button>
          </div>
          <div id="codeDisplay"></div>
        </div>
      </div>

      <div id="comparisonSection">
        ${renderComparison()}
      </div>
    </div>
  `;

  attachEventListeners();
}

function attachEventListeners() {
  const algorithmSelect = document.getElementById('algorithmSelect');
  const dataInput = document.getElementById('dataInput');
  const sortBtn = document.getElementById('sortBtn');
  const randomBtn = document.getElementById('randomBtn');
  const toggleCodeBtn = document.getElementById('toggleCodeBtn');
  const codeTabs = document.querySelectorAll('.code-tab');

  algorithmSelect.addEventListener('change', (e) => {
    currentAlgorithm = e.target.value;
    updateUI();
  });

  dataInput.addEventListener('input', () => {
    updateUI();
  });

  sortBtn.addEventListener('click', handleSort);
  randomBtn.addEventListener('click', generateRandomData);

  if (toggleCodeBtn) {
    toggleCodeBtn.addEventListener('click', toggleCodeSection);
  }

  codeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      switchCodeTab(e.target.dataset.lang);
    });
  });

  const downloadBtn = document.getElementById('downloadCSV');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadPerformanceData);
  }
}

function updateUI() {
  const dataInput = document.getElementById('dataInput');
  const sortBtn = document.getElementById('sortBtn');
  const codeSection = document.getElementById('codeSection');

  const hasData = dataInput.value.trim().length > 0;
  const hasAlgorithm = currentAlgorithm !== '';

  sortBtn.disabled = !hasData || !hasAlgorithm || isSorting;

  if (hasAlgorithm) {
    codeSection.style.display = 'block';
    displayCode(currentAlgorithm, 'python');
  } else {
    codeSection.style.display = 'none';
  }
}

function generateRandomData() {
  const count = 8 + Math.floor(Math.random() * 5);
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 90) + 10);
  }
  document.getElementById('dataInput').value = data.join(', ');
  updateUI();
}

async function handleSort() {
  const dataInput = document.getElementById('dataInput');
  const inputValue = dataInput.value.trim();

  const numbers = inputValue.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

  if (numbers.some(isNaN)) {
    alert('Please enter valid numbers separated by commas.');
    return;
  }

  if (numbers.length < 2) {
    alert('Please enter at least 2 numbers to sort.');
    return;
  }

  currentData = [...numbers];
  isSorting = true;
  updateUI();

  const visualizationSection = document.getElementById('visualizationSection');
  visualizationSection.style.display = 'block';

  const statsContainer = document.getElementById('statsContainer');
  const startTime = performance.now();
  let comparisons = 0;
  let swaps = 0;

  statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Comparisons</div>
      <div class="stat-value" id="comparisonCount">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Swaps</div>
      <div class="stat-value" id="swapCount">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Time (ms)</div>
      <div class="stat-value" id="timeCount">0</div>
    </div>
  `;

  const updateStats = (comp, swap) => {
    comparisons = comp;
    swaps = swap;
    document.getElementById('comparisonCount').textContent = comp;
    document.getElementById('swapCount').textContent = swap;
    const elapsed = (performance.now() - startTime).toFixed(2);
    document.getElementById('timeCount').textContent = elapsed;
  };

  try {
    await sortingAlgorithms[currentAlgorithm](currentData, renderVisualization, updateStats);

    const finalTime = (performance.now() - startTime).toFixed(2);
    document.getElementById('timeCount').textContent = finalTime;

    await renderVisualization(currentData, [], true);
  } catch (error) {
    console.error('Sorting error:', error);
    alert('An error occurred during sorting.');
  }

  isSorting = false;
  updateUI();
}

function displayCode(algorithm, language) {
  const codeDisplay = document.getElementById('codeDisplay');
  const code = algorithmCodes[algorithm]?.[language] || 'Code not available';

  codeDisplay.innerHTML = `
    <div class="code-content active">
      <pre>${escapeHtml(code)}</pre>
    </div>
  `;
}

function switchCodeTab(language) {
  const tabs = document.querySelectorAll('.code-tab');
  tabs.forEach(tab => {
    if (tab.dataset.lang === language) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  displayCode(currentAlgorithm, language);
}

function toggleCodeSection() {
  const codeContent = document.getElementById('codeContent');
  const toggleBtn = document.getElementById('toggleCodeBtn');
  const toggleText = toggleBtn.querySelector('span');
  const toggleIcon = toggleBtn.querySelectorAll('span')[1];

  if (codeContent.classList.contains('expanded')) {
    codeContent.classList.remove('expanded');
    toggleText.textContent = 'Show Code';
    toggleIcon.textContent = '▼';
  } else {
    codeContent.classList.add('expanded');
    toggleText.textContent = 'Hide Code';
    toggleIcon.textContent = '▲';
  }
}

function downloadPerformanceData() {
  const csvContent = `Algorithm,Best Case,Average Case,Worst Case,Space Complexity,Stable
Bubble Sort,O(n),O(n²),O(n²),O(1),Yes
Selection Sort,O(n²),O(n²),O(n²),O(1),No
Insertion Sort,O(n),O(n²),O(n²),O(1),Yes
Merge Sort,O(n log n),O(n log n),O(n log n),O(n),Yes
Quick Sort,O(n log n),O(n log n),O(n²),O(log n),No
Heap Sort,O(n log n),O(n log n),O(n log n),O(1),No`;

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sorting_algorithms_complexity.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener('DOMContentLoaded', initializeApp);
