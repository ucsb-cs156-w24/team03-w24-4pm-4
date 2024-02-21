import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemReviewTable from 'main/components/MenuItemReview/MenuItemReviewTable';
import { Button } from 'react-bootstrap';
import { useCurrentUser , hasRole} from 'main/utils/currentUser';

export default function MenuItemReviewIndexPage() {

  const currentUser = useCurrentUser();

  const createButton = () => {
    if (hasRole(currentUser, "ROLE_ADMIN")) {
        return (
            <Button
                variant="primary"
                href="/MenuItemReview/create"
                style={{ float: "right" }}
            >
                Create Menu Item Review
            </Button>
        )
    } 
  }

  const { data: reviews, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/MenuItemReview/all"],
      { method: "GET", url: "/api/MenuItemReview/all" },
      // Stryker disable next-line all : don't test default value of empty list
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>Menu Item Reviews</h1>
        <MenuItemReviewTable reviews={reviews} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}