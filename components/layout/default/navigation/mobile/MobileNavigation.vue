<script setup lang="ts">
import { Bell, Menu } from "lucide-vue-next";
import version from "assets/version";
import ClientNavigationContent from "~/components/layout/default/navigation/ClientNavigationContent.vue";
import AdminNavigationContent from "~/components/layout/default/navigation/AdminNavigationContent.vue";
import NavigationLink from "~/components/layout/default/navigation/utils/NavigationLink.vue";
import UserMenu from "~/components/layout/default/navigation/utils/UserMenu.vue";

const { t } = useI18n();
const open = ref<boolean>(false);
</script>

<template>
  <header class="lg:hidden px-6 py-4 flex items-center justify-between">
    <p class="text-lg font-extrabold">
      Studio Klypi
    </p>

    <Sheet
      :open="open"
      @update:open="open = $event"
    >
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent class="flex flex-col px-0 pb-0">
        <SheetHeader>
          <SheetTitle>Studio Klypi</SheetTitle>
        </SheetHeader>

        <div class="flex-1 p-2">
          <ClientNavigationContent @triggered="open = false" />
          <AdminNavigationContent @triggered="open = false" />
        </div>

        <SheetFooter class="p-2 gap-1 flex flex-col border-t border-border">
          <NavigationLink to="/">
            <Bell />
            <span>{{ t("navigation.user.notifications") }}</span>
            <Badge class="ml-auto">
              2
            </Badge>
          </NavigationLink>
          <UserMenu />
          <span class="text-center text-xs text-muted-foreground italic">{{ version }}</span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </header>
</template>
