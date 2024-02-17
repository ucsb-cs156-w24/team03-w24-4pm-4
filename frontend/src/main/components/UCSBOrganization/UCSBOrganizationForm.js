import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function UCSBOrganizationForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    const testIdPrefix = "UCSBOrganizationForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="orgCode">orgCode</Form.Label>
                <Form.Control
                    data-testid="UCSBOrganizationForm-orgCode"
                    id="orgCode"
                    type="text"
                    isInvalid={Boolean(errors.orgCode)}
                    {...register("orgCode", {
                        required: "orgCode is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.orgCode?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="orgTranslationShort">orgTranslationShort</Form.Label>
                <Form.Control
                    data-testid="UCSBOrganizationForm-orgTranslationShort"
                    id="orgTranslationShort"
                    type="text"
                    isInvalid={Boolean(errors.orgTranslationShort)}
                    {...register("orgTranslationShort", {
                        required: "orgTranslationShort is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.orgTranslationShort?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="orgTranslation">orgTranslation</Form.Label>
                <Form.Control
                    data-testid="UCSBOrganizationForm-orgTranslation"
                    id="orgTranslation"
                    type="text"
                    isInvalid={Boolean(errors.orgTranslation)}
                    {...register("orgTranslation", {
                        required: "orgTranslation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.orgTranslation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="inactive">inactive</Form.Label>
                <Form.Check
                    data-testid="UCSBOrganizationForm-inactive"
                    id="inactive"
                    type="switch"
                    {...register("inactive")}
                />
            </Form.Group>


            <Button
                type="submit"
                data-testid="UCSBOrganizationForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="UCSBOrganizationForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )

}
export default UCSBOrganizationForm