import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="p-4 bg-red-200 text-red-800 rounded-md">
    {message}
  </div>
);

export default ErrorMessage;
