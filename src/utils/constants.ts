import { ERole } from "@/types/enums";

export const APP_NAME = "Ede-Trans";

export const HEAD_TABS = [
  {
    title: "Thêm bản dịch",
    path: "/data",
    role: ERole.ADMIN,
  },
  {
    title: "Dịch",
    path: "/trans",
    role: ERole.EDITOR,
  },
  {
    title: "Quản Trị",
    path: "/admin",
    role: ERole.ADMIN,
  },
];

export const DATE_FORMATTER = "YYYY-MM-DD";
