<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <span class="not-prose">
    <NuxtLink :to="href" :external="external" class="nb-button">
      <Icon v-if="icon" :name="icon" class="w-4 h-4" />
      <slot mdc-unwrap="p" />
    </NuxtLink>
  </span>
</template>
