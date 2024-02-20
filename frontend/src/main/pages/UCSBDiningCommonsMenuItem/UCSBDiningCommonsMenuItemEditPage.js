import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import UCSBDiningCommonsMenuItemForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBDiningCommonsMenuItemEditPage({storybook=false}) {
  let { id } = useParams();

  const { data: UCSBDiningCommonsMenuItem, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/ucsbDiningCommonsMenuItems?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/ucsbDiningCommonsMenuItems`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (UCSBDiningCommonsMenuItem) => ({
    url: "/api/ucsbDiningCommonsMenuItems",
    method: "PUT",
    params: {
      id: UCSBDiningCommonsMenuItem.id,
    },
    data: {
      diningCommonsCode: UCSBDiningCommonsMenuItem.diningCommonsCode,
      station: UCSBDiningCommonsMenuItem.station,
      name: UCSBDiningCommonsMenuItem.name
    }
  });

  const onSuccess = (UCSBDiningCommonsMenuItem) => {
    toast(`UCSBDiningCommonsMenuItems Updated - id: ${UCSBDiningCommonsMenuItem.id} name: ${UCSBDiningCommonsMenuItem.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/ucsbDiningCommonsMenuItems?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/ucsbDiningCommonsMenuItems" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit UCSBDiningCommonsMenuItem</h1>
        {
          UCSBDiningCommonsMenuItem && <UCSBDiningCommonsMenuItemForm initialContents={UCSBDiningCommonsMenuItem} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

