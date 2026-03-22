---
title: "My Grandmother's Recipe Notebooks"
date: 2026-03-22
author: "Vivian Sarazin"
tags: ["heritage", "food", "recipes", "digital-archive"]
draft: false
---

My grandmother left me her recipe notebooks — a handwritten patchwork of dishes gathered across a lifetime of travel between France, Spain and the Maghreb. Some recipes were passed down in the family, others shared by friends, clipped from magazines, or invented and refined over the years. These notebooks capture culinary knowledge from an era when recipes were passed by word of mouth, magazine clippings or TV programs — long before Google.

![Agneau en croûte](https://www.lescahiersdejeanine.fr/_ipx/w_1536&f_webp/Agneau%20en%20cro%C3%BBte.jpg)

## Digitizing the pages

To preserve this legacy, I photographed each page individually. That work took time, but it allowed me to digitize the pages while letting the fragile notebooks rest.

## From images to structured data

I then used a Vision-Language Model (VLM) to convert the photos into structured recipes. Rather than relying on OCR alone — which often struggles with cursive handwriting and mixed typographies — the VLM approach handled complex pages far better than expected.

Each extracted recipe was mapped to the [Recipe schema from schema.org](https://schema.org/Recipe), giving the data a clean, machine-readable structure.

```json
{
  "@type": "Recipe",
  "name": "Tajine d'agneau aux pruneaux",
  "recipeCategory": "Plat principal",
  "recipeCuisine": "Maghreb",
  "recipeIngredient": [
    "1 kg d'épaule d'agneau",
    "200g de pruneaux",
    "2 oignons"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Faire revenir la viande avec les oignons émincés."
    }
  ]
}
```

```typescript
import { type RecipeMeta, RECIPE_FORMAT } from "../types.ts";

export const SYSTEM_PROMPT = `
Tu lis parfaitement le français, y compris l’écriture manuscrite.

Ton rôle est strictement mécanique : analyser l’image, extraire fidèlement le texte,
et le reformuler dans un JSON conforme au schéma suivant:

${JSON.stringify(RECIPE_FORMAT)}

Il peut y avoir des abréviations : conserve-les telles quelles, sans interprétation.
La recette est écrite sur un agenda : ignore tout ce qui est relatif aux dates, jours, numéros ou éléments non culinaires.`;

export const USER_PROMPT = ({
  recipeImagePath,
  recipeTitle,
  recipeSlug,
}: RecipeMeta) => `
C’est une recette de ${recipeTitle}.

Analyse l’image, extrait exactement la recette manuscrite, puis reformule-la dans un JSON
selon le schéma fourni.

Ne fais aucune interprétation si tu n’es pas sûr — reste parfaitement fidèle au contenu visible.

Tu dois répondre STRICTEMENT avec un JSON conforme au schéma, sans aucun texte avant ou après.
N’utilise pas de backticks, pas de commentaires, pas de virgules finales.
N’ajoute aucune information qui ne figure pas clairement dans l’image.

Son image est "${recipeImagePath}", ajoute-le dans le schéma.
Son slug est "${recipeSlug}", ajoute-le dans le schéma.
Enfin, tu dois rédiger une description du plat pour donner un aperçu qui donne envie, ajoute-le dans le schéma.`;
```

## Infrastructure: GPU on demand

To run the model efficiently, I deployed it on a GPU instance via [Vast.ai](https://vast.ai/) using [vLLM](https://github.com/vllm-project/vllm) as the inference server. This setup let me process all the images at scale for roughly five dollars in compute — with about 80% of recipes successfully transcribed on the first pass.

```typescript
async function main() {
  await renameImages();
  try {
    const recipeImagesPaths = await promises.readdir(IMAGES_DIR);
    for (const recipeImagePath of recipeImagesPaths) {
      const filePath = path.join(IMAGES_DIR, recipeImagePath);
      const stat = await promises.stat(filePath);
      if (stat.isFile()) {
        const buffer = await promises.readFile(filePath);
        const base64Image = buffer.toString("base64");

        if (!recipeImagePath) return;
        const recipeTitle = recipeImagePath.replace(".JPG", "");
        const recipeSlug = recipeTitle.toLowerCase().replaceAll(" ", "-");

        const recipeMeta = {
          recipeImagePath,
          recipeTitle,
          recipeSlug,
        } satisfies RecipeMeta;

        const payload = {
          model: MODEL,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: USER_PROMPT(recipeMeta),
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          ...OPTIONS,
        };

        const body = JSON.stringify(payload);
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body,
        });

        if (!response.body) return;

        const json = await response.json();

        await promises.writeFile(
          path.join(CONTENT_DIR, `${recipeSlug}.json`),
          json.choices[0].message.content
        );
      }
    }
  } catch (error) {
    const apiError: ApiError =
      error instanceof Error
        ? { type: "network", message: error.message }
        : { type: "parse", chunk: "unknown" };
    console.error("Error:", apiError);
  }
}
```

## Building the website with Nuxt

I chose [Nuxt](https://nuxt.com/) for the website because it provides the speed and developer experience I wanted without overcomplicating things. With the recipes stored as JSON files, [Nuxt Content](https://content.nuxt.com/) exposes a lightweight API for the front end to query and display the data.

```typescript
  const {
    q = "",
    limit,
    skip,
    selectedCategories = "",
    selectedCuisines = "",
  } = body.data;

  const recettesSearchQuery = queryCollection(event, "recettes").andWhere(
    (query) =>
      query
        .where("title", "LIKE", `%${q}%`)
        .where("description", "LIKE", `%${q}%`)
        .where("recipeCategory", "LIKE", `%${selectedCategories}%`)
        .where("recipeCuisine", "LIKE", `%${selectedCuisines}%`)
  );

  const recettesQuery = queryCollection(event, "recettes");

  const [total, allRecipes, availableRecipes] = await Promise.all([
    recettesSearchQuery.count(),
    recettesQuery.select("recipeCategory", "recipeCuisine").all(),
    recettesSearchQuery
      .limit(limit)
      .skip(skip)
      .select("title", "description", "recipeCategory", "recipeCuisine", "slug")
      .all(),
  ]);
```


You can explore the result at [lescahiersdejeanine.fr](https://www.lescahiersdejeanine.fr/).

![Cassoulet](/projects/cassoulet.png)

## What's next — 2026 roadmap

There's still work to do:

- Recover the remaining ~20% of recipes that the model didn't parse correctly on the first pass.
- Harmonize categories and dish types to improve search and browsing.
- Correct spelling and transcription errors while staying faithful to the original text.
- Integrate the second notebook — about 250 more recipes.

## Try it yourself

If you have family recipe notebooks of your own, here's the approach that worked for me: photograph pages carefully, use a modern VLM for transcription, structure the output with [schema.org (Recipe)](https://schema.org/Recipe), and publish via a static or hybrid framework like Nuxt. It's a rewarding way to preserve culinary heritage and make it searchable for future generations.