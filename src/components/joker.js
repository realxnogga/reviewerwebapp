
import { Carousel } from 'flowbite-react';

const Joker = () => {
    return (
        <>
            <section className="h-[35rem] w-full mb-[4rem] grid grid-cols-2 tablet:grid-cols-1 tablet:grid-rows-2 tablet:h-fit">
                <div>
                    <Carousel>
                        <div style={{ backgroundImage: `url(${require('../assets/images/joker1.jpg')})` }}
                            className="bg-cover bg-center bg-no-repeat h-full w-full"></div>

                        <div style={{ backgroundImage: `url(${require('../assets/images/joker2.jpg')})` }}
                            className="bg-cover bg-center bg-no-repeat h-full w-full"></div>

                        <div style={{ backgroundImage: `url(${require('../assets/images/joker3.jpg')})` }}
                            className="bg-cover bg-center bg-no-repeat h-full w-full"></div>

                        <div style={{ backgroundImage: `url(${require('../assets/images/joker4.jpg')})` }}
                            className="bg-cover bg-center bg-no-repeat h-full w-full"></div>
                    </Carousel>
                </div>


                <div className="flex flex-col items-start gap-5 px-7">
                    <h5 className="text-white text-[1.2rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur a ea laudantium!</h5>

                    <p className="text-white text-[1.5rem] font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae soluta sequi repellat.</p>

                    <h2 className="text-gray-300 ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores quasi qui cupiditate perferendis officiis sed perspiciatis beatae dolorum aspernatur nihil tenetur voluptatibus nesciunt fuga, nam minus dignissimos odit eos sequi reiciendis inventore! Labore eligendi atque, officia fuga suscipit, qui in deserunt voluptatem iure enim odit impedit distinctio sed modi architecto?</h2>
                </div>
            </section>
        </>
    );
}

export default Joker;