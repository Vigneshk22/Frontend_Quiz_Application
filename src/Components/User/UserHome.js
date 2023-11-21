import React from 'react';
import UserLoginNavbar from '../Navbar/UserLoginNavbar';
import UserReports from '../Reports/UserReports';

export default function UserHome({userData}) {

  return (
    
    <div>
      <UserLoginNavbar/>
      <UserReports />

    </div>
  );
}
