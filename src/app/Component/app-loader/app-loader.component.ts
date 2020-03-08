import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/utility/services/loader/loader.service';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit {

  bdColor="rgba(51,51,51,0.8)";
  size="medium";
  color="#fff";
  type="ball-scale-multiple";
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.color = "#4dbad1";
    this.size = this.loaderService.size.medium;
    this.type = this.loaderService.type.ballClipRotate;
  }

  
}
