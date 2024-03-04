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
  },
  {
    title: "Cộng đồng",
    path: "/community",
    role: ERole.ADMIN,
  },
];
