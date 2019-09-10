import { AfterViewInit, Component, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { MapInfo } from '../../../shared/models/map-info';

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

  pixiLoaded = false;

  drawingWall = false;

  drawingGraphic;

  drawingLine;

  mapInfo: MapInfo = new MapInfo();

  initialPointerLocation;

  constructor(private ngZone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  scrollHandler(event) {
    this.resizePixi();
  }

  setIsDrawingWall(value: boolean) {
    this.ngZone.run(() => {
      this.drawingWall = value;
    });

    if (value) {
      this.drawingGraphic = new PIXI.Graphics();
      this.drawingGraphic.interactive = true;
      this.drawingGraphic.hitArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

      this.drawingLine = undefined;

      this.drawingGraphic.on('pointermove', (event) => {
        if (this.drawingLine) {
          const mouseX = event.data.global.x;
          const mouseY = event.data.global.y;

          this.drawingLine.clear();
          this.drawingLine.lineStyle(10, 0x000000, 1);
          this.drawingLine.moveTo(this.initialPointerLocation[0], this.initialPointerLocation[1]);
          this.drawingLine.lineTo(
            Math.abs(this.initialPointerLocation[0] - mouseX) < 10 ? this.initialPointerLocation[0] : mouseX,
            Math.abs(this.initialPointerLocation[1] - mouseY) < 10 ? this.initialPointerLocation[1] : mouseY
          );
        }
      });

      this.drawingGraphic.on('pointerdown', (event) => {
        const mouseX = event.data.global.x;
        const mouseY = event.data.global.y;
        this.initialPointerLocation = [mouseX, mouseY];

        if (this.drawingLine) {
          this.mapInfo.lines.push({ ...this.drawingLine });
          this.drawingLine = undefined;
        } else {
          this.drawingLine = new PIXI.Graphics();
          this.drawingLine.lineStyle(10, 0x000000, 1);
          this.drawingLine.moveTo(mouseX, mouseY);
          this.pApp.stage.addChild(this.drawingLine);
        }
      });

      this.pApp.stage.addChild(this.drawingGraphic);
    } else {
      this.pApp.stage.removeChild(this.drawingGraphic);
      this.drawingGraphic = undefined;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this.pApp = new PIXI.Application({
          autoResize: true,
          backgroundColor: 0xffffff,
          width: this.pixiContainer.nativeElement.clientWidth,
          height: window.innerHeight - 120,
        });
      });

      this.pApp.stage.interactive = true;
      this.pixiContainer.nativeElement.appendChild(this.pApp.view);
      this.pixiLoaded = true;
    }, 100);
  }

  resizePixi() {
    this.pApp.renderer.resize(this.pixiContainer.nativeElement.clientWidth, window.innerHeight - 120);
  }

  ngOnDestroy(): void {
    this.pApp.destroy();
  }
}
