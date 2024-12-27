<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface PageProps {
  name?: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<PageProps>();
</script>

<template>
  <div :data-page="props.name ?? 'home'">
    <slot />
  </div>
</template>
