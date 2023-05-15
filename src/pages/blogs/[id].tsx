import Container from '@/components/container';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

type Props = {};
const Blog = (props: Props) => {
    const url = process.env.BACKEND_API_URL;
    const router = useRouter();
    const {id} = router.query;
    const [blogDetails, setBlogDetails] = useState<any>();
    const session = useSession();

    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        axios
            .get(`https://inkdrop-sankhajah.onrender.com/blogs/${id}`)
            .then((res) => {
                setBlogDetails(res.data);
                getProfileName(res.data.name);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const getProfileName = (name: string) => {
        const words = name?.split(' ');
        if (words.length === 1) {
            const letter = words[0][0].toUpperCase();
            setProfileName(letter);
        } else {
            const letter = words.map((word) => word[0].toUpperCase()).join('');
            setProfileName(letter);
        }
    };

    // if (session?.status === 'unauthenticated') {
    //     router.push('/signup');
    // }

    return (
        <Container page>
            {blogDetails && (
                <div>
                    {blogDetails.imageURL && (
                        <img
                            src={blogDetails.imageURL}
                            alt='cover_image'
                            className='w-full h-96 object-cover'
                        />
                    )}

                    <div className='text-4xl font-semibold text-black py-12'>
                        {blogDetails.title}
                    </div>
                    <div className='flex flex-row space-x-2 py-4'>
                        <label className='btn btn-circle'>
                            <div className='w-10 rounded-full'>
                                <p>{profileName}</p>
                            </div>
                        </label>
                        <p className='text-black flex items-center'>{blogDetails.name}</p>
                    </div>

                    <div className='text-xl  text-black'>{blogDetails.story}</div>
                </div>
            )}
        </Container>
    );
};
export default Blog;
