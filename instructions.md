# Burn After Reading (BAR)

BAR lets you share encrypted messages and files with ephemeral links that are destroyed after they are viewed.

## Logging In

1. Open your BAR interface from the StartOS Services page, or copy its Tor address into any Tor-enabled browser (Tor Browser, Onion Browser (iOS), or Firefox/Brave with a SOCKS5 proxy).
2. Log in with your BAR password — use the **Get Password** action on the BAR service page to reveal it. A random password was generated when BAR was installed.
3. Bookmark the site, or better yet, save it to your Vaultwarden server.

## Changing the Password

Run the **Set Password** action on the BAR service page. You can type your own or click generate. The service restarts to apply the new password; your old password stops working.

## Sharing

Create a paste in the web UI and share the generated link over Tor. Once the recipient views it, the content is burned — gone for everyone, including you.
