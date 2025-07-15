import React from "react";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import RenderKeyValuePairFields from "./renderKeyValuePairFields";
import Jsoncard from "./jsonCard";
import Button from "../../components/ui/button/Button";

interface MethodOption {
  value: string;
  label: string;
}

interface KeyValueItem {
  key: string;
  value: string;
  type: string;
}

interface Tool {
  toolId: string;
  toolName: string;
  toolDescription: string;
  toolStatus: string;
  toolEndpoint: string;
  toolType: string;
  toolBody: KeyValueItem[];
  toolHeaders: KeyValueItem[];
  toolParams: KeyValueItem[];
  toolQuery: KeyValueItem[];
  toolCreatedBy: string;
  created_at: string;
  updated_at: string;
  toolDefaults: boolean;
  toolMethod?: string;
  [key: string]: string | boolean | KeyValueItem[] | undefined;
}

interface Section {
  id: string;
  title: string;
  description: string;
}

interface ToolsModalProps {
  handlechange: (key: string, value: string) => void;
  btnType: string;
  sections?: Section[];
  sectionEnabled?: Record<string, boolean>;
  toggleSection?: (sectionId: string) => void;
  setToolsData: React.Dispatch<React.SetStateAction<Tool>>;
  ToolsData: Tool;
  confirmClick: () => void;
}

const ToolsModal: React.FC<ToolsModalProps> = ({ 
  ToolsData, 
  handlechange, 
  btnType, 
  sections=[], 
  sectionEnabled={}, 
  toggleSection=() => {}, 
  setToolsData ,
  confirmClick
}) => {
  const methodOptions: MethodOption[] = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
    { value: "PATCH", label: "PATCH" },
  ];

  console.log(ToolsData);

  return (
    <div className="pt-8 pb-4 px-8">
      <div className="px-2 pr-14 mb-4">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Api Tool
        </h4>
      </div>
      
      <div className="space-y-4 py-4 p-2 max-h-[70vh] overflow-auto">
        <div className="space-y-2">
          <Label htmlFor="name">API Name</Label>
          <Input
            id="name"
            placeholder="Enter Name"
            value={ToolsData.toolName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handlechange("toolName", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endpoint">API Endpoint</Label>
          <Input
            id="endpoint"
            placeholder="Enter Endpoint"
            value={ToolsData.toolEndpoint}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handlechange("toolEndpoint", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">API Description</Label>
          <TextArea
            rows={4}
            placeholder="Enter Description"
            value={ToolsData.toolDescription}
            onChange={(value: string) => 
              handlechange("toolDescription", value)
            }
          />
        </div>

        {btnType === "edit" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="method">Method</Label>
              <Select 
                options={methodOptions} 
                onChange={(value: string) => 
                  handlechange("toolMethod", value)
                } 
                defaultValue={ToolsData.toolMethod}
              />
            </div>

            {/* Section Cards */}
            <div className="space-y-4">
              {sections.map((section: Section) => (
                <Jsoncard
                  key={section.id}
                  title={section.title}
                  description={section.description}
                  enabled={sectionEnabled[section.id]}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="space-y-2">
                    <RenderKeyValuePairFields 
                      section={section.id as keyof Pick<Tool, 'toolBody' | 'toolHeaders' | 'toolParams' | 'toolQuery'>} 
                      ToolsData={ToolsData} 
                      setToolsData={setToolsData} 
                    />
                  </div>
                </Jsoncard>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Button size="sm" variant="outline" >
                Close
              </Button>
              <Button size="sm" updateBtn={true} onClick={confirmClick} >
                Save Changes
              </Button>
            </div>
    </div>
  );
};

export default ToolsModal;