const fs = require('fs');

const path = 'db';

class DB {
    constructor(name) {
        this.name = name;
        this.path = `${path}/${name}.json`;
    }

    create = (json) => {
        this.save(json);
    }

    save = (list) => {
        fs.writeFileSync(this.path, JSON.stringify(list));
    }

    save = (list, callback) => {
        fs.writeFile(this.path, JSON.stringify(list), (err) => {
            if (err) {
                throw new Error('adasd');
            }

            callback();
        });
    }

    get = () => {
        const content = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(content);
    }

    getById = (id) => {
        const list = this.get();
        const item = list.find(i => i.id === parseInt(id));

        return item;
        //return the item with that id
    }

    add = (json) => {
        const list = this.get();

        const newItem = {
            ...json,
            id: Date.now()
        }

        list.push(newItem);

        this.save(list);

        return newItem;
    }

    deleteById = (id) => {
        const list = this.get();
        const filteredList = list.filter(i => i.id !== parseInt(id));
        this.save(filteredList);
        return 1;
    }

    updateItem = (id, json) => {
        const list = this.get();

        // const updatedList = list.map(item => {
        //     if(item.id === parseInt(id)) {
        //         return { ...json, id }
        //     }
        //     return item
        // })

        const index = list.findIndex(i => i.id === parseInt(id));
        list[index] = { ...json, id: parseInt(id) };

        this.save(list);

        return 1;

    }
}



module.exports = DB;