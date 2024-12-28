// src/components/DocumentUpload.jsx
import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadDocument } from '../services/api';

const DocumentUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      const data = await uploadDocument(file); // Upload file to backend
      onUploadSuccess(data); // Notify parent component of the successful upload
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Upload size={16} className="text-gray-500" />
          <h2 className="text-sm font-medium">Upload Document</h2>
        </div>

        <form onSubmit={handleUpload}>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm"
              accept="image/*,.pdf"
            />
          </div>

          <button
            type="submit"
            disabled={!file || loading}
            className="mt-4 w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium
                     hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                     flex items-center justify-center"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
