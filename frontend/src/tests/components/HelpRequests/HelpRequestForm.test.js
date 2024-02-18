import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import HelpRequestForm from "main/components/HelpRequests/HelpRequestForm";
import { helpRequestsFixtures } from "fixtures/helpRequestsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("HelpRequestForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        //await screen.findByText(/Id/);
        await screen.findByText(/Requester Email/);
        await screen.findByText(/TeamID/);
        await screen.findByText(/Table Or Breakout Room/);
        await screen.findByText(/Request Time ISO Format/);
        await screen.findByText(/Explanation/);
        await screen.findByText(/Solved/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a HelpRequest", async () => {

        render(
            <Router  >
                <HelpRequestForm initialContents={helpRequestsFixtures.oneRequest} />
            </Router>
        );
        await screen.findByTestId(/HelpRequestForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/HelpRequestForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-teamId");
        const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'bad-input' } });
        fireEvent.change(teamIdField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email must be a valid email./);
        expect(screen.getByText(/Team ID must be a valid team id./)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-submit");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Requester Email is required./);
        expect(screen.getByText(/Team ID is required./)).toBeInTheDocument();
        expect(screen.getByText(/Table or Breakout Room is required./)).toBeInTheDocument();
        expect(screen.getByText(/Request time is required and must be provided in ISO format./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <HelpRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-teamId");

        const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
        const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestForm-tableOrBreakoutRoom");
        const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
        const explanationField = screen.getByTestId("HelpRequestForm-explanation");
        const solvedField = screen.getByTestId("HelpRequestForm-solved");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'sample01@gmail.com' } });
        fireEvent.change(teamIdField, { target: { value: 'w24-4pm-4' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: {value: 'Table 01'} });
        fireEvent.change(requestTimeField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(explanationField, { target: { value: 'help'} });
        fireEvent.click(solvedField);
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Requester email must be a valid email./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Team ID must be a valid team id./)).not.toBeInTheDocument();


    });

    test("Email validation", async () => {
        render(
            <Router>
                <HelpRequestForm />
            </Router>
        );
    
        const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
    

        fireEvent.change(requesterEmailField, { target: { value: 'validemail@example.com' } });
        fireEvent.click(submitButton);
        expect(screen.queryByText(/Requester email must be a valid email./)).not.toBeInTheDocument();
    
        fireEvent.change(requesterEmailField, { target: { value: 'invalidemail@com' } });
        fireEvent.click(submitButton);
        await screen.findByText(/Requester email must be a valid email./);
    });

    test("Email validation for multiple characters before @", async () => {
        render(
            <Router>
                <HelpRequestForm />
            </Router>
        );
    
        const emailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
    
        fireEvent.change(emailField, { target: { value: 'user@example.com' } });
        fireEvent.click(submitButton);
        expect(screen.queryByText(/Requester email must be a valid email./)).not.toBeInTheDocument();
    
        fireEvent.change(emailField, { target: { value: '@domain.com' } });
        fireEvent.click(submitButton);
        await screen.findByText(/Requester email must be a valid email./); 
    });

    
    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-cancel");
        const cancelButton = screen.getByTestId("HelpRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

    

});