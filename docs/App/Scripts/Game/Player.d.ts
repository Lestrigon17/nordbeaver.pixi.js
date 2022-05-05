import * as PIXI from 'pixi.js';
import { Core } from "../Core";
export declare enum EPlayerState {
    Jump = 0,
    InFall = 1,
    OnGround = 2
}
export declare class Player extends Core.PIXIComponents.Base {
    static EPlayerState: typeof EPlayerState;
    scoreDistance: number;
    scoreCoins: number;
    playerSprite: PIXI.Sprite;
    currentSpeed: number;
    targetSpeed: number;
    maxSpeed: number;
    lastSpeedUp: number;
    speedUpTime: number;
    currentJumpHeight: number;
    targetJumpHeight: number;
    maxJumpHeight: number;
    jumpHeightSpeed: number;
    fallHeightSpeedStart: number;
    jumpTime: number;
    get state(): EPlayerState;
    isActive: boolean;
    private _state;
    private _defaultPosition?;
    private _currentLerpJump;
    private _fallTime;
    private _scoreDistanceLabel?;
    private _OnKeyUpBounded?;
    SmallJump(): void;
    BigJump(): void;
    BackToGround(): void;
    private Jump;
    private AddTargetJumpHeight;
    private SetTargetJumpHeight;
    SetDefaultPosition(position: PIXI.IPointData): void;
    OnJumpClick(): void;
    SpeedUp(): void;
    Kill(): void;
    protected OnLoad(): void;
    protected OnDestroy(): void;
    protected OnUpdate(deltaTime: number): void;
    private LoadView;
}
//# sourceMappingURL=Player.d.ts.map