import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { RelationUpdate, Relation, RelationType } from 'src/app/domain/relation';
import { Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { mapEntityTypeToIcon } from '../../presentation-util';
import { Mutable } from 'src/app/domain/utils';
import * as _ from 'lodash'

const NEW_ENTRIES_ID_START = -1000;

interface EditResult {
  new?: Required<RelationUpdate>[],
  updated?: { id: number, update: RelationUpdate }[],
  deleted?: number[]
}

@Component({
  selector: 'app-edit-entity-relations-dialog',
  templateUrl: './edit-entity-relations-dialog.component.html',
  styleUrls: ['./edit-entity-relations-dialog.component.scss']
})
export class EditEntityRelationsDialogComponent implements OnInit {
  static showDialog(entityId: number, dialogService: MatDialog): void {
    dialogService.open(EditEntityRelationsDialogComponent, { data: entityId });
  }

  private newEntriesId = NEW_ENTRIES_ID_START;

  RelationType = RelationType

  entity: Entity;
  entityRelations: Relation[];
  entityRelationsEditable$ = new BehaviorSubject<Array<Mutable<Relation>>>([]);

  get entityIcon() {
    return mapEntityTypeToIcon(this.entity.type);
  }

  constructor(private readonly _dialogRef: MatDialogRef<EditEntityRelationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private entityId: number,
    private readonly _entityService: EntityService) { }

  ngOnInit() {
    this.entity = this._entityService.findEntityById(this.entityId)!;
    this.entityRelations = this._entityService.getAllEntityRelations(this.entityId);

    const mutableRelations: Mutable<Relation>[] = this.entityRelations.map(r => _.merge({}, r));
    // Swap relations so that first relation is always our ID
    mutableRelations.forEach(r => {
      if (r.entities[0] !== this.entityId) {
        r.entities = [r.entities[1], r.entities[0]]
      }
    });
    this.entityRelationsEditable$.next(mutableRelations);
  }

  removeRelation(id: number) {
    this.entityRelationsEditable$.next(_.filter(this.entityRelationsEditable$.value, x => x.id !== id));
  }

  addNew() {
    const newRelation = new Relation(this.newEntriesId--, RelationType.Auxiliary, '', [this.entityId, -1]);
    this.entityRelationsEditable$.next(_.concat(this.entityRelationsEditable$.value, { ...newRelation }));
  }

  save() {
    const snapshot = this.entityRelationsEditable$.value;
    const original = this.entityRelations;

    const deleted = _.differenceBy(original, snapshot, x => x.id).map(x => x.id);
    const created: RelationUpdate[] = _.filter(snapshot, x => x.id <= NEW_ENTRIES_ID_START);

    // Generate difference
    const potentiallyMutated = _.intersectionBy(snapshot, original, x => x.id);
    const pairs = potentiallyMutated.map(r => ({ current: r, original: _.find(original, { id: r.id })! }));
    const changed = _.compact(pairs.map(({ current, original }) => {
      let change: RelationUpdate = {};

      if (current.label !== original.label) {
        change.label = current.label;
      }

      if (current.type !== original.type) {
        change.type = current.type;
      }

      if (_.union(current.entities, original.entities).length !== 2) {
        change.entities = _.clone(current.entities);
      }

      return _.keys(change).length > 0 ? { id: original.id, update: change } : undefined;
    }));

    const editResult: EditResult = {};
    if (deleted.length > 0) {
      editResult.deleted = deleted;
    }
    if (created.length > 0) {
      // In fact, currently we don't know whether all the properties are filled.
      // But they are definitely not null, as new entity is created from prototype.
      editResult.new = created as Required<RelationUpdate>[];
    }
    if (changed.length > 0) {
      editResult.updated = changed;
    }

    this.writeToStorage(editResult);

    this._dialogRef.close(editResult);
  }

  private writeToStorage(updateResult: EditResult) {
    if (updateResult.new) {
      updateResult.new.forEach(x => this._entityService.addRelation(x.type, x.label, x.entities));
    }

    if (updateResult.deleted) {
      updateResult.deleted.forEach(id => this._entityService.deleteRelation(id));
    }

    if (updateResult.updated) {
      updateResult.updated.forEach(({ id, update }) => this._entityService.updateRelation(id, update));
    }
  }
}
