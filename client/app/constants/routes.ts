export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  DASHBOARD: {
    HOME: "/",
  },
  ERROR: {
    GENERIC: "/error",
  },
  ROOM: {
    LIST: "/room/",
    DETAIL: "/room/:id",
  },
};

export const getDynamicRoute = (path: string, args = {} as Record<string, string | number>) => {
  let dynamicPath = path;
  Object.entries(args).forEach(([key, val]) => {
    dynamicPath = dynamicPath.replace(`:${key}`, encodeURIComponent(val));
  });
  return dynamicPath;
};
