import PersonalBlogCard from '@/components/common/personal-blog-card';
import Container from '@/components/container';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

type Props = {};
const MyBlogs = (props: Props) => {
    const url = process.env.BACKEND_API_URL;
    const session = useSession();
    const router = useRouter();
    const userId = router.query.id;
    const [blogDetails, setBlogDetails] = useState<any>();

    useEffect(() => {
        axios.get(`https://inkdrop-sankhajah.onrender.com/blogs/user/${userId}`).then((res) => {
            setBlogDetails(res.data);
        });
    }, []);

    const handleDelete = async (blogId: string) => {
        await axios.delete(`https://inkdrop-sankhajah.onrender.com/blogs/${blogId}`).then((res) => {
            alert('Deleted successfully!');
            setBlogDetails(blogDetails.filter((blog: any) => blog._id !== blogId));
        });
    };
    if (session?.status === 'unauthenticated') {
        router.push('/signup');
    }
    return (
        <Container page>
            <p className='text-3xl font-semibold py-4 text-black'>Your blogs</p>
            <div className='mt-6'>
                {blogDetails && blogDetails.length > 0 ? (
                    <div className='grid grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-2 lg:grid lg:grid-cols-3 lg:gap-4'>
                        {blogDetails.map((blog: any) => {
                            const descriptionArray = blog.story.split(' ');
                            const shortDescriptionArray = descriptionArray.slice(0, 10);
                            const shortDescription = shortDescriptionArray.join(' ');
                            return (
                                <div key={blog._id}>
                                    <PersonalBlogCard
                                        blogId={blog._id}
                                        title={blog.title}
                                        description={shortDescription}
                                        onDelete={() => handleDelete(blog._id)}
                                        imageURL={blog.imageURL}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p className='font-semibold text-2xl'>No blogs yet. Let's write one.</p>
                    </div>
                )}
            </div>
        </Container>
    );
};
export default MyBlogs;
