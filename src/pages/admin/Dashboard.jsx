import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import Analytics from './Analytics';
import Settings from './Settings';
import ManageUsers from './ManageUsers';
import Assets from './Assets';

const Dashboard = () => {
  const [tab, setTab] = useState("analytics"); // Initialize tab state with "home"

  return (
    <div className='flex gap-2'>
      <div>
        <AdminSideBar tab={tab} setTab={setTab} />
      </div>
      <div className='p-4 w-full'>
        {/* Render content based on selected tab */}
        {tab === "home" && <div>
          <Assets/>
          </div>}
        {tab === "analytics" && <div>
          <Analytics/>
          </div>}
        {tab === "settings" && <div>
          <Settings/>
          </div>}
        {tab === "users" && <div>
          <ManageUsers/>
          </div>}
      </div>
    </div>
  );
};

export default Dashboard;
