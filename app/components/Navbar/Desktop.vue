<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

defineProps<{
  links?: ContentNavigationItem[];
}>();

const isOpen = defineModel<boolean>("isOpen", { required: true });
</script>

<template>
  <div class="flex justify-between items-center">
    <!-- Logo/Name -->
    <div class="text-gray-700 dark:text-gray-200 font-bold">
      <NuxtLink to="/"> Vivian SARAZIN </NuxtLink>
    </div>
    <!-- Desktop Navigation -->
    <nav class="hidden md:flex text-gray-700 dark:text-gray-200">
      <NuxtLink
        v-for="link in links"
        :to="link.path"
        :key="link.path"
        active-class="font-bold"
        class="mr-6"
        >{{ link.title }}</NuxtLink
      >
    </nav>

    <!-- Desktop Social icons & Color Mode -->
    <div class="hidden md:flex text-gray-500 space-x-3 transition">
      <NavbarSocialLinks />
      <NavbarColorModeSwitch />
    </div>

    <!-- Mobile Hamburger Button -->
    <button
      @click="isOpen = !isOpen"
      class="md:hidden text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      aria-label="Toggle navigation"
    >
      <Icon
        :name="
          isOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'
        "
        class="size-6"
      />
    </button>
  </div>
</template>
