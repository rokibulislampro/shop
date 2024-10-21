import { FaLock } from 'react-icons/fa';

const NotAvailable = () => {
  return (
    <section className="min-h-screen flex justify-center items-center p-[1rem">
      <div className="flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-xl sm:text-2xl font-bold my-4 text-indigo-500">
          Service Currently Not Available!
        </h2>
        <p className="font-semibold text-sm mb-7">
          Unfortunately, this service is not available at the moment. We
          appreciate your understanding and look forward to serving you soon.
        </p>
        <button className="w-fit flex items-center gap-2 text-[#ff5a00] hover:text-white font-semibold px-8 py-2 border border-[#ff5a00] hover:bg-[#ff5a00] transition-all rounded-full text-sm">
          <FaLock /> Explore Other Services
        </button>
      </div>
    </section>
  );
};

export default NotAvailable;
