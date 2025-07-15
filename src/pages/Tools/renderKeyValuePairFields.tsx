import React from "react";
import { Plus, Trash2 } from "lucide-react";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

interface DataTypeOption {
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

interface RenderKeyValuePairFieldsProps {
  ToolsData: Tool;
  setToolsData: React.Dispatch<React.SetStateAction<Tool>>;
  section: keyof Pick<Tool, 'toolBody' | 'toolHeaders' | 'toolParams' | 'toolQuery'>;
}

const RenderKeyValuePairFields: React.FC<RenderKeyValuePairFieldsProps> = ({ 
  section, 
  ToolsData, 
  setToolsData 
}) => {


  const handleTypeChange = (
    sectionId: string,
    index: number,
    value: string
  ): void => {
    const currentSection = ToolsData[sectionId] as KeyValueItem[];
    const newPairs = [...currentSection];
    newPairs[index].type = value;
    setToolsData((prev: Tool) => ({
      ...prev,
      [sectionId]: newPairs,
    }));
  };

  const handleKeyChange = (
    sectionId: string,
    index: number,
    value: string
  ): void => {
    const currentSection = ToolsData[sectionId] as KeyValueItem[];
    const newPairs = [...currentSection];
    newPairs[index].key = value;
    setToolsData((prev: Tool) => ({
      ...prev,
      [sectionId]: newPairs,
    }));
  };

  const handleValueChange = (
    sectionId: string,
    index: number,
    value: string
  ): void => {
    const currentSection = ToolsData[sectionId] as KeyValueItem[];
    const newPairs = [...currentSection];
    newPairs[index].value = value;
    setToolsData((prev: Tool) => ({
      ...prev,
      [sectionId]: newPairs,
    }));
  };

  const handleRemovePair = (sectionId: string, index: number): void => {
    const currentSection = ToolsData[sectionId] as KeyValueItem[];
    const newPairs = [...currentSection];
    newPairs.splice(index, 1);
    setToolsData((prev: Tool) => ({
      ...prev,
      [sectionId]: newPairs,
    }));
  };

  const handleAddPair = (sectionId: string): void => {
    const currentSection = ToolsData[sectionId] as KeyValueItem[];
    setToolsData((prev: Tool) => ({
      ...prev,
      [sectionId]: [...currentSection, { key: "", value: "", type: "" }],
    }));
  };

  const dataTypes: DataTypeOption[] = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
    { value: "object", label: "Object" },
    { value: "array", label: "Array" },
    { value: "null", label: "Null" },
  ];

  const getPlaceholder = (type: string): string => {
    switch (type) {
      case "object":
        return "{}";
      case "array":
        return "[]";
      case "boolean":
        return "true/false";
      case "number":
        return "0";
      default:
        return "Value";
    }
  };

  const currentSection = ToolsData[section] as KeyValueItem[];

  return (
    <>
      <div className="flex justify-between mb-3">
        <h4 className="font-medium text-sm text-gray-700">Parameters</h4>
        <button
          onClick={() => handleAddPair(section)}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
          type="button"
        >
          <Plus size={16} className="mr-1" /> Add More
        </button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-medium text-gray-600">
        <div className="col-span-3">Key</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-5">Value</div>
        <div className="col-span-1"></div>
      </div>

      {currentSection?.length === 0 ? (
        <div className="text-gray-500 text-center py-4 text-sm">
          No parameters added
        </div>
      ) : (
        <div className="space-y-2">
          {currentSection?.map((pair: KeyValueItem, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3">
                <Input
                  placeholder="Key"
                  value={pair.key}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleKeyChange(section, index, e.target.value)
                  }
                />
              </div>
              <div className="col-span-3">
                <Select 
                  options={dataTypes} 
                  onChange={(value: string) =>
                    handleTypeChange(section, index, value)
                  }
                  defaultValue={pair.type}
                />
              </div>
              <div className="col-span-5">
                <Input
                  placeholder={getPlaceholder(pair.type)}
                  value={pair.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleValueChange(section, index, e.target.value)
                  }
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => handleRemovePair(section, index)}
                  className="text-gray-500 hover:text-red-500"
                  type="button"
                  aria-label="Remove parameter"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RenderKeyValuePairFields;