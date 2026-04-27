import Shell from 'gi://Shell';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const APP_NAME_BLACKLIST = [
    // Add app name keywords here, for example: 'telegram', 'wechat'
    'wechat',
    '微信'
];

export default class FocusMyWindow extends Extension {
    enable() {
        log('[steal-my-focus-window] enabled');

        this._handlerids = [
            global.display.connect('window-demands-attention', (_display, window) => {
                this._handleAttentionWindow('window-demands-attention', window);
            }),
            global.display.connect('window-marked-urgent', (_display, window) => {
                this._handleAttentionWindow('window-marked-urgent', window);
            }),
        ];
    }

    _handleAttentionWindow(signal, window) {
        const app = Shell.WindowTracker.get_default().get_window_app(window);
        const appName = app?.get_name() ?? '';
        const normalizedAppName = appName.toLowerCase();

        log(`[steal-my-focus-window] signal: ${signal}, app name: ${appName || '<unknown>'}, title: ${window?.get_title?.() ?? '<unknown>'}`);

        if (APP_NAME_BLACKLIST.some(keyword => normalizedAppName.includes(keyword.toLowerCase())))
            return;

        Main.activateWindow(window);
    }

    disable() {
        if (this._handlerids) {
            for (const handlerId of this._handlerids)
                global.display.disconnect(handlerId);
        }

        this._handlerids = null;
    }
}
