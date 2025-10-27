export async function renderVisualization(data, comparingIndices = [], isSorted = false) {
  const container = document.getElementById('visualizationContainer');
  if (!container) return;

  const maxValue = Math.max(...data);
  const containerHeight = 250;

  container.innerHTML = data.map((value, index) => {
    const height = (value / maxValue) * containerHeight;
    const width = Math.max(20, Math.floor(container.offsetWidth / data.length) - 6);

    let className = 'bar';
    if (isSorted) {
      className += ' sorted';
    } else if (comparingIndices.includes(index)) {
      className += ' comparing';
    }

    return `
      <div class="${className}" style="height: ${height}px; width: ${width}px;">
        <span class="bar-value">${value}</span>
      </div>
    `;
  }).join('');
}
