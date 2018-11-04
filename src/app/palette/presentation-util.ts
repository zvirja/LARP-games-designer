import { EntityType } from "../domain/entity";

export function mapEntityTypeToIcon(type: EntityType): string {
  switch (type) {
    case EntityType.Character: return 'face';
    case EntityType.Goal: return 'my_location';
    case EntityType.Inventory: return 'beach_access';

    default: return ''
  }
}
