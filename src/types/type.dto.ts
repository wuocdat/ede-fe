import { ERole } from "./enums";

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

export type PreTransDto = {
  ede_text?: string;
  vi_text?: string;
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
