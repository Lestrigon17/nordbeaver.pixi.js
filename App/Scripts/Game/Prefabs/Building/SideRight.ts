import { ISize } from "pixi.js";
import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";

const { Enviroment} = Config.Sprites.Sheets;
const { sides } = Enviroment.sprites.building;
export class SideRight extends Base {
	public static allowHeight: number = 1;
	public get allowHeight(): number {
		return SideRight.allowHeight;
	}
	
	public size: ISize = {
		height: 125,
		width: 125
	}

	private _sprites: string[] = [
		sides.right
	]

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