import { Model, Page } from "../common-types";

export interface Workflow extends Page {
  content: WorkflowState[];
}

export interface WorkflowState extends Model {
  currentState: string;
  assignedRole: string;
  assignedTo: string;
  workflowType: string;
  extId: string;
  additionalInfo: string;
  isInitialState: true;
  isFinalState: true;
  transitions: Transition[];
}

export interface Transition extends Model {
  currentState: string;
  nextState: string;
  transitionName: string;
  additionalInfo: string;
  stateId: string;
}
