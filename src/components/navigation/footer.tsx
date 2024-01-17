const Footer = () => {
  return (
    <footer
      className="mt-auto p-2 md:p-0 md:h-36 w-full grid grid-cols-2 md:grid-cols-4
    items-center flex-wrap border-t border-gray-950/10 gap-y-4 gap-x-2"
    >
      <div className="flex flex-col items-start justify-center pl-3">
        <h1 className="font-bold text-2xl text text-gray-950 select-none">
          ToDo<span className="text-indigo-400">I</span>
        </h1>
        <small className="mb-2 block text-xs">
          &copy; 2024 Ramil Gojayev. All rights reserved.
        </small>
      </div>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Redux Toolkit, Typescript, Tailwind CSS, ShadcnUI, Vite.
      </p>
    </footer>
  );
};

export default Footer;
