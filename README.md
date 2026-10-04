# ICAN Alumni Reporting

Node.js / Express app for Heroku, with MongoDB reports, sessions and GridFS uploads.

## Deploy
1. Upload the CONTENTS of github-upload to the repository root. Keep public and server as folders. The app uses public/index.html; remove the old placeholder root index.html.
2. Heroku Config Vars: NODE_ENV=production, MONGODB_URI (Atlas connection), SESSION_SECRET (random secret), ACCOUNTS_JSON (complete private account configuration). Never commit these values.
3. Connect the GitHub repository and deploy main. The Procfile starts the web process. Confirm the web dyno is enabled.
4. Check /api/health and then sign in. Test a campus draft, photo upload, submission and Aliana's view before distributing accounts.

Atlas must allow connections from the deployment environment. The MongoDB user needs readWrite access to uitm_alumni. Uploaded files are stored in MongoDB, not Heroku's temporary filesystem. Monitor the Atlas storage quota; each file is limited to 10 MB, with 40 files per report.

All configured accounts are enabled. Passwords are bcrypt hashes in ACCOUNTS_JSON. Changing a password hash invalidates that account's existing sessions. Administrator aliana can view all reports; campus accounts see their own reports. Reviews do not send email notifications.

## Templates
Awaiting 7 Dana Program Alumni documents, 1 Pelaporan ABC document and 1 Pelaporan Konvokesyen document. Add files under server/templates and update file and name in server/templates.json. Keep filenames simple. Downloads require login.

## Checks
npm ci
npm test

Automated checks cover validation, session login, CSRF rejection, campus isolation and administrator visibility using a simulated database. A live Atlas/Heroku connection and end-to-end browser workflow still need deployment testing.
