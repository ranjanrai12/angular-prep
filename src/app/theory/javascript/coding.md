#### Reverse the string

string: welcome to coding round!
Output: '! d n u o r g n i d o c o t e m o c l e w'

```js
function reversedString(string) {
  return string.split('').reverse().join(' ');
}
reversedString('welcome to coding round!');
```

#### Reverse the string and position should be same

string: welcome to coding round!
outout: 'emoclew ot gnidoc !dnuor'

```js
function reversedString(string) {
  var reversedArr = [];
  for (var i = 0; i < textArr.length; i++) {
    reversedArr.push(textArr[i].split('').reverse().join(''));
  }
  return reversedArr.join(' ');
}

reversedString('welcome to coding round!');
```

Without using inbuilt function

```js
function reverseString(string) {
  let revrseValue = '';
  for (let i = string.length - 1; i >= 0; i--) {
    revrseValue += string[i];
  }
  return revrseValue;
}

function samePositionReverse(string) {
  let reverse = '';
  let current = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      reverse += reverseString(current) + ' ';
      current = '';
    } else {
      current += string[i];
    }
  }
  // handle last item
  reverse += reverseString(current);
  connsole.log(reverse); // olleH dlrow
}
samePositionReverse('Hello world');
```

#### Write a JavaScript program to find the maximum number in an array.

```js
function maxNumber(arr) {
  var maxNumber = arr.sort((a, b) => a - b);
  return maxNumber[maxNumber.length - 1];

  // return Math.max(…arr);
}
maxNumber([2, 1, 23, 1, 3, 0]);
```

Without using inbuit function

```js
function maxNumber(arr) {
  if (arr.length === 0) {
    return 'Array cannot be empty';
  }
  var max = arr[0]; // initialize the max number
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
maxNumber([234, 34]); //234
```

#### Write a JavaScript function to check if a given string is a palindrome (reads the same forwards and backwards).

```js
function palindrome(string) {
  var reverseString = string.split('').reverse().join('');
  return string === reverseString;
}
palindrome('aba'); // true
palindrome('abaa'); // false
```

without using builtin function

```js
function palindrome(str) {
  if (str.length === 0) {
    return 'string cannot be empty';
  }
  var reverseString = '';
  for (var i = str.length - 1; i >= 0; i--) {
    reverseString += str[i];
  }
  return str === reverseString;
}
palindrome('aba'); // true
palindrome('abaa'); // false
```

#### Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers.

```js
function onlyEvenNumber(arr) {
  return arr.filter((item) => item % 2 === 0);
}
onlyEvenNumber([2, 4, 1, 2, 3]); // [2,4,2]
```

```js
function onlyEvenNumber(arr) {
  var even = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      even.push(arr[i]);
    }
  }
  return even;
}
onlyEvenNumber([2, 4, 1, 2, 3]); // [2,4,2]
```

#### Write a JavaScript program to calculate the factorial of a given number.

```js
function factorial(number) {
  if (typeof number !== 'number') return 'Please provide the number';
  if (number < 0) return 'value must be >=0';
  let factorialValue = 1;
  while (number > 0) {
    factorialValue = factorialValue * number;
    number--;
  }
  return factorialValue;
}

console.log(factorial(5)); // 120
```

#### Write a JavaScript function to check if a given number is prime.

Ans: Prime numbers are numbers greater than 1 and prime number is only divisible by 1 and itself.

```js
function findPrime(number) {
  let iPrime = true;
  if (number === 1) {
    iPrime = false;
  } else {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        iPrime = false;
        break;
      }
    }
  }
  return iPrime;
}
findPrime(4);
```

#### Pair with given Sum (Two Sum) ?

```js
const arr = [1, 2, 3, 4];
function findAdd(arr, sum) {
  for (let i = 0; i < arr.length; i++) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j <= arr.length - 1; j++) {
        if (arr[i] + arr[j] === sum) {
          return true;
        }
      }
    }
  }
  return false;
}

findAdd(arr, 8); // false
findAdd(arr, 7); // true
```

#### Write a JavaScript program to find the largest element in a nested array.

```js
function findHighest(outerArr) {
  let max = -Infinity;
  function traverse(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        traverse(arr[i]);
      } else {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
    }
  }
  traverse(outerArr);
  return max;
}
findHighest([234, 234, 1, [345345, [4536365456]]]); // 4536365456
```

#### Write a JavaScript program to convert a string to title case (capitalize the first letter of each word)

```js
function firstLetterUpperCase(string) {
  let titleCase = '';
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      titleCase += string[i].toUpperCase();
    } else {
      titleCase += string[i].toLowerCase();
    }
  }
  // instead of for loop
  return titleCase;
  console.log(titleCase);
}

function handler(string) {
  let titleString = '';
  let current = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      titleString += firstLetterUpperCase(current) + ' ';
      current = '';
    } else {
      current += string[i];
    }
  }
  titleString += firstLetterUpperCase(current);
  console.log(titleString);
}
handler('hello world');
```

#### find the second highest item of the array ?

```js
function secondHighest(arr) {
  const sortArray = arr.sort((a, b) => a - b);
  const uniqArray = sortArray.reduce((acc, curr) => {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return uniqArray[uniqArray.length - 2];
}
secondHighest([1, 2, 45, 4, 2]);
```

#### handle the sorting of the array without using inbuilt function ?

```js
function sortingArray(arr) {
  let duplicateArr = [...arr];
  for (let i = 0; i < duplicateArr.length - 1; i++) {
    for (let j = i + 1; j < duplicateArr.length; j++) {
      if (duplicateArr[i] > duplicateArr[j]) {
        let temp = duplicateArr[i];
        duplicateArr[i] = duplicateArr[j];
        duplicateArr[j] = temp;
      }
    }
  }
  console.log(duplicateArr);
}
sortingArray([11111, 123, 12311, 123123]); // [123, 11111, 12311, 123123]
```

#### find the uniq items of the array ?

```js
function uniq(arr) {
  return arr.reduce((acc, curr) => {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }
    return acc;
  }, []);
}
```

```js
function findVowels(string) {
  const voweles = ['a', 'e', 'i', 'o', 'u'];
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (voweles.includes(string[i].toLowerCase())) {
      count++;
    }
  }
  return count;
}
findVowels('asdasdasd');
```

#### How to compare two object ?

Ans:

```js
let obj1 = {
  age: '23',
  name: 'ranjan'
};

let obj2 = {
  age: '23',
  name: 'ranjan',
  id: '123123'
};

function compare(obj1, obj2) {
  let flag = true;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    flag = false;
  }
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      flag = false;
      break;
    }
  }
  return flag;
}
compare(obj1, obj2); // false, because obj2 have extra id
```

https://www.keka.com/javascript-coding-interview-questions-and-answers
