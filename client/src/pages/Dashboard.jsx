import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar on the left */}
      <DashSidebar />
      {/* Profile/content on the right */}
      {tab === 'posts' && <DashPost />}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard;