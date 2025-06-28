function TestimonialCard({ testimonial }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center">
      <p className="text-gray-700 italic">"{testimonial.text}"</p>
      <p className="mt-2 font-semibold text-ilm-blue">{testimonial.name}</p>
    </div>
  );
}

export default TestimonialCard;