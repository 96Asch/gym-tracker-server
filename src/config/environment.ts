const { PORT, PG_PORT, PG_USER, PG_PASS, PG_HOST } = process.env;

export default Object.freeze({ PORT, PG_PASS, PG_PORT, PG_USER, PG_HOST });
