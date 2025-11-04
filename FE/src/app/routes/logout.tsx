import type { Route } from "../+types/routes/logout";
import { logout } from "../session.server";

export async function loader({ request }: Route.LoaderArgs) {
  return logout(request);
}
