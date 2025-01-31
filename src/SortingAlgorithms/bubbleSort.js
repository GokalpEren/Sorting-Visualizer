import { swap } from '../SortingAlgorithms/heapSort';

export function getBubbleSortAnimations (array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }

    let size = array.length;

    bubbleSort (array, size, animations);

    return animations;
}

function bubbleSort (array, size, animations) {
    let swapped = false;

    for (let i = 0; i < size - 1; i++) {
        swapped = false;
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j+1]) {
                swap (array, j, j+1, animations);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}