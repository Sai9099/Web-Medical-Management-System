import React from 'react';
import { useMedicalData } from '../../hooks/useMedicalData';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, FileText, CreditCard, Heart, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function PatientDashboard() {
  const { appointments, bills, doctors } = useMedicalData();
  const { user } = useAuth();

  // Filter data for current patient
  const myAppointments = appointments.filter(app => app.patientId === user?.id);
  const myBills = bills.filter(bill => bill.patientId === user?.id);
  const upcomingAppointments = myAppointments.filter(app => 
    new Date(app.date) >= new Date() && app.status === 'scheduled'
  ).slice(0, 3);
  const pendingBills = myBills.filter(bill => bill.status === 'pending');

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Prescriptions',
      value: 2, // Mock data
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Bills',
      value: pendingBills.length,
      icon: CreditCard,
      color: 'bg-yellow-500'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}! Here's your health summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => {
                const doctor = doctors.find(d => d.id === appointment.doctorId);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {doctor?.avatar ? (
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <Heart className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doctor?.name}</p>
                        <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Scheduled
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Appointment Completed</p>
                <p className="text-sm text-gray-600">Consultation with Dr. Michael Chen</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Lab Results Available</p>
                <p className="text-sm text-gray-600">Blood work results are ready</p>
                <p className="text-xs text-gray-500">5 days ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Prescription Updated</p>
                <p className="text-sm text-gray-600">New medication added to your list</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Book Appointment</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">View Prescriptions</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
            <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Pay Bills</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <Heart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Health Records</p>
          </button>
        </div>
      </div>

      {/* Health Reminders */}
      {pendingBills.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">Payment Reminder</h3>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            You have {pendingBills.length} pending bill{pendingBills.length > 1 ? 's' : ''} totaling ${pendingBills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}.
          </p>
        </div>
      )}
    </div>
  );
}