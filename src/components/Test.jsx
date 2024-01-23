import {React,useState} from 'react'

function Test() {


    const [activeElement, setActiveElement] = useState(null);

    const handleElementClick = (elementId) => {
      setActiveElement(elementId);

      console.log(elementId);
    };


    const ClickableElement = ({ id, onClick, isActive }) => {
        const containerStyle = {
          backgroundColor: isActive ? 'lightblue' : 'white',
          padding: '20px',
          cursor: 'pointer',
          marginBottom: '10px',
        };
      
        return (
          <div style={containerStyle} onClick={() => onClick(id)}>
            <h1>{`Element ${id}`}</h1>
          </div>
        );
      };




  return (
    <div>
      {[1, 2, 3,4].map((id) => (
        <ClickableElement
          key={id}
          id={id}
          onClick={handleElementClick}
          isActive={activeElement === id}
        />
      ))}
    </div>
  )
}

export default Test
