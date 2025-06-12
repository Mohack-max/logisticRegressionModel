import React from 'react';
import PropTypes from 'prop-types';

const ResultDisplay = ({ result }) => {
  const isPhishing = result.status === 'phishing';
  
  return (
    <div className={`mt-8 p-6 rounded-lg border ${
      isPhishing 
        ? 'bg-red-50 border-red-300' 
        : 'bg-green-50 border-green-300'
    }`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
          isPhishing ? 'bg-red-100' : 'bg-green-100'
        }`}>
          {isPhishing ? (
            <svg className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        
        <div className="ml-4">
          <h3 className={`text-lg font-medium ${isPhishing ? 'text-red-800' : 'text-green-800'}`}>
            {isPhishing ? 'Potential Phishing Detected' : 'No Phishing Detected'}
          </h3>
          
          <div className="mt-2 text-sm">
            <p className={isPhishing ? 'text-red-700' : 'text-green-700'}>
              {isPhishing 
                ? 'This email contains characteristics commonly associated with phishing attempts.' 
                : 'This email appears to be legitimate based on our analysis.'}
            </p>
          </div>
          
          {isPhishing && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-red-800">Safety Tips:</h4>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                <li>Avoid clicking on suspicious links</li>
                <li>Do not provide sensitive information</li>
                <li>Verify the sender's identity through other channels</li>
                <li>Report the email to your IT department</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ResultDisplay.propTypes = {
  result: PropTypes.shape({
    status: PropTypes.string.isRequired
  }).isRequired
};

export default ResultDisplay;