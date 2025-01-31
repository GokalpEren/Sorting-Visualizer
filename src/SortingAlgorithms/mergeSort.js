export function getMergeSortAnimations (array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }

    //Shallow copy of array for merging
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper (mainArray, start, end, auxiliaryArray, animations) {
    if (start == end) {
        return;
    }

    const middle = Math.floor ((start + end) / 2);
    //Auxiliary and main swap roles now
    mergeSortHelper (auxiliaryArray, start, middle, mainArray, animations);
    mergeSortHelper (auxiliaryArray, middle + 1, end, mainArray, animations);
    merge (mainArray, start, middle, end, auxiliaryArray, animations);
}

function merge (mainArray, start, middle, end, auxiliaryArray, animations) {
    let k = start;
    let i = start;
    let j = middle + 1;
    while (i <= middle && j <= end) {
        //push twice to indicate the values being compared
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray [i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    //at least one of the above conditions failed so we check individually for the rest
    while (i <= middle) {
        animations.push([i, i]);
        animations.push([i, i]);

        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}