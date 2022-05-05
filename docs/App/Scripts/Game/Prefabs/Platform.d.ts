import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
export declare class Platform extends Core.PIXIComponents.Base {
    floorSprite?: PIXI.Sprite;
    buldingLayer: PIXI.Container;
    backgroundLayer: PIXI.Container;
    foregroundLayer: PIXI.Container;
    isRequireSpawnView: boolean;
    private _spriteSheet?;
    private _treesTexture;
    private _foregroundTextures;
    protected OnLoad(): void;
    private CreateView;
    private CreateBuilding;
    private SpawnBackground;
    private CreateFloor;
    private CreateClouds;
    private CreateCoins;
    private CreateJumper;
    private CreateBallon;
    private CreateStoppers;
}
//# sourceMappingURL=Platform.d.ts.map