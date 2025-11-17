<script setup lang="ts">
const { data: navigation } = await useAsyncData("navigation", () =>
  queryCollectionNavigation("content")
);

const isOpen = ref(false);

const links = computed(() =>
  navigation.value?.filter((link) => link.path !== "/")
);
</script>

<template>
  <div class="px-4 py-4 mx-auto sm:px-0 max-w-2xl">
    <NavbarDesktop :links v-model:isOpen="isOpen" />
    <NavbarMobile :links v-model:isOpen="isOpen" />
  </div>
</template>
