import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ArticlesForm({ initialContents, submitAction, buttonLabel = "Create" }) {

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

    const dateRegex = /(19|2[0-9])\d{2}-\d{2}-\d/;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            <Row>
                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="ArticlesForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            data-testid="ArticlesForm-email"
                            id="email"
                            type="email"
                            isInvalid={Boolean(errors.email)}
                            {...register("email", { required: 'Email is required.'})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>             

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="dateAdded">Date Added</Form.Label>
                        <Form.Control
                            data-testid="ArticlesForm-dateAdded"
                            id="dateAdded"
                            type="date"
                            isInvalid={Boolean(errors.dateAdded)}
                            {...register("dateAdded", { 
                                required: 'A real date is required.',     
                                validate: (value) => {
                                return dateRegex.test(value) || "Date Added must be a real date with a year from 1900-2999.";
                              },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateAdded?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control
                            data-testid="ArticlesForm-title"
                            id="title"
                            type="text"
                            isInvalid={Boolean(errors.title)}
                            {...register("title", {
                                required: "Title is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row> 
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="url">URL</Form.Label>
                        <Form.Control
                            data-testid="ArticlesForm-url"
                            id="url"
                            type="url"
                            isInvalid={Boolean(errors.url)}
                            {...register("url", {
                                required: "URL is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.url?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row> 
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="explanation">Explanation</Form.Label>
                        <Form.Control
                            data-testid="ArticlesForm-explanation"
                            id="explanation"
                            type="text"
                            isInvalid={Boolean(errors.explanation)}
                            {...register("explanation", {
                                required: "Explanation is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.explanation?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="ArticlesForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="ArticlesForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default ArticlesForm;