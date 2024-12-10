import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function UpdatePassword() {
  // State to hold form data and response messages
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages on form submit
    setError("");
    setMessage("");

    // Basic validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    // Send the update password request
    setIsLoading(true);

    fetch("http://localhost:4000/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Sending JSON data
        Authorization: `Bearer ${token}`, // Send JWT token from localStorage
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setMessage("Password updated successfully!");
        } else {
          setError(data.message || "Something went wrong!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Error: " + error.message);
      });
  };

  return (
    <Container className="profile-page mt-5 col-6">
      <h1 className="text-center">Update Your Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="currentPassword" className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Error and success messages */}
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Button variant="primary" type="submit" disabled={isLoading} className="w-100 mt-3">
          {isLoading ? <Spinner animation="border" size="sm" /> : "Update Password"}
        </Button>
      </Form>
    </Container>
  );
}
