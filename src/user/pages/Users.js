import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'http://localhost:5000/api/users/'
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  return (
    <>
      <ErrorModal
        error={error}
        onClear={() => setError(null)}
      />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && (
        <UsersList items={users} />
      )}
    </>
  );
};

export default Users;
