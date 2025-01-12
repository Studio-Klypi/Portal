<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface NavigationLinkProps {
  to: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<NavigationLinkProps>();
</script>

<template>
  <Button
    variant="ghost"
    :class="cn('justify-start', props.class)"
    as-child
  >
    <NuxtLinkLocale
      :to="props.to"
      active-class="bg-secondary"
    >
      <slot />
    </NuxtLinkLocale>
  </Button>
</template>
