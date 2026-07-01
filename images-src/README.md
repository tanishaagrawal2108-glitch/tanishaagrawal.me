# images-src

Drop raw map exports here, in one folder per project (folder name = project
`slug`). These files are **not** committed — they're inputs to the optimizer.

```
images-src/
  pm25-health/
    composite-risk.png
    figure-1.png
```

Then run:

```bash
npm run images
```

…which writes optimized `public/images/<slug>/<name>.webp` (+ `.thumb.webp`)
that the site references via `next/image`. Wire them up in
`src/content/projects.ts` (`heroImage`, `maps[].src`). See the root README for
the full "how to add a project" guide.
