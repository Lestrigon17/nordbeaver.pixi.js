import * as PIXI from 'pixi.js';
export declare class BaseScene extends PIXI.Graphics {
    constructor(...args: ConstructorParameters<typeof PIXI.Container>);
    BeforeLoadScene(): Promise<void>;
    Start(): void;
    protected OnBeforeLoadScene(): Promise<void>;
    protected OnLoad(): void;
    protected OnStart(): void;
}
//# sourceMappingURL=BaseScene.d.ts.map