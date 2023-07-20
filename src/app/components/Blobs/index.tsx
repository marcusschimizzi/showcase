'use client';

import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import Orb from '../../utils/Orb';
import { scaledRandom } from '../../utils/utils';
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface BlobsProps {
    colors: PIXI.ColorSource[];
    background?: PIXI.ColorSource;
}

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

export default function Blobs({ colors, background = 0x000000 }: BlobsProps) {
    const app = useRef<PIXI.Application>();

    useEffect(() => {
        if (app.current) {
            app.current.renderer.background.color = background;
        } else {
            app.current = new PIXI.Application({
                view: document.getElementById('blobs-canvas') as HTMLCanvasElement,
                resizeTo: window,
                backgroundColor: background,
            });

            app.current.stage.filters = [new KawaseBlurFilter(25, 15, true)];

            const orbs: Orb[] = [];
            const orbCount = 15;
            for (let i = 0; i < orbCount; i++) {
                const orb = new Orb(colors[~~scaledRandom(0, colors.length)]);
                app.current.stage.addChild(orb.graphics);
                orbs.push(orb);
            }

            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                app.current.ticker.add(() => {
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
        }
    }, [background, colors]);

    return (
        <div className="blobs" style={{ zIndex: 0 }}>
            <StyledCanvas id="blobs-canvas" />
        </div>
    );
}
