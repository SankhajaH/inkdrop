import Container from '@/components/container';
import {app} from '@/configs/firebase';
import axios from 'axios';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import 'quill/dist/quill.snow.css';
import {useForm} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
type Props = {};
const CreateBlog = (props: Props) => {
    const url = process.env.BACKEND_API_URL;
    const session = useSession();
    const userId = session?.data?.user?.id;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data: any) => {
        const storage = getStorage(app);
        const imageRef = ref(storage, `images/${uuidv4()}`);
        const uploadTask = await uploadBytes(imageRef, data.image[0]);

        const downloadURL = await getDownloadURL(uploadTask.ref);
        if (data.image[0]) {
            const blogDetails = {
                title: data.title,
                story: data.story,
                userId: userId,
                name: session?.data?.user?.name,
                imageURL: downloadURL,
            };
            await axios
                .post(`https://inkdrop-sankhajah.onrender.com/blogs`, blogDetails)
                .then((res) => {
                    alert('Blog created successfully');
                });
        } else {
            const blogDetails = {
                title: data.title,
                story: data.story,
                name: session?.data?.user?.name,
                userId: userId,
            };
            await axios
                .post(`https://inkdrop-sankhajah.onrender.com/blogs`, blogDetails)
                .then((res) => {
                    alert('Blog created successfully');
                });
        }
        reset();
        router.push(`/personal-blogs/${userId}`);
    };

    if (session?.status === 'unauthenticated') {
        router.push('/signup');
    }

    return (
        <Container page>
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
                        <label className='md:w-full max-w-3xl opacity-25'>Select an image.</label>
                        <div className='flex flex-col items-center space-y-4 md:flex md:justify-between w-full max-w-3xl'>
                            <input
                                type='file'
                                className='input input-bordered w-72 md:w-2/5 py-2'
                                {...register('image')}
                                accept='image/*'
                            />

                            <button className='btn btn-primary md:w-2/5'>Publish</button>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
};
export default CreateBlog;
