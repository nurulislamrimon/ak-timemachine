import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [projectsNames, setProjectsNames] = useState([]);
    const [payment, setPayment] = useState(0);
    // const prNameInput = useRef('');
    const hourlyRate = useRef(0);
    const totalHours = useRef(0);
    const totalMinutes = useRef(0);
    // form hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    // const handleProjectName = e => {
    //     prNameInput.current.value = e?.target?.value;
    // }

    const onSubmit = (data) => {
        data.id = projects.length;

        if (!data.projectName) {
            data.projectName = 'No Name';
        }
        if (!data.title) {
            data.title = 'Untitled';
        }
        setProjects([...projects, data]);
        const isAlreadyInProject = projectsNames.find(p => p === data.projectName)
        if (isAlreadyInProject) {
            setProjectsNames([...projectsNames])
        } else {
            setProjectsNames([...projectsNames, data.projectName])
        }
        reset();
        setPayment(0);
        hourlyRate.current.value = '';
    }

    const totalPayment = e => {
        setPayment(isNaN((parseInt(totalHours.current.innerText) * parseFloat(hourlyRate.current.value)) + (parseFloat(hourlyRate.current.value) / 60) * parseInt(totalMinutes.current.innerText)) ? 0 : (parseInt(totalHours.current.innerText) * parseFloat(hourlyRate.current.value)) + (parseFloat(hourlyRate.current.value) / 60) * parseInt(totalMinutes.current.innerText))
    }
    const clearAll = () => {
        const confirm = window.confirm('Are you sure want to reset all data?');
        if (confirm) {
            setProjects([]);
            setProjectsNames([]);
        }
    }
    const handleDeleteItem = id => {
        const index = projects.indexOf(id);
        const { projectName, title, hours, minutes } = projects[index];
        const confirm = window.confirm(`Are you sure want to delete ${title}-${hours}hours, ${minutes}minutes of Project:${projectName}`)
        if (confirm) {
            const removedItem = projects.splice(index, 1);
            setProjects([...projects]);
            const isProjectExist = projects.find(p => p.projectName === removedItem[0].projectName);
            if (!isProjectExist) {
                const pNIndex = projectsNames.indexOf(removedItem[0].projectName);
                projectsNames.splice(pNIndex, 1);
                setProjectsNames([...projectsNames]);

            }
            setPayment(0);
            hourlyRate.current.value = '';
        }
    }

    return (
        <div className={`grid ${projects.length > 0 && 'lg:grid-cols-3'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className=' grid gap-5'>
                {/* project name input */}
                <div className="form-control w-full max-w-xs mx-auto flex justify-center ">
                    <label htmlFor="projectName" className="label">Project Name</label>
                    <div className='flex border rounded-lg'>
                        <input type="text" {
                            ...register("projectName", {
                                // required: true

                            })} placeholder="Enter project name here" className="input w-full" />
                    </div>

                    {errors.projectName?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a project name</span>
                        </label>}

                    {/* <select onChange={handleProjectName} name="projectOption" id="">
                        <option>Select an option</option>
                        {projectsNames.map((p, index) =>
                            <option key={index} value={p}>{p}</option>
                        )}
                    </select> */}

                </div>
                {/* title input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="title" className="label">Title</label>
                    <input type="text" {
                        ...register("title", {
                            // required: true

                        })} placeholder="Enter title here" className="input input-bordered w-full" />

                    {errors.title?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a title</span>
                        </label>}
                </div>
                {/* hours input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="hours" className="label justify-start">Hours <span className='text-red-600'>*</span></label>
                    <input type="number" autoComplete='off' {
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
                    <label htmlFor="minutes" className="label justify-start">Minutes <span className='text-red-600'>*</span></label>
                    <input type="number" autoComplete='off' {
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
                projects.length > 0 && <div>
                    {/* show statement */}
                    {projectsNames?.map((p, index) => <div key={index}>
                        <div className='text-2xl mt-5 flex justify-between border-b-2 p-2'> <span className='text-teal-600 font-semibold '>{p} </span>
                            {/* hours calculation for each project */}
                            <div>
                                (<span className='text-teal-600'>{

                                    Math.floor((projects.filter(t => t.projectName === p).reduce((a, b) => a + parseInt(b.hours), 0) + (projects.filter(t => t.projectName === p).reduce((a, b) => a + parseInt(b.minutes), 0) / 60)))

                                }
                                    {/* minutes calculation for each project */}
                                </span>h <span className='text-teal-600'>{

                                    Math.floor((projects.filter(t => t.projectName === p).reduce((a, b) => a + parseInt(b.minutes), 0) % 60))

                                }</span>min)
                            </div>
                        </div>

                        {projects.map((t, index) =>
                            (t.projectName === p) &&
                            <div key={index}>

                                <div className="overflow-x-auto text-xl">
                                    <table className="table table-zebra w-full">
                                        <tbody>
                                            {/* <!-- row 1 --> */}
                                            <tr className='grid grid-cols-3 w-full'>
                                                <td title={t.title}>{t.title.length > 10 ? t.title.slice(0, 20).concat('...') : t.title}</td>
                                                <td className='text-center'>{t.hours}<small>hours</small>, {t.minutes}<small>minutes</small></td>
                                                <td className='text-center'><span onClick={() => handleDeleteItem(projects.find(p => p.id === t.id))} className='material-icons hover:text-red-600 cursor-pointer'>delete</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>)
                        }
                    </div>)}

                    <button className='btn mx-auto block mt-5 hover:bg-red-600' onClick={clearAll}>Clear all data</button>
                </div>}
            <div>
                {
                    projects.length > 0 &&
                    <div>
                        <h1 className='text-2xl text-center font-bold'>Grand Total</h1>
                        <h3 className='text-xl text-center'>Project <span className='text-teal-600 font-bold'>{projectsNames.length}</span>,worked for <span className='text-teal-600 font-bold'>{projects.length}</span> times!</h3>
                        <div className="text-center text-4xl"> <span ref={totalHours} className='text-teal-600 font-bold'> {
                            // total hours calculation
                            Math.floor((projects.reduce((a, b) => a + parseInt(b.hours), 0) + (projects.reduce((a, b) => a + parseInt(b.minutes), 0) / 60)))
                        }</span>h
                            <span ref={totalMinutes} className='text-teal-600 font-bold'> {
                                projects.reduce((a, b) => a + parseInt(b.minutes), 0) % 60}</span>min</div>

                        {/* hourlyRate input */}
                        <div className="form-control w-full max-w-xs mx-auto mt-5 lg:mt-16">
                            <label htmlFor="hourlyRate" className="label">Payment for an hour</label>
                            <input onChange={totalPayment} ref={hourlyRate} type="number" autoFocus placeholder="Enter hourly rate here" className="input input-bordered w-full" />
                        </div>
                        <h1 className='text-3xl text-center'>Your total payment: ${payment?.toFixed(2)}</h1>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;