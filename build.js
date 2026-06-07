const builder = require('electron-builder');
const Platform = builder.Platform;

builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
        appId: 'com.countdown.widget',
        productName: 'Countdown Widget',
        win: { target: 'portable' },
        files: ['index.html', 'main.js'],
        portable: { artifactName: 'CountdownWidget.exe' },
        asar: true
    }
}).then(() => {
    console.log('Build complete!');
}).catch(err => {
    console.error(err);
    process.exit(1);
});
