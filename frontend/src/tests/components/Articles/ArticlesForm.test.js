import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { articlesFixtures } from "fixtures/articlesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("ArticlesForm tests", () => {
    const expectedHeaders = ["Email", "Date Added", "Title", "URL", "Explanation"];

    test("renders correctly with no initialContents", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await screen.findByText(/Create/);
        expectedHeaders.forEach((headerText) => {
            expect(screen.getByText(headerText)).toBeInTheDocument();
        });
    });


    test("renders correctly when passing in initialContents", async () => {
        render(
            <Router  >
                <ArticlesForm initialContents={articlesFixtures.oneArticle} />
            </Router>
        );
        await screen.findByTestId(/ArticlesForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/ArticlesForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        fireEvent.change(screen.getByTestId("ArticlesForm-email"), { target: { value: 'asdfasdf@yahoo.com' } });
        fireEvent.change(screen.getByTestId("ArticlesForm-dateAdded"), { target: { value: '1250-06-12' } }); //invalid date: year not in range
        fireEvent.change(screen.getByTestId("ArticlesForm-title"), { target: { value: "OpenAI's next move could be controlling your computer" } });
        fireEvent.change(screen.getByTestId("ArticlesForm-url"), { target: { value: 'https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16' } });
        fireEvent.change(screen.getByTestId("ArticlesForm-explanation"), { target: { value: '2024-02-14' } });
        fireEvent.click(screen.getByTestId("ArticlesForm-submit"));
        expect(await screen.findByText(/Date Added must be a real date with a year from 1900-2999/)).toBeInTheDocument();
        fireEvent.change(screen.getByTestId("ArticlesForm-dateAdded"), { target: { value: '2005-06-12' } }); //change from a valid value to an invalid value
        fireEvent.change(screen.getByTestId("ArticlesForm-dateAdded"), { target: { value: '12505-06-12' } }); //invalid date: year not in range
        expect(await screen.findByText(/Date Added must be a real date with a year from 1900-2999/)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        ;
        fireEvent.click(await screen.findByTestId("ArticlesForm-submit"));
        await screen.findByText(/Explanation is required/);
        expect(screen.getByText(/URL is required/)).toBeInTheDocument();
        expect(screen.getByText(/Title is required/)).toBeInTheDocument();
        expect(screen.getByText(/A real date is required/)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <ArticlesForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("ArticlesForm-submit");
        
        fireEvent.change(screen.getByTestId("ArticlesForm-email"), { target: { value: 'asdfasdf@yahoo.com' } });
        fireEvent.change(screen.getByTestId("ArticlesForm-dateAdded"), { target: { value: '2024-02-14' } });
        fireEvent.change(screen.getByTestId("ArticlesForm-title"), { target: { value: "OpenAI's next move could be controlling your computer" } });
        fireEvent.change(screen.getByTestId("ArticlesForm-url"), { target: { value: 'https://www.msn.com/en-us/news/technology/openai-s-next-move-could-be-controlling-your-computer/ar-BB1i9rD5?ocid=msedgntp&pc=U531&cvid=46a98066489c43f09988070917c4f710&ei=16' } });
        fireEvent.change(screen.getByTestId("ArticlesForm-explanation"), { target: { value: '2024-02-14' } });
        fireEvent.click(screen.getByTestId("ArticlesForm-submit"));

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Date Added must be a valid date/)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        ;
        
        fireEvent.click(await screen.findByTestId("ArticlesForm-cancel"));

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});
