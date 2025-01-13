<script setup lang="ts">
import type { IUser } from "~/types/user";

const { t } = useI18n();
const init = "admin.user.list.dialog.deleteUser";

const props = defineProps<{
  open: boolean;
  user: IUser;
}>();
const emit = defineEmits<{
  "update:open": [boolean];
}>();

async function sendUserDeletion() {
  await sendDelete(props.user.uuid);
  const page = Number(useRoute().query.page as string ?? 1);
  await getUsersList(page);

  emit("update:open", false);
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
        <AlertDialogDescription>{{ t(`${init}.caption`, { name: user.firstname }) }}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>{{ t("btn.cancel") }}</AlertDialogCancel>
        <AlertDialogAction @click="sendUserDeletion">
          {{ t(`${init}.action`) }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
