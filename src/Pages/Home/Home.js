import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
    const [time, setTime] = useState([]);
    const [tHours, setTHours] = useState([]);
    const [tMinutes, setTMinutes] = useState([]);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        setTime([...time, data]);
        setTHours([...tHours, data.hours]);
        setTMinutes([...tMinutes, data.minutes]);
        reset();
    }
    console.log(tMinutes.reduce((a, b) => parseInt(a) + parseInt(b), 0));
    return (
        <div className={`grid ${time.length > 0 && 'grid-cols-3'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className=' grid gap-5'>
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
                    <input type="text" {
                        ...register("hours", {
                            required: true,
                            pattern: /^[0-9]*$/
                        })} placeholder="Enter hours here" className="input input-bordered w-full" />

                    {errors.hours?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter hours</span>
                        </label>}
                    {errors.hours?.type === 'pattern' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a valid number!</span>
                        </label>}
                </div>
                {/* minutes input */}
                <div className="form-control w-full max-w-xs mx-auto">
                    <label htmlFor="minutes" className="label">Minutes</label>
                    <input type="text" {
                        ...register("minutes", {
                            required: true,
                            pattern: /^[0-9]*$/
                        })} placeholder="Enter minutes here" className="input input-bordered w-full" />

                    {errors.minutes?.type === 'required' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a minutes</span>
                        </label>}
                    {errors.minutes?.type === 'pattern' &&
                        <label className="label">
                            <span className="label-text-alt text-red-500">Please enter a valid number!</span>
                        </label>}
                </div>

                <button className='btn w-full max-w-xs mx-auto'>Submit</button>
            </form>
            {
                time.length > 0 && <div className='text-center'>
                    {/* show times */}
                    {time.map((t, index) =>
                        <div key={index}>
                            <h3 className='text-xl mt-5'> {index + 1}. {t.title} - {t.hours}<small>hours</small>, {t.minutes}<small>minutes</small></h3>
                        </div>)
                    }
                    <button className='btn mt-5 hover:bg-red-600' onClick={() => setTime([])}>Clear all data</button>
                </div>}
            <div className='text-center'>
                {
                    time.length > 0 && <div>
                        <h1 className='text-2xl font-bold'>Total time</h1>
                        <h3 className='text-xl '><span className='text-teal-600 font-bold'>{Math.floor((tHours.reduce((a, b) => parseInt(a) + parseInt(b), 0) + (tMinutes.reduce((a, b) => parseInt(a) + parseInt(b), 0) / 60)))}</span>h</h3>
                        <h3 className='text-xl '><span className='text-teal-600 font-bold'> {tMinutes.reduce((a, b) => parseInt(a) + parseInt(b), 0) % 60}</span>min</h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;