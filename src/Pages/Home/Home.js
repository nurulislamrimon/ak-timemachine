import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
    const [time, setTime] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tHours, setTHours] = useState([]);
    const [tMinutes, setTMinutes] = useState([]);
    const [payment, setPayment] = useState(0);
    const hourlyRate = useRef(0);
    const totalHours = useRef(0);
    const totalMinutes = useRef(0);
    // form hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        setTime([...time, data]);
        setTHours([...tHours, data.hours]);
        setTMinutes([...tMinutes, data.minutes]);
        const isAlreadyInProject = projects.find(p => p === data.projectName)
        if (isAlreadyInProject) {
            setProjects([...projects])
        } else { setProjects([...projects, data.projectName]) }
        reset();
        setPayment(0)
        hourlyRate.current.value = 0;
    }
    const totalPayment = e => {
        setPayment(isNaN((parseInt(totalHours.current.innerText) * parseFloat(hourlyRate.current.value)) + (parseFloat(hourlyRate.current.value) / 60) * parseInt(totalMinutes.current.innerText)) ? 0 : (parseInt(totalHours.current.innerText) * parseFloat(hourlyRate.current.value)) + (parseFloat(hourlyRate.current.value) / 60) * parseInt(totalMinutes.current.innerText))
    }
    const clearAll = () => {
        const confirm = window.confirm('Are you sure want to reset all data?');
        if (confirm) {
            setTime([]);
            setTHours([]);
            setTMinutes([]);
            setProjects([]);
        }
    }

    return (
        <div className={`grid ${time.length > 0 && 'grid-cols-3'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className=' grid gap-5'>
                {/* project name input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="projectName" className="label">Project Name</label>
                    <input type="text" {
                        ...register("projectName", {
                            required: true

                        })} placeholder="Enter projectName here" className="input input-bordered w-full" />

                    {errors.projectName?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a project name</span>
                        </label>}
                </div>
                {/* title input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="title" className="label">Title</label>
                    <input type="text" {
                        ...register("title", {
                            required: true

                        })} placeholder="Enter title here" className="input input-bordered w-full" />

                    {errors.title?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a title</span>
                        </label>}
                </div>
                {/* hours input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="hours" className="label">Hours</label>
                    <input type="number" {
                        ...register("hours", {
                            required: true
                        })} placeholder="Enter hours here" className="input input-bordered w-full" />

                    {errors.hours?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter hours</span>
                        </label>}
                </div>
                {/* minutes input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="minutes" className="label">Minutes</label>
                    <input type="number" {
                        ...register("minutes", {
                            required: true
                        })} placeholder="Enter minutes here" className="input input-bordered w-full" />

                    {errors.minutes?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a minutes</span>
                        </label>}
                </div>

                <button className='btn w-full max-w-xs mx-auto'>Submit</button>
            </form>
            {
                time.length > 0 && <div className='text-center'>
                    {/* show times */}
                    {projects?.map((p, index) => <div key={index}>
                        <h1 className='text-2xl mt-5'>Project: {p}</h1>
                        {time.map((t, index) =>
                            t.projectName === p &&
                            <div key={index}>
                                <h3 className='text-xl mt-2'> {index + 1}. {t.title} - {t.hours}<small>hours</small>, {t.minutes}<small>minutes</small></h3>
                            </div>)
                        }
                    </div>)}

                    <button className='btn mt-5 hover:bg-red-600' onClick={clearAll}>Clear all data</button>
                </div>}
            <div className='text-center'>
                {
                    time.length > 0 &&
                    <div>
                        <h1 className='text-2xl font-bold'>Total time</h1>
                        <h3 className='text-xl '><span ref={totalHours} className='text-teal-600 font-bold'>{Math.floor((tHours.reduce((a, b) => parseInt(a) + parseInt(b), 0) + (tMinutes.reduce((a, b) => parseInt(a) + parseInt(b), 0) / 60)))}</span>h</h3>
                        <h3 className='text-xl '><span ref={totalMinutes} className='text-teal-600 font-bold'> {tMinutes.reduce((a, b) => parseInt(a) + parseInt(b), 0) % 60}</span>min</h3>

                        {/* hourlyRate input */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label htmlFor="hourlyRate" className="label">Payment of an hour</label>
                            <input onChange={totalPayment} ref={hourlyRate} type="number" placeholder="Enter hourly rate here" className="input input-bordered w-full" />
                        </div>
                        <h1 className='text-3xl'>Your total payment: ${payment?.toFixed(2)}</h1>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;