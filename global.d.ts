declare module "*.scss";
declare module "*.css";

interface SilktideCookieBannerManager {
  updateCookieBannerConfig: (config: Record<string, unknown>) => void;
}

interface Window {
  silktideCookieBannerManager: SilktideCookieBannerManager;
}
