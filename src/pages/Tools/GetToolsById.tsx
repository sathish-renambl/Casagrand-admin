import { useEffect, useState } from "react";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ToolDetailCard from "../../components/Tools/toolDetailsCard";
import { Modal } from "../../components/ui/modal";
import ToolsModal from "./ToolsModal";
import { getUpdatedFields } from "../../utils/updateFields";

// ---------- Types ----------
interface Section {
  id: string;
  title: string;
  description: string;
}

interface SectionEnabled {
  [sectionId: string]: boolean;
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

// ---------- Component ----------
function GetToolsById() {
  const { URL } = useAppContext();
  const location = useLocation();
  const { state } = location as { state: { toolId: string; orgId: string } };

  const [toolId, setToolId] = useState<string>("");
  const [orgId, setorgId] = useState<string>("");


  const initialData={
    toolId: "",
    toolName: "",
    toolDescription: "",
    toolStatus: "",
    toolEndpoint: "",
    toolType: "",
    toolBody: [],
    toolCreatedBy: "",
    created_at: "",
    updated_at: "",
    toolHeaders: [],
    toolParams: [],
    toolQuery: [],
    toolDefaults: false,
  }
  const [toolData, setTool] = useState<Tool>(initialData);

  const [ToolDetails, setdetails] = useState<Tool>({ ...initialData});
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [clearFlag,setFlag]=useState(false)

  const [sectionEnabled, setSectionEnabled] = useState<SectionEnabled>({
    toolBody: false,
    toolQuery: false,
    toolParams: false,
    toolHeaders: false,
  });

  const sections: Section[] = [
    {
      id: "toolBody",
      title: "Body",
      description: "Add request body parameters",
    },
    {
      id: "toolQuery",
      title: "Query Parameters",
      description: "Add query string parameters",
    },
    {
      id: "toolParams",
      title: "Path Parameters",
      description: "Add path parameters",
    },
    {
      id: "toolHeaders",
      title: "Headers",
      description: "Add request headers",
    },
  ];

  const handleToolChange=(value:string)=>{
      if(clearFlag){
        console.log("tools")
      setTool(initialData)
      setFlag(false)
    }

    setToolId(value)
        

  }
  const handleOrgChange=(value:string)=>{
    if(clearFlag){
      setTool(initialData)
      setFlag(false)
    }

    setorgId(value)
        

  }

  const handlechange = (name: string, value: string) => {
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSection = (sectionId: string): void => {
    setSectionEnabled((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));

    if (
      Array.isArray(ToolDetails[sectionId]) &&
      (ToolDetails[sectionId] as KeyValueItem[]).length === 0
    ) {
      setdetails((prev) => ({
        ...prev,
        [sectionId]: [{ key: "", value: "", type: "" }],
      }));
    }
  };

  const handleEditOpen = () => {
    sections.forEach((section) => {
      if ((toolData[section.id] as KeyValueItem[]).length > 0) {
        setSectionEnabled((prev) => ({
          ...prev,
          [section.id]: true,
        }));
      }
    });
    setdetails(toolData);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const fetchTools = async (toolIdSearch: string, orgIdSearch: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${URL}tools/${toolIdSearch}?orgId=${orgIdSearch}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
         setFlag(true)
        setTool(data);
        localStorage.setItem("toolId", toolIdSearch);
      } else {
        setTool(initialData);
        toast.error("Failed to fetch tools");
      }
    } catch (error) {
      console.error("Error occurred while fetching tools:", error);
    }
  };

    async function updateTool() {
    const updatedFields = getUpdatedFields(JSON.parse(JSON.stringify(toolData)), JSON.parse(JSON.stringify(ToolDetails)));

    updatedFields.orgId=orgId
    

    try {
    //   setIsLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${URL}tools/update/${toolData.toolId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (res.status === 200) {
        fetchTools(toolData.toolId, orgId);
        handleEditClose();
       
        toast.success("Tool Updated Successfully");
        // setTools(data);
        return;
      } else {
        toast.error("Unable to Update Tool");
      }

     
    } catch (error) {
    //   setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    const toolIdSearch = localStorage.getItem("toolId");
    const orgIdSearch = localStorage.getItem("orgId");

    if (state?.toolId && state?.orgId) {
      fetchTools(state.toolId, state.orgId);
      setToolId(state.toolId);
      setorgId(state.orgId);
    } else if (toolIdSearch && orgIdSearch) {
      fetchTools(toolIdSearch, orgIdSearch);
      setToolId(toolIdSearch);
      setorgId(orgIdSearch);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full">
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Tools By Id</h1>
        </div>

        <div className="rounded-2xl max-w-3xl p-2 mt-8 mb-5">
          <div className="flex flex-row gap-4 items-end w-full">
            <div className="grid grid-cols-2 w-full gap-4 items-stretch">
              <div className="flex-1">
                <label htmlFor="toolId" className="block text-sm font-medium text-gray-700 mb-2">
                  Tool ID
                </label>
                <Input
                  id="toolId"
                  placeholder="Enter Tool ID"
                  className="w-full"
                  value={toolId}
                  onChange={(e)=>handleToolChange(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="orgId" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization ID
                </label>
                <Input
                  id="orgId"
                  placeholder="Enter Organization ID"
                  className="w-full"
                  value={orgId}
                  onChange={(e)=>handleOrgChange(e.target.value)}

                />
              </div>
            </div>
            <Button
              className="w-[200px] h-[45px] px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => fetchTools(toolId, orgId)}
            >
              Search Tool
            </Button>
          </div>
        </div>

        {toolData.toolId.length > 0 ? <ToolDetailCard toolData={toolData} handleEditOpen={handleEditOpen} />
        :
        <div className="text-center mt-28">
           <h2 className="text-xl font-semibold"> No Data</h2>
        </div>    
    }
      </div>

      <Modal isOpen={editModalOpen} onClose={handleEditClose} className="max-w-[800px] m-4">
        <ToolsModal
          ToolsData={ToolDetails}
          handlechange={handlechange}
          btnType="edit"
          sections={sections}
          sectionEnabled={sectionEnabled}
          toggleSection={toggleSection}
          setToolsData={setdetails}
          confirmClick={updateTool}
        />
      </Modal>
    </div>
  );
}

export default GetToolsById;
