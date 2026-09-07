# Academic Command Center

A lightweight Fall 2026 academic tracker designed for GitHub Pages.

## Student setup

The published site stores tasks, notes, statuses, and settings in the current browser. Screenshot recognition also runs inside the browser. Screenshots are not uploaded or retained.

Canvas synchronization is read-only. A scheduled GitHub Actions workflow downloads the private Canvas Calendar Feed, encrypts it, and deploys only the encrypted snapshot. The dashboard asks for the matching passphrase before it can read the snapshot.

### One-time private Canvas setup

1. In Duke Canvas, open **Calendar**, then **Calendar Feed**.
2. Copy the private feed URL. Do not place it in any repository file or chat message.
3. In this GitHub repository, open **Settings > Secrets and variables > Actions**.
4. Create a repository secret named `CANVAS_FEED_URL` and paste the feed URL as its value.
5. Create a second repository secret named `CANVAS_SYNC_PASSPHRASE`. Use a long, unique passphrase and save it in your password manager.
6. Open **Actions > Publish tracker and refresh Canvas > Run workflow**.
7. In **Settings > Pages**, set the publishing source to **GitHub Actions** if GitHub has not already done so.
8. Open the published tracker, select **Sync Canvas**, and enter the same passphrase.

The scheduled workflow checks the feed hourly. Canvas may itself delay feed updates. The dashboard never writes to Canvas and never automatically overwrites local tasks. New items and deadline changes appear in a review screen.

### Calendar file fallback

If scheduled synchronization has not been configured, select **Sync Canvas > Use a downloaded Canvas calendar file instead** and upload the `.ics` file from Canvas. The same duplicate and change review is applied.

## Data protection

- Treat the Canvas Calendar Feed URL like a password.
- Never publish or paste the feed URL into an issue, repository file, or chat.
- Manual tasks are never removed when a Canvas item disappears.
- A Canvas update does not change the tracker's Completed status or notes.
- Use **More > Export backup** periodically because local browser storage can be cleared.

## Storage

The hosted application is under 10 MB. Tracker records normally use far less than 1 MB of browser storage. No developer tools or desktop installation are required.
