import BlogCard from '@/components/common/blog-card';
import Hero from '@/components/common/hero';
import Container from '@/components/container';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {Inter} from 'next/font/google';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

const inter = Inter({subsets: ['latin']});

export default function Home() {
    const session = useSession();
    const [blogs, setBlogs] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    console.log('🚀 ~ file: signup.tsx:18 ~ Signup ~ session:', session);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data: any) => {
        router.push(`/search/${data.title}`);
    };

    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5001/blogs')
            .then((res) => {
                console.log('🚀 ~ file: index.tsx:17 ~ .then ~ res:', res.data);
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log('🚀 ~ file: index.tsx:21 ~ useEffect ~ err:', err);
            });
    }, []);
    if (loading)
        return (
            <Container className='flex-1'>
                <div className='text-5xl flex justify-center'>
                    <button className='btn loading'>Loading</button>
                </div>
            </Container>
        );
    return (
        <>
            {!session.data && <Hero />}

            <Container page>
                <form onSubmit={handleSubmit(onSubmit)} className='my-8 flex flex-row space-x-2'>
                    <input
                        type='text'
                        placeholder='Type a blog title.'
                        className='input input-bordered w-full max-w-xs'
                        {...register('title', {required: true})}
                    />
                    <button className='btn btn-primary'>Search</button>
                </form>

                <div className='mt-6'>
                    {blogs && blogs.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                            {blogs.map((blog: any) => {
                                const descriptionArray = blog.story.split(' ');
                                const shortDescriptionArray = descriptionArray.slice(0, 10);
                                const shortDescription = shortDescriptionArray.join(' ');
                                return (
                                    <div
                                        key={blog._id}
                                        onClick={() => router.push(`/blogs/${blog._id}`)}
                                        className='cursor-pointer'
                                    >
                                        <BlogCard
                                            title={blog.title}
                                            description={shortDescription}
                                            userId={blog.userId}
                                            imageURL={blog.imageURL}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div>
                            <p className='font-semibold text-2xl'>
                                No blogs yet. Let&apos;s write one.
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}
