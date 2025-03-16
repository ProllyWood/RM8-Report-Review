export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Fire Door Inspection Report Portal</h1>
      
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2>Upload Inspection Report</h2>
        <p>This is a simple version of the tool to verify deployment works.</p>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            style={{ 
              backgroundColor: '#4a90e2', 
              color: 'white', 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  );
}
