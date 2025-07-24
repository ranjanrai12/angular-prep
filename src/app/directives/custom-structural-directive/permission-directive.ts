import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective {
  constructor(private readonly viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}
  @Input() set appPermission(permissions: string[]) {
    const userPermissions = ['admin', 'auth']; // Example user permissions, replace with actual logic
    const hasPermission = permissions.some((permission) => userPermissions.includes(permission));
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
