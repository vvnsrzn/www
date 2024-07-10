---
title: 'Solinum'
description: 'A very cool non-profit mission'
stack: ['TypeScript', 'Express', 'PostHog']
---


# Solinum

Thanks to [Zenika Brest](https://zenika.com/en-US/agency/brest), I had the chance to work as a volunteer for [Solinum](https://www.solinum.org/) via a [Vendredi](https://en.vendredi.cc/) partnership.

The job was pretty straightforward, to setup an open-source tracking analytics solutions called [PostHog](https://posthog.com/).

Solinum's technical stack:
- TypeScript
- Express
- Angular
- Lerna
- GitHub

As the mono-repository is well organized (real clean archi this time), it was quite fast to add some code.

The README.md was up-to-date (not a joke, a real README with instructions working like a charm!) and I started my journey in minutes.

The TypeScript implemetation was very handy too. I quickly stumbled upon all the types/interfaces needed for my first iteration.

## Code

### Type stuffs

As described earlier, my job was to setup a tracking system. In order to avoid some fuzzy events, I suggested a simple tracking rule.

With TypeScript litterals this suggestion turned quite robust.

Type definition
```ts
type Action = "EDIT" | "VIEW"; 
type Feature = "PLACE" | "SEARCH";
type TrackedEvent = `${Action}_${Feature}`;
type TrackedEvents = { [T in TrackedEvent]?: Lowercase<T> };
```

Constants
```ts
import { TrackedEvents } from "../types/TrackedEvents.type";

export const TRACKED_EVENTS = {
  VIEW_PLACE: "view_place",
  EDIT_SEARCH: "edit_search",
} satisfies TrackedEvents;
```

The const declaration avoid the [enum problem](https://www.youtube.com/watch?v=jjMbPt_H3RQ) and the satisfies operator ensure a magical inference.

### Refactor

By removing the former analytics integration (MongoDB documents), I managed to delete a bunch of files/lines. Always cool.

I also took the initiative to refactor some specs with the infamous jest it.each method.

A use case where ChatGPT is delightful.

## Conclusion

I had a lot of fun to do this tiny project. It helps a lot to work with other ways of coding.

Next time, I will stick more closely with my favorites craft paradigms (baby steps and mob programming) in order to ship even faster.