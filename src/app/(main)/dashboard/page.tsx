import { getDashboardData, getLessonstats } from "@/supabaseFunctions/getData";
import DashboardWrapper from "@/components/pages/DashboardWrapper";

export { metadata } from '@/metadata/dashboard';

export default async function DashboardPage() {
  const [dashData, lessonsData] = await Promise.all([
    getDashboardData(),
    getLessonstats(),
  ]);

  return (
    <DashboardWrapper
      initialData={dashData || null}
      lessonsHistory={lessonsData || []}
    />
  );
}