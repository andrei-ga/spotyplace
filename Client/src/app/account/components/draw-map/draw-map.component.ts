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

  isDrawing = false;

  mapInfo: MapInfo = new MapInfo();

  initialPointerLocation;

  snappingOffset = 10;

  wallThickness = 5;

  lastCanvasPosition;

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
      this.isDrawing = false;
      this.pApp.stage.addChild(this.drawingGraphic);
    } else {
      this.pApp.stage.removeChild(this.drawingGraphic);
      this.drawingGraphic = undefined;
    }
  }

  getSnappedCoordinates(pointerLocation: number[]): number[] {
    let snappedOnCurrentX;
    let snappedOnCurrentY;

    for (let i = 0; i < this.mapInfo.lines.length; i++) {
      const line = this.mapInfo.lines[i];
      if (line.geometry.graphicsData[0]) {
        const coords = line.geometry.graphicsData[0].points;

        if (this.isDrawing) {
          if (snappedOnCurrentX === undefined && Math.abs(pointerLocation[0] - coords[0]) < this.snappingOffset) {
            snappedOnCurrentX = coords[0];
          }
          if (snappedOnCurrentX === undefined && Math.abs(pointerLocation[0] - coords[2]) < this.snappingOffset) {
            snappedOnCurrentX = coords[2];
          }
          if (snappedOnCurrentY === undefined && Math.abs(pointerLocation[1] - coords[1]) < this.snappingOffset) {
            snappedOnCurrentY = coords[1];
          }
          if (snappedOnCurrentY === undefined && Math.abs(pointerLocation[1] - coords[3]) < this.snappingOffset) {
            snappedOnCurrentY = coords[3];
          }
          if (snappedOnCurrentX !== undefined && snappedOnCurrentY !== undefined) {
            break;
          }
        } else {
          if (
            snappedOnCurrentX === undefined &&
            Math.abs(pointerLocation[0] - coords[0]) < this.snappingOffset &&
            snappedOnCurrentY === undefined &&
            Math.abs(pointerLocation[1] - coords[1]) < this.snappingOffset
          ) {
            return [coords[0], coords[1]];
          }
          if (
            snappedOnCurrentX === undefined &&
            Math.abs(pointerLocation[0] - coords[2]) < this.snappingOffset &&
            snappedOnCurrentY === undefined &&
            Math.abs(pointerLocation[1] - coords[3]) < this.snappingOffset
          ) {
            return [coords[2], coords[3]];
          }
        }
      }
    }

    if (this.isDrawing) {
      return [
        snappedOnCurrentX !== undefined
          ? snappedOnCurrentX
          : Math.abs(this.initialPointerLocation[0] - pointerLocation[0]) < this.snappingOffset
          ? this.initialPointerLocation[0]
          : pointerLocation[0],
        snappedOnCurrentY !== undefined
          ? snappedOnCurrentY
          : Math.abs(this.initialPointerLocation[1] - pointerLocation[1]) < this.snappingOffset
          ? this.initialPointerLocation[1]
          : pointerLocation[1],
      ];
    } else {
      return pointerLocation;
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

  canvasMouseDown(event) {
    if (event.which === 1) {
      if (this.drawingWall) {
        this.initialPointerLocation = this.getSnappedCoordinates([event.offsetX - this.pApp.stage.x, event.offsetY - this.pApp.stage.y]);

        if (!this.isDrawing) {
          const newLine = new PIXI.Graphics();
          newLine.lineStyle(this.wallThickness, 0x000000, 1);
          newLine.moveTo(this.initialPointerLocation[0], this.initialPointerLocation[1]);
          this.mapInfo.lines.push(newLine);
          this.pApp.stage.addChild(newLine);
        }
        this.isDrawing = !this.isDrawing;
      } else {
        this.setLastCanvasPosition(event);
      }
    }
  }

  canvasMouseUp(event) {
    this.lastCanvasPosition = null;
  }

  canvasMouseMove(event) {
    if (this.drawingWall) {
      if (this.isDrawing) {
        const targetLocation = this.getSnappedCoordinates([event.offsetX - this.pApp.stage.x, event.offsetY - this.pApp.stage.y]);
        const currentLine = this.mapInfo.lines[this.mapInfo.lines.length - 1];

        currentLine.clear();
        currentLine.lineStyle(this.wallThickness, 0x000000, 1);
        currentLine.moveTo(this.initialPointerLocation[0], this.initialPointerLocation[1]);
        currentLine.lineTo(targetLocation[0], targetLocation[1]);
      }
    } else {
      if (this.lastCanvasPosition) {
        this.pApp.stage.x += event.offsetX - this.lastCanvasPosition.x;
        this.pApp.stage.y += event.offsetY - this.lastCanvasPosition.y;
        this.setLastCanvasPosition(event);
      }
    }
  }

  setLastCanvasPosition(event) {
    this.lastCanvasPosition = {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  ngOnDestroy(): void {
    this.pApp.destroy();
  }
}
