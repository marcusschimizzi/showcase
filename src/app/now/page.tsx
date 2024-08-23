'use client';
import Footer from '@/components/Footer';
import { colors as themeColors } from '@/utils/theme';


const NowPage: React.FC = () => {



    function convertToNumber(str: string) {
        return parseInt(str.replace(/^#/, ''), 16);
    }

    const colorsAsNumbers = [themeColors.primary[800], themeColors.secondary[800], themeColors.tertiary[800]].map(
        (color) => convertToNumber(color),
    );
    return (
        <>
        <div className='w-full h-48 relative mt-[68px] lg:mt-[96px]'>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-800 to-secondary-800'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-6xl text-gray-950 dark:text-gray-50'>Now</h1>
                </div>
        </div>
        <div className='text-white'>

            <h1>Now</h1>
            <p>This is my now page.</p>
        </div>
        <Footer />
        </>
    );
};

export default NowPage;