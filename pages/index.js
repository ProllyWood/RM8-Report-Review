import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadComplete(false);
    setAnalyzed(false);
    setError(null);
  };
  
  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    
    setError(null);
    setUploading(true);
    
    // Simulate file upload process
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
  };
  
  const handleAnalyze = () => {
    if (!uploadComplete) {
      setError("Please upload a file first.");
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Fire Door Inspection Report Portal
      </h1>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ marginBottom: '20px', color: '#444' }}>Upload Inspection Report</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div 
            onClick={() => document.getElementById('file-input').click()}
            style={{ 
              border: '2px dashed #ccc', 
              borderRadius: '4px', 
              padding: '30px', 
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: file ? '#e6f7e6' : '#fff'
            }}
          >
            <input 
              id="file-input" 
              type="file" 
              accept=".xlsx,.xls" 
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
            
            {file ? (
              <div>
                <p style={{ fontWeight: 'bold', color: '#4caf50' }}>Selected file: {file.name}</p>
              </div>
            ) : (
              <div>
                <p>Click to select or drag and drop your Excel file</p>
                <p style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>
                  Supports .xlsx and .xls formats
                </p>
              </div>
            )}
          </div>
        </div>
        
        {uploading && (
          <div style={{ marginBottom: '20px' }}>
            <p>Uploading file...</p>
            <div style={{ 
              height: '10px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '5px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                width: '60%', 
                height: '100%', 
                backgroundColor: '#2196f3',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
          </div>
        )}
        
        {uploadComplete && !analyzing && !analyzed && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e6f7e6', 
            border: '1px solid #c3e6cb', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#155724' }}>
              ✅ Upload complete! Click "Analyze Report" to continue.
            </p>
          </div>
        )}
        
        {analyzing && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            border: '1px solid #bbdefb', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#0d47a1' }}>
              ⏳ Analyzing report... This may take a moment.
            </p>
          </div>
        )}
        
        {analyzed && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e6f7e6', 
            border: '1px solid #c3e6cb', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#155724' }}>
              ✅ Analysis complete! Your report is ready.
            </p>
            <div style={{ marginTop: '20px' }}>
              <h3>Example Findings:</h3>
              <ul style={{ lineHeight: '1.6' }}>
                <li>Door count: 462 doors across all buildings</li>
                <li>5 doors missing from previous inspection</li>
                <li>3 doors with incorrect wall rating compliance</li>
                <li>8 instances of inconsistent location phrasing</li>
              </ul>
            </div>
          </div>
        )}
        
        {error && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#721c24' }}>
              ❌ Error: {error}
            </p>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            onClick={handleUpload} 
            disabled={!file || uploading || uploadComplete}
            style={{ 
              backgroundColor: !file || uploading || uploadComplete ? '#e0e0e0' : '#4a90e2', 
              color: !file || uploading || uploadComplete ? '#a0a0a0' : 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: !file || uploading || uploadComplete ? 'not-allowed' : 'pointer'
            }}
          >
            Upload
          </button>
          
          <button 
            onClick={handleAnalyze} 
            disabled={!uploadComplete || analyzing || analyzed}
            style={{ 
              backgroundColor: !uploadComplete || analyzing || analyzed ? '#e0e0e0' : '#4caf50', 
              color: !uploadComplete || analyzing || analyzed ? '#a0a0a0' : 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: !uploadComplete || analyzing || analyzed ? 'not-allowed' : 'pointer'
            }}
          >
            Analyze Report
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '15px', color: '#444' }}>FAQ</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <h3 style={{ color: '#555' }}>How do I locate a missing door from a previous year?</h3>
          <ol style={{ lineHeight: '1.5', color: '#666' }}>
            <li>Go to the previous year's report and download the LSP</li>
            <li>Open the Inspection Dashboard and navigate to the missing door ID</li>
            <li>Press "Change Pin Location" to review where the door is located</li>
            <li>Return to the current year's LSPs and determine if you have inspected this opening</li>
            <li>If you haven't inspected it yet, add a boomerang to return to it later</li>
            <li>If you have inspected it but with a new Door ID number, document the new number and explain the change in your teamwork update</li>
          </ol>
        </div>
        
        <div>
          <h3 style={{ color: '#555' }}>What wall rating rules are applied in the analysis?</h3>
          <ul style={{ lineHeight: '1.5', color: '#666' }}>
            <li>Smoke Barriers: 20-minute openings, no labels required</li>
            <li>1-Hour Smoke Barriers: 20-minute openings, no labels required</li>
            <li>Suite Boundaries: 20-minute openings, no labels required</li>
            <li>Hazardous Areas: 20-minute openings, no labels required</li>
            <li>Suite/Smoke Barriers: 20-minute openings, no labels required</li>
            <li>1-Hour Fire Smoke barriers: 45-minute or higher door and frame labels required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
