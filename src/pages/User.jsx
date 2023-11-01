import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

function User() {
  return (
    <div className='text-center'>
      <h3>User Page</h3>
      <NavLink to="/register" className="text-primary ml-2">
        <Button variant="secondary">Register a new admin</Button>
      </NavLink>

    </div>
  )
}

export default User;
