<script setup lang="ts">
import PageRoot from "~/components/composing/page/PageRoot.vue";

const user = useUser();
</script>

<template>
  <PageRoot>
    <Button as-child>
      <NuxtLinkLocale to="/auth/login">
        Login
      </NuxtLinkLocale>
    </Button>
    <p v-if="!user">
      logged out
    </p>
    <p v-else>
      {{ user.firstname }}
    </p>
  </PageRoot>
</template>
