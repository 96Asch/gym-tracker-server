const { APP_PORT, PG_PORT, PG_USER, PG_PASS, PG_HOST } = process.env;

export default Object.freeze({ APP_PORT, PG_PASS, PG_PORT, PG_USER, PG_HOST });
