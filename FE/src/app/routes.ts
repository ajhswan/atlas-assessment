import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("auth", "routes/auth.tsx", [
    route("login", "routes/auth.login.tsx"),
    route("register", "routes/auth.register.tsx"),
    route("recovery", "routes/auth.recovery.tsx"),
  ]),
  route("reset-password/:token", "routes/reset-password.$token.tsx"),
  route("logout", "routes/logout.tsx"),
  route("", "routes/_app.tsx", [
    index("routes/home.tsx"),
    route("posts/new", "routes/posts.new.tsx"),
    route("posts/:id/edit", "routes/posts.$id.edit.tsx"),
    route("posts/:id", "routes/posts.$id.tsx"),
  ]),
  route("about", "routes/about.tsx"),
  route(".well-known/*", "routes/well-known.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
