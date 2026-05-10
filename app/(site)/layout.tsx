import SiteLayout from '@/components/layouts/SiteLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
