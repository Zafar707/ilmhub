import React from 'react';
function FAQItem({ question, answer }) {
  return (
    <div className="border-b py-4">
      <h3 className="text-lg font-semibold text-ilm-blue">{question}</h3>
      <p className="mt-2 text-gray-600">{answer}</p>
    </div>
  );
}

export default FAQItem;