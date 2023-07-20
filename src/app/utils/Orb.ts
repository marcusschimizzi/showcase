import * as PIXI from 'pixi.js';
import { createNoise2D } from 'simplex-noise';
import debounce from 'debounce';
import { scaledRandom, map } from './utils';

const simplex = createNoise2D();

class Orb {
    bounds: { x: { min: number; max: number }; y: { min: number; max: number } };
    x: number;
    y: number;
    scale: number;
    fill: PIXI.ColorSource;
    radius: number;
    xOff: number;
    yOff: number;
    inc: number;
    graphics: PIXI.Graphics;
    constructor(fill: PIXI.ColorSource = 0x000000) {
        // the area an orb is allowed to move in
        this.bounds = this.setBounds();

        // initialize the orb's position to a random position within its bounds
        this.x = scaledRandom(this.bounds.x.min, this.bounds.x.max);
        this.y = scaledRandom(this.bounds.y.min, this.bounds.y.max);

        // initialize scale, fill, and radius
        this.scale = 1;
        this.fill = fill;
        this.radius = scaledRandom(window.innerHeight / 6, window.innerHeight / 3);

        this.xOff = scaledRandom(0, 1000);
        this.yOff = scaledRandom(0, 1000);
        this.inc = 0.002;

        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 0.825;

        window.addEventListener(
            'resize',
            debounce(() => {
                this.bounds = this.setBounds();
            }, 250),
            { passive: true },
        );
    }

    setBounds() {
        // how far from the origin each orb can move
        const maxDistance = window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;

        // x,y origin for the orb
        const originX = window.innerWidth / 1.25;
        const originY = window.innerWidth < 1000 ? window.innerHeight : window.innerHeight / 1.375;

        return {
            x: {
                min: originX - maxDistance,
                max: originX + maxDistance,
            },
            y: {
                min: originY - maxDistance,
                max: originY + maxDistance,
            },
        };
    }

    update() {
        // compute random noise
        const xNoise = simplex(this.xOff, this.xOff);
        const yNoise = simplex(this.yOff, this.yOff);
        const scaleNoise = simplex(this.xOff, this.yOff);

        // map noise (0-1) to bounds of orb
        this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
        this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);
        // map scale noise (0-1) to between half and 100% of orb's original size
        this.scale = map(scaleNoise, -1, 1, 0.5, 1);

        this.xOff += this.inc;
        this.yOff += this.inc;
    }

    render() {
        // update graphics position and scale
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.scale.set(this.scale);

        // clear currently drawn graphics
        this.graphics.clear();

        this.graphics.beginFill(this.fill);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }
}

export default Orb;
