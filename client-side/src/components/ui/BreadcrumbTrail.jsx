import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null, user = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/': 'Home',
    '/login': 'Sign In',
    '/register': 'Register',
    '/admin-dashboard': 'Admin Dashboard',
    '/alumni-dashboard': 'Alumni Dashboard',
    '/student-dashboard': 'Student Dashboard',
    '/alumni-directory': 'Alumni Directory',
    '/profile': 'Profile',
    '/settings': 'Settings'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on auth pages or home page
  if (location?.pathname === '/' || location?.pathname === '/login' || location?.pathname === '/register') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-text-secondary" 
              />
            )}
            {crumb?.isLast ? (
              <span className="text-text-primary font-medium" aria-current="page">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="hover:text-primary transition-colors duration-200"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {/* Mobile Back Button */}
      <div className="ml-auto md:hidden">
        <button
          onClick={() => window.history?.back()}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back</span>
        </button>
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;