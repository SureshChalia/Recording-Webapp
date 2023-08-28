import React,{useState} from "react";
import RecordView from "../components/RecordView";

const Recodingpage = () => {
  const [recordView,setRecordView] = useState(false);

  const [permission,setPermission] = useState({
    video:false,
    screen:false,
    audio:false
  })

  function handleOnchange(e){
     setPermission({...permission,[e.target.name]:e.target.checked})
  }

  function onSubmitHandler(e){
    e.preventDefault();
    setRecordView(true);
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen">
     {recordView ? <RecordView permission={permission} />: <form className="grid gap-3" onSubmit={onSubmitHandler}>
       <h2 className="text-xl font-semibold underline-offset-4 underline decoration-green-500 decoration-4">Permissions</h2>
        <div className="flex gap-2">
          <input type="checkbox" name="video" id="video" onChange={handleOnchange} />
          <label htmlFor="video" className="" >Record Video</label>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="screen" id="screen" onChange={handleOnchange} />
          <label htmlFor="screen">Record Screen</label>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="audio" id="audio" onChange={handleOnchange} />
          <label htmlFor="audio">Record Audio</label>
        </div>
        <button className="bg-black font-bold text-white w-full rounded-lgPlus py-1" >submit</button>
      </form> 
      }
    </div>
  );
};
export default Recodingpage;
