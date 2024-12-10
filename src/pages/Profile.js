import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate(); // React Router navigation hook

  const user = {
    name: "Jordan Belfort",
    email: "jordanBelfort99@gmail.com",
    bio: "I am an IT student and currently studying at Straton Oakmont University in the Philippines.",
    avatar:
      "https://th.bing.com/th/id/R.94b13f3906132869c86ef7cafc7224e6?rik=6pDiCnLNiJGuiw&riu=http%3a%2f%2fbrokerzinvestments.altervista.org%2fwp-content%2fuploads%2f2017%2f09%2fjordan-belfort-keynote-speaker-940x660.jpg&ehk=gVvlHa%2bKcPUDWY0F73GNzrSM7FyEFrEH5CmUFvpuzuQ%3d&risl=&pid=ImgRaw&r=0",
  };

  return (
    <Container className="bg-warning mt-1 p-5 py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Img
              variant="top"
              src={user.avatar}
              className="rounded-circle mx-auto mt-3"
              style={{ width: "150px", height: "150px" }}
            />
            <Card.Body>
              <Card.Title className="fw-bold">{user.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Bio:</strong> {user.bio}
              </Card.Text>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/update-password")}
                >
                  Update Password
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
