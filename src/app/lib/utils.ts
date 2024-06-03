export const setRandomInterval = (callback: Function, minDelay: number, maxDelay: number) => {
    let timeout: NodeJS.Timeout;

    const runInterval = () => {
        const timeoutFunction = () => {
            callback();
            runInterval();
        };

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        console.info('The delay is:', delay);

        timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();

    return {
        clear() {
            clearTimeout(timeout);
        },
    };
};
