import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();


  const fetchGroups = async () => {
    try {
      const res = await axios.get('https://learning-tracker-backend-t2b2.onrender.com/api/groups/view', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch groups');
    }
  };

  const joinGroup = async (e) => {
    e.preventDefault();
    if (!groupName) return;
    try {
      await axios.post(
        'https://learning-tracker-backend-t2b2.onrender.com/api/groups/join',
        { groupName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setGroupName('');
      fetchGroups();
    } catch (err) {
      console.error(err);
      alert('Failed to join group');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
   <div
  className="min-h-screen flex items-center justify-center bg-gray-100"
  style={{ minHeight: 'calc(100vh - 4rem)' }} // Adjust for navbar height
>
  <div className="max-w-3xl w-full mx-auto p-6">
    <h1 className="text-3xl font-bold mb-12 text-center text-blue-700">
      Your Learning Groups
    </h1>

    <form onSubmit={joinGroup} className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter a group name to join"
        className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Join Group
      </button>
    </form>

    {groups.length === 0 ? (
      <div className="text-center text-gray-500">
        You haven't joined any groups yet.
      </div>
    ) : (
       <ul className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <li
          key={group._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-blue-50"
    onClick={() => navigate(`/groups/${group._id}/goals`)}
        >
          <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
        </li>
      ))}
    </ul>
    )}
  </div>
</div>

  );
};

export default Groups;
