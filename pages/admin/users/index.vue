<script setup lang="ts">
// import { MoreHorizontal } from "lucide-vue-next";
import { Plus, RefreshCcw } from "lucide-vue-next";
import PageRoot from "~/components/composing/page/PageRoot.vue";
import type { IUser } from "~/types/user";
import columns from "~/components/composed/user-table/userTableColumns";
import UserTable from "~/components/composed/user-table/UserTable.vue";
import DebounceSearch from "~/components/composed/DebounceSearch.vue";
import PageHeader from "~/components/composing/page/PageHeader.vue";
import PageTitle from "~/components/composing/page/PageTitle.vue";
import NewUserDialog from "~/components/composed/user-table/NewUserDialog.vue";

const perPage = 20;

const { t } = useI18n();
const localePath = useLocalePath();

const user = useUser();
const loading = ref<boolean>(true);
const users = useUserList();
const totalUsers = ref<number>(1);

const { query } = useRoute();
const page = computed(() => {
  const p = Number(query.page);
  return isNaN(p) || p < 1 ? 1 : p;
});

async function loadUsers(targetPage: number, redirect: boolean = true) {
  if (redirect)
    await navigateTo(localePath(`/admin/users?page=${targetPage}`));

  loading.value = true;

  const res = await $fetch<{ usersCount: number; data: IUser[] }>(`/api/user/list?offset=${(targetPage - 1) * perPage}&limit=${perPage}`);
  if (!res) {
    loading.value = false;
    return;
  }

  const { usersCount, data: list } = res;
  totalUsers.value = usersCount;
  users.value = list;

  loading.value = false;
}
async function performSearch(search?: string) {
  loading.value = true;

  const res = search
    ? await $fetch<{ usersCount: number; data: IUser[] }>(`/api/user/list?search=${search}`)
    : await $fetch<{ usersCount: number; data: IUser[] }>(`/api/user/list?offset=0&limit=${perPage}`);
  if (!res) {
    loading.value = false;

    totalUsers.value = 0;
    users.value = [];

    return;
  }

  const { usersCount, data: list } = res;
  totalUsers.value = usersCount;
  users.value = list;

  loading.value = false;
}
onMounted(async () => await loadUsers(page.value, false));
</script>

<template>
  <PageRoot
    name="admin.user.list"
    class="flex flex-col"
  >
    <template #top>
      <PageHeader class="px-6">
        <PageTitle>{{ t("admin.user.list.title") }}</PageTitle>
      </PageHeader>
    </template>

    <div class="flex-1 flex flex-col gap-4 p-6">
      <header class="flex gap-2 items-center">
        <DebounceSearch
          class="flex-1"
          @update:search="performSearch($event)"
        />
        <Button
          variant="outline"
          size="icon"
          @click="loadUsers(page, false)"
        >
          <RefreshCcw
            v-if="loading"
            class="animate-spin"
          />
          <RefreshCcw v-else />
        </Button>
        <NewUserDialog @user-created="loadUsers(page, false)">
          <Button>
            <Plus />
            <span>{{ t("admin.user.list.dialog.newUser.trigger") }}</span>
          </Button>
        </NewUserDialog>
      </header>

      <UserTable
        :columns="columns(user as IUser, t)"
        :data="users"
        :loading="loading"
      />

      <Pagination
        v-if="totalUsers > perPage"
        v-slot="{ page }"
        :total="totalUsers"
        :items-per-page="perPage"
        :sibling-count="1"
        show-edges
        :default-page="1"
        class="mt-auto self-center"
        @update:page="loadUsers($event)"
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1"
        >
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis
              v-else
              :key="item.type"
              :index="index"
            />
          </template>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </PageRoot>
</template>
