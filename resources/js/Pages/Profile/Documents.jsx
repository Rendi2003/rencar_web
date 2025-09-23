import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Documents() {
  const { data, setData, post, progress, errors } = useForm({
    type: '',
    document_number: '',
    file_path: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/documents'); // arahkan ke route yang kamu buat di Laravel
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Dokumen</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Jenis Dokumen</label>
          <select
            value={data.type}
            onChange={(e) => setData('type', e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">-- Pilih --</option>
            <option value="KTP">KTP</option>
            <option value="SIM">SIM</option>
            <option value="STNK">STNK</option>
          </select>
          {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
        </div>

        <div>
          <label className="block font-medium">Nomor Dokumen</label>
          <input
            type="text"
            value={data.document_number}
            onChange={(e) => setData('document_number', e.target.value)}
            className="border rounded p-2 w-full"
          />
          {errors.document_number && <div className="text-red-500 text-sm">{errors.document_number}</div>}
        </div>

        <div>
          <label className="block font-medium">Upload File</label>
          <input
            type="file"
            onChange={(e) => setData('file_path', e.target.files[0])}
            className="border rounded p-2 w-full"
          />
          {progress && (
            <div className="mt-2 text-sm text-gray-600">
              Uploading: {progress.percentage}%
            </div>
          )}
          {errors.file_path && <div className="text-red-500 text-sm">{errors.file_path}</div>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
