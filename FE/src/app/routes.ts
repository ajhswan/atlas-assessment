import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx", [
    route("login", "routes/auth.login.tsx"),
    route("register", "routes/auth.register.tsx"),
    route("recovery", "routes/auth.recovery.tsx"),
  ]),
  route("posts", "routes/posts.tsx"),
  route("about", "routes/about.tsx"),
  route(".well-known/*", "routes/well-known.tsx"),
] satisfies RouteConfig;
