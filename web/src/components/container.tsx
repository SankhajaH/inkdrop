import {cx} from 'class-variance-authority';
import {ElementType, PropsWithChildren} from 'react';

interface ContainerProps {
    as?: ElementType;
    className?: string;
    page?: boolean;
}
const Container = (props: PropsWithChildren<ContainerProps>) => {
    const Component = props.as ?? 'div';
    return (
        <Component
            className={cx(
                'container max-w-7xl mx-auto px-4',
                props.page ? 'flex-1' : '',
                props.className
            )}
        >
            {props.children}
        </Component>
    );
};
export default Container;
