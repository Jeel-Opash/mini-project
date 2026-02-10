
export const Footer = ({ isSidebarOpen }) => {
  const currentYear = new Date().getFullYear();

  const sidebarWidthClass = isSidebarOpen ? 'sm:pl-64' : 'sm:pl-0';

  return (
    <footer className={`bg-white shadow-inner border-t border-gray-200 p-4 mt-auto w-full transition-all duration-300 ${sidebarWidthClass}`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-2 sm:mb-0">
          &copy; {currentYear} <strong>YourCompany Admin</strong>. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-600">Support</a>
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
};
