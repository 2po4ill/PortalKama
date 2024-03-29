const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const {call} = require("ts-loader");

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос не проходил мгновенно
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Эндпоинт логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            const {password, ...user} = userFromBd;
            return res.json(user);

            // const {uid, img, ...user} = userFromBd;
            // return res.json( { uid, img });
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.post('/add_cart_item', (req, res) => {
    try {
        const { item_id, quantity } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { cartitem } = db
        cartitem.push({cart_item_id: 3, cart_id: 1,item_id: item_id, quantity: quantity})
        var json = JSON.stringify(db);
        fs.writeFile(path.resolve(__dirname, 'db.json'), json, 'utf8', function (err){console.log(err)});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})

server.get('/profile', (req, res) => {
    try {
        const { uid } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;
        const userFromBd = users.find(
            (user) => user.uid === uid
        );

        if (userFromBd) {
            const {user} = userFromBd;
            return res.json(user);
        }

        return res.status(403).json({ message: 'User not found' });

    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message})
    }
})

// проверяем, авторизован ли пользователь
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
