### Binary Search

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // index found
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // not found
}

// Example
const arr = [1, 2, 3, 4, 5, 6, 7, 10];
console.log(binarySearch(arr, 5)); // 4

```

**Notes**: Binary Search works ONLY on a sorted array
