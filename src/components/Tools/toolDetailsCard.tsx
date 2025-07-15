import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Globe,
  Settings,
  Code,
  Database,
  Edit,
} from "lucide-react";
import Button from "../ui/button/Button";

// Interfaces
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
  toolBody: Array<KeyValueItem>;
  toolHeaders: Array<KeyValueItem>;
  toolParams: Array<KeyValueItem>;
  toolCreatedBy: string;
  created_at: string;
  updated_at: string;
  toolDefaults: boolean;
  toolMethod?: string;
}

interface ExpandedSections {
  headers: boolean;
  body: boolean;
  params: boolean;
}

// Component
interface ToolDetailCardProps {
  toolData: Tool;
  handleEditOpen: () => void;
}

const ToolDetailCard: React.FC<ToolDetailCardProps> = ({ toolData,handleEditOpen }) => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    headers: false,
    body: false,
    params: false,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };





  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "ACTIVE"
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-gray-100 text-gray-800 border border-gray-200"
      }`}
    >
      {status}
    </span>
  );

  const TypeBadge: React.FC<{ type: string }> = ({ type }) => (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
      {type}
    </span>
  );

  const KeyValueRow: React.FC<{
    item: KeyValueItem;
    index: number;
    section: string;
  }> = ({ item }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div>
          <span className="text-xs font-medium text-gray-500">Key</span>
          <p className="text-sm font-mono text-gray-900">{item.key}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Value</span>
          <p className="text-sm font-mono text-gray-900 truncate">
            {item.value}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Type</span>
          <p className="text-sm font-mono text-gray-900 truncate">
            <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
              {item.type}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const CollapsibleSection: React.FC<{
    title: string;
    data: KeyValueItem[];
    section: keyof ExpandedSections;
    icon: React.ElementType;
  }> = ({ title, data, section, icon: Icon }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">{title}</span>
          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
            {data.length}
          </span>
        </div>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {expandedSections[section] && (
        <div className="p-4 space-y-3 bg-white">
          {data.map((item, index) => (
            <KeyValueRow
              key={index}
              item={item}
              index={index}
              section={section}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{toolData.toolName}</h1>
              <p className="text-slate-200 mb-4">{toolData.toolDescription}</p>
              <div className="flex items-center space-x-3">
                <StatusBadge status={toolData.toolStatus} />
                <TypeBadge type={toolData.toolType} />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-slate-300" />
              <div className="relative">
                <Button
                  onClick={handleEditOpen}
                  updateBtn={true}
                  variant="ghost"
                  className="p-2 !text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Button>

               
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Endpoint
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded-md text-sm font-mono text-gray-900 border">
                  {toolData.toolEndpoint}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(toolData.toolEndpoint, "endpoint")
                  }
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copiedField === "endpoint" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Tool ID
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded-md text-sm font-mono text-gray-900 border">
                  {toolData.toolId}
                </code>
                <button
                  onClick={() => copyToClipboard(toolData.toolId, "id")}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copiedField === "id" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Created
              </label>
              <p className="text-sm text-gray-900">
                {new Date(toolData.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Updated
              </label>
              <p className="text-sm text-gray-900">
                {new Date(toolData.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="p-6 space-y-4">
          {toolData.toolHeaders.length > 0 && (
            <CollapsibleSection
              title="Headers"
              data={toolData.toolHeaders}
              section="headers"
              icon={Settings}
            />
          )}
          {toolData.toolBody.length > 0 && (
            <CollapsibleSection
              title="Body Parameters"
              data={toolData.toolBody}
              section="body"
              icon={Code}
            />
          )}
          {toolData.toolParams.length > 0 && (
            <CollapsibleSection
              title="URL Parameters"
              data={toolData.toolParams}
              section="params"
              icon={Database}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Default Tool: {toolData.toolDefaults ? "Yes" : "No"}</span>
            <span>Method: {toolData.toolMethod || "Not specified"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailCard;
