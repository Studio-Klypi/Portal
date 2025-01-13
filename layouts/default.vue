<script setup lang="ts">
import LayoutRoot from "~/components/composing/layout/LayoutRoot.vue";
import MobileNavigation from "~/components/layout/default/navigation/mobile/MobileNavigation.vue";
import DesktopNavigation from "~/components/layout/default/navigation/desktop/DesktopNavigation.vue";
</script>

<template>
  <LayoutRoot class="flex flex-col lg:flex-row">
    <MobileNavigation />
    <DesktopNavigation />

    <main class="flex-1">
      <slot />
    </main>
  </LayoutRoot>
</template>
