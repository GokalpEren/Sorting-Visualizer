import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort';
import './SortingVisualizer.css'

const BAR_COLOR = 'blue';
const SELECTED_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            speed: 75,
            numberOfBars: 50,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const { numberOfBars } = this.state;
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(generateRandomInt(3, 500));
        }
        this.setState({ array });
    }

    mergeSort() {
        const { array, speed } = this.state;

        const adjustedSpeed = 101 - speed;

        if (!array || array.length === 0) {
            console.error("Array is empty or undefined, cannot perform mergeSort");
            return;
        }

        const animations = getMergeSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SELECTED_COLOR : BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * adjustedSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * adjustedSpeed);
            }
        }
    }

    quickSort() {
        const { array, speed } = this.state;
        const adjustedSpeed = (101 - speed) * 2;

        if (!array || array.length === 0) {
            console.error("Array is empty or undefined, cannot perform quickSort");
            return;
        }

        const animations = getQuickSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout (() => {
                barOneStyle.backgroundColor = SELECTED_COLOR;
                barTwoStyle.backgroundColor = SELECTED_COLOR;
            }, i * adjustedSpeed);

            setTimeout (() => {
                let temp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = temp;
            }, (i + 1) * adjustedSpeed);

            setTimeout (() => {
                barOneStyle.backgroundColor = BAR_COLOR;
                barTwoStyle.backgroundColor = BAR_COLOR;
            }, (i + 0.5) * adjustedSpeed);
        }
    }

    heapSort () {
        const { array, speed } = this.state;
        const adjustedSpeed = (101 - speed) * 2;

        if (!array || array.length === 0) {
            console.error("Array is empty or undefined, cannot perform heapSort");
            return;
        }

        const animations = getHeapSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout (() => {
                barOneStyle.backgroundColor = SELECTED_COLOR;
                barTwoStyle.backgroundColor = SELECTED_COLOR;
            }, i * adjustedSpeed);

            setTimeout (() => {
                let temp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = temp;
            }, (i + 1) * adjustedSpeed);

            setTimeout (() => {
                barOneStyle.backgroundColor = BAR_COLOR;
                barTwoStyle.backgroundColor = BAR_COLOR;
            }, (i + 0.5) * adjustedSpeed);
        }
    }

    bubbleSort () {
        const { array, speed } = this.state;
        const adjustedSpeed = (101 - speed);

        if (!array || array.length === 0) {
            console.error("Array is empty or undefined, cannot perform heapSort");
            return;
        }

        const animations = getBubbleSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout (() => {
                barOneStyle.backgroundColor = SELECTED_COLOR;
                barTwoStyle.backgroundColor = SELECTED_COLOR;
            }, i * adjustedSpeed);

            setTimeout (() => {
                let temp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = temp;
            }, (i + 1) * adjustedSpeed);

            setTimeout (() => {
                barOneStyle.backgroundColor = BAR_COLOR;
                barTwoStyle.backgroundColor = BAR_COLOR;
            }, (i + 0.5) * adjustedSpeed);
        }
    }

    setAnimationSpeed(value) {
        this.setState({ speed: parseInt(value) });
        console.log(`Animation speed set to: ${value}`);
    }

    setNumberOfBars(value) {
        this.setState({ numberOfBars: parseInt(value)});
    }

    render() {
        const { array, numberOfBars } = this.state;
    
        return (
            <div className="visualizer-container">

                <div className="controls-container">
                    <label>
                        Animation Speed:
                        <input
                            type="range"
                            min="75"
                            max="95"
                            step="1"
                            onChange={(e) => this.setAnimationSpeed(e.target.value)}
                        />
                    </label>
                    <label>
                        Number of Bars:
                        <input
                            type="range"
                            min="10"
                            max="50"
                            step="1"
                            onChange={(e) => this.setNumberOfBars(e.target.value)}
                        />
                    </label>
                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: BAR_COLOR,
                                height: `${value}px`, // The height of each bar will be set based on the array value
                                width: `${Math.max(1, 100 / numberOfBars)}%`, // Ensure the bar width is relative to the number of bars
                            }}
                        ></div>
                    ))}
                </div>
                <div className="buttons-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
    
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
