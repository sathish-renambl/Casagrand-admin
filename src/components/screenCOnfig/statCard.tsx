const StatCard = ({
  label,
  value,
  color = "text-gray-600"
}: {
  label: string;
  value: number;
  color?: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

export default StatCard;