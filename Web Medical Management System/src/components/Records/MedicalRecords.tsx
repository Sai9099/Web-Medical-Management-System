import React, { useState } from 'react';
import { useMedicalData } from '../../hooks/useMedicalData';
import { FileText, Plus, Search, Calendar, User, Stethoscope, Download, Eye } from 'lucide-react';

export function MedicalRecords() {
  const { patients, doctors } = useMedicalData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('all');

  // Mock medical records data
  const mockRecords = [
    {
      id: '1',
      patientId: '1',
      doctorId: '1',
      date: '2024-01-15',
      type: 'consultation',
      title: 'Cardiology Consultation',
      description: 'Patient complained of chest pain. ECG performed, results normal. Recommended stress test.',
      attachments: ['ecg_report.pdf', 'blood_work.pdf']
    },
    {
      id: '2',
      patientId: '2',
      doctorId: '2',
      date: '2024-01-16',
      type: 'lab-result',
      title: 'Blood Work Results',
      description: 'Complete blood count and lipid panel. All values within normal range.',
      attachments: ['lab_results_jan16.pdf']
    },
    {
      id: '3',
      patientId: '1',
      doctorId: '1',
      date: '2024-01-10',
      type: 'diagnosis',
      title: 'Hypertension Diagnosis',
      description: 'Patient diagnosed with mild hypertension. Prescribed ACE inhibitor. Follow-up in 4 weeks.',
      attachments: []
    }
  ];

  const filteredRecords = mockRecords.filter(record => {
    const patient = patients.find(p => p.id === record.patientId);
    const doctor = doctors.find(d => d.id === record.doctorId);
    
    const matchesSearch = patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPatient = selectedPatient === 'all' || record.patientId === selectedPatient;
    
    return matchesSearch && matchesPatient;
  });

  const getRecordIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'consultation':
        return <Stethoscope className={`${iconClass} text-blue-500`} />;
      case 'lab-result':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'diagnosis':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'treatment':
        return <FileText className={`${iconClass} text-purple-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'lab-result':
        return 'bg-green-100 text-green-800';
      case 'diagnosis':
        return 'bg-red-100 text-red-800';
      case 'treatment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Patient medical history and documentation</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search records by patient, doctor, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Patients</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => {
          const patient = patients.find(p => p.id === record.patientId);
          const doctor = doctors.find(d => d.id === record.doctorId);
          
          return (
            <div key={record.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getRecordIcon(record.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRecordColor(record.type)}`}>
                      {record.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(record.date).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-700">Patient:</span>
                  <span className="ml-2 text-gray-600">{patient?.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-700">Doctor:</span>
                  <span className="ml-2 text-gray-600">{doctor?.name}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">{record.description}</p>
              </div>

              {record.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                  <div className="space-y-1">
                    {record.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                        <span>{attachment}</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  View Details
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}