# Deepak Chigal — AI Security & Cloud blog

A fast, magazine-style static blog (hero, featured posts, category tabs,
post grid) with no server, no database, and no monthly hosting bill
required. Everything lives in plain files you can host anywhere.

## What's in here

```
index.html        → homepage (hero, featured posts, category tabs, grid)
archive.html      → every entry, filterable by category
post.html         → template that renders one entry (via ?slug=... in the URL)
write.html        → local tool: fill a form, get the code for a new entry
css/style.css     → all styling
js/posts.js       → every entry lives here — this is your "backend"
js/categories.js  → the list of category tabs (AI Security, Cloud Security, etc.)
js/render.js      → the code that turns posts.js into HTML
```

## Categories

Posts are tagged with one primary `category` (shown as the filter tabs —
AI Security, Cloud Security, DevSecOps, Automation, Career by default) plus
any extra `tags`. To add a new category, add it to `js/categories.js` and
use that same string as a post's `category`.

## Featured posts

Set `featured: true` on a post in `posts.js` to have it appear as one of the
large cards at the top of the homepage. Keep this to 1–2 posts at a time —
older featured posts should be set back to `false` as newer ones take their
place.

## Adding a new entry (do this daily)

1. Double-click `write.html` to open it in your browser. No internet or
   server needed for this step.
2. Fill in the title, subtitle, date, category, tags, excerpt, and content.
3. Click **Generate post code**, then **Copy to clipboard**.
4. Open `js/posts.js` in any text editor (Notepad, VS Code, whatever).
5. Paste the copied snippet as the **first item** inside the `POSTS = [ ... ]`
   array — right after the opening `[`. Newest entries go at the top.
6. Save the file.
7. Re-upload just `js/posts.js` to your host (see below), or git push if
   you're using GitHub Pages/Netlify.

That's the entire daily workflow — one file to edit, one file to upload.

## Hosting it on your own domain

Once you buy your domain, you have three easy paths:

### Option A — Any shared hosting / cPanel (GoDaddy, Hostinger, etc.)
1. Upload the whole `blog` folder's contents into your hosting's `public_html`
   (or equivalent web root) via FTP or the file manager.
2. Point your domain to that hosting (usually automatic if you bought hosting
   and domain from the same place; otherwise update your domain's nameservers).
3. Visit your domain — done.

### Option B — Netlify or Vercel (free, and very simple)
1. Create a free account at netlify.com or vercel.com.
2. Drag and drop the `blog` folder onto their dashboard (Netlify has a literal
   drag-and-drop deploy area).
3. In their dashboard, go to Domain settings and add your custom domain —
   they'll give you DNS records to add at your domain registrar.

### Option C — GitHub Pages (free, good if you're comfortable with git)
1. Push this folder to a GitHub repository.
2. In the repo's Settings → Pages, enable Pages for the `main` branch.
3. Add your custom domain in the same settings screen and update your DNS
   as GitHub instructs.

Any of these work well for a static site like this — pick whichever feels
easiest. Netlify/Vercel are usually the least fussy for a first-timer.

## If you outgrow this later

This setup covers a personal daily-log blog very well. If later you want
things a static site can't do — a comment system, a real login-protected
admin panel you can post from on your phone, full-text search across posts,
or a CMS — that needs an actual backend (Node.js + a database) deployed to
a VPS or a platform like Render/Railway. Happy to build that version when
you're ready for it; it's a bigger project than this one.
