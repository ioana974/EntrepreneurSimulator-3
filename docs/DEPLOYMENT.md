**Deploying the simulator (quick guide)**

- **Do not commit** `.env` — secrets must be set on the host.
- Commit an `.env.example` (included) so others know what to set.

Recommended hosts: Render, Heroku, Railway, DigitalOcean App Platform.

1) Prepare repo
 - Ensure `.gitignore` contains `.env` (already added).
 - Ensure `start` script in `package.json` is `node server.js` (already present).

2) Deploy to Render (example)
 - Create a new Web Service → connect GitHub repo.
 - Build Command: `npm install && npm run build` (if you use bundling).
 - Start Command: `node server.js`
 - In Render dashboard → Environment → add the env vars: `SENDGRID_API_KEY` or `EMAIL_USER`/`EMAIL_PASSWORD` and `ADMIN_EMAIL`, plus `MONGODB_URI`.

3) Deploy to Heroku (example)
 - Create an app on Heroku.
 - Connect GitHub repo or push with `git push heroku main`.
 - In Heroku Settings → Reveal Config Vars → add the environment variables from `.env.example`.
 - Ensure a `Procfile` exists: `web: node server.js` (included).

4) Notes
 - The code uses Ethereal fallback for local testing when no mail credentials are provided; in production set `SENDGRID_API_KEY` or SMTP vars.
 - If you want SendGrid, install `@sendgrid/mail` in production or add it to `package.json` before deploying. The server tries SendGrid when `SENDGRID_API_KEY` is present.
 - Ensure `MONGODB_URI` points to a reachable database (Atlas, or other). If you don't need persistence, the debug endpoints allow email testing without DB.

If you want, I can prepare a small GitHub Actions workflow to deploy to Render/Heroku automatically — tell me which host and I will scaffold it.

6) GitHub Actions
 - I added a CI workflow (`.github/workflows/ci.yml`) that installs dependencies, runs the build and tests on pushes and PRs.
 - I also added a Heroku deploy workflow (`.github/workflows/deploy-heroku.yml`). To enable it you must add the following GitHub Secrets in your repository settings:
	 - `HEROKU_API_KEY` — your Heroku account API key
	 - `HEROKU_APP_NAME` — the name of your Heroku app
	 - `HEROKU_EMAIL` — your Heroku account email
 - Once these are set, pushing to the `main` branch will trigger deployment to Heroku.

Render / Railway
- I added a Render deploy workflow (`.github/workflows/deploy-render.yml`) that will trigger a Render build via the Render API when you push to `main`.
- To enable Render deploy, add the following GitHub Secrets:
	- `RENDER_API_KEY` — your Render API key (from Account → API Keys)
	- `RENDER_SERVICE_ID` — the service id for your Web Service (you can find it in the Render dashboard URL or via API)
- The workflow will call the Render deploy endpoint to trigger a new deploy.

If you prefer Railway or another provider, tell me and I will scaffold the workflow for that provider.

7) Next steps I can take for you (pick one):
 - Scaffold a Render or Railway auto-deploy workflow instead of Heroku.
 - Add a GitHub Actions secret-aware instruction file to help you set secrets.
 - Add `@sendgrid/mail` back into `package.json` so SendGrid works out-of-the-box (I left it optional to avoid install errors).