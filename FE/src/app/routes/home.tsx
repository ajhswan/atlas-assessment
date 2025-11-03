import { useLoaderData } from "react-router";
import type { Route } from "../+types/routes/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function loader({ request }: Route.LoaderArgs) {
  // Example loader - runs on server
  return {
    message: "Welcome to the Atlas Assessment app",
    timestamp: new Date().toISOString(),
  };
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Home</CardTitle>
          <CardDescription>Server-side rendered with React Router 7</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">{data.message}</p>
          <p className="text-sm text-muted-foreground">Loaded at: {data.timestamp}</p>
        </CardContent>
      </Card>
    </div>
  );
}
