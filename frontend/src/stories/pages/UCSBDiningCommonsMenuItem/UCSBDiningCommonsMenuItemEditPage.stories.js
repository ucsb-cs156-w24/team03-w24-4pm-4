
import React from 'react';
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { ucsbDiningCommonsMenuItemsFixtures } from 'fixtures/ucsbDiningCommonsMenuItemsFixtures';
import { rest } from "msw";

import UCSBDiningCommonsMenuItemEditPage from 'main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage';

export default {
    title: 'pages/UCSbDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage',
    component: UCSBDiningCommonsMenuItemEditPage
};

const Template = () => <UCSBDiningCommonsMenuItemEditPage storybook={true}/>;

export const Default = Template.bind({});
Default.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/ucsbDiningCommonsMenuItems', (_req, res, ctx) => {
            return res(ctx.json(ucsbDiningCommonsMenuItemsFixtures.threeMenuItem[0]));
        }),
        rest.put('/api/ucsbDiningCommonsMenuItems', async (req, res, ctx) => {
            var reqBody = await req.text();
            window.alert("PUT: " + req.url + " and body: " + reqBody);
            return res(ctx.status(200),ctx.json({}));
        }),
    ],
}



