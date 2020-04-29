import { Component } from '@angular/core';
import {NbLoginComponent, NbRegisterComponent} from '@nebular/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent extends NbRegisterComponent {
}
