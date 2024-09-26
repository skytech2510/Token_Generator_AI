import { create } from "zustand";
import useStoryStore, { Stage } from "./storyStore";
import { Token } from "./userStore";
import useCreateTokenStore from "./createTokenStore";

export type RouteName =
  | "welcome"
  | "welcome-info"
  | "dashboard"
  | "token-form"
  | "token-preview";

interface RouteParams {
  type: "token";
  value: Token;
}

interface RouteStore {
  currentRoute: RouteName;
  params?: RouteParams;
  goBack: () => void;
  goTo: (route: RouteName) => void;
  openTokenPreview: (token: Token) => void;
}

const BackRouteMap: Record<RouteName, RouteName> = {
  welcome: "welcome",
  "welcome-info": "welcome",
  dashboard: "welcome-info",
  "token-form": "dashboard",
  "token-preview": "dashboard",
};

// TODO fix this
const RouteStoryMap: Record<RouteName, Stage> = {
  welcome: "welcome",
  dashboard: "welcome_info",
  "welcome-info": "welcome_info",
  "token-form": "token_form_step_1",
  "token-preview": "welcome_info",
};

const useRouteStore = create<RouteStore>()((set, get) => ({
  currentRoute: "welcome",
  params: undefined,
  goBack: () => {
    const destinationRoute = BackRouteMap[get().currentRoute];
    set({ currentRoute: destinationRoute, params: undefined });
    useStoryStore.getState().setStage(RouteStoryMap[destinationRoute]);
  },
  goTo: (route: RouteName) => {
    set({ currentRoute: route, params: undefined });
    useStoryStore.getState().setStage(RouteStoryMap[route]);
    if (route === "dashboard") {
      useCreateTokenStore.getState().resetForm();
    }
  },
  openTokenPreview: (token: Token) => {
    set({
      currentRoute: "token-preview",
      params: { type: "token", value: token },
    });
    useStoryStore.getState().setStage(RouteStoryMap["token-preview"]);
  },
}));

export default useRouteStore;
