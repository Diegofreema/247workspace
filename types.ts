import { Models } from 'node-appwrite';

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  CHIEF_ADMIN = 'CHIEF_ADMIN',
}
export enum TicketStatus {
  UNASSIGNED = 'UNASSIGNED',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
}
export enum StatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  IN_REVIEW = 'IN_REVIEW',
  BACKLOG = 'BACKLOG',
}
export enum PriorityEnum {
  URGENT = 'URGENT',
  IMPORTANT = 'IMPORTANT',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
  MINIMAL = 'MINIMAL',
}

export type Workspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
export type Member = Models.Document & {
  memberRole: MemberRole;
  userId: string;
  workspaceId: string;
};
export type Profile = Models.Document & {
  userId: string;
  avatarUrl?: string;
  role: string;
  email: string;
  bio?: string;
  name: string;
  phone?: string;
};

export type MemberWithProfile = Member & {
  userId: string;
  avatarUrl?: string;
  role: string;
  email: string;
  bio?: string;
  name: string;
};

export type Project = Models.Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
  userId: string;
};

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type SelectData = {
  label: string;
  value: string;
  imageUrl?: string;
};

export type TaskType = Models.Document & {
  name: string;
  description?: string;
  projectId: string;
  workspaceId: string;
  assigneeId: string;
  status: StatusEnum;
  priority: PriorityEnum;
  dueDate: string;
  position: number;
};

export type ProjectsWithTasks = Project & {
  tasks: TaskWithProfile[];
};
export type TaskWithProfile = TaskType & {
  assignee: Profile | null;
};
type Assignee = {
  name: string | undefined;
  email: string | undefined;
  userId: string | undefined;
  avatarUrl?: string;
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
};

export type TaskWithProjectAndAssignee = TaskType & {
  project: Project | undefined;
  assignee: Assignee | undefined;
};

export type AnalyticsType = {
  taskCount: number;
  taskDifference: number;
  assignedTaskCount: number;
  assignedTaskDifference: number;
  incompleteTaskCount?: number;
  incompleteTaskDifference?: number;
  completedTaskCount: number;
  completedTaskDifference: number;
  overdueTaskCount: number;
  overdueTaskDifference: number;
  projectCount?: number;
  projectDifference?: number;
};

export type DocumentType = Models.Document & {
  name: string;
  documentUrl: string;
  workspaceId: string;
  projectId: string;
  uploadedBy: string;
};

export type FeedbackType = Models.Document & {
  feedback: string;
  taskId: string;
  profileId: string;
};

export type FeedbackWithProfile = FeedbackType & {
  profile: Profile;
};

export type TicketsType = Models.Document & {
  assigneeId: string;
  raisedId: string;
  subject: string;
  status: TicketStatus;
  description: string;
  workspaceId: string;
};

export type TicketWithProfile = TicketsType & {
  assignee: Profile;
  raisedBy: Profile;
};
