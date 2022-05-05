import * as PIXI from "pixi.js";
import { Config } from "../../Configs";
import { Core } from "../../Core";

const { UI: UISprites, UIBackgrounds_1: UIBackgrounds } = Config.Sprites.Sheets;
const {
	top,
	topScore,
	middle,
	middleScore
} = UISprites.sprites.leaderboardBackgrounds

const LabelColors = {
	top: {
		1: "#c16001",
		2: "#205caf",
		3: "#8a1a00"
	},
	middle: "#333333"
}

export class PlayerItem extends Core.PIXIComponents.Base {
	public labelName?: PIXI.Text;
	public labelScore?: PIXI.Text;
	public labelPlace?: PIXI.Text;

	@Core.EventHandler.Instantiate()
	public OnReady!: Types.Core.EventHandler;

	private _spriteSheet?: PIXI.LoaderResource;
	
	protected OnLoad(): void {
		Core.ResourceLoader.Get(UISprites.path)
			.then((res) => {
				this._spriteSheet = res;
				this.OnReady.Invoke();
			});
	}

	public Show(): void {
		Core.SoundPlayer.PlaySound("ButtonPress");
		this.visible = true;
	}

	public Hide(): void {
		this.visible = false;
	}

	public CreateView(
		isTop: boolean,
		place: string = "1"
	): void {
		const spriteSheet = this._spriteSheet;
		if (!spriteSheet || !spriteSheet.textures) return;

		const textureName = isTop ? top[place as keyof typeof top] : middle;
		const textureScore = isTop ? topScore : middleScore;
		const placeNum = +place as keyof typeof LabelColors.top;
		const textColor = isTop ? LabelColors.top[placeNum] : LabelColors.middle;
		const textSize = isTop ? "60px" : "45px";

		const backgroundName = new PIXI.Sprite();
		backgroundName.setParent(this);
		backgroundName.texture = spriteSheet.textures![textureName];
		backgroundName.anchor.set(1, 0.5);
		backgroundName.scale.set(0.6);
		backgroundName.position.set(90, 0);

		const backgroundScore = new PIXI.Sprite();
		backgroundScore.setParent(this);
		backgroundScore.texture = spriteSheet.textures![textureScore];
		backgroundScore.anchor.set(0, 0.5);
		backgroundScore.scale.set(0.6);
		backgroundScore.position.set(100, 0 + 1);

		const labelName = new PIXI.Text("-");
		labelName.setParent(this);
		labelName.anchor.set(0, 0.5);
		labelName.scale.set(0.5);
		labelName.style.fontSize = textSize;
		labelName.style.fontFamily = "Krabuler";
		labelName.style.fill = textColor;
		labelName.position.set(-150, 0);
		this.labelName = labelName;

		const labelScore = new PIXI.Text("-");
		labelScore.setParent(this);
		labelScore.anchor.set(0.5);
		labelScore.scale.set(0.5);
		labelScore.style.fontSize = textSize;
		labelScore.style.fontFamily = "Krabuler";
		labelScore.style.fill = textColor;
		labelScore.position.set(backgroundScore.position.x + backgroundScore.width / 2, 0);
		this.labelScore = labelScore;

		if (!isTop) {
			const labelPlace = new PIXI.Text(""+place);
			labelPlace.setParent(this);
			labelPlace.anchor.set(0.5);
			labelPlace.scale.set(0.5);
			labelPlace.style.fontSize = "60px";
			labelPlace.style.fontFamily = "Krabuler";
			labelPlace.style.fill = "#FFFFFF";
			labelPlace.position.set(-backgroundName.width + backgroundName.position.x - 20, 0);
			this.labelPlace = labelPlace;
		}
	}
}