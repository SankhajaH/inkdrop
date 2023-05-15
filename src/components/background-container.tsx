import {PropsWithChildren} from 'react';

type Props = {};
const BackgroundContainer = (props: PropsWithChildren) => {
    return (
        <div className='relative w-full min-h-screen bg-slate-300'>
            <div className='fixed inset-0 z-10 flex flex-col w-full h-full backdrop-blur-[200px] overflow-y-auto'>
                {props.children}
            </div>
        </div>
    );
};
export default BackgroundContainer;
