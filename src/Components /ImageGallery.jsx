ImageGallery.jsx

export default function ImageGallery() {
  return (
    <div className="image-gallery flex flex-wrap gap-4 justify-center mt-8">
      <img src="/images/workout1.jpg" alt="Workout 1" className="w-52 h-40 object-cover rounded-lg" />
      <img src="/images/workout2.jpg" alt="Workout 2" className="w-52 h-40 object-cover rounded-lg" />
      <img src="/images/workout3.jpg" alt="Workout 3" className="w-52 h-40 object-cover rounded-lg" />
    </div>
  );
}
