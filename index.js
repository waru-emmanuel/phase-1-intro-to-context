// Your code here
 function createEmployeeRecord(employeeData){

        const [firstName, familyName, title, payPerHour] = employeeData;
        return {
          firstName,
          familyName,
          title,
          payPerHour,
          timeInEvents:[],
          timeOutEvents:[]
        };
 }

 function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

// Test cases
const employeesData = [
    ["Gray", "Worm", "Security", 1],
    ["Donald", "Trump", "President", 6],
    ["Emmanuel", "Warutere", "Engineer", 15]
];

const employeeRecords = createEmployeeRecords(employeesData);

// function for time-in event for an employee
function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' '); //splitting datw and hour from the date/time string
    // add the time-in event to the employee's timeInevents array
    employee.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour, 10) });
    return employee;
}

//function for creating a time-out event for an employee
function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' '); // splitting occurs here, same process as time-in
    // add time-out event to employee's timeOutEvents array
    employee.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour, 10) });
    return employee;
}

//In this function, hours worked by an employee ona a specific date are calculated
function hoursWorkedOnDate(employee, date) {
    //time-in/-out events for the given date
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    // hoursworked are gooten by subtracting time-out hr from time-in hr
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

// wages earned by an employee ona specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);//calculations for the hours worked on a given date
    const ratePerHour = employee.payPerHour;//employee paye rate per hour
    return hoursWorked * ratePerHour;// the wages earned will be a multiplication of the hours worked by payrate hourly
}

// all wages earned by a single employee
function allWagesFor(employee) {
    // get an array of all the dates the employee has clocked in, which are the time-in events
    const dates = employee.timeInEvents.map(event => event.date);
    // all the wages earned are summed up for each date
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}
 //total payroll for the list of employees
function calculatePayroll(employees) {
    // invloves summing up all the wages earned by each employee on the list
    const totalPayroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
}
