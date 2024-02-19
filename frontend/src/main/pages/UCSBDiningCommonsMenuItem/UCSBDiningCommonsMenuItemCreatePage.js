import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDiningCommonsMenuItemForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBDiningCommonsMenuItemCreatePage({storybook = false}) {

    const objectToAxiosParams = (ucsbDiningCommonsMenuItem) => ({
        url: "/api/ucsbDiningCommonsMenuItems/post",
        method: "POST",
        params: {
            diningCommonsCode: ucsbDiningCommonsMenuItem.diningCommonsCode,
            station: ucsbDiningCommonsMenuItem.station,
            name: ucsbDiningCommonsMenuItem.name
        }
    });

    const onSuccess = (ucsbDiningCommonsMenuItem) => {
        toast(`New UCSBDiningCommonsMenuItem Created - id: ${ucsbDiningCommonsMenuItem.id} dining commons code: ${ucsbDiningCommonsMenuItem.diningCommonsCode} station: ${ucsbDiningCommonsMenuItem.station} name: ${ucsbDiningCommonsMenuItem.name}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/ucsbDiningCommonsMenuItems/all"]
    );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess && !storybook){
        return <Navigate to="/ucsbDiningCommonsMenuItems"/>
    }

  // Stryker disable all : placeholder for future implementation
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New UCSBDiningCommonsMenuItem</h1>
        <UCSBDiningCommonsMenuItemForm submitAction={onSubmit}/>
      </div>
    </BasicLayout>
  )
}
