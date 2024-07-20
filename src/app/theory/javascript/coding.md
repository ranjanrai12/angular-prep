#### Reverse the string

string: welcome to coding round!
Output: '! d n u o r g n i d o c o t e m o c l e w'

```
function reversedString(string) {
    return string.split('').reverse().join(' ')
}
reversedString('welcome to coding round!')
```

#### Reverse the string and position should be same

string: welcome to coding round!
outout: 'emoclew ot gnidoc !dnuor'

```
function reversedString(string) {
    var reversedArr = []
    for(var i = 0; i < textArr.length; i++) {
        reversedArr.push(textArr[i].split('').reverse().join(''))
    }
    return reversedArr.join(' ')
}

reversedString('welcome to coding round!')
```

#### Write a JavaScript program to find the maximum number in an array.

```
function maxNumber(arr) {
    var maxNumber = arr.sort((a,b) => a-b)
    return maxNumber[maxNumber.length-1]

    // return Math.max(…arr);
}
maxNumber([2,1,23,1,3,0])
```

Without using inbuit function

```
function maxNumber(arr) {
    if (arr.length === 0) {
        return 'Array cannot be empty'
    }
    var max = arr[0]; // initialize the max number
    for(var i=0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
maxNumber([234,34]) //234
```

#### Write a JavaScript function to check if a given string is a palindrome (reads the same forwards and backwards).

```
function palindrome(string) {
    var reverseString = string.split('').reverse().join('')
    return string === reverseString
}
palindrome('aba') // true
palindrome('abaa') // false
```

without using builtin function

```
function palindrome(str) {
    if (str.length === 0) {
        return 'string cannot be empty'
    }
    var reverseString = ''
    for(var i = str.length-1; i>=0; i--) {
        reverseString += str[i]
    }
    return str === reverseString
}
palindrome('aba') // true
palindrome('abaa') // false
```

#### Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers.

```
function onlyEvenNumber(arr) {
    return arr.filter((item) => item % 2 === 0)
}
onlyEvenNumber([2,4,1,2,3]) // [2,4,2]
```

```
function onlyEvenNumber(arr) {
    var even = [];
    for(var i=0; i< arr.length; i++) {
        if(arr[i] %2 === 0) {
            even.push(arr[i])
        }
    }
    return even
}
onlyEvenNumber([2,4,1,2,3]) // [2,4,2]
```
