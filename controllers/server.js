const http = require('http');

const DB = require('./db');

const server = http.createServer((req, res) => {
    //
    console.log('Url => ', req.url);
    console.log('Method => ', req.method);

    const [nothing, db, id] = req.url.split('/');


    switch (db) {
        case 'users': {
            const usersDB = new DB('users');
            if (id) {
                res.write(JSON.stringify(usersDB.getById(parseInt(id))));
            } else {
                //do the if statement here
                if (req.method === "POST") {
                    const newItem = usersDB.add({ name: "Baruch2" });
                    res.write(JSON.stringify(newItem));
                } else {
                    res.write(JSON.stringify(usersDB.get()));
                }
            }
            break;
        }
        case 'tweets': {
            const tweets = new DB('tweets');
            if (id) {
                res.write(JSON.stringify(tweets.getById(parseInt(id))));
            } else {
                res.write(JSON.stringify(tweets.get()));
            }
            break;
        }
        default: {
            const usersDB = new DB('users');
            //usersDB.add({ name: 'Baruch' });

            res.write("I Don't know what you want");
            break;
        }

    }
    //GET /users
    //GET /users/2
    //advance
    //GET /tweets
    //GET /tweets/1


    res.end();
})

server.listen(4000, () => {
    console.log('server is listening on port 4000');
})

