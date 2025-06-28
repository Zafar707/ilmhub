import React from 'react';
function CourseCard({ course }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-semibold text-ilm-blue">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
    </div>
  );
}

export default CourseCard;