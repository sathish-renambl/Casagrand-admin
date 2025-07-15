import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Form from "../form/Form";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { toast } from "react-toastify";
import { useLogOut } from "../../hooks/useLogOut";
import { useAppContext } from "../../context/appContext";
import { getUpdatedFields } from "../../utils/updateFields";

type Props = {
  actionType: string | null;
  onClose: () => void;
  ticketDetails?: any;
  
};
function TicketsModal({ actionType, onClose, ticketDetails }: Props) {
  const { URL } = useAppContext();
  const token = localStorage.getItem("token");
  const logOut = useLogOut();
  const ticketsStatus = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
  ];
  const roleOption = [
    { value: "admin", label: "Admin" },

    { value: "support", label: "Support" },
    { value: "agent", label: "Agent" },
  ];

  useEffect(() => {
    if (ticketDetails) {
      setEditedDetails(ticketDetails);
    }
  }, []);

  const [editedDetails, setEditedDetails] = useState<any>();

  async function handleCreate() {
    try {
      console.log("create values", editedDetails);

      const response = await fetch(`${URL}tickets/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedDetails),
      });
      if (response.ok) {
        toast.success("ticket created successfully");
        onClose();
      } else {
        toast.error(`error crerating ticket`);
        onClose();
      }
    } catch (e) {
      toast.error(`error occured`);
    }
  }
  async function handleUpdate() {
    console.log(editedDetails);
    try {
      let changedInput = getUpdatedFields(
        JSON.parse(JSON.stringify(ticketDetails)),
        JSON.parse(JSON.stringify(editedDetails))
      );

      const payLoad = {
        ticketId: ticketDetails.ticketId,
        status: changedInput.status,
      };
      console.log(payLoad);
      const response = await fetch(`${URL}tickets/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payLoad),
      });
      if (!response.ok) {
        toast.error("Error Updating tickey Status");
        onClose();
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Updated successfully");
        onClose();
      }
    } catch (e) {
      toast.error(`error occured ${e}`);
      onClose();
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditedDetails((prev: any) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    if (!token) {
      toast.error("Not authorised");
      logOut();
    }
    if (actionType === "Create") {
      console.log("create");
      await handleCreate();
    } else {
      console.log("update");
      await handleUpdate();
    }
  }
  return (
    <div>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {actionType} Ticket
          </h4>
        </div>
        <Form onSubmit={handleSubmit} className="flex flex-col">
          <div
            className={`custom-scrollbar  overflow-y-auto px-2 pb-3 ${
              actionType === "edit" ? "h-[200px]" : "h-[250px]"
            }`}
          >
            <div className="mt-7">
              {actionType === "edit" && (
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Update Status
                </h5>
              )}

              <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
                {actionType === "Create" ? (
                  <>
                    <div className="col-span-1 ">
                      <Label>User Name</Label>
                      <Input
                        type="text"
                        name="userName"
                        value={editedDetails?.userName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1 ">
                      <Label>Assigned To </Label>
                      <Select
                        options={roleOption}
                        onChange={(value: string) => {
                          setEditedDetails((prev: any) => ({
                            ...prev,
                            assignedTo: value,
                          }));
                        }}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Label>Organisaion ID</Label>
                      <Input
                        type="text"
                        name="orgId"
                        value={editedDetails?.orgId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Label>Title </Label>
                      <Input
                        type="text"
                        name="message"
                        value={editedDetails?.message}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-1 ">
                      <Label>Ticket ID</Label>
                      <Input
                        type="text"
                        name="=ticketId"
                        disabled
                        value={editedDetails?.ticketId}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Label>Ticket Status</Label>
                      <Select
                        options={ticketsStatus}
                        defaultValue={editedDetails?.status}
                        onChange={(value: string) =>
                          setEditedDetails((prev: any) => ({
                            ...prev,
                            status: value,
                          }))
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" updateBtn={true}>
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default TicketsModal;
