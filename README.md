# Steal my focus window
Gnome Shell Extension that removes the 'window is ready' message and focuses the window instead.  
This is a fork of the 'Steal My Focus' extension to add GNOME 45+ support.

## Install
This extension is available on [GNOME Extensions Website](https://extensions.gnome.org/extension/6385/steal-my-focus-window/).

## App Name Blacklist
The extension supports a hard-coded app name blacklist in `extension.js`.

When a window demands attention, the extension reads the app name from `Shell.WindowTracker` and compares it against `APP_NAME_BLACKLIST` using a case-insensitive substring match. If the app name matches any blacklist entry, the window will not steal focus.

Example:

```js
const APP_NAME_BLACKLIST = [
    'wechat',
    '微信'
];
```

This is useful for apps that frequently request attention but should stay in the background.
