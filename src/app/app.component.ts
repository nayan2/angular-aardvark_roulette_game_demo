import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RouletteGame';

  RouletteForm = this.fb.group({
    url: [environment.endPointUrl]
  });

  constructor(
    private fb: FormBuilder
  ) {}
}
