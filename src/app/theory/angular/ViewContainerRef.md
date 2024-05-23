### `What is ViewContainerRef` ?

ViewContainerRef(VCR) represents a container (DOM element) where one or more view can be dynamically `attached/removed` as a sibling to this element, that is known as viewContainerRef

#### A view container can contain:

- `host views(component template)`, which are created by instantiating a component with the `createComponent` method

- `embedded views(TemplateRef)`, which are created by instantiating a TemplateRef with the `createEmbeddedView` method

- `Get ViewContainerRef with dependency injection:`

```
    <ng-template #tpl1>
        <h1>ViewContainerRef</h1>
    </ng-template>

    @ViewChild('tpl1') tpl1: any;
    constructor(private readonly vcr: ViewContainerRef) {}
    ngAfterViewInit(): void {
        this.vcr.createEmbeddedView(this.tpl1);
    }
```

Read the docs of [Angular createEmbeddedView with Context and Injector](https://www.concretepage.com/angular/angular-createembeddedview-context-and-injector)

--- Learn more about Injector.create
--- @Inject dependency injection
