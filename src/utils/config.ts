interface Config {
  API_BASE_URL: string;
}

const config: { [key: string]: Config } = {
  development: {
    API_BASE_URL: "https://updraft.cyfrin.io/",
  },
  staging: {
    API_BASE_URL: "https://updraft.cyfrin.io/",
  },
  production: {
    API_BASE_URL: "https://updraft.cyfrin.io/",
  },
};

const currentEnv = import.meta.env.VITE_APP_ENV || process.env.NODE_ENV || "development";
const urls = config[currentEnv];
// const urls = config[process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? "development"];

export default urls;
