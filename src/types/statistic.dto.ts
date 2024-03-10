import { ERole } from "./enums";

export type TransStatisticDto = {
  incorrectTransNum: number;
  correctTransNum: number;
  allTransNum: number;
};

type SubUserDto = {
  id: number;
  username: string;
  role: ERole;
};

export type EditorStatisticDto = {
  editor: SubUserDto;
  editedSentenceCount: number;
};

export type CorrectTransByEditorStatisticDto = {
  editors: EditorStatisticDto[];
  total: number;
};
