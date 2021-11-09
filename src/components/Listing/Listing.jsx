import React, { useEffect, useState } from 'react';
import invitations from '../../data/invitations';
import invitations_update from '../../data/invitations_update';
import './styles.css';
export const Listing = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userid'));
  const [inviteData, setInviteData] = useState([]);
  const invites = () => {
    let invitationsData = invitations.invites;
    let res = invitationsData.filter(id => id.user_id === userId);
    setInviteData(res);
    return res;
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('loggedIn');
    window.location.reload();
  };
  useEffect(() => {
    invites();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let oldinviteData = [...invites()];
      let newInvites = invitations_update.invites.filter(
        id => id.user_id === userId,
      );
      oldinviteData = [...oldinviteData, ...newInvites];
      setInviteData(oldinviteData);
      console.log(oldinviteData);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {inviteData.map(item => (
        <ul key={item.invite_id} className="ul">
          <li>{item.invite}</li>
          <li>Date - {new Date(item.invite_time).toLocaleString()}</li>
          <li>Vector - {item.vector}</li>
          <li className={item.status === 'read' ? 'normal' : 'active'}>
            Status - {item.status}
          </li>
        </ul>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
