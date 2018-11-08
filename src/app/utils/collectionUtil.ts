export function getDiff<T>(
  itemsBefore: Iterable<T>,
  itemsAfter: Iterable<T>,
  idPicker: (item: T) => number,
  isSame: (item1: T, item2: T) => boolean): { new: T[], updated: T[], deleted: T[] } {

  let newItems: T[] = [];
  let updated: T[] = [];

  const itemsBeforeSet = new Map<number, T>(Array.from(itemsBefore).map(x => [idPicker(x), x] as [number, T]));

  for (const item of itemsAfter) {
    const id = idPicker(item);

    const before = itemsBeforeSet.get(id);
    if (typeof before !== 'undefined') {
      itemsBeforeSet.delete(id);

      if (!isSame(before, item)) {
        updated.push(item)
      }
    } else {
      newItems.push(item);
    }
  }

  return {
    new: newItems,
    deleted: Array.from(itemsBeforeSet.values()),
    updated: updated
  }
}
