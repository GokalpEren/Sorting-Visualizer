export function getHeapSortAnimations (array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }

    let size = array.length;
    for (let i = size / 2 - 1; i >= 0; i--) {
        heapify (array, size, i, animations);
    }

    for (let i = size - 1; i > 0; i--) {
        swap (array, 0, i, animations);
        heapify (array, i, 0, animations);
    }

    return animations;
}

function heapify (array, size, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swap (array, i, largest, animations);
        heapify (array, size, largest, animations);
    }
}

export function swap (array, first, second, animations) {
    let temp = array[first];
    array [first] = array [second];
    array [second] = temp;
    animations.push([first, second]);
}