import * as PIXI from 'pixi.js';
import { Core } from '../../Core';
import { Base, TContstrains } from './Building/Base';
import { Basement } from './Building/Basement';
import { BaseToWall } from './Building/BaseToWall';
import { Start } from './Building/Start';
import { Walls } from './Building/Walls';
import { Windows } from './Building/Windows';

type TDirections = Record<keyof TContstrains, PIXI.IPointData>
type TKeyDirections = keyof typeof directions;
const directions: TDirections = {
	down: {x: 0, y: -1},
	up: {x: 0, y: 1},
	left: {x: -1, y: 0},
	right: {x: 1, y: 0}
}

export class Builder {
	private static _startPart: Array<typeof Base> = [Start, Walls];

	public static CreateBuilding(): PIXI.Container {
		const parent = new PIXI.Container();

		const matrix: Base[][] = [];

		const base = this.GeneratePart(this._startPart);
		base.setParent(parent);

		matrix[base.matrixPoint.y] = [];
		matrix[base.matrixPoint.y][base.matrixPoint.x] = base;

		this.GenerateNextPart(base, matrix);

		return parent;
	}

	private static GeneratePart(parts: Array<typeof Base>): Base {
		const randomPart = Core.Utils.Array.GetRandom(parts)!;
		const partInstance = new randomPart();
		
		return partInstance;
	}

	// TODO: убрать дублирование кода
	private static GenerateNextPart(masterPart: Base, matrix: Base[][]): void {
		for (let dir in directions) {
			const parts = masterPart.allowConstrains[dir as TKeyDirections]
			const offset = directions[dir as TKeyDirections];
			if (!parts || parts.length === 0) continue;

			const instanceMatrixPoints: PIXI.IPointData = {
				x: masterPart.matrixPoint.x + offset.x,
				y: masterPart.matrixPoint.y + offset.y
			}; 

			if (masterPart.matrixPoint.x > 10) continue;

			const allowedParts = parts.filter(part => {
				let allowHeight = (part.allowHeight - 1) >= instanceMatrixPoints.y;
				let allowConstrain = true;
				let bottomItem = matrix[instanceMatrixPoints.y - 1]?.[instanceMatrixPoints.x];
				if (instanceMatrixPoints.y > 0 && !bottomItem) allowConstrain = false;
				if (bottomItem) {
					if (!bottomItem.allowConstrains.up || !bottomItem.allowConstrains.up.includes(part))
						allowConstrain = false;
				}

				return allowHeight && allowConstrain;
			});

			if (allowedParts.length === 0) continue;
			if (matrix[instanceMatrixPoints.y]?.[instanceMatrixPoints.x]) continue;

			let generatedPart = this.GeneratePart(allowedParts);
			generatedPart.setParent(masterPart.parent);
			generatedPart.matrixPoint = instanceMatrixPoints;
			generatedPart.position.set(
				masterPart.position.x + masterPart.size.width * offset.x,
				masterPart.position.y + masterPart.size.height * -offset.y
			);

			matrix[instanceMatrixPoints.y] ??= [];
			matrix[instanceMatrixPoints.y][instanceMatrixPoints.x] = generatedPart;

			this.GenerateNextPart(generatedPart, matrix);
		}
	}
}