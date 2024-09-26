import useRouteStore from "Store/routeStore";
import type { RouteName } from "Store/routeStore";

import Dashboard from "Pages/Dashboard";
import Welcome from "Pages/Welcome/";
import WelcomeInfo from "Pages/WelcomeInfo";
import TokenPreview from "Pages/TokenPreview";
import TokenForm from "Pages/TokenForm";

import styles from "./app.module.scss";

import useImagePreloader from "Hooks/useImagePreloader";
import bgNoise from "Assets/Sound/bg_noise.mp3";
import useAppStore from "Store/appStore";

const RoutePageComponent: Record<RouteName, React.FC> = {
  welcome: Welcome,
  "welcome-info": WelcomeInfo,
  dashboard: Dashboard,
  "token-preview": TokenPreview,
  "token-form": TokenForm,
};

function App() {
  useImagePreloader();

  const currentRoute = useRouteStore((state) => state.currentRoute);
  const isLoading = useAppStore((state) => state.isLoading);

  const PageComponent = RoutePageComponent[currentRoute];

  return (
    <div className={styles.bodyContainer}>
      <main className={`window ${styles.mainContainer}`}>
        {isLoading ? (
          <div className={styles.loader}>
            <progress />
          </div>
        ) : null}
        <PageComponent />
      </main>
      <audio id="bg_noise" src={bgNoise} />
    </div>
  );
}

export default App;
