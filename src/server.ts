import application from './config';

const runApplication = async () => {
    application.initialize();
    application.run();
};

runApplication();
