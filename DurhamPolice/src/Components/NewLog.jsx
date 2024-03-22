import React, { useState, useRef } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from "@mui/material";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewLog = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    LogID: '',
    natureOfIncident: '',
    weatherCondition: '',
    locationOfIncident: '',
    dateTimeOfIncident: '',
  });

  const logIdRef = useRef(null);
  const dateTimeRef = useRef(null);
  const detailsOfPersonRef = useRef(null);
  const reasonForAttendanceRef = useRef(null);
  const protectiveClothingWornRef = useRef(null);
  const officerCompletingLogRef = useRef(null);
  const leaveTimeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logData = {
      logId: logIdRef.current.value,
      dateTimeOfVisit: dateTimeRef.current.value,
      detailsOfPerson: detailsOfPersonRef.current.value,
      reasonForAttendance: reasonForAttendanceRef.current.value,
      protectiveClothingWorn: protectiveClothingWornRef.current.value,
      officerCompletingLog: officerCompletingLogRef.current.value,
      leaveTime: leaveTimeRef.current.value,
    };

    setRows(prevRows => [...prevRows, logData]);
    setOpen(false);

    // Clear form fields
    logIdRef.current.value = '';
    dateTimeRef.current.value = '';
    detailsOfPersonRef.current.value = '';
    reasonForAttendanceRef.current.value = '';
    protectiveClothingWornRef.current.value = '';
    officerCompletingLogRef.current.value = '';
    leaveTimeRef.current.value = '';

    Axios.post('http://localhost:3004/auth/addNewLog', logData)
    .then(result => {
        if (result.data.success) {
            navigate('/dashboard/NewLog'); 
        } else {
            alert(result.data.error);
        }
    })
    .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <Typography variant='h3' gutterBottom>Incident Log</Typography>
      </div>

      <div className="flex flex-col justify-center items-center mt-3">
        <Typography variant="overline" display="block" gutterBottom>
          As the officer in charge of the incident, it is your responsibility to
          accurately record all visits to/occurrences at the scene of the incident.
          It should be borne in mind that scene preservation is of the utmost
          importance. It may be necessary at a later stage to account
          for/eliminate all visitors to the scene. If that is the case, the police
          investigation will only be as comprehensive as your log allows it to be.
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Ensure that all visitors to the scene state their reason for entering.
          Unnecessary access must be refused. In cases of difficulty contact your
          duty supervisor, or the crime scene manager in attendance.
        </Typography>
        <Typography
          variant="overline"
          display="block"
          sx={{ color: "red" }}
          gutterBottom
        >
          Protective clothing consisting of a disposable paper suit, gloves, and
          overshoes must be worn by all persons entering the crime scene at all
          times until the scene is released by the senior investigating officer.
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          This is an original document and should be passed on to the next officer
          detailed to complete the scene log, a record of this should be endorsed,
          as it occurs, on the scene log.
        </Typography>
      </div>

      <div className='flex flex-col justify-center items-center mt-3'>
        <div className='w-[60%] '>
          <Paper sx={{ padding: '15px' }}>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Log ID</label>
                <input
                  type='text'
                  name='LogID'
                  ref={logIdRef}
                  onChange={handleChange}
                  className='border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Log ID'
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Date and Time of Incident</label>
                <input
                  type='datetime-local'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  ref={dateTimeRef}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Nature of Incident Details</label>
                <textarea
                  rows={4}
                  name='natureOfIncident'
                  value={formData.natureOfIncident}
                  onChange={handleChange}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter details about the nature of the incident...'
                  required
                ></textarea>
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Weather Condition</label>
                <input
                  type='text'
                  name='weatherCondition'
                  value={formData.weatherCondition}
                  onChange={handleChange}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Weather Condition'
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Location Of Incident</label>
                <input
                  type='text'
                  name='locationOfIncident'
                  value={formData.locationOfIncident}
                  onChange={handleChange}
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Durham, UK'
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Time and Date of Visit</label>
                <input
                  type='datetime-local'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  ref={dateTimeRef}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Name Of Person Visiting The Scene / Department Name</label>
                <input
                  type='text'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Name of Visitor'
                  name='detailsOfPerson'
                  ref={detailsOfPersonRef}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Reason for Visit</label>
                <textarea
                  rows={4}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='The Purpose of Visit at the Incident scene...'
                  name='reasonForVisit'
                  ref={reasonForAttendanceRef}
                ></textarea>
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Protective Clothing Worn</label>
                <textarea
                  rows={4}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Disposable Paper Suit, Gloves, Overshoes'
                  name='protectiveClothingWorn'
                  ref={protectiveClothingWornRef}
                ></textarea>
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Officer Completing Log</label>
                <input
                  type='text'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Officer Name'
                  name='officerCompletingLog'
                  ref={officerCompletingLogRef}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-sm font-medium'>Leave Time</label>
                <input
                  type='datetime-local'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  name='leaveTime'
                  ref={leaveTimeRef}
                />
              </div>
              <button
                type='submit'
                className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-[100%]'
              >
                Add New Log
              </button>
            </form>
          </Paper>
        </div>
      </div>

      <div className='flex justify-center items-center w-[100%] mt-[30px]'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Log ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Time</TableCell>
                <TableCell align='right' sx={{ fontWeight: 800 }}>
                  Name Of Person Visiting The Scene / Department Name
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 800 }}>
                  Reason for Visit
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 800 }}>
                  Protective Clothing Worn
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 800 }}>
                  Officer Completing Log
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 800 }}>
                  Leave Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.logId}
                  </TableCell>
                  <TableCell>{row.dateTimeOfVisit}</TableCell>
                  <TableCell align='right'>{row.detailsOfPerson}</TableCell>
                  <TableCell align='right'>{row.reasonForAttendance}</TableCell>
                  <TableCell align='right'>{row.protectiveClothingWorn}</TableCell>
                  <TableCell align='right'>{row.officerCompletingLog}</TableCell>
                  <TableCell align='right'>{row.leaveTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          title='Add Log'
          centered
          open={open}
          width={800}
          onOk={handleSubmit}
          onCancel={handleCancel}
          footer={false}
        >
          <form onSubmit={handleSubmit}>
            {/* Modal content here */}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default NewLog;


