import { Core } from "../Core";
import { BaseEntity } from "./Entities/BaseEntity";
import { Manager } from "./Manager";

export class EntityController {
	private static _entityStore: Set<BaseEntity> = new Set();

	public static Init(): void {
		this.OnUpdate();
	}

	public static Registrate(entity: BaseEntity): void {
		this._entityStore.add(entity);

		let OnDestroy = () => {
			if (this._entityStore.has(entity)) {
				this._entityStore.delete(entity);
			}
		}

		entity.on("destroyed", OnDestroy);
	}

	public static OnUpdate(): void {
		requestAnimationFrame(EntityController.OnUpdate);

		const player = Manager.currentSession?.player;
		if (!player || !player.isActive) return;

		EntityController._entityStore.forEach((entity) => {
			if (!entity.isCollisionEnabled) return;
			const isBound = Core.Utils.PIXI.IsCollideByRectangle(player, entity);

			if (isBound) {
				entity.OnCollidePlayer(player);
				entity.isCollisionEnabled = false;
			}
		})
	}
}