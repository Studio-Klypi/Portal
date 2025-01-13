import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { MoreHorizontal, Crown } from "lucide-vue-next";
import type { IUser } from "~/types/user";
import { Badge } from "~/components/ui/badge";
import { relativeDate } from "~/lib/dates";
import { Button } from "~/components/ui/button";
import UserActions from "~/components/composed/user-table/UserActions.vue";

export default (user: IUser, t: (p: string) => string): ColumnDef<IUser>[] => [
  {
    accessorKey: "firstname",
    header: () => h("div", { class: "" }, t("admin.user.list.table.firstname")),
    cell: ({ row }) => {
      const { admin } = row.original;
      const name = row.getValue<string>("firstname");

      let children = [h("span", { class: "" }, name)];
      if (admin)
        children = [
          ...children,
          h(Crown, { class: "!h-4 !w-4 text-primary" }),
        ];

      return h("div", { class: "flex items-center gap-2" }, children);
    },
  },
  {
    accessorKey: "lastname",
    header: () => h("div", { class: "" }, t("admin.user.list.table.lastname")),
    cell: ({ row }) => h("div", { class: "" }, row.getValue("lastname") as string),
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "" }, t("admin.user.list.table.email")),
    cell: ({ row }) => {
      const { uuid } = row.original;
      const email = row.getValue<string>("email");

      let children = [h("span", {}, email)];
      if (uuid === user.uuid)
        children = [
          ...children,
          h(Badge, { variant: "secondary" }, "me"),
        ];

      return h("div", { class: "flex items-center gap-2" }, children);
    },
  },
  {
    accessorKey: "createdAt",
    header: () => h("div", { class: "whitespace-nowrap" }, t("admin.user.list.table.createdAt")),
    cell: ({ row }) => h("div", { class: "whitespace-nowrap" }, relativeDate(row.getValue("createdAt") as string)),
  },
  {
    accessorKey: "updatedAt",
    header: () => h("div", { class: "whitespace-nowrap" }, t("admin.user.list.table.updatedAt")),
    cell: ({ row }) => h("div", { class: "whitespace-nowrap" }, relativeDate(row.getValue("updatedAt") as string)),
  },
  {
    id: "action",
    enableHiding: false,
    cell: ({ row }) => {
      const originalUser = row.original;

      const trigger = h(Button, { variant: "outline", size: "icon", class: "" }, h(MoreHorizontal));
      return h(h("div", { class: "flex justify-end" }, h(UserActions, { user: originalUser }, trigger)));
    },
  },
];
