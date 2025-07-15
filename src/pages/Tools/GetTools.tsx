import { useEffect, useState } from "react";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import ToolsCard from "../../components/Tools/toolsCard";
import { DeleteConfirmModal } from "../../components/Modal/deleteModal";
import { Plus } from "lucide-react";
import { Modal } from "../../components/ui/modal";
import ToolsModal from "./ToolsModal";

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
function GetTools() {
  const { URL } = useAppContext();

  const [Tools, setTools] = useState<Tool[]>([]);

  const [orgId, setOrgId] = useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [toolId, setToolId] = useState<string>("");

  const initialData = {
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
  };

  const [ToolDetails, setdetails] = useState<Tool>({ ...initialData });


  const [createModalOpen, setModalOpen] = useState(false);


  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setdetails({ ...initialData });
  };

  const handleDeleteOpen = (toolId: string) => {
    setToolId(toolId);
    setDeleteModalOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };

  const handlechange = (name: string, value: string) => {
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  async function fetchTools(orgIdSearch: string): Promise<void> {
    const token = localStorage.getItem("token");

    // if (!token || !roleId) {
    //   console.error("Token or Role ID not found in localStorage");
    //   logOut();
    //   return;
    // }

    try {
      const response = await fetch(
        `${URL}tools/getAllTools?orgId=${orgIdSearch}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        setTools(data.tools);
        localStorage.setItem("orgId", orgIdSearch);
      } else {
        toast.error("Failed to fetch tools");
      }

      // if (response.status === 200) {
      //   const data = await response.json();
      //   const screens: Screen[] = data?.role?.supportAccess || data?.role?.agentAccess || [];
      //   setScreens(screens || []);
      //   console.log("Access added successfully:", data);

      //   const result: Option[] = fetchNav();
      //   const supportPages = screens.map(item => item.pageName);

      //   console.log("Support Pages:", screensArray);

      //   const filteredArr = result.filter(item => !supportPages.includes(item.value));

      //   console.log("Filtered Screens Array:", filteredArr);

      //   setScreensArray(filteredArr);

      // } else {
      //   console.error("Failed to add access:", response.status, response.statusText);
      // }
    } catch (error) {
      console.error("Error occurred while adding access:", error);
    }
  }

    async function createTool() {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(`${URL}tools/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orgId: orgId,
          toolName: ToolDetails.toolName,
          toolDescription: ToolDetails.toolDescription,
          toolEndpoint: ToolDetails.toolEndpoint,
        }),
      });

      const data = await res.json();
      if (res.status === 201) {
        setTools(data);
        toast.success("Tool Created Successfully");
        fetchTools(orgId);
        handleClose()
        return;
      } else {
        toast.error("Unable to Create Tool");
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteTool() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${URL}tools/delete/${toolId}?orgId=${orgId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        handleDeleteClose();
        fetchTools(orgId);
        toast.success("Tool Deleted Successfully");
        return;
      } else {
        toast.error("Unable to Delete Tool");
      }
    } catch (error) {
      // setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    const orgIdSearch = localStorage.getItem("orgId");

    if (orgIdSearch) {
      fetchTools(orgIdSearch);
      setOrgId(orgIdSearch);
    }
  }, []);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      <div className="w-full ">
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Tools</h1>
          <p className="text-gray-600">
            Discover the best tools and resources to boost your productivity and
            streamline your workflow
          </p>
        </div>

        {/* Search Section */}
        <div className="rounded-2xl w-full  p-8 mb-5">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between">
            <div className="flex gap-5 w-lg">
              <div className="flex-1">
                <Input
                  placeholder="Search with OrgId"
                  className="w-full"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                />
              </div>
              <Button
                className="sm:w-auto w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => fetchTools(orgId)}
              >
                Search Tools
              </Button>
            </div>
            <div>
              <Button updateBtn={true} onClick={handleOpen}>
                <Plus /> Create Tool
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {Tools.length > 0 &&
            Tools.map((api: Tool, index) => (
              <ToolsCard
                index={index}
                api={api}
                orgId={orgId}
                handleDeleteOpen={handleDeleteOpen}
              />
            ))}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteClose}
        onConfirm={DeleteTool}
        itemName="Tool"
        confirmText="Delete Tool"
      />

      <Modal
        isOpen={createModalOpen}
        onClose={handleClose}
        className="max-w-[800px] m-4"
      >
        <ToolsModal
          ToolsData={ToolDetails}
          handlechange={handlechange}
          btnType="add"
          setToolsData={setdetails}
          confirmClick={createTool}
        />
      </Modal>
    </div>
  );
}

export default GetTools;
