const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const {call} = require("ts-loader");
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

// cookie parser
server.use(cookieParser("secret"));

// cors
server.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

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
            const {password, uid, ...user} = userFromBd;

            // 1500m
            const accessTokenTime = 90000000;
            res.cookie("access_token", uid, {
                httpOnly: true,
                expires: new Date(Date.now() + accessTokenTime),
                // signed: true
            });


            const refreshTokenTime = 60000000;
            res.cookie("refresh_token", crypto.randomUUID(), {
                httpOnly: true,
                expires: new Date(Date.now() + refreshTokenTime),
            });

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
        db["cart_data"]["cart_data"].push({in_cart_item_id: item_id, cart_id: 1,item_id: item_id, quantity: quantity})
        var json = JSON.stringify(db);
        fs.writeFile(path.resolve(__dirname, 'db.json'), json, 'utf8', function (err){console.log(err)});
        return res.status(200).json({message: "OK"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})

server.post('/drop_cart', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        db["cart_data"]["cart_data"] = []
        var json = JSON.stringify(db);
        fs.writeFile(path.resolve(__dirname, 'db.json'), json, 'utf8', function (err){console.log(err)});
        return res.status(200).json({message: "OK"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})

server.post('/drop_cart_item', (req, res) => {
    try {
        const {in_cart_item_id} = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        for (const cart_item in db["cart_data"]["cart_data"]) {
            console.log(Number(cart_item))
            if (db["cart_data"]["cart_data"][Number(cart_item)]["in_cart_item_id"] === in_cart_item_id) {
                db["cart_data"]["cart_data"].splice(Number(cart_item))
            }
        }

        var json = JSON.stringify(db);
        fs.writeFile(path.resolve(__dirname, 'db.json'), json, 'utf8', function (err) {
            console.log(err)
        });
        return res.status(200).json({message: "OK"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
})

server.get('/profile', (req, res) => {
    try {
        // console.log(req.cookies)
        const uid = req.cookies["access_token"];
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;
        const userFromBd = users.find(
            (user) => user.uid === uid
        );

        if (userFromBd) {
            // const {user} = userFromBd;
            return res.json(userFromBd);
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
