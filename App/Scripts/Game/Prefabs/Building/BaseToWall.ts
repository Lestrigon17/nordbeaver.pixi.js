import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";
import { Basement } from "./Basement";
import { Roofs } from "./Roofs";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";
import { Windows } from "./Windows";

const { Enviroment} = Config.Sprites.Sheets;
const { baseToWall } = Enviroment.sprites.building;
export class BaseToWall extends Base {
	public static allowHeight: number = 999;
	
	private _sprites: string[] = [
		baseToWall
	]

	public allowConstrains = {
		right: [BaseToWall, SideRight],
		left: [SideLeft],
		up: [Walls, Windows]
	}

	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				const id = Core.Utils.Array.GetRandom(this._sprites)!
				this.spriteTexture = spriteSheet.textures[id];
				super.OnLoad();
			})
	}
}