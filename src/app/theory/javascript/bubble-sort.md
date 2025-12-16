## Bubble Sort

```js
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// Example
console.log(bubbleSort([5,1,3,2,1,6,7,10,4]));

// Output: [1, 1, 2, 3, 4, 5, 6, 7, 10]
```
