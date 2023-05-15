import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {AiFillEye, AiTwotoneDelete} from 'react-icons/ai';
import {MdOutlineEditNote} from 'react-icons/md';
type Props = {
    title: string;
    description: string;
    blogId: string;
    imageURL: string;
    onDelete: (blogId: string) => void;
};
const PersonalBlogCard = ({title, description, blogId, onDelete, imageURL}: Props) => {
    const url = process.env.BACKEND_API_URL;
    const session = useSession();
    const name = session?.data?.user?.name;
    const handleDelete = async () => {
        await axios.delete(`https://inkdrop-sankhajah.onrender.com/blogs/${blogId}`).then((res) => {
            onDelete(blogId);
        });
    };
    const router = useRouter();

    return (
        <div>
            <div className='card w-80 md:w-96 bg-base-100 shadow-xl image-full h-48'>
                {imageURL ? (
                    <figure>
                        <img src={imageURL} alt='cover_image' width={380} height={200} />
                    </figure>
                ) : (
                    <div className='card w-80 md:w-96 bg-base-100 shadow-xl'></div>
                )}
                <div className='card-body'>
                    <h2 className='card-title'>{title}</h2>
                    <p>{description}.....</p>
                    <div className='flex justify-between'>
                        <div className='flex flex-row space-x-3 items-center'>
                            <AiFillEye
                                className='text-3xl cursor-pointer'
                                onClick={() => router.push(`/blogs/${blogId}`)}
                            />
                            <MdOutlineEditNote
                                className='text-3xl cursor-pointer'
                                onClick={() => router.push(`/personal-single-blog/${blogId}`)}
                            />
                            <AiTwotoneDelete
                                className='text-2xl cursor-pointer'
                                onClick={() => handleDelete()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PersonalBlogCard;
