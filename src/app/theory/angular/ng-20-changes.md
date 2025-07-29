# Template Language Enhancements

## ✅ Template Literals

- You can now use JS-style string interpolation in Angular templates:

```html
<p>{{ `User id: ${userId()}` }}</p>
<img [ngSrc]="`https://i.pravatar.cc/150?u=${userId()}`" />
```

## ✅ Exponentiation Operator (`**`)

```html
<p>{{ 2 ** 3 }}</p>
<!-- Outputs: 8 -->
```

## ✅ in Operator:

Used to check object keys:

```html
@let hasMagicDamage = 'magicDamage' in attack; @if (hasMagicDamage) {
<p>{{ `Dealt ${attack.magicDamage} magic damage` }}</p>
}
```

## ✅ void Operator

Prevents return values from triggering default browser behavior:

```ts
@Directive({ host: { '(mousedown)': 'void handleMousedown()' }, })
```

# Routing Enhancements

## ✅ Asynchronous Redirects

redirectTo can now return Promise, Observable, or UrlTree:

```ts
redirectTo: () => authService.isAuthorized$.pipe(map((isAuth) => router.createUrlTree([isAuth ? 'home' : 'login'])));
```

## ✅ Abort Navigations

Stop navigation programmatically:

```ts
Router.getCurrentNavigation()?.abort();
```

# 🧱 Dynamic Components: NgComponentOutlet Upgrade

## ✅ New Inputs for NgComponentOutlet

```ts
<ng-container
  [ngComponentOutlet]="DynamicComponent"
  [ngComponentOutletInputs]="{ title: 'My Title' }"
  [ngComponentOutletContent]="contentNodes"
  [ngComponentOutletInjector]="customInjector"
/>

```

Makes dynamic component rendering easier, like RouterOutlet, but for custom components.

## ✅ Input/Output Bindings for Dynamic Components

Supports:

- inputBinding()
- outputBinding()
- twoWayBinding()
- Host directives

```ts
vcr().createComponent(AppWarningComponent, {
  bindings: [inputBinding('canClose', signal(true)), outputBinding('close', (val) => console.log(val))],
  directives: [FocusTrap]
});
```

# 🔧 Developer Tooling & DX Improvements

## ✅ Type-Checking for Host Bindings

- Host bindings like @HostBinding and @HostListener are now type-checked
- Language service shows hover tooltips and helps rename variables correctly

## ✅ Extended Diagnostics

- Nullish coalescing (??) mixed with && or || without parentheses now shows a warning

- Uninvoked track function in @for block now warns you

```html
@for (item of items; track trackByName(item)) {} // ✅ Correct
```

# 🧪 API Stability Updates

## ✅ Signal APIs Now Stable

- toSignal(), toObservable(), linkedSignal, and effect() are now stable!
- afterRender() renamed to afterEveryRender() — also stable

# 🆕 HTTP Improvements

✅ Keepalive in Fetch Requests
You can now make keepalive: true HTTP requests:

```ts
this.http.post('/api/analytics', data, { keepalive: true });
```

Used for analytics or cleanup tasks during page unload.

# 🧭 Scrolling Improvements

## ✅ ViewportScroller Supports ScrollOptions

You can now use modern ScrollOptions with:

- scrollToAnchor()
- scrollToPosition()

Reference: https://angular.love/angular-20-whats-new
