---
title: "My Grandmother's Recipe Notebooks"
date: 2026-02-01
author: "Vivian Sarazin"
tags: ["heritage","food","recipes","digital-archive"]
draft: false
---

My grandmother left me her recipe notebooks — a handwritten patchwork of dishes gathered across a lifetime of travel between France, Spain and the Maghreb. Some recipes were passed down in the family, others shared by friends, clipped from magazines, or invented and refined over the years. These notebooks capture analog culinary wisdom from an era when recipes were passed by word of mouth, magazine clippings or TV programs — long before Google.

To preserve this legacy, I photographed each page individually. That work took time, but it allowed me to digitize the precious pages while letting the old notebooks rest. I then used an image-to-text approach — specifically a Vision-Language model — to convert the photos into structured data.

Using a model specialized in vision and language, I extracted the recipes and mapped them to the Recipe schema from schema.org to provide clear, machine-readable structure. To run the model efficiently, I deployed it on a powerful GPU instance on Vast.ai (via vLLM), which let me process the images at scale and at low cost. The final result: around 80% of the recipes were successfully transcribed into a usable format for roughly five dollars in compute.

The model impressed me: while OCR alone often struggles with cursive handwriting and mixed typographies, the vision-language approach handled complex images far better than expected. There are still spelling mistakes and imperfect transcriptions — I’m working through these manually — but the quality is high enough to build a simple, performant site.

I chose Nuxt for the website because it provides the speed and developer experience I wanted without making the site unnecessarily complicated. With the recipes in JSON, I added Nuxt Content to expose a lightweight API for the front end to fetch and display the data.

Next steps on my roadmap for 2026:
- Recover the remaining ~20% of recipes that the model didn’t parse correctly on the first pass.
- Harmonize categories and dish types to improve search and browsing.
- Correct spelling and transcription errors while staying faithful to the original text.
- Integrate the second notebook (about 250 more recipes).

If you have family recipe notebooks of your own, these steps might help you bring them online: photograph pages carefully, use a modern vision-language model for transcription, structure the results with schema.org (Recipe), and publish via a static or hybrid framework like Nuxt. It’s a rewarding way to preserve culinary heritage and make it searchable and shareable for future generations.
