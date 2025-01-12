<script setup lang="ts">
import { cn } from "~/lib/utils";

interface NavigationSectionProps {
  name: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<NavigationSectionProps>();
</script>

<template>
  <section
    :data-name="name"
    :class="cn('flex flex-col gap-1', props.class)"
  >
    <slot />
  </section>
</template>
