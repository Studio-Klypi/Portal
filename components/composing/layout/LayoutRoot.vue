<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface LayoutProps {
  name?: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<LayoutProps>();
</script>

<template>
  <div :data-layout="props.name ?? 'default'">
    <slot />
  </div>
</template>
