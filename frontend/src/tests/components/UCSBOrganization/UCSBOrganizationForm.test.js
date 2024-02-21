import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBOrganizationForm from "main/components/UCSBOrganization/UCSBOrganizationForm";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBOrganization tests", () => {

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
        expect(screen.getByTestId(/UCSBOrganizationForm-orgCode/)).toHaveValue("NSU");
        expect(screen.getByTestId(/UCSBOrganizationForm-orgTranslationShort/)).toHaveValue("Nikkei Student Union");
        expect(screen.getByTestId(/UCSBOrganizationForm-orgTranslationn/)).toHaveValue("UCSB Nikkei Student Union");
        expect(screen.getByTestId(/UCSBOrganizationForm-inactive/)).toHaveValue("false");
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
        expect(screen.getByText(/inactive is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <UCSBOrganizationForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-orgCode");

        const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
        const orgTranslationShortField = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
        const orgTranslationField = screen.getByTestId("UCSBOrganizationForm-orgTranslationn");
        const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.change(orgCodeField, { target: { value: 'NSU' } });
        fireEvent.change(orgTranslationShortField, { target: { value: 'Nikkei Student Union' } });
        fireEvent.change(orgTranslationField, { target: { value: 'UCSB Nikkei Student Union' } });
        fireEvent.change(inactiveField, { target: { value: "false" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/orgCode is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/orgTranslationShort is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/orgTranslation is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/inactive is required./)).not.toBeInTheDocument();
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
