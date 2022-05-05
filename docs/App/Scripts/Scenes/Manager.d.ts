import { BaseScene } from "./BaseScene";
export declare class Manager {
    static get currentScene(): BaseScene;
    private static _currentScene;
    static LoadScene(scene: typeof BaseScene): void;
}
//# sourceMappingURL=Manager.d.ts.map