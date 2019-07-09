import App from './app';

const PORT = process.env.PORT || 3000;

App.server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});