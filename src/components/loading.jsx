

import ReactLoading from 'react-loading';

export const LoadingComponent = () => {
   return (
   
    <div className='flex items-center gap-x-6'>
        <ReactLoading type={'spin'} color={'white'} height={'3rem'} width={'3rem'}/>
        <span className='font-normal'>Loading...</span>    
    </div>
   )
}