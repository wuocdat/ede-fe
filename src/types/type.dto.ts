export type LoginDto = {
  username: string;
  password: string;
};

export type TranslationDto = {
  id: number;
  ede_text: string;
  vi_text: string | null;
  correct: boolean;
};

export type IncorrectTransResDto = {
  trans: TranslationDto | null;
};

export type UpdateTransDto = {
  ede_text?: string;
  vi_text?: string;
  correct?: boolean;
};
