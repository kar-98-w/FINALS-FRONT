import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import CourseCard from "../components/CourseCard";




export default function Course(){

    const [courses, setCourses] = useState([]);

    const fetchCourses = () => {
        fetch("http://localhost:4000/courses/all/active", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            if(data.code === "ALL-ACTIVE-COURSES-RESULT"){
                setCourses(data.result.map(data => {
                    return(
                        <CourseCard key={data._id} coursesData={data}/>
                    )
                }));
            }else{
                setCourses([]); 
            }
        })
    }

    console.log(courses)

    useEffect(() => {
        fetchCourses();
    }, [])

    return(
        <Container fluid className="p-5 d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-3 display-3 fw-bold">Welcome To The Course Page</h1>
            <p className="mb-5">Please select and enroll to your desired program and course.</p>

            <Container fluid className="bg-secondary p-3">
                {courses}
            </Container>
        </Container>
    )
}