
export enum MoSCoW {
  MUST = 'Must Have',
  SHOULD = 'Should Have',
  COULD = 'Could Have',
  WONT = 'Wont Have'
}

export enum ProjectMethodology {
  AGILE = 'Agile (Scrum)',
  WATERFALL = 'Waterfall'
}

export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold'
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: 'Functional' | 'Non-Functional';
  priority: MoSCoW;
  methodology: ProjectMethodology;
  status: ProjectStatus;
  stakeholder: string;
}

export interface UserStory {
  id: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
  influence: 'High' | 'Medium' | 'Low';
}
