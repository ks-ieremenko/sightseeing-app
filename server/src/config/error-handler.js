export const errorHandler = (error, req, res, next) => {
    if (typeof error === 'string') {
        return res.status(400).send(error);
    }

    if (error.name === 'UnauthorizedError') {
        return res.status(401).send('Invalid token');
    }

    return res.status(500).send(error.message);
};
