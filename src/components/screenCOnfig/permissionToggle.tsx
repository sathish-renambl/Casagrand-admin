import { Eye, Edit, Shield } from 'lucide-react';

interface Screen {
  pageName: string;
  pageAccess: 'READ' | 'WRITE' | 'BLOCK';
}
const PermissionToggle = ({
  screen,
  type,
  toggle
}: {
  screen: Screen;
  type: 'READ' | 'WRITE' | 'BLOCK';
  toggle: (screenName: string,  type: 'READ' | 'WRITE' | 'BLOCK') => void;
}) => {
  const icons = {
    READ: <Eye size={18} className="text-blue-600" />,
    WRITE: <Edit size={18} className="text-green-600" />,
    BLOCK: <Shield size={18} className="text-red-600" />
  };

  const labels = {
    READ: ['Read Access', 'View screen content'],
    WRITE: ['Write Access', 'Modify screen content'],
    BLOCK: ['Block Access', 'Completely block screen']
  };

  const isActive = screen["pageAccess"] === type ;

  const bgColor = {
    READ: 'bg-blue-600',
    WRITE: 'bg-green-600',
    BLOCK: 'bg-red-600'
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {icons[type]}
        <div>
          <p className="font-medium text-gray-900">{labels[type][0]}</p>
          <p className="text-sm text-gray-500">{labels[type][1]}</p>
        </div>
      </div>
      <button
        onClick={() => toggle(screen.pageName, type)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isActive ? bgColor[type] : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isActive ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default PermissionToggle;