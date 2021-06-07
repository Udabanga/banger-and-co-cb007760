import React, { useState, useEffect } from 'react'
import Iframe from "react-iframe";
import axios from 'axios'
import AuthService from "../../../services/auth.service";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Col, Row, Card } from "react-bootstrap";
// import { PieController } from 'chart.js'
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
  const [showEmployee, setShowEmployee] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [bookings, setBookings] = useState([]);
  const [bookingDates, setBookingDates] = useState([]);

  const [dataPie, setDataPie] = useState('');

  const [list, setList] = useState([]);
  const [bookedList, setBookedList] = useState([]);
  const [completedList, setCopmletedList] = useState([]);
  const [pickedUpList, setPickUpList] = useState([]);
  const [cancelledList, setCancelledList] = useState([]);



  useEffect(() => {
    const user = AuthService.getCurrentUser();
    getBookingList()
    if (user) {
      setCurrentUser(user);
      setShowEmployee(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }

  }, []);

  const getBookingList = async () => {
    const result = await axios.get("http://localhost:5000/api/bookings");
    // const result = await UserService.getBookingList();
    console.log(result);
    setBookings(result.data);

    // let list = []
    // let bookedList = []
    // let completedList = []
    // let pickedUpList = []
    // let cancelledList = []

    result.data.forEach(booking => {

      if (booking.status == "Booked") {
        bookedList.push(booking)
      }
      else if (booking.status == "Complete") {
        completedList.push(booking)
      }
      else if (booking.status == "Picked Up") {
        pickedUpList.push(booking)
      }
      else if (booking.status == "Cancelled" || booking.status == "Cancelled-User") {
        cancelledList.push(booking)
      }



      let bookingData = {
        title: booking.user.fName + " " + booking.user.lName + "||" + booking.status,
        start: booking.pickUpTime,
        end: booking.dropOffTime
      }
      list.push(bookingData);
    })

    setDataPie({
      labels: ['Booked', 'Completed', 'Picked Up', 'Cancelled'],
      datasets: [
        {
          label: '# of Bookings',
          data: [bookedList.length, completedList.length, pickedUpList.length, cancelledList.length],
          backgroundColor: [
            'rgba(0, 0, 255, 0.75)',
            'rgba(0, 255, 0, 0.75)',
            'rgba(255, 255, 0, 0.75)',
            'rgba(255, 0, 0, 0.75)',
          ],
          borderWidth: 1,
        },
      ],
    })
    console.log(list)
    setBookingDates(list);
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">

      <h1>Dashboard</h1>
      {showAdmin && (
        <Iframe
          url="http://localhost:5000/status"
          width="700px"
          height="1050px"
          id="ststus"
          className="status"
          display="initial"
          position="relative"
        />
      )}
      {showEmployee && (
        <>
          <Row>
            <Col>
              <Pie data={dataPie} />
            </Col>
            <Col>
              <Card bg='secondary' text='light' style={{ width: '18rem' }}>
                <Card.Header>Total</Card.Header>
                <Card.Body>
                  <Card.Title>{list.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card bg='primary' text='light' style={{ width: '18rem' }}>
                <Card.Header>Booked</Card.Header>
                <Card.Body>
                  <Card.Title>{bookedList.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card bg='success' text='light' style={{ width: '18rem' }}>
                <Card.Header>Completed</Card.Header>
                <Card.Body>
                  <Card.Title>{completedList.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card bg='warning' text='light' style={{ width: '18rem' }}>
                <Card.Header>Picked Up</Card.Header>
                <Card.Body>
                  <Card.Title>{pickedUpList.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card bg='danger' text='light' style={{ width: '18rem' }}>
                <Card.Header>Cancelled</Card.Header>
                <Card.Body>
                  <Card.Title>{cancelledList.length}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <FullCalendar
            style={{ margin: "0 auto", height: 500 }}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={"dayGridWeek"}
            events={bookingDates}
          />
        </>
      )}
    </div>
  )
}

export default Dashboard;