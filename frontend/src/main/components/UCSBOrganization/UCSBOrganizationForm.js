import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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


    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>



                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="orgCode">orgCode</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-orgCode"
                            id="orgCode"
                            type="text"
                            isInvalid={Boolean(errors.orgCode)}
                            {...register("orgCode", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orgCode && 'orgCode is required.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="orgTranslationShort">orgTranslationShort</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-orgTranslationShort"
                            id="orgTranslationShort"
                            type="text"
                            isInvalid={Boolean(errors.orgTranslationShort)}
                            {...register("orgTranslationShort", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orgTranslationShort && 'orgTranslationShort is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>

                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="orgTranslation">orgTranslation</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-orgTranslationn"
                            id="orgTranslation "
                            type="text"
                            isInvalid={Boolean(errors.orgTranslation)}
                            {...register("orgTranslation", {required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orgTranslation && "orgTranslation is required."}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Col>
            </Row>

            <Row>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="inactive">inactive</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-inactive"
                            id="inactive"
                            type="text"
                            isInvalid={Boolean(errors.inactive)}
                            {...register("inactive", {required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.inactive && "inactive is required."}
                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>
            </Row>

            <Row>
                <Col>
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
                </Col>
            </Row>
        </Form>

    )
}

export default UCSBOrganizationForm;
