import React, { useState } from 'react';
import './ContactForm.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ValidFeedback from './ValidFeedback';
import InvalidFeedback from './InvalidFeedback';

function ContactForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [date, setDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [comments, setComments] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = {
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            date,
            numberOfGuests,
            comments,
        };

        try {
            const response = await fetch('http://localhost:5001/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setConfirmationMessage(`Dear ${firstName} ${lastName}, thank you for your reservation for ${numberOfGuests} people on ${date}! You will receive a confirmation email shortly on ${emailAddress}.`);
            } else {
                const result = await response.json();
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div>
            <Form className="bg-dark text-light p-5 needs-validation" onSubmit={handleSubmit}>
                {/* Form fields */}
                <Form.Group className="row mb-3">
                    <Col className="mb-3 mb-md-0 was-validated" md={6}>
                        <Form.Label htmlFor="first-name" className="text-capitalize">First name</Form.Label>
                        <Form.Control type="text" name="first-name" id="first-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please enter your first name.' />
                    </Col>
                    <Col className='was-validated' md={6}>
                        <Form.Label htmlFor="last-name" className="text-capitalize">Last name</Form.Label>
                        <Form.Control type="text" name="last-name" id="last-name" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please enter your last name.' />
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Col className="mb-3 mb-md-0 was-validated" md={6}>
                        <Form.Label htmlFor="phone-number" className="text-capitalize">Phone number</Form.Label>
                        <Form.Control type="tel" pattern="[0-9]{5}[0-9]{6}" name="phone-number" id="phone-number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please enter your mobile number.' />
                    </Col>
                    <Col className='was-validated' md={6}>
                        <Form.Label htmlFor="email" className="text-capitalize">Email address</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please enter your email address.' />
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Col className="mb-3 mb-md-0 was-validated" md={6}>
                        <Form.Label htmlFor="date">Date</Form.Label>
                        <Form.Control type="date" name="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please choose a date.' />
                    </Col>
                    <Col className='was-validated' md={6}>
                        <Form.Label htmlFor="guests" className="text-capitalize">Number of guests</Form.Label>
                        <Form.Control type="number" name="guests" id="guests" value={numberOfGuests} onChange={(event) => setNumberOfGuests(event.target.value)} required />
                        <ValidFeedback />
                        <InvalidFeedback message='Please choose the number of guests.' />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="comments">Comments</Form.Label>
                    <Form.Control as="textarea" name="comments" cols={20} rows={3} id="comments" value={comments} onChange={(event) => setComments(event.target.value)} />
                </Form.Group>

                <Button variant="success" type="submit" className='btn btn-lg mt-4'>
                    Submit
                </Button>
            </Form>

            {confirmationMessage && (
                <div id="results">
                    <div className="modal" id="modal" tabIndex="-1">
                        <div className="modal-dialog d-flex align-items-center">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Thank You!</h5>
                                </div>
                                <div className="modal-body">
                                    <p>{confirmationMessage}</p>
                                    <p>See you soon!</p>
                                </div>
                                <div className="modal-footer">
                                    <Button variant="success" size="lg" onClick={() => window.location.reload()}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactForm;
