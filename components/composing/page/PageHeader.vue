<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <header :class="cn('h-16 flex items-center border-b border-border', props.class)">
    <slot />
  </header>
</template>
