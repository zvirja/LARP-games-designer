import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DataSet, Network, Node, Options } from 'vis'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  private _network?: Network;

  constructor(private _elRef: ElementRef) { }

  ngOnInit() {
    // create an array with nodes
    const nodesArray: Node[] = [
      { id: 1, label: 'Node 1', shape: 'circle' },
      { id: 2, label: 'Node 2', shape: 'diamond', size: 20 },
      { id: 3, label: 'Node 3', },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]
    const nodes = new DataSet(nodesArray);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);

    // provide the data in the vis format
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options: Options = {
      physics: {
        enabled: false
      }
    };

    // initialize your network!
    this._network = new Network(this._elRef.nativeElement, data, options);
  }

  ngOnDestroy(): void {
    if (this._network) {
      this._network.destroy();
    }
  }

}
