export function getQuickSortAnimations (array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }

    let n = array.length;

    quickSort (array, 0, n-1, animations);
    return animations;
}

function quickSort (array, start, end, animations) {

    if (start < end) {
        let p = partition (array, start, end, animations);
        quickSort (array, start, p - 1, animations);
        quickSort (array, p + 1, end, animations);
    }

}

function partition (array, start, end, animations) {
    let pivot = array[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (array[j] < pivot) {
            i++;
            swap (array, i, j, animations);
        }
    }

    swap (array, i+1, end, animations);
    return i + 1;
}

function swap (array, first, second, animations) {
    let temp = array[first];
    array [first] = array [second];
    array [second] = temp;
    animations.push([first, second]);
}