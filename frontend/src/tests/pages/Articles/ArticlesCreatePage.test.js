import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ArticlesCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const articles = {
            id: 1,
            title: "OpenAI's next move could be controlling your computer",
            url: "https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16",
            explanation: "AI",
            email: "asdfasdf@yahoo.com",
            dateAdded: "2024-02-14"
        }

        axiosMock.onPost("/api/articles/post").reply( 202, articles );

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("ArticlesForm-explanation")).toBeInTheDocument();
        });

        const emailField = screen.getByTestId("ArticlesForm-email");
        const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
        const titleField = screen.getByTestId("ArticlesForm-title");
        const urlField = screen.getByTestId("ArticlesForm-url");
        const explanationField = screen.getByTestId("ArticlesForm-explanation");
        const submitButton = screen.getByTestId("ArticlesForm-submit");

        fireEvent.change(emailField, { target: { value: "asdfasdf@yahoo.com" } });
        fireEvent.change(dateAddedField, { target: { value: "2024-02-14" } });
        fireEvent.change(titleField, { target: { value: "OpenAI's next move could be controlling your computer" } });
        fireEvent.change(urlField, { target: { value: "https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16" } });
        fireEvent.change(explanationField, { target: { value: "AI" } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "title": "OpenAI's next move could be controlling your computer",
            "url": "https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16",
            "explanation": "AI",
            "email": "asdfasdf@yahoo.com",
            "dateAdded": "2024-02-14"
        });

        expect(mockToast).toBeCalledWith("New article Created - id: 1 title: OpenAI's next move could be controlling your computer");
        expect(mockNavigate).toBeCalledWith({ "to": "/articles" });
    });


});
