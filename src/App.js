// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DocumentUpload from './components/DocumentUpload';
import DocumentList from './components/DocumentList';
import DocumentView from './components/DocumentView';
import { getAllDocuments } from './services/api';

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await getAllDocuments(); // Fetch documents from backend
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Callback to handle successful upload
  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocs) => [newDocument, ...prevDocs]); // Add new document to the list
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="py-6">
                <DocumentUpload onUploadSuccess={handleUploadSuccess} />
                <DocumentList documents={documents} loading={loading} />
              </div>
            }
          />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
