<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface PageProps {
  name?: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<PageProps>();

const { t } = useI18n();
useHead({
  title: t(`${props.name ?? "home"}.tab`),
});
</script>

<template>
  <div
    :data-page="props.name ?? 'home'"
    :class="cn('w-full min-h-dvh', props.class)"
  >
    <slot name="top" />
    <slot>{{ props.name }}</slot>
  </div>
</template>
