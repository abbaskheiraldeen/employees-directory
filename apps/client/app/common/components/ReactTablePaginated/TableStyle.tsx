export default function TableStyle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col rounded-md shadow-sm border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full px-4 py-3 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
