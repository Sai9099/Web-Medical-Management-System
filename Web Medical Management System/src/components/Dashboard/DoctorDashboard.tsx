import React from 'react';
import { useMedicalData } from '../../hooks/useMedicalData';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Users, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function DoctorDashboard() {
  const { appointments, patients } = useMedicalData();
  const { user } = useAuth();

  // Filter appointments for current doctor
  const myAppointments = appointments.filter(app => app.doctorId === user?.id);
  const todayAppointments = myAppointments.filter(app => 
    app.date === new Date().toISOString().split('T')[0]
  );
  const upcomingAppointments = myAppointments.filter(app => 
    new Date(app.date) > new Date() && app.status === 'scheduled'
  ).slice(0, 3);

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Patients',
      value: new Set(myAppointments.map(app => app.patientId)).size,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Completed Today',
      value: todayAppointments.filter(app => app.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Reviews',
      value: myAppointments.filter(app => app.status === 'completed' && !app.notes).length,
      icon: FileText,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-600">Good morning, {user?.name}! Here's your schedule for today.</p>
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
        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {patient?.avatar ? (
                          <img
                            src={patient.avatar}
                            alt={patient.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient?.name}</p>
                        <p className="text-sm text-gray-600">{appointment.reason}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-800'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">{patient?.name}</p>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                      <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Upcoming</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Write Prescription</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">View Patient Records</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Update Schedule</p>
          </button>
        </div>
      </div>
    </div>
  );
}