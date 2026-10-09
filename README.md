# AI CORE: Refeena Refath's portfolio

A static, dependency-free portfolio site: HTML, CSS and vanilla JavaScript, with Three.js (loaded from a CDN) for the 3D android. There's no build step and no Node.js required.

## Run it locally

From the folder *above* `portfolio/`:

```bash
python -m http.server 5173 --directory portfolio
```

Then open http://localhost:5173. Use a local server rather than double-clicking `index.html`: the 3D robot loads as an ES module, and browsers block modules on `file://` pages.

## Where things live

| File | What to edit |
|---|---|
| `js/content.js` | **All content**: name, links, about cards, skills, experience, education, certifications, projects, featured and hidden repositories, form endpoint |
| `assets/Refeena_Refath_CV.pdf` | The CV the "Download CV" button serves. This is the web copy, without a phone number. Replace it with the same filename to update it. |
| `assets/refeena-portrait.jpg` | Photo in the About module |
| `assets/og-card.jpg` | Image shown when the link is shared on LinkedIn, WhatsApp and similar |
| `css/styles.css` | Design tokens are at the top (`:root`) |
| `js/main.js` | Rendering, navigation, assistant answers (the `KB` list), GitHub feed, contact form |
| `js/robot.js` | The procedural 3D robot (materials, lights, animation) |

### Adding a project
Copy one object in `projects` inside `js/content.js`. `status` must be `Professional`, `Completed`, `In progress` or `Planned`. Leave `source` or `demo` as `null` if they don't exist, and the buttons won't appear. Never link a private repository.

### When the IIT Patna programme finishes
In `content.js`, change the programme's `status` to `"Completed"`, update `note` and `dates`, and remove the sentence about the certificate being added later (it's in `main.js`, under "Certifications").

## Contact form

The form never pretends to send. Out of the box it opens the visitor's email app with the message pre-filled to `refinah20@gmail.com`. To receive messages directly instead:

1. Create a free form at https://formspree.io (or a similar service that accepts JSON POST).
2. Paste its endpoint into `formEndpoint` in `js/content.js`, for example `"https://formspree.io/f/abcdwxyz"`.

The form validates name, email and message, and shows a success or error message.

## Robot assistant

"CORE GUIDE" answers **only** from the portfolio content using local keyword matching. It is not a live AI model, and the panel says so. To add a question, add an entry to the `KB` array in `js/main.js`. If you ever connect a real LLM, do it through a server-side function (for example Cloudflare Workers or Netlify Functions) that holds the API key. Never put a key in front-end JavaScript.

## GitHub section

The site fetches public repositories from `github.com/refinah20` and `github.com/Refinah` with the public GitHub API: no token, cached for 30 minutes per visitor. Forks, empty repositories and those listed in `hiddenRepos` are skipped. If GitHub is unreachable or rate-limited, the `featuredRepos` list is shown instead.

## Accessibility and performance

- Skip link, semantic landmarks, keyboard-operable menu, accordions, filters and assistant (Esc closes them), and visible focus rings.
- `prefers-reduced-motion`: no boot intro, the robot renders a single still frame, and animations and scroll reveals are off.
- The 3D scene pauses when it's off-screen or the tab is hidden. If WebGL or the CDN fails, a CSS robot appears instead.
- The boot intro lasts 1.6 s at most, can be skipped, and only shows on the first visit in a session.

## Deploy free on GitHub Pages

```bash
cd portfolio
git init
git add .
git commit -m "AI CORE portfolio"
gh repo create refinah20.github.io --public --source . --push
```

After a minute the site is live at **https://refinah20.github.io**. Then:

1. Change `og:image` in `index.html` to the full URL `https://refinah20.github.io/assets/og-card.jpg`, because social sites need an absolute link.
2. Add the URL to your CV, LinkedIn (Featured and Contact info) and GitHub profile.

Other free hosts work the same way, since it's a static folder: Netlify (drag and drop the folder) and Cloudflare Pages.
