<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface LayoutProps {
  name?: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<LayoutProps>();
</script>

<template>
  <div
    :data-layout="props.name ?? 'default'"
    :class="cn('min-h-dvh', props.class)"
  >
    <slot>{{ props.name }}</slot>
  </div>
</template>
