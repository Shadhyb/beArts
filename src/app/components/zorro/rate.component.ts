import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-basic',
  template: `<nz-rate [nzDisabled]="disabled" nzAllowHalf [(ngModel)]="rate"></nz-rate> `
})
export class NzDemoRateBasicComponent {
  @Input() rate: number = 0;
  @Input() disabled:boolean = false;
}
