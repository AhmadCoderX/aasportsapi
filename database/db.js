const Pool = require("pg").Pool;

const connectionString =
  "postgres://default:kqAOxKS1eZ9J@ep-fragrant-grass-a41rb0dm.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";

const pool = new Pool({
  connectionString: connectionString,
});

// Adding error handling
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
