import { getDashboardData, getLessonstats } from "@/supabaseFunctions/getData";
import DashboardPageUI from "@/components/pages/dashboardPageUI";

export { metadata } from '@/metadata/dashboard';

export default async function DashboardPage() {
  const [dashData, lessonsData] = await Promise.all([
    getDashboardData(),
    getLessonstats(),
  ]);

  return (
    <DashboardPageUI
      initialData={dashData || {}}
      lessonsHistory={lessonsData || []}
    />
  );
}
