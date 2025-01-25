---
title: 'David Poupon'
description: 'My very first website with SvelteKit'
stack: ['SvelteKit', 'Vercel']
---

At Hublo, we do SvelteKit. Before starting my new job, I had to learn a framework. 

One of the best ways to do so, is to spin up a tiny project. IMO, the smallest, the better.

# David Poupon

I had a chance to meet [David Poupon](https://www.poupon-paysage.fr) which is a talented trimmer, starting his own company.

As a solo entrepreneur, David need a website to showcase his work and his contact informations.

So I decided to help him and create a pro-bono website.

The main objective for David is to rank first on Google.

No matters the technology or the underlying architecture pattern.

As you can expect, I just received a logo, a phone number and some pictures.

But it's OK, I had some details to start the project.

Hopefully in a LLM world, you can transform a 200 characters brief into a description.

## Images in SvelteKit

A part very interesting in this project was on the pictures management.

Obviously, David didn't hear about Web Vitals, image compression, Google Lighthouse and all of this.

So David sent me a load of very large pictures to display on this website.

As a lazy man, I wanted to find a way to resize images directly on the SvelteKit's server, and then, display an optimized image to the client. 

And here comes [@sveltejs/enhanced-img](https://svelte.dev/docs/kit/images#sveltejs-enhanced-img).

By leveraging Vite's assets handling, SvelteKit offers a great DX.

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

And after, inside your Svelte template, you loop over the imported images with the dedicated ```enhanced:img``` tag:


```html
<div class="my-4 grid grid-cols-2 gap-4 md:px-64">
	{#each imageModules as [_, module], i}
		<enhanced:img
			src={module.default}
			alt={`${data.portfolio?.title} - ${i}`}
			sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
		/>
        <!-- sizes can be optimized, do your tests!  -->
	{/each}
</div>
```

And then, the output will be something like this!

```html
<picture>
    <!-- avif -->
    <source sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" srcset="https://www.smthg/-01.DpBnrOf3.avif 1280w, https://www.smthg/-01.giEScqK7.avif 640w, https://www.smthg/-01.CBDzHDjx.avif 400w" type="image/avif">
    <!-- webp -->
    <source sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" srcset="https://www.smthg/-01.D1yYNfb1.webp 1280w, https://www.smthg/-01.C2vF8U-Q.webp 640w, https://www.smthg/-01.DeTegKll.webp 400w" type="image/webp">
    <!-- jpeg -->
    <source sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" srcset="https://www.smthg/-01.BaYrOgC0.jpeg 1280w, https://www.smthg/-01.CyzWffte.jpeg 640w, https://www.smthg/-01.DQ1OFJ6d.jpeg 400w" type="image/jpeg">
    <!-- fallback -->
    <img src="https://www.smthg/-01.BaYrOgC0.jpeg" alt="Débroussaillage - 0" width="1280" height="1707"></picture>
```

For the final user this is something great, because the device can choose whatever suits for him, all by using the standard HTML picture tag.

However, this add a step on the build part which is not a problem for a solo entrepreneur website.

## Developer Experience

### Deployments

Deployments are not my favorite stuffs. But it's an important part of our job.

I basically start a Vercel project, connected my repo and the domain name and it worked like a charm.

For this kink of micro website, Vercel is a very good one.

SvelteKit offers a wide range of [adapters](https://svelte.dev/docs/kit/adapters) if you want to deploy elsewhere.

### Overall

Doing this website was fast and pretty pleasant, since Svelte is made on the top of Web Standards, any developer can easily start something in minutes.

The tooling is quite nice, and the Svelte's compiler warnings is a brillant idea. 

Thanks to this, I corrected some markups mistakes before getting the error in Google Lighthouse.
