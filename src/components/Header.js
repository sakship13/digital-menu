import React from 'react';
import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    // Find and remove the global index.css link tag if it exists
    const globalStyleLink = document.querySelector('link[href*="index.css"]');
    if (globalStyleLink) {
      globalStyleLink.disabled = true;  // Disable it or remove
      // document.head.removeChild(globalStyleLink);
    }

    // Load the component-specific CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${process.env.PUBLIC_URL}/css/templatemo_main.css`;
    document.head.appendChild(link);
    console.log("Component-specific CSS loaded");
    // Cleanup: Re-enable the global stylesheet and remove the specific one
    return () => {
      if (globalStyleLink) {
        globalStyleLink.disabled = false;  // Re-enable the global CSS
        // document.head.appendChild(globalStyleLink); // Re-add if removed
      }
      document.head.removeChild(link);
    };
  }, []);
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = `${process.env.PUBLIC_URL}/css/templatemo_main.css`;
  //   link.onload = () => console.log('CSS loaded');
  //   link.onerror = () => console.log('CSS failed to load');
  //   document.head.appendChild(link);
   
    
      
  //     const scriptJQuery = document.createElement('script');
  //     scriptJQuery.src = `${process.env.PUBLIC_URL}/js/Chart.min.js`;
  //     scriptJQuery.async = true;
  //     document.body.appendChild(scriptJQuery);
    
   
  //     const scriptBootstrap = document.createElement('script');
  //     scriptBootstrap.src = `${process.env.PUBLIC_URL}/js/bootstrap.min.js`;
  //     scriptBootstrap.async = true;
  //     document.body.appendChild(scriptBootstrap);
    
      
  //     return () => {
  //       document.head.removeChild(link);
  //       document.body.removeChild(scriptJQuery);
  //       document.body.removeChild(scriptBootstrap);
  //     };
  //   }, []);
    


  return (
    <>
    <div className="navbar navbar-inverse" role="navigation">
      <div className="navbar-header">
        <div className="logo">
          <h1>Experiment App</h1>
        </div>
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
    </div>
   
    </>
  );
}

export default Header;

