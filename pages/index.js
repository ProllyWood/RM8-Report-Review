import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadComplete(false);
    setAnalyzed(false);
    setResults(null);
    setError(null);
  };
  
  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    
    // Reset states
    setError(null);
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
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
      
      // Sample results data
      setResults({
        totalDoors: 462,
        missingDoors: [
          { doorId: "0012", building: "Founders", floor: "4", location: "Stairwell Exit" },
          { doorId: "0029", building: "Founders", floor: "4", location: "Cross corridor near Room 418" }
        ],
        ratingIssues: [
          { doorId: "0087", issue: "Door is insufficiently rated for wall rating" }
        ],
        phrasingIssues: 3
      });
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Fire Door Inspection Report Tool</title>
        <meta name="description" content="Upload and analyze fire door inspection reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8 text-center">Fire Door Inspection Report Portal</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-4 border-b">
            <h2 className="text-xl font-semibold">Upload Inspection Report</h2>
            <p className="text-gray-600">Upload your Excel inspection report for automatic analysis</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="report-file" className="block mb-2 font-medium">Select Inspection Report (Excel Format)</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'}`}
                    onClick={() => document.getElementById('report-file').click()}
                  >
                    <input 
                      type="file" 
                      id="report-file" 
                      className="hidden" 
                      accept=".xlsx,.xls" 
                      onChange={handleFileChange} 
                    />
                    
                    {file ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium">{file.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600">Click to select or drag and drop your Excel file</p>
                        <p className="text-xs text-gray-500 mt-1">Supports .xlsx and .xls formats</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={handleUpload} 
                  disabled={!file || uploading || uploadComplete}
                  className={`px-4 py-2 rounded font-medium ${!file || uploading || uploadComplete ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Upload
                </button>
              </div>
            </div>
            
            {uploading && (
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uploading file...</span>
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
            
            {uploadComplete && !analyzing && !analyzed && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Upload Complete</p>
                  <p className="text-sm text-gray-600">Your file has been uploaded successfully. Click "Analyze Report" to continue.</p>
                </div>
              </div>
            )}
            
            {analyzing && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Analyzing Report</p>
                  <p className="text-sm text-gray-600">Please wait while we process your report. This may take a few moments...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm text-gray-600">{error}</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                onClick={handleAnalyze} 
                disabled={!uploadComplete || analyzing || analyzed}
                className={`px-6 py-2 rounded font-medium ${!uploadComplete || analyzing || analyzed ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              >
                Analyze Report
              </button>
            </div>
          </div>
        </div>
        
        {analyzed && results && (
          <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-50 p-4 border-b">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <p className="text-gray-600">Findings from your inspection report</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Total Doors</p>
                  <p className="text-2xl font-bold">{results.totalDoors}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Missing Doors</p>
                  <p className="text-2xl font-bold">{results.missingDoors.length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Rating Issues</p>
                  <p className="text-2xl font-bold">{results.ratingIssues.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Phrasing Issues</p>
                  <p className="text-2xl font-bold">{results.phrasingIssues}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Missing Doors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border px-4 py-2 text-left">Door ID</th>
                        <th className="border px-4 py-2 text-left">Building</th>
                        <th className="border px-4 py-2 text-left">Floor</th>
                        <th className="border px-4 py-2 text-left">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.missingDoors.map((door, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{door.doorId}</td>
                          <td className="border px-4 py-2">{door.building}</td>
                          <td className="border px-4 py-2">{door.floor}</td>
                          <td className="border px-4 py-2">{door.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Rating Issues</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border px-4 py-2 text-left">Door ID</th>
                        <th className="border px-4 py-2 text-left">Issue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.ratingIssues.map((issue, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{issue.doorId}</td>
                          <td className="border px-4 py-2">{issue.issue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">For detailed analysis, please contact your administrator.</p>
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h2 className="font-semibold mb-2">How to locate a missing door from a previous year</h2>
          <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-600">
            <li>Go to the previous year's report and download the LSP</li>
            <li>Open the Inspection Dashboard and navigate to the missing door ID</li>
            <li>Press "Change Pin Location" to review where the door is located</li>
            <li>Return to the current year's LSPs and determine if you have inspected this opening</li>
            <li>If you haven't inspected it yet, add a boomerang to return to it later</li>
            <li>If you have inspected it but with a new Door ID number, document the new number and explain the change in your teamwork update</li>
          </ol>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Fire Door Inspection Tool - For internal use only</p>
      </footer>
    </div>
  );
}
