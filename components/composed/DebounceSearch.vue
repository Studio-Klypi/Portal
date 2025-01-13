<script setup lang="ts">
import debounce from "debounce";
import type { HTMLAttributes } from "vue";
import { Search } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const props = defineProps<{
  initialSearch?: string;
  delay?: number;
  class?: HTMLAttributes["class"];
}>();
const emit = defineEmits<{
  "update:search": [string];
}>();

const search = ref(props.initialSearch ?? "");
watch(search, debounce(() => emit("update:search", search.value), props.delay ?? 500));
</script>

<template>
  <div :class="cn('relative', props.class)">
    <Input
      v-model="search"
      type="text"
      placeholder="Search..."
    />
    <Search class="absolute top-3 right-3 !h-4 !w-4 text-muted-foreground pointer-events-none" />
  </div>
</template>
