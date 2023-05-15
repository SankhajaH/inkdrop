import Container from '@/components/container';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

type Props = {};
const PersonalSingleBlog = (props: Props) => {
    const session = useSession();
    const router = useRouter();
    const blogId = router.query.id;

    const [preloadedValues, setPreloadedValues] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5001/blogs/${blogId}`).then((res) => {
            setPreloadedValues({title: res.data.title, story: res.data.story});
        });
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        reset(preloadedValues);
    }, [preloadedValues]);

    const onSubmit = async (data: any) => {
        const blogDetails = {title: data.title, story: data.story};
        await axios.patch(`http://localhost:5001/blogs/${blogId}`, blogDetails).then((res) => {
            alert('Blog updated successfully');
        });
        reset();
        router.replace(`/personal-blogs/645f2fccff84e16fcef67c33`);
    };
    if (session?.status === 'unauthenticated') {
        router.push('/signup');
    }

    return (
        <Container page>
            {preloadedValues && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='bg-base-200 mt-12 rounded-md'>
                        <div className='flex justify-center py-8'>
                            <p className='font-semibold text-3xl'>Write your story here.</p>
                        </div>
                        <div className='flex flex-col items-center space-y-6 py-8'>
                            <label className='md:w-full max-w-3xl py-3 px-2 opacity-25'>
                                What will be the title of your story?
                            </label>
                            <input
                                required
                                type='text'
                                placeholder='Title'
                                className='input input-bordered w-72 md:w-full max-w-3xl py-6'
                                {...register('title', {required: true})}
                            />
                            <label className='md:w-full max-w-3xl py-3 px-2 opacity-25'>
                                Write your story below.
                            </label>
                            <textarea
                                required
                                className='textarea textarea-bordered w-72 md:w-full max-w-3xl h-screen'
                                {...register('story', {required: true})}
                            ></textarea>

                            <div className='flex justify-center md:flex md:justify-end w-full max-w-3xl'>
                                <button className='btn btn-primary w-2/5'>Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Container>
    );
};
export default PersonalSingleBlog;
