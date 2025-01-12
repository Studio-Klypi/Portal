<script setup lang="ts">
import { Trash, ShieldPlus, ShieldX } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IUser } from "~/types/user";

const { t } = useI18n();
defineProps<{
  user: IUser;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      side="bottom"
      align="end"
    >
      <DropdownMenuItem v-if="user.admin">
        <ShieldX />
        <span>{{ t("admin.user.list.actions.demote") }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem v-else>
        <ShieldPlus />
        <span>{{ t("admin.user.list.actions.promote") }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="text-destructive">
        <Trash />
        <span>{{ t("btn.delete") }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
