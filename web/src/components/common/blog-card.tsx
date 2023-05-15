import axios from 'axios';
import {useEffect, useState} from 'react';

type Props = {
    title: string;
    description: string;
    userId: any;
    imageURL: string;
};
const BlogCard = ({title, description, userId, imageURL}: Props) => {
    const [userDetails, setUserDetails] = useState<any>();

    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/users/${userId}`).then((res) => {
            setUserDetails(res.data);
            getProfileName(res.data.name);
        });
    }, [userId]);

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
    console.log('🚀 ~ file: blog-card.tsx:12 ~ BlogCard ~ userDetails:', userDetails);
    return (
        <div>
            {userDetails && (
                <div className='card w-full bg-base-100 shadow-xl image-full h-48'>
                    {imageURL ? (
                        <figure>
                            <img src={imageURL} alt='cover_image' className='object-cover w-full' />
                        </figure>
                    ) : (
                        <div className='card w-80 md:w-96 bg-base-100 shadow-xl'></div>
                    )}

                    <div className='card-body'>
                        <h2 className='card-title'>{title}</h2>
                        <p>{description}.....</p>

                        <div className='flex flex-row space-x-2'>
                            <label className='btn btn-circle'>
                                <div className='w-10 rounded-full'>
                                    <p>{profileName}</p>
                                </div>
                            </label>
                            <div className='flex flex-col justify-center'>
                                <p className='text-sm text-gray-light flex items-center'>
                                    {userDetails.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default BlogCard;
