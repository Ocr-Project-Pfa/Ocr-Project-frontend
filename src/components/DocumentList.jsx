// src/components/DocumentList.jsx
import { FileText, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentList = ({ documents, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 size={16} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium">Recent Documents</h2>
        </div>

        {documents.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={16} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No documents found</p>
          </div>
        ) : (
          <div className="divide-y">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/document/${doc.id}`)}
                className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
