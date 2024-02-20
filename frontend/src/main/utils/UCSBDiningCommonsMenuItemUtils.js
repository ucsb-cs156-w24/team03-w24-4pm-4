import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete() {
    return {
        url: "/api/ucsbDiningCommonsMenuItems",
        method: "DELETE",
        params: {
        }
    }
}

