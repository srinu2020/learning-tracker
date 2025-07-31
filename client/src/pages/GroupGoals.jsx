import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GroupGoals = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', progress: 0, deadline: '' });
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`https://learning-tracker-backend-t2b2.onrender.com/api/goals/group/${groupId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setGoals(res.data);
    } catch (err) {
      alert('Failed to fetch goals');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://learning-tracker-backend-t2b2.onrender.com/api/goals/add', {
        ...form,
        groupId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setForm({ title: '', progress: 0, deadline: '' });
      fetchGoals();
    } catch (err) {
      alert('Failed to add goal');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [groupId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Goals for this Group</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Goal Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm"
          required
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={form.progress}
          min={0}
          max={100}
          onChange={(e) => setForm({ ...form, progress: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm"
          required
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm"
          required
        />
        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Goal
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="text-center text-gray-500">No goals for this group yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-white p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{goal.title}</h3>
              <p className="text-gray-600">Progress: {goal.progress}%</p>
              <p className="text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupGoals;
