---
title: "David Poupon"
description: "My very first website with SvelteKit"
stack: ["SvelteKit", "Vercel"]
---

_At Hublo, we work with SvelteKit. Before starting my new job, I had to learn this framework._

_One of the best ways to do so, is by creating a small project. IMO, the smaller, the better!_

# David Poupon

I had a chance to meet [David Poupon](https://www.poupon-paysage.fr) a talented trimmer, starting his own company.

As a solo entrepreneur, David needed a website to showcase his work and provide his contact informations.

To help ourselves, I proposed to create this pro-bono website.

The main objective for David is to rank well on Google.

As you can expect, I just received a logo, a phone number and a few pictures.

But it's OK, I had some details to start a minimal project.

## Images in SvelteKit

An interesting part of this project was managing the images.

Obviously, David didn't hear about Web Vitals, image compression, Google Lighthouse and all of this.

David sent me a load of very large pictures to display on this website.

As a lazy developer, I wanted to find a way to resize images directly on the SvelteKit's server, and then, display an optimized image to the client.

And here comes [@sveltejs/enhanced-img](https://svelte.dev/docs/kit/images#sveltejs-enhanced-img).

By leveraging Vite's assets handling features, SvelteKit provides a great DX.

### Importing images

You just need to import your images with some params (see the query):

```svelte
<script lang="ts">
	let { data } = $props();
	const imageModules = Object.entries(
		import.meta.glob(`$lib/assets/portfolio/*.jpg`, {
			eager: true,
			/** this query optimizes the import */
            query: { enhanced: true, w: '1280;640;400' }
		})
	).filter(([k]) => k.includes(data.portfolio.id));
</script>
```

### Display images

Thus, inside your Svelte template, you loop over the imported images with the dedicated `enhanced:img` tag:

```html
<div class="my-4 grid grid-cols-2 gap-4 md:px-64">
  {#each imageModules as [_, module], i}
  <enhanced:img
    src="{module.default}"
    alt="{`${data.portfolio?.title}"
    -
    ${i}`}
    sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
  />
  <!-- sizes can be optimized, do your tests!  -->
  {/each}
</div>
```

### The output

The output is an HTML `<picture>` element with multiple formats like avif, webp, and jpeg:

```html
<picture>
  <!-- avif -->
  <source
    sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
    srcset="
      https://www.smthg/-01.DpBnrOf3.avif 1280w,
      https://www.smthg/-01.giEScqK7.avif  640w,
      https://www.smthg/-01.CBDzHDjx.avif  400w
    "
    type="image/avif" />
  <!-- webp -->
  <source
    sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
    srcset="
      https://www.smthg/-01.D1yYNfb1.webp 1280w,
      https://www.smthg/-01.C2vF8U-Q.webp  640w,
      https://www.smthg/-01.DeTegKll.webp  400w
    "
    type="image/webp" />
  <!-- jpeg -->
  <source
    sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
    srcset="
      https://www.smthg/-01.BaYrOgC0.jpeg 1280w,
      https://www.smthg/-01.CyzWffte.jpeg  640w,
      https://www.smthg/-01.DQ1OFJ6d.jpeg  400w
    "
    type="image/jpeg" />
  <!-- fallback -->
  <img
    src="https://www.smthg/-01.BaYrOgC0.jpeg"
    alt="Débroussaillage - 0"
    width="1280"
    height="1707"
/></picture>
```

This ensures the client’s device chooses the best format and size, improving performance and loading times.

However, this add a step on the build part which is not a problem for a solo entrepreneur website, but can lead to a quite long build on a big project.

## Developer Experience

### Deployments

Deployments are not my favorite stuffs. But it's an important part of our job.

I basically start a Vercel project, connected my repo and the domain name and it worked like a charm.

For this kind of micro-websites, Vercel is an excellent choice.

SvelteKit offers a wide range of [adapters](https://svelte.dev/docs/kit/adapters) if you want to deploy elsewhere.

### Overall

Doing this website was fast and pretty pleasant, since Svelte is made on the top of Web Standards, any developer can easily start something in minutes.

The tooling is quite nice, and the Svelte's compiler warnings is a brillant idea.

Thanks to this, I corrected some markups mistakes before getting these errors in Google Lighthouse.

---

This project was a great learning experience and a fantastic introduction to SvelteKit.
