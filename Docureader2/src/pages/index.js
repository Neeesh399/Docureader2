import React from 'react';
//import {FiPlusCircle} from 'react-icons/fi';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

//import Header from '../components/header';
import BusinessLogic from '../components/businessLogic';

function Index() {
  
    return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <BusinessLogic />
      </div>
    </DndProvider>
  );
}

export default Index;
