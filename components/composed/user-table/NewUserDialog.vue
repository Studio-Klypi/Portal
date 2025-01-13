<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const emit = defineEmits<{
  userCreated: [];
}>();

const { t } = useI18n();
const init = "admin.user.list.dialog.newUser";

const open = ref<boolean>(false);
const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  admin: z.boolean().optional().default(false),
}));
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    admin: false,
  },
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const state = await sendCreateUser(values);

  loading.value = false;
  if (state) {
    open.value = false;
    emit("userCreated");
  }
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t(`${init}.title`) }}</DialogTitle>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="firstname"
        >
          <FormItem>
            <FormLabel>{{ t(`${init}.fields.firstname`) }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="John" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="lastname"
        >
          <FormItem>
            <FormLabel>{{ t(`${init}.fields.lastname`) }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="DOE" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t(`${init}.fields.email`) }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="john.doe@example.xyz" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ t(`${init}.fields.password`) }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="password"
                placeholder="············"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ value }"
          name="admin"
        >
          <FormItem class="flex items-center gap-2">
            <Checkbox
              id="admin"
              :checked="value"
              @update:checked="setFieldValue('admin', $event)"
            />
            <Label
              class="!mt-0"
              for="admin"
            >{{ t(`${init}.fields.admin`) }}</Label>
          </FormItem>
        </FormField>

        <DialogFooter class="gap-2">
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
