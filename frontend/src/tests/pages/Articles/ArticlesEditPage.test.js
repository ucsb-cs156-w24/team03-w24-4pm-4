import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

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
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ArticlesEditPage tests", () => {
    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/articles", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {
            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit articles");
            expect(screen.queryByTestId("ArticlesForm-explanation")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/articles", { params: { id: 17 } }).reply(200, {
                id: 17,
                title: "OpenAI's next move could be controlling your computer",
                url: "https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16",
                explanation: "AI",
                email: "asdfasdf@yahoo.com",
                dateAdded: "2024-02-14"
            });
            axiosMock.onPut('/api/articles').reply(200, {
                id: "17",
                title: "Nvidia's new AI chatbot runs locally on your PC, and it's free",
                url: "https://www.msn.com/en-us/lifestyle/shopping/nvidia-s-new-ai-chatbot-runs-locally-on-your-pc-and-it-s-free/ar-BB1ihQAs?ocid=msedgntp&pc=U531&cvid=677b465ce77c458cbc16ddb7cea51906&ei=8",
                explanation: "ABC",
                email: "aaaawdw@yahoo.com",
                dateAdded: "2024-02-08"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("ArticlesForm-explanation");

            const idField = screen.getByTestId("ArticlesForm-id");
            const emailField = screen.getByTestId("ArticlesForm-email");
            const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
            const titleField = screen.getByTestId("ArticlesForm-title");
            const urlField = screen.getByTestId("ArticlesForm-url");
            const explanationField = screen.getByTestId("ArticlesForm-explanation");
            const submitButton = screen.getByTestId("ArticlesForm-submit");

            expect(idField).toHaveValue("17");
            expect(emailField).toHaveValue("asdfasdf@yahoo.com");
            expect(dateAddedField).toHaveValue("2024-02-14");
            expect(titleField).toHaveValue("OpenAI's next move could be controlling your computer");
            expect(urlField).toHaveValue("https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16");
            expect(explanationField).toHaveValue("AI");
            expect(submitButton).toBeInTheDocument();
        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("ArticlesForm-explanation");

            const idField = screen.getByTestId("ArticlesForm-id");
            const emailField = screen.getByTestId("ArticlesForm-email");
            const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
            const titleField = screen.getByTestId("ArticlesForm-title");
            const urlField = screen.getByTestId("ArticlesForm-url");
            const explanationField = screen.getByTestId("ArticlesForm-explanation");
            const submitButton = screen.getByTestId("ArticlesForm-submit");

            expect(idField).toHaveValue("17");
            expect(emailField).toHaveValue("asdfasdf@yahoo.com");
            expect(dateAddedField).toHaveValue("2024-02-14");
            expect(titleField).toHaveValue("OpenAI's next move could be controlling your computer");
            expect(urlField).toHaveValue("https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16");
            expect(explanationField).toHaveValue("AI");
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailField, { target: { value: "aaaawdw@yahoo.com" } });
            fireEvent.change(dateAddedField, { target: { value: "2024-02-08" } });
            fireEvent.change(titleField, { target: { value: "Nvidia's new AI chatbot runs locally on your PC, and it's free" } });
            fireEvent.change(urlField, { target: { value: "https://www.msn.com/en-us/lifestyle/shopping/nvidia-s-new-ai-chatbot-runs-locally-on-your-pc-and-it-s-free/ar-BB1ihQAs?ocid=msedgntp&pc=U531&cvid=677b465ce77c458cbc16ddb7cea51906&ei=8" } });
            fireEvent.change(explanationField, { target: { value: "ABC" } });
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("articles Updated - id: 17 title: Nvidia's new AI chatbot runs locally on your PC, and it's free");
            expect(mockNavigate).toBeCalledWith({ "to": "/articles" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                title: "Nvidia's new AI chatbot runs locally on your PC, and it's free",
                url: "https://www.msn.com/en-us/lifestyle/shopping/nvidia-s-new-ai-chatbot-runs-locally-on-your-pc-and-it-s-free/ar-BB1ihQAs?ocid=msedgntp&pc=U531&cvid=677b465ce77c458cbc16ddb7cea51906&ei=8",
                explanation: "ABC",
                email: "aaaawdw@yahoo.com",
                dateAdded: "2024-02-08"
            })); 

        });

       
    });
});
