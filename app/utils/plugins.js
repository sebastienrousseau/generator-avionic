module.exports = {
    prompts: [{
        type: 'checkbox',
        name: 'plugins',
        message: 'Enter the plugins you\'d like to use:\n\n',
        choices: [{
            value: 'cordova-plugin-console',
            name: 'cordova-plugin-console',
            checked: true
        }, {
            value: 'cordova-plugin-whitelist',
            name: 'cordova-plugin-whitelist',
            checked: true
        }, {
            value: 'org.apache.cordova.inappbrowser',
            name: 'org.apache.cordova.inappbrowser',
            checked: true
        }, {
            value: 'com.ionic.keyboard',
            name: 'com.ionic.keyboard',
            checked: true
        }, {
            value: 'cordova-plugin-device',
            name: 'cordova-plugin-device',
            checked: true
        }, {
            value: 'cordova-plugin-splashscreen',
            name: 'cordova-plugin-splashscreen',
            checked: true
        }, {
            value: 'cordova-plugin-statusbar',
            name: 'cordova-plugin-statusbar',
            checked: true
        }, {
            value: 'nl.x-services.plugins.socialsharing',
            name: 'cordova-plugin-socialsharing',
            checked: true
        }, {
            value: 'cordova-plugin-apple-watch',
            name: 'cordova-plugin-apple-watch',
            checked: false
        }, {
            value: 'cordova-plugin-network-information',
            name: 'cordova-plugin-network-information',
            checked: false
        }, {
            value: 'cordova-plugin-battery-status',
            name: 'cordova-plugin-battery-status',
            checked: false
        }, {
            value: 'cordova-plugin-device-motion',
            name: 'cordova-plugin-device-motion',
            checked: false
        }, {
            value: 'cordova-plugin-device-orientation',
            name: 'cordova-plugin-device-orientation',
            checked: false
        }, {
            value: 'cordova-plugin-geolocation',
            name: 'cordova-plugin-geolocation',
            checked: false
        }, {
            value: 'cordova-plugin-camera',
            name: 'cordova-plugin-camera',
            checked: false
        }, {
            value: 'cordova-plugin-media-capture',
            name: 'cordova-plugin-media-capture',
            checked: false
        }, {
            value: 'cordova-plugin-media',
            name: 'cordova-plugin-media',
            checked: false
        }, {
            value: 'cordova-plugin-file',
            name: 'cordova-plugin-file',
            checked: false
        }, {
            value: 'cordova-plugin-file-transfer',
            name: 'cordova-plugin-file-transfer',
            checked: false
        }, {
            value: 'cordova-plugin-dialogs',
            name: 'cordova-plugin-dialogs',
            checked: false
        }, {
            value: 'cordova-plugin-vibration',
            name: 'cordova-plugin-vibration',
            checked: false
        }, {
            value: 'cordova-plugin-contacts',
            name: 'cordova-plugin-contacts',
            checked: false
        }]
    }]
};
