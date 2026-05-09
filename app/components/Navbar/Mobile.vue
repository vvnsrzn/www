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
    id="mobile-menu"
    role="region"
    aria-label="Mobile navigation"
    class="md:hidden pt-4 border-t-2 border-black dark:border-white"
  >
    <!-- Mobile Navigation Links -->
    <nav aria-label="Mobile navigation" class="flex flex-col gap-2 mb-4 font-bold">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path + '/'"
        active-class="nb-link-active"
        class="px-2 py-1 no-underline! self-start"
        @click="isOpen = false"
      >
        {{ link.title }}
      </NuxtLink>
    </nav>

    <!-- Mobile Social icons & Color Mode -->
    <div class="flex items-center gap-2">
      <NavbarSocialLinks />
      <NavbarColorModeSwitch />
    </div>
  </div>
</template>
