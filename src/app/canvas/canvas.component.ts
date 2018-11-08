import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DataSet, Network, Node, Options, Edge } from 'vis'
import { EntityService } from '../domain/entity.service';
import { SelectionService } from '../domain/selection.service';
import { SelectionState } from '../domain/selection-state';
import * as _ from 'lodash';
import { EntityType } from '../domain/entity';
import { first, startWith, pairwise } from 'rxjs/operators';
import { getDiff } from '../utils/collectionUtil';
import { Relation } from '../domain/relation';

interface NetData {
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  private _network?: Network;

  constructor(private _elRef: ElementRef, private readonly _entityService: EntityService, private readonly _selectionService: SelectionService) { }

  ngOnInit() {
    const chartData: NetData = {
      nodes: new DataSet<Node>(),
      edges: new DataSet<Edge>()
    }

    this._selectionService.selectionState$.pipe(
      startWith(new SelectionState(new Set(), [])),
      pairwise(),
    ).subscribe(([prev, next]) => {
      this.applyDiff(prev, next, chartData);
    })



    // // create an array with nodes
    // const nodesArray: Node[] = [
    //   { id: 1, label: 'Node 1', shape: 'circle' },
    //   { id: 2, label: 'Node 2', shape: 'diamond', size: 20 },
    //   { id: 3, label: 'Node 3', },
    //   { id: 4, label: 'Node 4' },
    //   { id: 5, label: 'Node 5' }
    // ]
    // const nodes = new DataSet(nodesArray);

    // // create an array with edges
    // const edges = new DataSet([
    //   { from: 1, to: 3 },
    //   { from: 1, to: 2 },
    //   { from: 2, to: 4 },
    //   { from: 2, to: 5 }
    // ]);

    // provide the data in the vis format

    const options: Options = {
      // physics: {
      //   enabled: false
      // }
    };

    this._network = new Network(this._elRef.nativeElement, chartData, options);
    this._network.once('afterDrawing', () => {
      var scaleOption = { scale: 2 };
      this._network!.moveTo(scaleOption);
    })

  }

  ngOnDestroy(): void {
    if (this._network) {
      this._network.destroy();
    }
  }

  private applyDiff(prevState: SelectionState, nextState: SelectionState, data: NetData) {
    const diff = getDiff<number>(prevState.selectedEntities.values(), nextState.selectedEntities.values(), x => x, (a, b) => a === b);

    diff.new.forEach(id => this.addEntityWithRelations(id, data));
    diff.deleted.forEach(id => this.removeEntityWithRelations(id, data));
  }

  private addEntityWithRelations(entityId: number, data: NetData) {
    const newNode = this.renderNode(entityId);
    data.nodes.add(newNode);

    const existingNodes = new Set(data.nodes.getIds().map(x => x as number));
    const entityRelations = this._entityService.getAllEntityRelations(entityId);
    for (const relation of entityRelations) {
      const relatedEntity = relation.entities[0] === entityId ? relation.entities[1] : relation.entities[0];
      if (existingNodes.has(relatedEntity)) {
        data.edges.add(this.renderRelation(relation));
      }
    }
  }

  private removeEntityWithRelations(entityId: number, data: NetData) {
    data.nodes.remove(entityId);
  }

  private renderRelation(relation: Relation): Edge {
    return {
      id: relation.id,
      from: relation.entities[0],
      to: relation.entities[1],
    }
  }

  private renderNode(entityId: number): Node {
    const entity = this._entityService.findEntityById(entityId);
    if (!entity) {
      throw new Error(`Unable to find entity by id: ${entityId}.`)
    }

    let entityShape = 'box';
    switch (entity.type) {
      case EntityType.Character:
        entityShape = 'big square'
        break;

      case EntityType.Goal:
        entityShape = 'big diamond';
        break;

      case EntityType.Inventory:
        entityShape = 'database';
        break;
    }

    return {
      id: entityId,
      label: entity.label,
      shape: entityShape
    }
  }
}
