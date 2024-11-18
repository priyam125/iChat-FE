import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Chat = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user && !user.profileSetup) {
      toast("Please complete your profile setup first")
      navigate("/profile")};
  }, [user, navigate])

  
  return (
    <div>Chat</div>
  )
}

export default Chat