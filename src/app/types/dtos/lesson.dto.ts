import { ListGrammarDTO } from './grammar.dto';
import { ListTaskDTO } from './task.dto';
import { ListVocabularyDTO } from './vocabulary.dto';

export interface ListLessonDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
}
export interface LessonByIdDTO {
    id: number;
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
    vocabulary: ListVocabularyDTO[];
    grammar: ListGrammarDTO[];
    tasks: ListTaskDTO[];
}
export interface CreateLessonDTO {
    name: string;
    description: string;
    duration: number;
    number: number;
    courseId: number;
}
export interface UpdateLessonDTO {
    name?: string;
    description?: string;
    duration?: number;
    number?: number;
    courseId?: number;
}
