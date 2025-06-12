import { useState } from 'react';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailText.trim()) {
      setError('Please enter some text before submitting.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailText }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to analyze email: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Phishing Email Detector
          </h1>
          <p className="text-lg text-gray-600">
            Draft your email below and analyze it to check if it might be flagged as phishing
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label 
                  htmlFor="email-content" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Content
                </label>
                <textarea
                  id="email-content"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-64 transition duration-150"
                  placeholder="Type or paste your email content here..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-md text-white font-medium transition duration-150 
                    ${isLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                >
                  {isLoading ? 'Analyzing...' : 'Check for Phishing'}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {result && <ResultDisplay result={result} />}
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This tool uses machine learning to analyze email content for potential phishing indicators.</p>
          <p className="mt-2">Note: Always use your judgment when assessing suspicious emails.</p>
        </div>
      </div>
    </div>
  );
}

export default App;