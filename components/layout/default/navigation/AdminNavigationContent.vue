<script setup lang="ts">
import { Users } from "lucide-vue-next";
import NavigationSection from "~/components/layout/default/navigation/utils/NavigationSection.vue";
import NavigationLabel from "~/components/layout/default/navigation/utils/NavigationLabel.vue";
import NavigationLink from "~/components/layout/default/navigation/utils/NavigationLink.vue";

const { t } = useI18n();

defineEmits<{
  triggered: [];
}>();
</script>

<template>
  <NavigationSection name="admin">
    <NavigationLabel>{{ t("navigation.admin.label") }}</NavigationLabel>
    <NavigationLink
      to="/admin/users"
      @click="$emit('triggered')"
    >
      <Users />
      <span>{{ t("navigation.admin.users") }}</span>
    </NavigationLink>
  </NavigationSection>
</template>
