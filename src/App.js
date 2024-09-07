import { useState, useEffect } from "react";

import Content1 from "./Content1";
import Content2 from "./Content2.js";

const tab = ['Content1', 'Content2']
const name = ['Danh sách bác sĩ', 'Danh sách các tỉnh thành']
function App() {
  const [type, setType] = useState('Content1')
  const [typeName, setTypeName] = useState('Trang 1')

  const renderContent = () => {
    if (type === 'Content1') {
      return <Content1 />;
    } else if (type === 'Content2') {
      return <Content2 />;
    }
    return null;
  };

  return (
    <div className="App">
      <br></br><br></br>
      <div>
        {
          tab.map((tab, index) =>(
            <button
              onClick={() => {
                setType(tab)
              }}
              key={index}
              style={tab === type ? { color: '#fff', backgroundColor: '#333'} : {}}
            >{name[index]}</button>
          ))
        }
        <div className="tab">
          {renderContent()}
        </div>
      </div>
    </div>
    
  );
}


export default App;
