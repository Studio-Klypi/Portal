<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface NavigationLabelProps {
  class?: HTMLAttributes["class"];
}
const props = defineProps<NavigationLabelProps>();
</script>

<template>
  <p :class="cn('ml-4 mt-4 text-sm font-semibold text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
