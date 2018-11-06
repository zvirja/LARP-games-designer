import { EntityType } from "../domain/entity";

export function mapEntityTypeToIcon(type: EntityType): string {
  switch (type) {
    case EntityType.Character: return 'face';
    case EntityType.Goal: return 'my_location';
    case EntityType.Inventory: return 'beach_access';

    default: return ''
  }
}

export function mapEntityTypeToLabel(type: EntityType, plural: boolean = false): string {
  const index = plural ? 1 : 0;

  switch (type) {
    case EntityType.Character: return ['Character', 'Characters'][index];
    case EntityType.Goal: return ['Goal', 'Goals'][index];
    case EntityType.Inventory: return ['Item', 'Items'][index];

    default: return '';
  }
}
