import Switch from "../../components/form/switch/Switch";


interface JsonCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}


const Jsoncard: React.FC<JsonCardProps> = ({
  title,
  description,
  enabled,
  onToggle,
  children,
}) => {
  return (
    <div
      className={`p-5 border rounded-lg shadow-sm ${
        enabled ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Switch defaultChecked={enabled} onChange={onToggle} label="Default"/>
      </div>
      {enabled && children}
    </div>
  );
};

export default Jsoncard;