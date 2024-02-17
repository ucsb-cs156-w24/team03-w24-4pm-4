import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBOrganizationForm from "main/components/UCSBOrganization/UCSBOrganizationForm";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBOrganizationForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByText(/orgCode/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a UCSBOrganization", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm initialContents={ucsbOrganizationFixtures.oneOrganization} />
            </Router>
        );
        await screen.findByTestId(/UCSBOrganizationForm-orgCode/);
        expect(screen.getByText(/orgCode/)).toBeInTheDocument();
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-orgCode");
        const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
        const orgTranslationShort = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
        const orgTranslation = screen.getByTestId("UCSBOrganizationForm-orgTranslation");
        const inactive = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.change(orgCodeField, { target: { value: 'bad-input' } });
        fireEvent.change(orgTranslationShort, { target: { value: 'bad-input' } });
        fireEvent.change(orgTranslation, { target: {value: 'bad-input' } });
        fireEvent.click(submitButton);

    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        
        await screen.findByTestId("UCSBOrganizationForm-submit");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/orgCode is required./);
        expect(screen.getByText(/orgTranslationShort is required./)).toBeInTheDocument();
        expect(screen.getByText(/orgTranslation is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <UCSBOrganizationForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-orgCode");

        await screen.findByTestId("UCSBOrganizationForm-orgCode");
        const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
        const orgTranslationShort = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
        const orgTranslation = screen.getByTestId("UCSBOrganizationForm-orgTranslation");
        const inactive = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.change(orgCodeField, { target: { value: 'NSU' } });
        fireEvent.change(orgTranslationShort, { target: { value: 'Nikkei Student Union' } });
        fireEvent.change(orgTranslation, { target: {value: 'UCSB Nikkei Student Union' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());


    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-cancel");
        const cancelButton = screen.getByTestId("UCSBOrganizationForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});
