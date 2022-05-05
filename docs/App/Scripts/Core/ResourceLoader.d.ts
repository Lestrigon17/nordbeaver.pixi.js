import * as PIXI from 'pixi.js';
export declare class ResourceLoader {
    private static _loader;
    private static _resolversQuery;
    private static _loaderQuery;
    static GetList(links: string[]): Promise<void[]>;
    static Get(link: string): Promise<PIXI.LoaderResource>;
    static OnUpdate(): void;
}
//# sourceMappingURL=ResourceLoader.d.ts.map