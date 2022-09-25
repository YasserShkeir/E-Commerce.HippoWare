const {BrowserWindow, app, Menu} = require('electron');
let login_page = 'index.html';


const createWindow = (path) =>{
    win = new BrowserWindow({show: false,
        icon:'assets/images/hippo-icon.png'});
    win.maximize();
    win.show();
    win.loadFile(path);
    // win.webContents.openDevTools();
    const builtInMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(builtInMenu);
}

app.whenReady().then( ()=> {
    createWindow(login_page);
});

// mac os exception
// because software will keep running on mac even when all windows are closed
app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin') app.quit();
})

// REMOVE BUILTIN MENU
const mainMenuTemplate = [
    {
        label: ''
    }
];
