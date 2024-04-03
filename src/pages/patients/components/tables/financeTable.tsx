import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function FinanceTable() {
  interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    patientId: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    lastAppointmentDate: string;
  }
  const data = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 3,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 5,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 6,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    {
      id: 7,
      firstName: "John",
      lastName: "Doe",
      patientId: "12345",
      gender: "Male",
      dateOfBirth: "01/01/1990",
      phoneNumber: "555-1234",
      lastAppointmentDate: "02/15/2022",
    },
    // Add more data objects as needed
  ];

  const columns = [
    {
      name: "Patient Name",
      selector: (row: Patient) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      with: "200px",
    },
    {
      name: "Patient ID",
      selector: (row: Patient) => row.patientId,
      sortable: true,
      with: "200px",
    },
    {
      name: "Gender",
      selector: (row: Patient) => row.gender,
      sortable: true,
    },
    {
      name: "Date of Birth",
      selector: (row: Patient) => row.dateOfBirth,
      sortable: true,
      with: "200px",
    },
    {
      name: "Phone Number",
      selector: (row: Patient) => row.phoneNumber,
      sortable: true,
      with: "200px",
    },
    {
      name: "Date of Last Appointment",
      selector: (row: Patient) => row.lastAppointmentDate,
      sortable: true,
      with: "500px",
    },
  ];

  const navigate = useNavigate();
  const handleRowClick = (patientId: number) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onRowClicked={(row) => handleRowClick(row.id)}
      />
    </div>
  );
}

export default FinanceTable;
