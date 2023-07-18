'use client';

import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import Orb from '../../utils/Orb';
import { scaledRandom } from '../../utils/utils';
import './Blobs.css';
import { useEffect } from 'react';

export default function Blobs() {
    useEffect(() => {
        const colors = [0x1f5abd, 0x5435b3, 0x8910a8];
        const app = new PIXI.Application({
            view: document.getElementById('blobs-canvas') as HTMLCanvasElement,
            resizeTo: window,
        });

        app.stage.filters = [new KawaseBlurFilter(25, 5, true)];

        const orbs: Orb[] = [];
        const orbCount = 15;
        for (let i = 0; i < orbCount; i++) {
            const orb = new Orb(colors[~~scaledRandom(0, colors.length)]);
            app.stage.addChild(orb.graphics);
            orbs.push(orb);
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            app.ticker.add(() => {
                orbs.forEach((orb) => {
                    orb.update();
                    orb.render();
                });
            });
        } else {
            orbs.forEach((orb) => {
                orb.update();
                orb.render();
            });
        }
    }, []);

    return (
        <div className="blobs" style={{ zIndex: 0 }}>
            <canvas id="blobs-canvas" />
        </div>
    );
}
