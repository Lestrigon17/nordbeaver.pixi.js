import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";

const { Enviroment} = Config.Sprites.Sheets;
const { sides } = Enviroment.sprites.building;
export class SideRight extends Base {
	public allowHeight: number = 0;
	
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