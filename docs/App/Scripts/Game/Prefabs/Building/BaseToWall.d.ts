import { Base } from "./Base";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";
import { Windows } from "./Windows";
export declare class BaseToWall extends Base {
    static allowHeight: number;
    private _sprites;
    allowConstrains: {
        right: (typeof BaseToWall | typeof SideRight)[];
        left: (typeof SideLeft)[];
        up: (typeof Walls | typeof Windows)[];
    };
    protected OnLoad(): void;
}
//# sourceMappingURL=BaseToWall.d.ts.map