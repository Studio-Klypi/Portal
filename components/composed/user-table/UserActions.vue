<script setup lang="ts">
import { Trash, ShieldPlus, ShieldX, Key } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IUser } from "~/types/user";
import DeleteUserAlertDialog from "~/components/composed/user-table/actions/DeleteUserAlertDialog.vue";
import PromoteAlertDialog from "~/components/composed/user-table/actions/PromoteAlertDialog.vue";
import DemoteAlertDialog from "~/components/composed/user-table/actions/DemoteAlertDialog.vue";
import UpdatePasswordDialog from "~/components/composed/user-table/actions/UpdatePasswordDialog.vue";

const { t } = useI18n();
const me = useUser();
const props = defineProps<{
  user: IUser;
  class?: HTMLAttributes["class"];
}>();

const passwordDialogOpen = ref<boolean>(false);
const promoteDialogOpen = ref<boolean>(false);
const demoteDialogOpen = ref<boolean>(false);
const deleteDialogOpen = ref<boolean>(false);

const isMe = computed(() => me.value?.uuid === props.user.uuid);
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
      <DropdownMenuItem @click="passwordDialogOpen = true">
        <Key />
        <span>{{ t("admin.user.list.actions.changePassword") }}</span>
      </DropdownMenuItem>
      <template v-if="!isMe">
        <DropdownMenuItem
          v-if="user.admin"
          @click="demoteDialogOpen = true"
        >
          <ShieldX />
          <span>{{ t("admin.user.list.actions.demote") }}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          v-else
          @click="promoteDialogOpen = true"
        >
          <ShieldPlus />
          <span>{{ t("admin.user.list.actions.promote") }}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="text-destructive"
          @click="deleteDialogOpen = true"
        >
          <Trash />
          <span>{{ t("btn.delete") }}</span>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>

  <UpdatePasswordDialog
    :open="passwordDialogOpen"
    :user="user"
    @update:open="passwordDialogOpen = $event"
  />
  <PromoteAlertDialog
    :open="promoteDialogOpen"
    :user="user"
    @update:open="promoteDialogOpen = $event"
  />
  <DemoteAlertDialog
    :open="demoteDialogOpen"
    :user="user"
    @update:open="demoteDialogOpen = $event"
  />
  <DeleteUserAlertDialog
    :open="deleteDialogOpen"
    :user="user"
    @update:open="deleteDialogOpen = $event"
  />
</template>
