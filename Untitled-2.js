import React, { Component } from "react";
import { Row, Input, Button, Icon, Modal } from "react-materialize";
import API from "../utils/API";
import "jquery";
import moment from "moment";
import "materialize-css/dist/js/materialize.js";
import "./NewAppointment.css";




class NewAppointment extends Component {
  initialState = {
    step: 0,
    date: "Choose A Date",
    appointmentDate: moment().format('YYYY-DD-MM'),
    time: "",
    employeeId: "",
    active: "",
    employees: [],
    Days: [],
    appointments: [],
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    loading: true,
    schedule: {},
    appointmentDateSelected: true,
    appointmentMeridiem: 0,

  };

  state = {
    step: 0,
    date: "Choose A Date",
    day: moment().format('dddd'),
    appointmentDate: moment().format('YYYY-DD-MM'),
    time: "",
    filteredEmployees:undefined,
    employeeId: "",
    active: "",
    employees: [],
    Days: [],
    appointments: [],
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    loading: true,
    schedule: {},
    appointmentDateSelected: true,
    appointmentMeridiem: 0,

  };

  state = this.initialState;

  async componentDidMount() {
    this.setState({
      loading: true
    })
    await this.loadEmployees();
    await this.getAppointments();
    await this.filteredEmployees(this.state.employees,this.state.date)
    await this.setState({
      loading: true
    })


  }
  handleFetch(response) {
    if (!this.state.loading) {
      const { appointments } = response

      const filteredAppointments = appointments.filter(appointment => {

        return appointment.EmployeeId == this.state.employeeId
      });

      console.log(filteredAppointments)
      const initSchedule = {}
      const today = moment().subtract(1, 'day')
      initSchedule[today.format('YYYY-DD-MM')] = true
      const schedule = !filteredAppointments.length ? initSchedule : filteredAppointments.reduce((currentSchedule, appointment) => {

        const { date, slot, EmployeeId } = appointment
        console.log(slot)
        const dateString = moment(date, 'YYYY-DD-MM').format('YYYY-DD-MM')

        // console.log(currentSchedule)
        !currentSchedule[date] ? currentSchedule[dateString] = Array(20).fill(false) : null
        Array.isArray(currentSchedule[dateString]) ?
          currentSchedule[dateString][slot] = true : null
        return currentSchedule
      }, initSchedule)
      // console.log(schedule)
      //Imperative x 100, but no regrets
      for (let day in schedule) {
        let slots = schedule[day]
        // console.log(day)
        slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
      }
      this.setState({
        schedule,
        loading: true
      })
    } else {
      return null
    }
  }

  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem })
  }
  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date })
  }
  hasPast() {
    return moment().format('YYYY-DD-MM') > this.state.appointmentDate ? true : false
  }
  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot })
  }

  loadEmployees = () => {
    API.getEmployees()
      .then(res => this.setState({ employees: res.data }))
      .then(res => console.log(this.state.employees))
      .catch(err => console.log(err));
  };
  getAppointments = () => {
    API.getAppointments()
      .then(res => this.setState({ appointments: { appointments: res.data } }))
      .catch(err => console.log(err));
  };
  // convertDay = () => {
  //   this.setState({day:moment(this.state.appointmentDate,'YYYY-DD-MM').format("DDDD")
  // });
  // }

  convertTime = () => {
    this.setState({
      appointmentDate: moment(this.state.date, "DD MMMM, YYYY").format('YYYY-DD-MM'),
      day: moment(this.state.date, "DD MMMM, YYYY").format("dddd")
    });
  }
  handleTimeChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,
      step: 3
    });
  };
  handleDateChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      loading: false,
      step: 1,
      [name]: value,
      day: moment(value, "DD MMMM, YYYY").format("dddd")

    });
    this.filteredEmployees(this.state.employees, this.state.day)
  };
  handleEmployeeChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      loading: false,

      [name]: value
    });
    this.convertTime();

    // console.log(this.state.appointments)
    this.handleFetch(this.state.appointments)
    this.setState({
      loading: false,
      step: 2,
    });

  };
  handleClose= event=>{
    this.setState({
      step:0
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    // console.log(this.state);
  await  API.saveAppointment({
      date: this.state.appointmentDate,
      slot: this.state.time,
      CustomerId: this.props.customerId,
      EmployeeId: this.state.employeeId
    })
 await API.getCustomersWhere(this.props.customerId) 
 
  .then(res => API.sendConfirmationEmail({
    email:res.data.email,
      date: this.state.date,
      slot: this.state.time,
      CustomerId: this.props.customerId,
      EmployeeId: this.state.employeeId
}))
    //  .then(res => console.log(res.data.email))
      .then(res => this.setState(this.initialstate))
      .catch(err => console.log(err));
  };
  renderAppointmentTimes() {
    if (!this.state.loading) {


      const slots = [...Array(20).keys()]
      console.log(slots)
      return slots.map(slot => {
        const appointmentDateString = this.state.appointmentDate
        // console.log(this.state.appointmentDate)
        const t1 = moment().hour(9).minute(0).add(slot/2, 'hours')
        const t2 = moment().hour(9).minute(0).add(slot/2 +.5, 'hours')
        const timeNow = moment().hour() > 9 && moment().format('YYYY-DD-MM') === this.state.appointmentDate ? moment().hour() - 8.5 >= slot ? true : false : false
        // console.log(this.state.appointmentDate)
        const hasPast = moment().format('YYYY-DD-MM') > this.state.appointmentDate ? true : false

        // console.log(hasPast)
        // console.log(slot)
        const scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[this.state.appointmentDate][slot] : false
        // console.log(this.state.schedule)
        // const meridiemDisabled = this.state.appointmentMeridiem ? t1.format('a') === 'am' : t1.format('a') === 'pm'
        // console.log(this.state.date)
        return <option
          // label={t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
          key={slot}
          value={slot}
          // style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
          disabled={scheduleDisabled || timeNow || hasPast}
        >{t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}</option>

      })
    } else {
      return null
    }
  }

  filteredEmployees = (employees, day) => {

    if (day === "Sunday") {
      this.setState({
        
      
     filteredEmployees: employees.filter(employee => employee.Sunday === "on")});
    }

    if (day === "Monday") {
      this.setState({
      filteredEmployees: employees.filter(employee => employee.Monday === "on")});
    }
    if (day === "Tuesday") {
      this.setState({
      filteredEmployees: employees.filter(employee => employee.Tuesday === "on")});
    }
    if (day === "Wednesday") {
      this.setState({
      filteredEmployees: employees.filter(employee => employee.Wednesday === "on")});
    }
    if (day === "Thursday") {
      this.setState({
      filteredEmployees: employees.filter(employee => employee.Thursday === "on")});
    }
    if (day === "Friday") {
      this.setState({
      filteredEmployees: employees.filter(employee => employee.Friday === "on")});
    }
    if (day === "Saturday") {
      this.setState({
        filteredEmployees:employees.filter(employee => employee.Saturday === "on")});
    }  if(day==="Choose A Date") {this.setState({filteredEmployees:undefined})}
  };
  render() {



    console.log(this.state.time)
    console.log(this.state.employeeId)
    return (
      <Modal
        actions={
          <div>
            <Button
              disabled={this.state.step !== 3 ? true : false}
              className="btn blue lighten-1 "
              modal="close"
              onClick={this.handleSubmit}
            >
              Save Appointment
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              className="blue"
              modal="close"
              onClick={this.handleClose}
              waves="light"
            >
              Close
            </Button>
          </div>
        }
        id=""
        role="dialog"
        header="Make A New Appointment"
        trigger={
          <Button className="blue waves-effect waves-light makeAppointment z-depth-5">
            <h5>Make An Appointment</h5>
          </Button>
        }
      >
        <div className="container">
          <div className="row">
            <form>
              <Row>
                <Input
                  s={12}
                  className={this.state.step > 0?"valid green-text":"black-text"}
                  type="date"
                  name="date"
                  placeholder={this.state.date}
                  value={this.state.date}
                  onChange={this.handleDateChange}
                >
                  <Icon>date_range</Icon>
                </Input>
                {/* <Icon>account_circle</Icon> */}
              </Row>
              <Row>
                {this.state.filteredEmployees !== undefined ? (
                    //  {/* <Icon>account_circle</Icon> */}
                  <Input

                    disabled={this.state.step === 0 ? true : false}
                    name="employeeId"
                    l={6}
                    s={12}
                    label={this.state.filteredEmployees.length===0 ?"Oops, Looks Like We're Closed":"Choose an Employee"}
                    type="select"
                    onChange={this.handleEmployeeChange}
                    className={this.state.step > 1?"valid green-text modalDrop":"modalDrop black-text"}
                  >
                    {this.state.filteredEmployees.map(employee => (
                      <option name="active" id="name" key={employee.id} value={employee.id}>
                        {employee.first_name} {employee.last_name}
                      </option>
                    ))}
                  </Input>) : (<Input

                    disabled={this.state.step === 0 ? true : false}
                    name="employeeId"
                    l={6}
                    s={12}
                    label="First, Choose A Date"
                    type="select"
                    className="modalDrop"
                  ></Input>)}

                <Input
                  disabled={this.state.step < 2 ? true : false}
                  name="time"
                  label={this.state.step <2 ?"First, Choose A Stylist":"Choose A Time"}
                  s={12}
                  l={6}
                  type="select"
                  onChange={this.handleTimeChange}
                  className={this.state.step < 3?"modalDrop black-text":"valid green-text modalDrop"}
                >
                  {this.renderAppointmentTimes()}
                </Input>
              </Row>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
export default NewAppointment;