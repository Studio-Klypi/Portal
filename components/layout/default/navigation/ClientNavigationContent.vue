<script setup lang="ts">
import { Gauge } from "lucide-vue-next";
import NavigationLink from "~/components/layout/default/navigation/utils/NavigationLink.vue";
import NavigationSection from "~/components/layout/default/navigation/utils/NavigationSection.vue";

const { t } = useI18n();

defineEmits<{
  triggered: [];
}>();
</script>

<template>
  <NavigationSection name="client">
    <NavigationLink
      to="/"
      @click="$emit('triggered')"
    >
      <Gauge />
      <span>{{ t("navigation.client.dashboard") }}</span>
    </NavigationLink>
  </NavigationSection>
</template>
