<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { IUser } from "~/types/user";

const { t } = useI18n();
const init = "admin.user.list.dialog.updatePassword";

const props = defineProps<{
  open: boolean;
  user: IUser;
}>();
const emit = defineEmits<{
  "update:open": [boolean];
}>();

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  password: z.string().min(1),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const save = handleSubmit(async ({ password }) => {
  loading.value = true;

  const user = await sendUpdatePassword(props.user.uuid, password);

  loading.value = false;
  if (!user)
    return;

  const list = useUserList();
  list.value = list.value.map(u => u.uuid === props.user.uuid ? { ...user } : u);
  emit("update:open", false);
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t(`${init}.title`) }}</DialogTitle>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="save"
      >
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ t(`${init}.fields.newPassword`) }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="password"
                placeholder="············"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="secondary">
              {{ t("btn.cancel") }}
            </Button>
          </DialogClose>
          <Button :disabled="loading">
            <template v-if="loading">
              {{ t(`${init}.action.loading`) }}
            </template>
            <template v-else>
              {{ t(`${init}.action.idle`) }}
            </template>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
