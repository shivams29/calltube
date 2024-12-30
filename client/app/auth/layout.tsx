export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center p-6 h-screen">
      <div className="w-full md:w-3/5 lg:max-w-lg">{children}</div>
    </div>
  );
}
