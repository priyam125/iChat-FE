import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactsContainer from '../../components/shared/ContactsContainer';
import ChatContainer from '../../components/shared/ChatContainer';
import EmptyChatContainer from '../../components/shared/EmptyChatContainer';

const Chat = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user && !user.profileSetup) {
      toast("Please complete your profile setup first")
      navigate("/profile")};
  }, [user, navigate])

  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer  />
    </div>
  )
}

export default Chat