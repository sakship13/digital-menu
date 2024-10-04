import React from 'react';
import Home from './Home';
import Admin from './Admin';
import Experiment from './Experiment';
import Category from './Category';
import Feedback from './Feedback';
import AddEvents from './AddEvents';

//import StudentList from './StudentList';

function Content({ selectedPage }) {
 
  const pages = {
    'Home': <Home />,
    'View Orders': <Admin />,
    'Add Events': <AddEvents/>,
    'Menu Category': <Category />,
    'Add Menu': <Experiment />,
	'Review': <Feedback />,
	'Sign Out': <Home />,
  };

  return <div className="header">{pages[selectedPage]}</div>;
}

export default Content;