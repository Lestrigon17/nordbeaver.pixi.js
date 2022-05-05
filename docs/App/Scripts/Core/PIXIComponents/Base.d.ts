import * as PIXI from "pixi.js";
export declare class Base extends PIXI.Container {
    constructor(...args: ConstructorParameters<typeof PIXI.Container>);
    protected OnDestroy(): void;
    protected OnLoad(): void;
    protected OnUpdate(deltaTime: number): void;
    private OnDestroyed;
}
//# sourceMappingURL=Base.d.ts.map