"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ******************** Обработка событий текущего процесса ********************
process.on('disconnect', () => {
    process.exit();
});
process.on('uncaughtException', (e) => {
    process.send('uncaughtException pid:' + process.pid + ': stack: ' + e.stack);
    setTimeout(() => {
        process.exit();
    }, 3000);
});
process.on('warning', (e) => {
    process.send('pid:' + process.pid + ': ' + e + ' \r\n stack: ' + e);
});
// ******************** Загрузка зависимостей ********************
const mediaHandler_1 = require("./mediaHandler");
let mediaHandler = new mediaHandler_1.MediaHandler();
mediaHandler.on('event', (data) => {
    if (data) {
        // process.send('Manager action: ' + data.action);
        if(data.action == 'stream_on') {
            clearTimeout(timer3);
        }
        process.send(data);
    }

});
// ******************** Обработка сообщений родительского процесса ********************
process.on('message', (data) => {
    if ((!data) || (!data.action)) {
        return false;
    }
    mediaHandler.emit(data.action, data);
});

setTimeout(() => {
    process.send("Сработал таймаут 30 минут в manager.js")
    process.exit();
}, 1800000);
let timer3 = setTimeout(() => {
    process.send("Сработал таймаут 3 минут в manager.js")
    process.exit();
}, 1800000);