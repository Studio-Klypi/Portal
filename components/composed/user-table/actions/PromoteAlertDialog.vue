<script setup lang="ts">
import type { IUser } from "~/types/user";

const { t } = useI18n();
const init = "admin.user.list.dialog.promote";

const props = defineProps<{
  open: boolean;
  user: IUser;
}>();
defineEmits<{
  "update:open": [boolean];
}>();

async function sendUpdate() {
  const user = await sendUpdateAdmin(props.user.uuid, true);
  if (!user)
    return;

  const list = useUserList();
  list.value = list.value.map(u => u.uuid === props.user.uuid ? { ...user } : u);
}
</script>

<template>
  <AlertDialog
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t(`${init}.title`) }}</AlertDialogTitle>
        <AlertDialogDescription>{{ t(`${init}.caption`) }}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>{{ t("btn.cancel") }}</AlertDialogCancel>
        <AlertDialogAction @click="sendUpdate">
          {{ t(`${init}.action`) }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
