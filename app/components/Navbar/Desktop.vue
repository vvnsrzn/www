<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

defineProps<{
  links?: ContentNavigationItem[];
}>();

const isOpen = defineModel<boolean>("isOpen", { required: true });
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <!-- Logo/Name -->
    <div class="font-display text-lg tracking-tight">
      <NuxtLink to="/" class="no-underline! hover:bg-nb-accent-lime px-1">
        VIVIAN SARAZIN
      </NuxtLink>
    </div>

    <!-- Desktop Navigation -->
    <nav aria-label="Main navigation" class="hidden md:flex items-center gap-2 font-bold">
      <NuxtLink
        v-for="link in links"
        :to="link.path + '/'"
        :key="link.path"
        active-class="nb-link-active"
        class="px-2 py-0.5 hover:bg-nb-accent-lime no-underline! transition-colors"
      >
        {{ link.title }}
      </NuxtLink>
    </nav>

    <!-- Desktop Social icons & Color Mode -->
    <div class="hidden md:flex items-center gap-2">
      <NavbarSocialLinks />
      <NavbarColorModeSwitch />
    </div>

    <!-- Mobile Hamburger Button -->
    <button
      @click="isOpen = !isOpen"
      class="md:hidden text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
      :aria-expanded="isOpen"
      aria-controls="mobile-menu"
      :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
    >
      <Icon
        :name="
          isOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'
        "
        class="size-5"
      />
    </button>
  </div>
</template>
