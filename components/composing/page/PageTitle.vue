<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h1 :class="cn('text-2xl font-extrabold', props.class)">
    <slot />
  </h1>
</template>
