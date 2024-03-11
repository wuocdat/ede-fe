import { ERole } from "./enums";

export type LoginDto = {
  username: string;
  password: string;
};

export type TranslationDto = {
  id: number;
  ede_text: string;
  vi_text: string | null;
  correct_ede_text: string | null;
  correct: boolean;
  updatedAt: string;
};

export type IncorrectTransResDto = {
  trans: TranslationDto | null;
};

export type UpdateTransDto = {
  correct_ede_text: string;
  vi_text: string;
  correct: boolean;
};

export type PreTransDto = {
  ede_text?: string;
  vi_text?: string;
  correct_ede_text?: string | null;
  correct?: boolean;
};

export type PreDataUploadResDto = {
  savedTransNum: number;
};

export type UserDto = {
  id: number;
  username: string;
  role: ERole;
};

export type LoginResDto = {
  access_token: string;
  user: UserDto;
};

export type FindTransOptions = {
  start: string;
  end: string;
  text?: string;
};
