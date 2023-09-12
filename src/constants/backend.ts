export interface BackendPathI {
  environment: string;
  getEnvironment: () => void;
  getBackendPath: () => string;
}

class BackendPath implements BackendPathI {
  environment!: string;

  getEnvironment() {
    if (window.location.host.includes("localhost")) {
      this.environment = "development";
    } else if (window.location.host === "stg-linkt.onrender.com") {
      this.environment = "staging";
    } else {
      this.environment = "staging";
    }
  }

  getBackendPath(): string {
    this.getEnvironment();
    if (this.environment === "development") {
      return "http://localhost:3005";
    } else if (this.environment === "staging") {
      return "https://stg-linkt.onrender.com";
    } else {
      return "https://stg-linkt.onrender.com";
    }
  }
}

export default BackendPath;
