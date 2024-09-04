import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef: any = createNavigationContainerRef();

type Params<T extends string | number> = Record<string, T>;

export function navigate(name: string, params: Params<string | number>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
