import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { DoctorDashboard } from './components/Dashboard/DoctorDashboard';
import { PatientDashboard } from './components/Dashboard/PatientDashboard';
import { DoctorManagement } from './components/Management/DoctorManagement';
import { PatientManagement } from './components/Management/PatientManagement';
import { AppointmentManagement } from './components/Management/AppointmentManagement';
import { BillingManagement } from './components/Management/BillingManagement';
import { MedicalRecords } from './components/Records/MedicalRecords';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        if (user.role === 'admin') return <AdminDashboard />;
        if (user.role === 'doctor') return <DoctorDashboard />;
        if (user.role === 'patient') return <PatientDashboard />;
        break;
      case 'doctors':
        return <DoctorManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'records':
        return <MedicalRecords />;
      case 'book-appointment':
        return <AppointmentManagement />;
      case 'prescriptions':
        return <MedicalRecords />;
      case 'health':
        return <MedicalRecords />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;