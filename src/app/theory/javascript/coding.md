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
