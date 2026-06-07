const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, 'data.json');
const themeFile = path.join(__dirname, 'theme.json');

function getSavedTheme() {
    try {
        const d = JSON.parse(fs.readFileSync(themeFile, 'utf-8'));
        return d.theme || 'dark';
    } catch { return 'dark'; }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        transparent: true,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        x: 1500,
        y: 100,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('index.html');
    return win;
}

app.whenReady().then(() => {
    let isMini = false;
    let normalBounds = null;
    const win = createWindow();

    ipcMain.on('close', () => app.quit());

    ipcMain.on('resize', (_, mini) => {
        isMini = mini;
        if (mini) {
            normalBounds = { ...win.getBounds() };
            const { x, y, width, height } = normalBounds;
            const miniX = x + Math.round((width - 220) / 2);
            const miniY = y + Math.round((height - 44) / 2);
            win.setMinimumSize(220, 44);
            win.setMaximumSize(2200, 440);
            win.setBounds({ x: miniX, y: miniY, width: 220, height: 44 }, true);
        } else {
            const b = normalBounds || { x: 1500, y: 100, width: 300, height: 400 };
            win.setMinimumSize(300, 400);
            win.setMaximumSize(3000, 4000);
            win.setBounds({ x: b.x, y: b.y, width: b.width || 300, height: b.height || 400 }, true);
        }
    });

    ipcMain.handle('load-data', () => {
        try { return JSON.parse(fs.readFileSync(dataFile, 'utf-8')); } catch { return null; }
    });

    ipcMain.on('save-data', (_, data) => {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    });

    ipcMain.on('get-theme', (event) => {
        event.returnValue = getSavedTheme();
    });

    ipcMain.on('save-theme', (_, theme) => {
        fs.writeFileSync(themeFile, JSON.stringify({ theme }));
    });
});
