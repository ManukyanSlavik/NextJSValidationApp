export interface taskData {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;

  tags?: tagData[];
}

export interface tagData {
  id: string;
  name: string;
}

export interface taskPayload {
  type: string;
  index: number;
  data: taskData;
}

export interface tagPayload {
  type: string;
  data: tagData;
}
