import * as PIXI from 'pixi.js';
import { Player } from './Player';
export declare class Session {
    get player(): Nullable<Player>;
    private _platformHeightPercent;
    private _mountainsContainer;
    private _masterContainer;
    private _speedContainer;
    private _platformSpeed;
    private _platformStorage;
    private _mountainsStorage;
    private _mouseHandler?;
    private _maxSpeed;
    private _isStared;
    private _player;
    private _isDestroyed;
    constructor(parent: PIXI.Container);
    OnPlayerClick(ev: Types.Core.PIXIComponents.EEventType): void;
    Start(): void;
    Destroy(): void;
    private InstantiatePlayer;
    private OnUpdate;
    private CheckPlayerJump;
    private InstantiateStartEntities;
    private CheckPlatforms;
    private CheckMountains;
    private SpawnNewPlatform;
    private SpawnNewMountain;
}
//# sourceMappingURL=Session.d.ts.map