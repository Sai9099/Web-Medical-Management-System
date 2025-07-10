import { useState, useEffect } from 'react';
import { Doctor, Patient, Appointment, Prescription, Bill, MedicalRecord } from '../types';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Cardiology',
    email: 'emily.rodriguez@medicalcenter.com',
    phone: '+1 (555) 123-4567',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    rating: 4.9,
    experience: 12,
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    email: 'michael.chen@medicalcenter.com',
    phone: '+1 (555) 234-5678',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rating: 4.8,
    experience: 15,
    avatar: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    specialization: 'Pediatrics',
    email: 'sarah.williams@medicalcenter.com',
    phone: '+1 (555) 345-6789',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    rating: 4.95,
    experience: 8,
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, Anytown, AT 12345',
    emergencyContact: '+1 (555) 876-5432',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+1 (555) 876-5432',
    dateOfBirth: '1990-07-22',
    address: '456 Oak Ave, Somewhere, SW 54321',
    emergencyContact: '+1 (555) 765-4321',
    bloodType: 'O-',
    allergies: ['Latex'],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 765-4321',
    dateOfBirth: '1978-11-08',
    address: '789 Pine Rd, Elsewhere, EW 98765',
    emergencyContact: '+1 (555) 654-3210',
    bloodType: 'B+',
    allergies: [],
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-15',
    time: '10:00',
    status: 'scheduled',
    reason: 'Routine checkup',
    notes: 'Patient complains of chest pain'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2024-01-16',
    time: '14:30',
    status: 'completed',
    reason: 'Follow-up consultation',
    notes: 'Patient doing well post-surgery'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2024-01-17',
    time: '09:15',
    status: 'scheduled',
    reason: 'Vaccination',
    notes: 'Annual flu shot'
  }
];

const mockBills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    appointmentId: '1',
    amount: 150.00,
    description: 'Consultation - Cardiology',
    status: 'pending',
    dueDate: '2024-02-15',
    date: '2024-01-15'
  },
  {
    id: '2',
    patientId: '2',
    appointmentId: '2',
    amount: 200.00,
    description: 'Follow-up consultation - Neurology',
    status: 'paid',
    dueDate: '2024-02-16',
    date: '2024-01-16'
  }
];

export function useMedicalData() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [isLoading, setIsLoading] = useState(false);

  // CRUD operations
  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor = { ...doctor, id: Date.now().toString() };
    setDoctors(prev => [...prev, newDoctor]);
    return newDoctor;
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates } : doc));
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(doc => doc.id !== id));
  };

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(pat => pat.id === id ? { ...pat, ...updates } : pat));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(pat => pat.id !== id));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: Date.now().toString() };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  return {
    doctors,
    patients,
    appointments,
    bills,
    isLoading,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addPatient,
    updatePatient,
    deletePatient,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
}