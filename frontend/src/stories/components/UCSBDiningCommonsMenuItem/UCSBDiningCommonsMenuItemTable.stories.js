import React from 'react';
import UCSBDiningCommonsMenuItemTable from 'main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemTable';
import { ucsbDiningCommonsMenuItemsFixtures } from 'fixtures/ucsbDiningCommonsMenuItemsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemTable',
    component: UCSBDiningCommonsMenuItemTable
};

const Template = (args) => {
    return (
        <UCSBDiningCommonsMenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ucsbDiningCommonsMenuItems : []
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
    ucsbDiningCommonsMenuItems: ucsbDiningCommonsMenuItemsFixtures.threeMenuItem,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
    ucsbDiningCommonsMenuItems: ucsbDiningCommonsMenuItemsFixtures.threeMenuItem,
    currentUser: currentUserFixtures.adminUser,
}

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.delete('/api/ucsbDiningCommonsMenuItems', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
