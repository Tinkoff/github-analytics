import { User } from './user';
import { Reactions } from './reactions';
import {Label} from "./label";

export interface Issue {
  active_lock_reason: null | string;
  assignee: User;
  assignees: User[];
  author_association: string;
  body: string;
  closed_at: null | string;
  comments: number;
  comments_url: string;
  created_at: string;
  events_url: string;
  html_url: string;
  id: number;
  labels: Label[];
  labels_url: string;
  locked: boolean;
  milestone: null | string;
  node_id: string;
  number: number;
  performed_via_github_app: null | string;
  reactions: Reactions;
  repository_url: string;
  state: string;
  state_reason: null | string;
  timeline_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: User;
  pull_request: unknown;
}
