/// <reference path="../../../../App/Scripts/Scenes/index.d.ts" />
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";
import { SceneGame } from "./SceneGame/SceneGame";
import { SceneStart } from "./SceneStart/SceneStart";
export * from "./Manager";
export * from "./SceneStart/SceneStart";
export * from "./SceneGame/SceneGame";
export declare class Scenes {
    static BaseScene: typeof BaseScene;
    static Manager: typeof Manager;
    static List: {
        Start: typeof SceneStart;
        Game: typeof SceneGame;
    };
}
//# sourceMappingURL=index.d.ts.map