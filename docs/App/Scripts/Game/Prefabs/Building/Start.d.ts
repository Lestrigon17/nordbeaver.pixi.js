import { Base } from "./Base";
import { Basement } from "./Basement";
import { BaseToWall } from "./BaseToWall";
import { Walls } from "./Walls";
import { Windows } from "./Windows";
export declare class Start extends Base {
    static allowHeight: number;
    get allowHeight(): number;
    private _sprites;
    allowConstrains: {
        right: (typeof Basement)[];
        left: (typeof Basement)[];
        up: (typeof Walls | typeof Basement | typeof BaseToWall | typeof Windows)[];
    };
    protected OnLoad(): void;
}
//# sourceMappingURL=Start.d.ts.map