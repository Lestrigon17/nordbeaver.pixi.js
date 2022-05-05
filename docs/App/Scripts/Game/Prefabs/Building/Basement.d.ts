import { Base } from "./Base";
import { BaseToWall } from "./BaseToWall";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";
import { Windows } from "./Windows";
export declare class Basement extends Base {
    static allowHeight: number;
    get allowHeight(): number;
    private _sprites;
    allowConstrains: {
        right: (typeof Basement | typeof SideRight)[];
        left: (typeof SideLeft)[];
        up: (typeof Walls | typeof Basement | typeof BaseToWall | typeof Windows)[];
    };
    protected OnLoad(): void;
}
//# sourceMappingURL=Basement.d.ts.map