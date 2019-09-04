import { AfterViewInit, Component, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.scss'],
})
export class DrawMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pixiContainer')
  pixiContainer;

  public pApp: any;

  constructor(private ngZone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  scrollHandler(event) {
    this.pApp.renderer.resize(this.pixiContainer.nativeElement.clientWidth, (window as any).innerHeight - 120);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this.pApp = new PIXI.Application({
          autoResize: true,
          width: this.pixiContainer.nativeElement.clientWidth,
          height: (window as any).innerHeight - 120,
        });
      });

      this.pixiContainer.nativeElement.appendChild(this.pApp.view);
    }, 500);
  }

  ngOnDestroy(): void {
    this.pApp.destroy();
  }
}
