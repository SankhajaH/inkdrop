import Container from '../container';

type Props = {};
const Footer = (props: Props) => {
    return (
        <footer className='bg-base-300 mt-8 py-4'>
            <Container className='flex justify-center'>
                <div>
                    <p className='text-sm md:text-lg'>
                        Copyright © {new Date().getFullYear()} - All right reserved by Sankhaja
                        Hapukotuwa.
                    </p>
                </div>
            </Container>
        </footer>
    );
};
export default Footer;
