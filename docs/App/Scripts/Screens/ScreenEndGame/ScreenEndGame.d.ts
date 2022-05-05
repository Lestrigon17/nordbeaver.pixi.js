import * as PIXI from "pixi.js";
import { BaseScreen } from "../BaseScreen";
export declare class ScreenEndGame extends BaseScreen {
    background: PIXI.Sprite;
    backgroundUnderLayer: PIXI.Sprite;
    titleLabel?: PIXI.Text;
    scoreCoinsLabel?: PIXI.Text;
    scoreDistanceLabel?: PIXI.Text;
    scoreTotalLabel?: PIXI.Text;
    recordOverlay?: PIXI.Sprite;
    recordContainer?: PIXI.Container;
    private _scoreCoins;
    private _scoreDistance;
    private _totalScore;
    private _isRecord;
    private _angleStarStep;
    private _starsRadius;
    private _labelsStyle;
    SetStats(totalScore?: number, coins?: number, distance?: number, isRecord?: boolean): void;
    protected OnFirstInitialize(): Promise<void>;
    protected OnUpdate(deltaTime: number): void;
    private SetRecordVisability;
    private CreateBackground;
    private CreateRecordOverlay;
    private CreateView;
    private CreateHeader;
    private CreateTotalScore;
    private CreateCoinsScore;
    private CreateDistanceScore;
    private CreateButtonClose;
    private CreateStars;
    private CreateStar;
}
//# sourceMappingURL=ScreenEndGame.d.ts.map