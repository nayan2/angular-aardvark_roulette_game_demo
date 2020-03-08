import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  size = {
    default : 'default',
    small : 'small',
    medium : 'medium',
    large : 'large',
  }

  type = {
    ballAtom: 'ball-atom',
    ballBeat: 'ball-beat',
    ballClipRotate: 'ball-clip-rotate',
    ballClipRotateMultiple: 'ball-clip-rotate-multiple',
    ballClipRotatePulse: 'ball-clip-rotate-pulse',
    ballFussion: 'ball-fussion',
    ballgridBeat: 'ball-grid-beat',
    ballgridPulse: 'ball-grid-pulse',
    ballPulse: 'ball-pulse',
    ballSpinClockwise: 'ball-spin-clockwise',
    ballSpinFade: 'ball-spin-fade',
    ballSquareSpin: 'ball-square-spin',
    ballTrianglePath: 'ball-triangle-path',
    ballZigZag: 'ball-zig-zag',
    cubeTransition: 'cube-transition',
    fire: 'fire',
    lineScale: 'line-scale',
    lineScalePulseOut: 'line-scale-pulse-out',
    pacman: 'pacman',
    squareLoader: 'square-loader'
  }

  screenMode = {
    full: true,
    default: false
  }

  constructor(private spinner: NgxSpinnerService) {}

  start = (): void => {
    this.spinner.show();
  }

  stop = (): void => {
    this.spinner.hide();
  }
}
