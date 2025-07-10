import React from 'react';
import { useMedicalData } from '../../hooks/useMedicalData';
import { Users, Stethoscope, Calendar, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

export function AdminDashboard() {
  const { doctors, patients, appointments, bills } = useMedicalData();

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Doctors',
      value: doctors.length,
      icon: Stethoscope,
      color: 'bg-green-500',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Appointments Today',
      value: appointments.filter(app => app.date === new Date().toISOString().split('T')[0]).length,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Revenue (MTD)',
      value: `$${bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-yellow-500',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  const recentAppointments = appointments.slice(0, 5);
  const pendingBills = bills.filter(bill => bill.status === 'pending').slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your medical center today.</p>
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
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h2>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              
              return (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{patient?.name}</p>
                    <p className="text-sm text-gray-600">with {doctor?.name}</p>
                    <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
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
            })}
          </div>
        </div>

        {/* Pending Bills */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Bills</h2>
          <div className="space-y-4">
            {pendingBills.length > 0 ? (
              pendingBills.map((bill) => {
                const patient = patients.find(p => p.id === bill.patientId);
                
                return (
                  <div key={bill.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <p className="font-medium text-gray-900">{patient?.name}</p>
                      <p className="text-sm text-gray-600">{bill.description}</p>
                      <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${bill.amount}</p>
                      <div className="flex items-center text-yellow-600">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Pending</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No pending bills</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Add New Patient</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Stethoscope className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Add New Doctor</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Schedule Appointment</p>
          </button>
        </div>
      </div>
    </div>
  );
}