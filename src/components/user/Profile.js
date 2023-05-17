import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar';
import './cssfiles/profile.css'
import jwt from 'jsonwebtoken';
import axios from 'axios';
import loadingimage from '../../loading.gif'

function Profile() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)
  // const [name, setName] = useState('')
  // const [dob, setDob] = useState('')
  // const [phone, setPhone] = useState()
  // const [qualifications, setQualifications] = useState()
  // const [experience, setExperience] = useState()

  const [editedName, setEditedName] = useState('');
  const [editedDob, setEditedDob] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedQualifications, setEditedQualifications] = useState('');
  const [editedExperience, setEditedExperience] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const checkAuthorization = () => {
      console.log('AUTHENTICATING')
      const token = localStorage.getItem('token')
      if (token) {
        const user = jwt.decode(token)
        console.log('USER WHILE AUTHENTICATING : ', user)
        if (!user) {
          localStorage.removeItem('token')
          nav('/login')
        } else {
          setEmail(user.email)
        }
      } else nav('/login')
    }
    checkAuthorization()
  }, [nav])

  

  useEffect(() => {
    console.log("FETCHING");
    console.log(email);
    async function fetchProfile () {
      setLoading(true)
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/user/profile',
        { email: email }
      )
      console.log( res.data.user);
      setEditedName(res.data.user.name)
      setEditedDob(res.data.user.dob)
      setEditedPhone(res.data.user.phone)
      setEditedQualifications(res.data.user.qualifications)
      setEditedExperience(res.data.user.experience)
      setLoading(false)
    }
    fetchProfile();
  }, [email])
  
  


  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    axios.post('https://linkedoutbackend.onrender.com/user/update', {
      email: email,
      name: editedName,
      dob: editedDob,
      phone:editedPhone,
      qualifications:editedQualifications,
      experience:editedExperience
      
    })
    setIsEditing(false);
    setLoading(false)
  };

  if (loading) {
    return (
      <div className="jobboard">
        <NavBar />
        <img src={loadingimage} alt="Loading..." style={{marginTop:"17%",marginLeft:"49%"}} />
      </div>
    )
  } 

  return (
    <div>
      <NavBar />
      <h1 className="profile-title">Profile Page</h1>
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
          />
          <br />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={editedDob}
            onChange={(event) => setEditedDob(event.target.value)}
          />
          <br />
  
          <br />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={editedPhone}
            onChange={(event) => setEditedPhone(event.target.value)}
          />
          <br />
          <label htmlFor="qualifications">Qualifications:</label>
          <textarea
            id="qualifications"
            value={editedQualifications}
            onChange={(event) => setEditedQualifications(event.target.value)}
          ></textarea>
          <br />
          <label htmlFor="experience">Experience:</label>
          <textarea
            id="experience"
            value={editedExperience}
            onChange={(event) => setEditedExperience(event.target.value)}
          ></textarea>
          <br />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-container">
          <p>Name: {editedName}</p>
          <p>Date of Birth: {editedDob}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {editedPhone}</p>
          <p>Qualifications: {editedQualifications}</p>
          <p>Experience: {editedExperience}</p>
          <button id="update" onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
