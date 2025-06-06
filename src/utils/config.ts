interface Config {
  API_BASE_URL: string;
  SERVER_BASE_URL: string;
}

const config: { [key: string]: Config } = {
  development: {
    // API_BASE_URL: "http://172.105.61.224:5000",
    SERVER_BASE_URL: "http://172.105.61.224:5173",
    API_BASE_URL: "http://localhost:5000",
  },
  staging: {
    API_BASE_URL: "http://172.105.61.224:5000",
    SERVER_BASE_URL: "http://172.105.61.224:5173",
    // API_BASE_URL: "http://localhost:5000",
  },
  production: {
    API_BASE_URL: "http://172.105.61.224:5000",
    SERVER_BASE_URL: "http://172.105.61.224:5173",
    // API_BASE_URL: "http://localhost:5000",
  },
};

const currentEnv = import.meta.env.VITE_APP_ENV || process.env.NODE_ENV || "development";
const urls = config[currentEnv];
// const urls = config[process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? "development"];

export default urls;
