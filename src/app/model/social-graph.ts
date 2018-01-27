import { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

export class SocialGraph {
  constructor(
    public nodes: Username[],
    public links: Link[],
  ) {}
}

export interface Username extends SimulationNodeDatum {
  name: string;
}

export interface Link extends SimulationLinkDatum<Username> {
  source: Username;
  target: Username;
}
