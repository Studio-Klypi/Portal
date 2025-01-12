<script setup lang="ts">
import { Settings, Crown, ChevronRight, LogOut } from "lucide-vue-next";

interface UserMenuProps {
  side?: "right" | "top";
  align?: "center" | "end";
}
const props = withDefaults(defineProps<UserMenuProps>(), {
  side: "right",
  align: "end",
});

const { t } = useI18n();
const user = useUser();
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="justify-start h-auto"
      >
        <Avatar shape="square">
          <AvatarImage
            v-if="user.avatarUri"
            :src="user.avatarUri"
          />
          <AvatarFallback>{{ user.firstname.substring(0, 1).toUpperCase() }}{{ user.lastname.substring(0, 1).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="flex flex-col items-start">
          <div class="flex items-center gap-1">
            <p class="leading-none">
              {{ user.firstname }} {{ user.lastname }}
            </p>
            <Crown class="!w-3 !h-3 text-primary" />
          </div>
          <span class="text-sm font-normal text-muted-foreground">{{ user.email }}</span>
        </div>
        <ChevronRight class="ml-auto" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :side="props.side"
      :align="props.align"
    >
      <DropdownMenuItem>
        <Settings />
        <span>{{ t("navigation.user.settings") }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="text-destructive dark:text-foreground">
        <LogOut />
        <span>{{ t("navigation.user.logout") }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
