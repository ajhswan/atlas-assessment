import { RecoveryForm } from "../features/recovery";
import type { Route } from "../+types/routes/auth.recovery";
import { requestPasswordReset } from "../api.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  try {
    await requestPasswordReset(email);
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred sending reset email",
    };
  }
}

export default function Recovery() {
  return <RecoveryForm />;
}
