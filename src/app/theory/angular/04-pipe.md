### What is Pipes ?

Pipe takes the data as input and transform the data
Synatax:
`Expression | pipeOperator[:pipeArguments]`

Expression: is the expression, which you want to transform
| : is the Pipe Character
pipeOperator : name of the Pipe
pipeArguments: arguments to the Pipe

Example: {{toDate | date}}

- `Passing arguments to pipes`: We can also pass `optional arguments` to the pipe. The arguments are added to the pipe using a colon `(:)`

  Example: {{toDate | date:'medium'}}

- `Chaining Pipes`: Pipes can be chained together to make use of multiple pipes in one expression.

Example: toDate | date | uppercase (flow from left to right)

### Angular Built-in pipes

- `DatePipe`: <p>{{ today | date }}</p>
- `UpperCasePipe`: {{ 'hello world' | uppercase }}
- `LowerCasePipe`:{{ 'HELLO WORLD' | lowercase }}
- `CurrencyPipe`: {{ 1234.56 | currency }} // default USD.
- `PercentPipe`: {{ 0.1234 | percent }}
- `SlicePipe`:
<p>{{ 'abcdefghij' | slice:2:5 }}</p> <!-- Output: cde -->
<p>{{ [1, 2, 3, 4, 5] | slice:1:3 }}</p> <!-- Output: [2, 3] -->

- `JsonPipe`:

```ts
<p>{{ {name: 'Angular', version: 11} | json }}</p> <!-- Output: {"name":"Angular","version":11} -->

```

- `KeyValuePipe`:

```ts
<p *ngFor="let item of {a: 1, b: 2, c: 3} | keyvalue">{{ item.key }}: {{ item.value }}</p>
<!-- Output:
a: 1
b: 2
c: 3
-->

```

- `AsyncPipe`:

```ts
data$: Observable<string> = of('Hello, AsyncPipe!');

<p>{{ data$ | async }}</p> <!-- Output: Hello, AsyncPipe! -->
```

### How to create custom pipe?

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {
  transform(n: number, extension: string = 'Kilograms') {
    return (n * 1000).toFixed(2) + extension;
  }
}
```

### Pure and impure pipe

When writing a `custom pipe` in Angular we can specify whether we want a pure or an impure pipe

```ts
@Pipe({
  name: 'demo',
  pure: false / true // here (default is `true`)
})
export class DemoPipe {}
```

- `Pure Pipe`: A pure pipe is `only called when Angular detects a change in the value` or the parameters passed to a pipe.

```ts
@Pipe({
  name: 'filterPipe',
  pure: true
})
export class FilterPipe {}
```

- `Impure pipe`:An impure pipe is `called for every change detection` cycle no matter whether the value or parameter(s) changes.

```ts
@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipe
```

### Difference between pipe and directive

use `pipes` for data `transformation` and `formatting` within `templates` to enhance readability and maintainability.

`Example` formatting dates, numbers, currencies, or uppercase/lowercase conversions.

Use `directives` for `DOM manipulation`, implementing complex interactions, and reusable behavior.

`Examples` include toggling visibility, dynamically adding event listeners, or creating custom behavior.

### In your project how may pipes you have created ?

**phoneFormat**: Phone number display with country code like just have work with only egyptian bank.

**timeAgo**: Social media (relative timestamps like "2h ago").

**truncate**: Truncate the long string.

**statusBadge**: color code status label.

**capitalize pipe**: To make first later in capital format.

**values pipe**: to get all the **values** of object in array format and can be use for iteration.

**keys pipe**: to get all the **keys** of object in array format and can be use for iteration.

IN BM Project

- **BmNumberFormatPipe**
- **DateTranslatePipe**
- **TranslateDatePipe**
- **BmCurrencyPipe**
- **AccountFilterPipe**
- **FilterPipe**
- **CardFilter**
- **ValueByKeyPipe**
- **FilterListPipe**
- **IpnBulkMapDynamicTranslatePipe**
- **FileDirectionPipe**
- **BmLegacyNumberPipe**
- **BmAcronymNamePipe**
- **TransFormCustomerNamePipe**
- **CcFilterByErrorsPipe**
