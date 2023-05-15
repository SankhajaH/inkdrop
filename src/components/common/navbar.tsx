import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {TfiWrite} from 'react-icons/tfi';

type Props = {};
const Navbar = ({}: Props) => {
    const [userId, setUserId] = useState('');
    const router = useRouter();
    const session = useSession();
    const [profileName, setProfileName] = useState('');
    useEffect(() => {
        setUserId(session?.data?.user?.id!);
        if (session?.data?.user?.name) {
            getProfileName(session?.data?.user?.name!);
        }
    }, [session]);

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

    const handleLogout = () => {
        signOut();
        router.push('/');
    };

    return (
        <div className='navbar bg-base-100'>
            <div className='flex-1'>
                <a className='btn btn-ghost normal-case text-xl' onClick={() => router.push('/')}>
                    InkDrop
                </a>
            </div>
            <div className='flex-none gap-2'>
                {session ? (
                    <div className='dropdown dropdown-end flex justify-around space-x-4'>
                        {session.data?.user?.name && (
                            <label
                                className='btn btn-circle'
                                onClick={() => router.push('/create-blog')}
                            >
                                <TfiWrite />
                            </label>
                        )}

                        {session?.data?.user?.name && (
                            <label tabIndex={0} className='btn btn-circle'>
                                <div className='w-10 rounded-full'>
                                    <p>{profileName}</p>
                                </div>
                            </label>
                        )}

                        <ul
                            tabIndex={0}
                            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
                        >
                            <li onClick={() => router.push(`/personal-blogs/${userId}`)}>
                                <a>My blogs</a>
                            </li>
                            <li onClick={() => handleLogout()}>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button className='btn btn-ghost btn-outline'>Sign In</button>
                )}
            </div>
        </div>
    );
};
export default Navbar;
