const loggerMiddleware = (store) => (next) => async (action) => {
    // console.log('Je suis le loggerMiddleware');
    // console.log("l action", action);

    store.getState();
    // store.dispatch();

    next(action);

};
export default loggerMiddleware;