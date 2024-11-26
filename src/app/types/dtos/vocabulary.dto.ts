export interface ListVocabularyDTO {
  id: number;
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
  image: string;
}

export interface VocabularyByIdDTO {
  id: number;
  word: string;
  meaning: string;
  image: string;
  pronunciation: string;
  example: string;
}

export interface CreateVocabularyDTO {
  word: string;
  meaning: string;
  pronunciation: string;
  image: string;
  example: string;
}

export interface UpdateVocabularyDTO {
  word?: string;
  meaning?: string;
  pronunciation?: string;
  example?: string;
  image?: string;
}



