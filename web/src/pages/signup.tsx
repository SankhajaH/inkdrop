import Container from '@/components/container';
import axios from 'axios';
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

type Props = {};
const Signup = (props: Props) => {
    const router = useRouter();
    const session = useSession();
    console.log('🚀 ~ file: signup.tsx:18 ~ Signup ~ session:', session);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();
    const [authType, setAuthType] = useState('Login');
    const oppAuthType: {[key: string]: string} = {
        Login: 'Register',
        Register: 'Login',
    };

    const registerUser = async (args: {username: string; email: string; password: string}) => {
        const res = await axios
            .post('/api/register', {...args}, {headers: {'Content-Type': 'application/json'}})
            .then(async () => {
                await loginUser(args);
            })
            .catch((err) => {
                alert(err.request.response);
                console.log(err.request.response);
            });
        console.log('🚀 ~ file: signup.tsx:39 ~ registerUser ~ res:', res);
    };

    const loginUser = async (args: {email: string; password: string}) => {
        const res: any = await signIn('credentials', {
            email: args.email,
            password: args.password,
            redirect: false,
        });

        res.error ? console.log(res.error) : router.push('/create-blog');
    };

    const onSubmit = handleSubmit(async (data) => {
        if (authType === 'Register') {
            await registerUser(data);
        } else {
            await loginUser(data);
        }
    });

    return (
        <Container page>
            <form className='flex justify-center' onSubmit={onSubmit}>
                <div className='bg-base-200 mt-12 rounded-md w-fit'>
                    <div className='px-20'>
                        <div className='py-8 flex justify-center'>
                            <p className='font-semibold text-3xl'>{authType}</p>
                        </div>
                        <div className='flex flex-col items-center space-y-2 py-8'>
                            <p>
                                {authType === 'Login'
                                    ? 'Not registered yet? '
                                    : 'Already have an account? '}
                            </p>
                            <button
                                type='button'
                                onClick={() => setAuthType(oppAuthType[authType])}
                            >
                                {oppAuthType[authType]}
                            </button>
                            {authType === 'Register' ? (
                                <div className='flex flex-col items-center'>
                                    <label className='w-full max-w-3xl py-1 px-2 opacity-25'>
                                        Username
                                    </label>
                                    <input
                                        required
                                        type='text'
                                        placeholder='Username'
                                        className='input input-bordered w-full max-w-3xl py-6'
                                        {...register('username', {required: true})}
                                    />
                                    <label className='w-full max-w-3xl py-1 px-2 opacity-25'>
                                        Email
                                    </label>
                                    <input
                                        required
                                        type='text'
                                        placeholder='Email'
                                        className='input input-bordered w-full max-w-3xl py-6'
                                        {...register('email', {
                                            required: true,
                                            pattern:
                                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        })}
                                    />
                                    <label className='w-full max-w-3xl py-1 px-2 opacity-25'>
                                        Password
                                    </label>
                                    <input
                                        required
                                        type='password'
                                        placeholder='Password'
                                        className='input input-bordered w-full max-w-3xl py-6'
                                        {...register('password', {required: true})}
                                    />
                                </div>
                            ) : (
                                <div className='flex flex-col items-center'>
                                    <label className='w-full max-w-3xl py-1 px-2 opacity-25'>
                                        Email
                                    </label>
                                    <input
                                        required
                                        type='email'
                                        placeholder='Email'
                                        className='input input-bordered w-full max-w-3xl py-6'
                                        {...register('email', {
                                            required: true,
                                            pattern:
                                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        })}
                                    />
                                    <label className='w-full max-w-3xl py-1 px-2 opacity-25'>
                                        Password
                                    </label>
                                    <input
                                        required
                                        type='password'
                                        placeholder='Password'
                                        className='input input-bordered w-full max-w-3xl py-6'
                                        {...register('password', {required: true})}
                                    />
                                </div>
                            )}
                            <div className='py-4'>
                                <button className='btn btn-primary'>{authType}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
};
export default Signup;
