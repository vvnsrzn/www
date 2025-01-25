---
title: 'Radiofrance svelte-youtube-lite'
description: 'My very first open source contriubtion on Svelte'
stack: ['SvelteKit', 'Playwright']
---

*At Hublo, we work with SvelteKit. Before starting my new job, I had to learn this framework.*

*One of the best ways to do so, is also by contributing on Open Source projects. IMO, the smaller, the better! (again)*

# Radiofrance svelte-youtube-lite

My goal was to find a small open-source project using Svelte, in order to try to contribute in there.

I already did a [small website](/projects/david-poupon), this time I wanted to make something a little bit more technical.

I stumbled upon this [Radiofrance's project](https://github.com/radiofrance/svelte-youtube-lite) by navigating on Github.

svelte-youtube-lite is "*a simple svelte component for creating YouTube embeds with a focus on performance and privacy (GDPR compliant).*".

Around that time, Svelte 5 had just been released, and I thought submitting a PR to migrate the project from Svelte 4 to Svelte 5 would be a great way to contribute.

This is basically what I did in this [PR](https://github.com/radiofrance/svelte-youtube-lite/pull/3).

## Migration script

To be honest, I didn’t have to do much 😉

Indeed, Svelte provides a powerful migration script:

```bash
$ npx sv migrate svelte-5
```

In most cases, you just need to review the comments left by the script and handle any necessary manual adjustments.

## Playwright

However, to be sure that my migration was OK, I wrote **before** the migration some tests.

This ensures that the migration didn't break anything on the component behavior.

----------------------------------

This contribution was a lot of fun, especially because the Radiofrance maintainer was quick to review my PR.

![radio-france.webp](/projects/radiofrance.webp){style="border-radius:0px"}

Seeing the project reach version 1.0.0 after my PR was far beyond what I expected!

