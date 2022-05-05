import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from "../../Core";
import { Logger } from '../../Logger';
import { PlayerItem } from './PlayerItem';

const { UI: UISprites, UIBackgrounds_1: UIBackgrounds } = Config.Sprites.Sheets;
const {
	top,
	topScore,
	middle,
	middleScore
} = UISprites.sprites.leaderboardBackgrounds


export type TPlayerItemSetting = {
	posY: number
}
type TPlace = {
	isTop: boolean,
	place?: number,
	name: string,
	score: string
}

const CPlayerTemplate: TPlace[] = [
	{isTop: true, place: 1, name: "ASdf2114", score: "9999"},
	{isTop: true, place: 2, name: "GG", score: "2535"},
	{isTop: true, place: 3, name: "FAgsdgsg", score: "354"},
	{isTop: false, place: 4, name: "Lgfs", score: "5"},
	{isTop: false, place: 5, name: "-", score: "-"},
	{isTop: false, place: 6, name: "-", score: "-"},
	{isTop: false, place: 7, name: "-", score: "-"},
	{isTop: false, place: 8, name: "-", score: "-"},
	{isTop: false, place: 9, name: "-", score: "-"},
	{isTop: false, place: 10, name: "-", score: "-"},
]

export class Page extends Core.PIXIComponents.Base {
	@Core.EventHandler.Instantiate()
	public OnReady!: Types.Core.EventHandler;

	public name: string = "";

	private _players: PlayerItem[] = [];
	private _marginTop: number = 20;
	private _marginMiddle: number = 12;

	protected OnLoad(): void {
		Core.ResourceLoader.Get(UISprites.path)
			.then((res) => {
				this.CreateView(res);
			});
	}

	public Show(): void {
		this.visible = true;
		this._players.forEach((player, index) => {
			setTimeout(() => {
				player && player.Show();
			}, 50 * index);
		})
	}

	public Hide(): void {
		this.visible = false;
		this._players.forEach((player) => {
			player.Hide();
		})
	}

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UISprites.path);
			return;
		}

		this.CreatePlayers();
	}

	private CreatePlayers(): void {
		this.CreatePlayer(0);
	}

	private CreatePlayer(index: number): void {
		const playerSetting = CPlayerTemplate[index];
		if (!playerSetting) {
			this.OnReady.Invoke();
			return;
		}

		const lastPlayer = this._players[this._players.length - 1]
		const posY = lastPlayer ? 
					   lastPlayer.position.y + lastPlayer.height / 2 + (
						   playerSetting.isTop ? this._marginTop : this._marginMiddle
					   ) : 
					   0;

		const player = new PlayerItem();
		player.setParent(this);
		player.position.set(0, posY);
		player.visible = false;
		player.OnReady.Subscribe(() => {
			player.CreateView(playerSetting.isTop, ""+playerSetting.place);
			if (player.labelName) player.labelName.text = playerSetting.name;
			if (player.labelScore) player.labelScore.text = ""+playerSetting.score;

			this.CreatePlayer(++index);
		});
		this._players.push(player);
	}
}