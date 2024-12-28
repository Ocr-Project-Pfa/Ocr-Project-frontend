// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import DocumentUpload from './components/DocumentUpload';
import DocumentList from './components/DocumentList';
import DocumentView from './components/DocumentView';

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="py-6">
                <DocumentUpload onUploadSuccess={() => {/* Refresh logic */}} />
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
