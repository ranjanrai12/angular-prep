#### Create your own map, reduce, filter

- `map`:

```js
Array.prototype.myMap = function (fn) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(fn.call(this, this[i], i));
  }
  return arr;
};
const arr = [1, 2];

arr.myMap((e) => e * 2); // [2, 4]
```

- `filter`:

```js
Array.prototype.myFilter = function (cb) {
  let context = this;
  const arr = [];

  for (let i = 0; i < context.length; i++) {
    if (cb.call(this, context[i], i)) {
      arr.push(context[i]);
    }
  }
  return arr;
};
const arr = [12, 345, 12];
arr.myFilter((item) => item === 12); // [12,12]
```

- `reduce`:

```js
Array.prototype.myReduce = function (cb, initialValue) {
  const context = this; // array
  let acc = initialValue;
  for (let i = 0; i < context.length; i++) {
    if (acc !== undefined) {
      acc = cb(acc, context[i]);
    } else {
      acc = context[i];
    }
  }
  return acc;
};
const arr = [12, 345, 12];
arr.myReduce((acc, curr) => {
  acc = acc + curr;
  return acc;
}, 0); // 369
```

#### write the polyfill of Object.create

Ans:

```js
Object.prototype.myCreate = function (obj) {
  const F = function () {};
  F.prototype = obj;
  return new F();
};
const ob1 = Object.myCreate({ name: 'john' });
console.log(ob1);
```

#### Write the polyfill of Promise ?

Ans:

```js
function customPromise(executor) {
  let onResolve = () => {}; // Default to a no-op function
  let onReject = () => {}; // Default to a no-op function
  let isResolved = false;
  let isRejected = false;
  let resolveValue;
  let rejectValue;

  // Then function for handling successful promise execution
  this.then = function (resolveCallback) {
    if (isResolved) {
      resolveCallback(resolveValue);
    } else {
      onResolve = resolveCallback;
    }

    // Returning this to enable chaining of then
    return this;
  };

  // Catch function for handling errors in promise execution
  this.catch = function (rejectCallback) {
    if (isRejected) {
      rejectCallback(rejectValue);
    } else {
      onReject = rejectCallback;
    }

    // Returning this to enable chaining of catch
    return this;
  };

  // Resolver function
  function resolver(data) {
    if (!isResolved && !isRejected) {
      isResolved = true;
      resolveValue = data;
      onResolve(data);
    }
  }

  // Rejecter function
  function rejecter(error) {
    if (!isResolved && !isRejected) {
      isRejected = true;
      rejectValue = error;
      onReject(error);
    }
  }

  // Calling the executor function with resolver and rejecter
  try {
    executor(resolver, rejecter);
  } catch (error) {
    rejecter(error);
  }
}

// Example usage
var p1 = new customPromise((resolve, reject) => {
  resolve('Hello');
});

p1.then((res) => {
  console.log(res); // Output: Hello
});
```

#### polyfill of JSON.stringify

```js
const JSONStringify = (obj) => {
  const isArray = (value) => {
    return Array.isArray(value) && typeof value === 'object';
  };

  const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  const isString = (value) => {
    return typeof value === 'string';
  };

  const isBoolean = (value) => {
    return typeof value === 'boolean';
  };

  const isNumber = (value) => {
    return typeof value === 'number';
  };

  // Common check for number, string and boolean value
  const restOfDataTypes = (value) => {
    return isNumber(value) || isString(value) || isBoolean(value);
  };

  // Boolean and Number behave in a same way and String we need to add extra qoutes
  if (restOfDataTypes(obj)) {
    const passQuotes = isString(obj) ? `"` : '';
    return `${passQuotes}${obj}${passQuotes}`;
  }

  // This function will be used to remove extra comma from the arrays and object
  const removeComma = (str) => {
    const tempArr = str.split('');
    tempArr.pop();
    return tempArr.join('');
  };

  // Recursive function call for Arrays to handle nested arrays
  if (isArray(obj)) {
    let arrStr = '';
    obj.forEach((eachValue) => {
      arrStr += JSONStringify(eachValue);
      arrStr += ',';
    });

    return `[` + removeComma(arrStr) + `]`;
  }

  // Recursive function call for Object to handle nested Object
  if (isObject(obj)) {
    let objStr = '';

    const objKeys = Object.keys(obj);

    objKeys.forEach((eachKey) => {
      const eachValue = obj[eachKey];
      objStr += `"${eachKey}":${JSONStringify(eachValue)},`;
    });
    return `{` + removeComma(objStr) + `}`;
  }
};

const sampleObj = {
  name: 'Sid',
  age: 29,
  engineer: true,
  expertise: ['html', 'css', 'react'],
  address: {
    city: 'New york',
    state: 'NY'
  }
};
console.log(JSON.stringify(sampleObj) === JSONStringify(sampleObj) ? 'Test case Passed' : 'Test Case Failed');
// Expected Output -> Test case Passed
```
