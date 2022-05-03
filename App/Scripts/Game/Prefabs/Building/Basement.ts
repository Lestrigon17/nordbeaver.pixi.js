import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";
import { BaseToWall } from "./BaseToWall";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";

const { Enviroment} = Config.Sprites.Sheets;
const { basements } = Enviroment.sprites.building;
export class Basement extends Base {
	private _sprites: string[] = [
		basements[1],
		basements[2]
	]

	public allowConstrains = {
		right: [Basement, BaseToWall, SideRight],
		left: [SideLeft],
		up: [BaseToWall]
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