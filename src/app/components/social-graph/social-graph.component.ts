import {
  Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild
} from '@angular/core';
import { Link, SocialGraph, Username } from '../../model/social-graph';
import * as d3 from 'd3';
import * as d3Force from 'd3-force';

@Component({
  selector: 'app-social-graph',
  templateUrl: './social-graph.component.html',
  styleUrls: ['./social-graph.component.css']
})
export class SocialGraphComponent implements OnInit, OnChanges {
  @Input() data: SocialGraph;
  @ViewChild('socialGraph') graphSvg: ElementRef;
  svg: any;
  simulation: d3Force.Simulation<Username, Link>;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.buildGraph(changes['data'].currentValue);
    }
  }

  initSimulation() {
    this.svg = d3.select(this.graphSvg.nativeElement);

    const height = +this.svg.attr('height');
    const width = +this.svg.attr('width');

    this.simulation = d3Force.forceSimulation<Username, Link>()
      .force('link', d3Force.forceLink().id((d: Username) => d.name))
      .force('charge', d3Force.forceManyBody().distanceMax(70))
      .force('center', d3Force.forceCenter(width / 2, height / 2));
  }

  private buildGraph(data: SocialGraph) {
    this.initSimulation();
    // clear the svg
    this.svg.selectAll('g').remove();

    const link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', .3)
      .attr('stroke', 'black');

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter().append('g');

    node.append('circle')
      .attr('class', 'hover-stroke')
      .attr('r', 6)
      .attr('fill', d => '#7c7c7c');

    node.append('circle')
      .attr('r', 5)
      .attr('fill', d => '#7c7c7c');

    node.append('title')
      .text(function(d) { return '@' + d.name; });

    node.append('text')
      .text(function(d) {
        return '@' + d.name;
      })
      .attr('class', 'shadow')
      .attr('x', 7)
      .attr('y', 3);

    node.append('text')
      .text(function(d) {
        return '@' + d.name;
      })
      .attr('class', 'label')
      .attr('x', 7)
      .attr('y', 3);

    this.simulation
      .nodes(data.nodes)
      .on('tick', ticked);

    const force: any = this.simulation.force('link');
    force.links(data.links);

    function ticked() {
      link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

      node
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
    }
  }
}
