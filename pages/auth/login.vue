<script setup lang="ts">
import { ArrowLeft, KeyRound, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import PageRoot from "~/components/composing/page/PageRoot.vue";

definePageMeta({
  layout: "auth",
});

const { t } = useI18n();
useHead({
  title: `${t("auth.login.title")}`,
});

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(1),
}));
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const redirect = await sendLogin(values);
  resetForm();

  if (redirect)
    navigateTo(useLocalePath()("/"));
  loading.value = false;
});
</script>

<template>
  <PageRoot
    name="auth/login"
    class="grid place-items-center"
  >
    <div class="flex flex-col items-start gap-3 w-[min(calc(100%-3rem),480px)]">
      <Button
        variant="ghost"
        size="sm"
        as-child
      >
        <NuxtLinkLocale to="/">
          <ArrowLeft />
          <span>{{ t("btn.back") }}</span>
        </NuxtLinkLocale>
      </Button>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>{{ t("auth.login.title") }}</CardTitle>
        </CardHeader>
        <form @submit="onSubmit">
          <CardContent class="grid gap-x-4 gap-y-2">
            <FormField
              v-slot="{ componentField }"
              name="email"
            >
              <FormItem>
                <FormLabel>{{ t("auth.login.fields.email") }}</FormLabel>
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
                <FormLabel>{{ t("auth.login.fields.password") }}</FormLabel>
                <FormControl v-bind="componentField">
                  <Input
                    type="password"
                    placeholder="············"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              :disabled="loading"
            >
              <template v-if="loading">
                <LoaderCircle class="animate-spin" />
                <span>{{ t("auth.login.submit-loading") }}</span>
              </template>
              <template v-else>
                <KeyRound />
                <span>{{ t("auth.login.submit") }}</span>
              </template>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </PageRoot>
</template>
