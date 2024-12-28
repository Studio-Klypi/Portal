<script setup lang="ts">
import LayoutRoot from "~/components/composing/layout/LayoutRoot.vue";
</script>

<template>
  <LayoutRoot
    name="auth"
    class="flex flex-col lg:flex-row-reverse"
  >
    <section class="hidden w-1/2 lg:block bg-primary" />
    <section class="flex w-full lg:w-1/2">
      <slot />
    </section>
  </LayoutRoot>
</template>

<style scoped>

</style>
