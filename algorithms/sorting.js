const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function bubbleSort(arr, visualize, updateStats) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [j, j + 1], false);
      await delay(300);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        updateStats(comparisons, swaps);
        await visualize(arr, [j, j + 1], false);
        await delay(300);
      }
    }
  }
}

async function selectionSort(arr, visualize, updateStats) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [minIdx, j], false);
      await delay(300);

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      updateStats(comparisons, swaps);
      await visualize(arr, [i, minIdx], false);
      await delay(300);
    }
  }
}

async function insertionSort(arr, visualize, updateStats) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [j, j + 1], false);
      await delay(300);

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        updateStats(comparisons, swaps);
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
    await visualize(arr, [j + 1], false);
    await delay(300);
  }
}

async function mergeSort(arr, visualize, updateStats) {
  let comparisons = 0;
  let swaps = 0;

  async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [left + i, mid + 1 + j], false);
      await delay(300);

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      swaps++;
      updateStats(comparisons, swaps);
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      swaps++;
      updateStats(comparisons, swaps);
      await visualize(arr, [k], false);
      await delay(200);
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      swaps++;
      updateStats(comparisons, swaps);
      await visualize(arr, [k], false);
      await delay(200);
      j++;
      k++;
    }
  }

  async function mergeSortHelper(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  }

  await mergeSortHelper(arr, 0, arr.length - 1);
}

async function quickSort(arr, visualize, updateStats) {
  let comparisons = 0;
  let swaps = 0;

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [j, high], false);
      await delay(300);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        updateStats(comparisons, swaps);
        await visualize(arr, [i, j], false);
        await delay(300);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    updateStats(comparisons, swaps);
    await visualize(arr, [i + 1, high], false);
    await delay(300);

    return i + 1;
  }

  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }

  await quickSortHelper(arr, 0, arr.length - 1);
}

async function heapSort(arr, visualize, updateStats) {
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [left, largest], false);
      await delay(200);

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      comparisons++;
      updateStats(comparisons, swaps);
      await visualize(arr, [right, largest], false);
      await delay(200);

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      updateStats(comparisons, swaps);
      await visualize(arr, [i, largest], false);
      await delay(300);

      await heapify(arr, n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    updateStats(comparisons, swaps);
    await visualize(arr, [0, i], false);
    await delay(300);

    await heapify(arr, i, 0);
  }
}

export const sortingAlgorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort
};
