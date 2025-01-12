<script setup lang="ts">
import { Power, Bell } from "lucide-vue-next";
import version from "~/assets/version";
import ClientNavigationContent from "~/components/layout/default/navigation/ClientNavigationContent.vue";
import AdminNavigationContent from "~/components/layout/default/navigation/AdminNavigationContent.vue";
import NavigationLink from "~/components/layout/default/navigation/utils/NavigationLink.vue";
import UserMenu from "~/components/layout/default/navigation/utils/UserMenu.vue";

const { t } = useI18n();
const user = useUser();
</script>

<template>
  <aside class="hidden lg:flex flex-col w-[min(100%,320px)] h-dvh border-r border-border sticky top-0 ">
    <header class="flex items-center justify-between h-16 px-6 border-b border-border">
      <!-- todo: logo -->
      <p class="font-extrabold">
        Klypi Portail
      </p>
      <Button
        variant="ghost"
        size="icon"
      >
        <Power />
      </Button>
    </header>

    <main class="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
      <ClientNavigationContent />
      <AdminNavigationContent v-if="user?.admin" />
    </main>

    <footer class="p-2 gap-1 flex flex-col border-t border-border">
      <NavigationLink to="/">
        <Bell />
        <span>{{ t("navigation.user.notifications") }}</span>
        <Badge class="ml-auto">
          2
        </Badge>
      </NavigationLink>
      <UserMenu />
      <span class="text-center text-xs text-muted-foreground italic">{{ version }}</span>
    </footer>
  </aside>
</template>
