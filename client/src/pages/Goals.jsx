import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {  useAuth } from '../context/AuthContext';

const Goals = () => {
  const { user } = useAuth()
  const [form, setForm] = useState({ title: '', progress: 0, deadline: '' });
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/goals/my-goals', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGoals(res.data);
    } catch (err) {
      alert('Failed to fetch goals');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/goals/add',
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setForm({ title: '', progress: 0, deadline: '' });
      fetchGoals();
    } catch (err) {
      alert('Failed to add goal');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Learning Goals</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Goal title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={form.progress}
          onChange={(e) => setForm({ ...form, progress: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="p-2 border rounded"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Add Goal</button>
      </form>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal._id} className="p-3 border rounded bg-gray-100">
            <p><strong>{goal.title}</strong></p>
            <p>Progress: {goal.progress}%</p>
            <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
