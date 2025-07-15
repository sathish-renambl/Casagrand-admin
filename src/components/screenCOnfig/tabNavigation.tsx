
interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabBar({activeTab, setActiveTab}: TabBarProps) {

  const tabs = [
    { 
      label: 'Support', 
      value:"supportAccess"
    },
    { 
      label: 'Agent', 
      value:"agentAccess"
    },
  
  ];

  return (
    <div className="w-full  flex  justify-end mb-5">
      
      {/* Tab Bar */}
      <div className="bg-white rounded-lg w-[25vw] shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.value
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* <div className="p-8">
          <div className="min-h-32">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {tabs[activeTab].label}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {tabs[activeTab].content}
            </p>
          </div>
        </div> */}
      </div>
      
    
    </div>
  );
}