<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <a
    v-if="appConfig.socials?.github"
    class="nb-icon-button"
    :href="`https://github.com/${appConfig.socials?.github}`"
    aria-label="GitHub profile"
    rel="noopener noreferrer"
  >
    <Icon class="size-5" name="i-simple-icons-github" />
  </a>
  <a
    v-if="appConfig.socials?.bluesky"
    class="nb-icon-button"
    :href="`https://bsky.app/profile/${appConfig.socials?.bluesky}`"
    aria-label="Bluesky profile"
    rel="noopener noreferrer"
  >
    <Icon class="size-5" name="i-simple-icons-bluesky" />
  </a>
</template>
