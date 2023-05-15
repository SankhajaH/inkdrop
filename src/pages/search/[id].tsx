import BlogCard from '@/components/common/blog-card';
import Container from '@/components/container';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

type Props = {};
const SearchPage = (props: Props) => {
    const url = process.env.BACKEND_API_URL;
    const router = useRouter();
    const {id} = router.query;
    const [blogs, setBlogs] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://inkdrop-sankhajah.onrender.com/blogs/search/${id}`)
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err);
            });
    }, [id]);
    if (loading)
        return (
            <Container className='flex-1'>
                <div className='text-5xl items-center'>
                    <button className='btn loading disabled:'>Loading</button>
                </div>
            </Container>
        );
    return (
        <Container page>
            <div className='mt-6'>
                {blogs && blogs.length > 0 ? (
                    <div className='grid grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-2 lg:grid lg:grid-cols-3 lg:gap-4'>
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
                            No blogs found with title or author: {id}
                        </p>
                    </div>
                )}
            </div>
        </Container>
    );
};
export default SearchPage;
