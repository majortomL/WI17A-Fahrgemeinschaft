import { Component } from '@angular/core';

var slides = document.querySelector('ion-slides');
slides.options = {
  effect: 'flip'
}

@Component({
  selector: 'Sliderpage',
  template: `
    <ion-slides pager="true" [options]="slideOpts">
      <ion-slide>
        <h1>Slide 1</h1>
      </ion-slide>
      <ion-slide>
        <h1>Slide 2</h1>
      </ion-slide>
      <ion-slide>
        <h1>Slide 3</h1>
      </ion-slide>
    </ion-slides>
  `
})
export class Sliderpage {
  slideOpts = {
    effect: 'flip'
  };
  constructor() {}
}
