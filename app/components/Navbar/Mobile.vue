<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

defineProps<{
  links?: ContentNavigationItem[];
}>();

const isOpen = defineModel<boolean>("isOpen", { required: true });
</script>

<template>
  <div
    v-if="isOpen"
    class="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
  >
    <!-- Mobile Navigation Links -->
    <nav class="flex flex-col space-y-3 text-gray-700 dark:text-gray-200 mb-4">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path + '/'"
        active-class="font-bold"
        class="hover:text-gray-900 dark:hover:text-white"
        @click="isOpen = false"
        >{{ link.title }}</NuxtLink
      >
    </nav>

    <!-- Mobile Social icons & Color Mode -->
    <div class="flex text-gray-500 space-x-3 transition">
      <NavbarSocialLinks />
      <NavbarColorModeSwitch />
    </div>
  </div>
</template>
