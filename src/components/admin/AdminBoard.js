import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import JobCard from './AdminJobCard'
import jwt from 'jsonwebtoken'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './cssfiles/adminboard.css'
function AdminBoard() {
  const [email, setEmail] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    const checkAuthorization = () => {
      console.log('AUTHENTICATING')
      const token = localStorage.getItem('token')
      if (token) {
        const admin = jwt.decode(token)
        console.log('USER WHILE AUTHENTICATING : ', admin)
        if (!admin || !admin.isAdmin) {
          localStorage.removeItem('token')
          nav('/admin-login')
        } else {
          setEmail(admin.email)
        }
      } else nav('/admin-login')
    }
    checkAuthorization()
  }, [nav])

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function fetchJobs() {
      const res = await axios.get('https://linkedoutbackend.onrender.com/admin/jobs')
      const jobs = res.data.jobs
      const newres = await axios.get('https://linkedoutbackend.onrender.com/admin/getorder')
      const order= newres.data.order;

      const sortedJobs = [];

      order.forEach((jobId) => {
        const job = jobs.find((job) => job.id === jobId);
        if (job) {
          sortedJobs.push(job);
        }
      });

      setJobs(sortedJobs)
    }

    fetchJobs()
  }, [])

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...jobs];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setJobs(updatedList);
    let newOrder = [];
    updatedList.forEach((item) => {
      newOrder.push(item.id); // or newOrder.push(item._id);
    });

    

    async function updateOrder() {
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/admin/orderupdate',
        { displayorder: newOrder }
      )
      console.log(res);

    }
    updateOrder()

  };

  return (
    <div>
      <AdminNav />
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div className="list-container" id="adminboard" {...provided.droppableProps} ref={provided.innerRef}>
              {jobs.map((job, index) => (
                <Draggable key={job.id} draggableId={job._id} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      
                    >
                      <JobCard
                        id={job.id}
                        title={job.title}
                        location={job.location}
                        deadline={job.deadline}
                        contact={job.contact}
                        email={email}
                        archived={job.archived}
                      />
                      {/* {index} */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default AdminBoard
