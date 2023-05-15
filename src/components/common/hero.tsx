import {useRouter} from 'next/router';

type Props = {};
const Hero = (props: Props) => {
    const router = useRouter();
    return (
        <div className='hero min-h-screen bg-base-200'>
            <div className='hero-content text-center'>
                <div className='max-w-md'>
                    <h1 className='text-6xl md:text-9xl font-bold'>InkDrop</h1>
                    <p className='text-2xl py-6 md:text-3xl'>
                        Where words flow like ink and stories come to life.
                    </p>
                    <button
                        className='mt-12 btn md:btn-lg btn-primary'
                        onClick={() => router.push('/signup')}
                    >
                        Write your story.
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Hero;
