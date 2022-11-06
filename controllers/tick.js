let count = 1;

const tick = () => {
    setTimeout(() => {
        console.log('Tick Mosh', count);
        count++;

        if (count <= 10) {
            tick();
        }
    }, 1000);
}

module.exports = {
    tick
};