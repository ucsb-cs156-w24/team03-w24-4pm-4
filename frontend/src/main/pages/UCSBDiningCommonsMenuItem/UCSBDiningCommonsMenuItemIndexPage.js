import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDiningCommonsMenuItemTable from 'main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemTable';
import { Button } from 'react-bootstrap';
import { useCurrentUser , hasRole} from 'main/utils/currentUser';
export default function UCSBDiningCommonsMenuItemIndexPage() {
    
    const currentUser = useCurrentUser();

    const createButton = () => {
        if(hasRole(currentUser, "ROLE_ADMIN")){
            return(
                <Button
                    variant="primary"
                    href='/ucsbDiningCommonsMenuItems/create'
                    style={{float: "right"}}
                >
                    Create UCSBDiningCommonsMenuItem
                </Button>
            )
        }
    }

    const {data: menuItems, error: _error, status: _status} =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/ucsbDiningCommonsMenuItems/all"],
            { method: "GET", url: "/api/ucsbDiningCommonsMenuItems/all"},
            []
        );
    return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>UCSBDiningCommonsMenuItem</h1>
        <UCSBDiningCommonsMenuItemTable ucsbDiningCommonsMenuItems={menuItems} currentUser={currentUser}/>
      </div>
    </BasicLayout>
  )
}
