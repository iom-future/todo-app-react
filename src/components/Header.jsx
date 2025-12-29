import { useEffect,useState } from "react"
let userDate = new Date()
let monthArray =["january","february","march","april","may","june","july","august","september","october","november","december"]

function Header() {
    let [date,setDate]=useState({day:0,month:""})
    //on first mount get the user date
    useEffect(()=>{
        let day = userDate.getDate();
        let month = monthArray[userDate.getMonth()]
        setDate((currentDate)=>{
            return {...currentDate,day,month}
        })
    },[])
  return (
    <section className='min-h-[150px] p-5 bg-green-600 text-white flex flex-col justify-end gap-2'>
        <div>
            <h1 className="text-3xl mb-1">Hello,<span className="font-bold text-3xl">User</span></h1>
            <h3 className="text-gray-100 font-medium">{date.day}, {date.month}</h3>
        </div>
        <div>
            <p className="text-lg ">Plan Your Day Now!</p>
        </div>
    </section>
  )
}

export default Header