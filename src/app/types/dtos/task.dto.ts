import { TaskType } from '../../utils/constants.util';
import { QuestionModel } from '../model/question.type';

export interface ListTaskDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    type: TaskType;
    lessonId: number;
}

export interface TaskByIdDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    type: TaskType;
    lessonId: number;
    questions: QuestionModel[];
}

export interface CreateTaskDTO {
    name: string;
    description: string;
    duration: number;
    type: TaskType;
    lessonId: number;
}

export interface UpdateTaskDTO {
    name?: string;
    description?: string;
    duration?: number;
    type?: TaskType;
    lessonId?: number;
}
