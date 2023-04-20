import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-size',
  template: `
    <button
      nz-button

      nzShape="round"
      *ngFor="let a of arr"
      (click)="buttonClick(a, id)"
    >
      <span nz-icon [nzType]="a" nzTheme="outline"></span>
    </button>
  `,
  styles: [
    `
      [nz-button] {
        background-color: #e91e63;
        color:white;
        border: none;
        margin: 1em;

        }


      nz-button-group [nz-button] {
        margin-right: 0;
      }
    `,
  ],
})
export class NzDemoButtonSizeComponent {
  size: NzButtonSize = 'large';

  @Input() arr!: string[];
  @Input() id!: number;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  buttonClick(a: string, id: number) {
    this.onClick.emit({ a: a, id: id });
  }
}
