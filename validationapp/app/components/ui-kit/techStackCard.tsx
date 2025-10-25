import { MysqlIcon, Nextjs, ReactIcon } from '@/public/icons';
import { item } from '@/public/utils/animations';
import { motion } from 'framer-motion';
import React from 'react'

export type TechStackCardType = "react" | "next" | "db" ;

const TechStackCard = ({ type }: { type: TechStackCardType }) => {
  return (
    <motion.div variants={item} className='flex flex-col justify-between w-[300px] h-[300px] bg-base-200 rounded-[20px] p-5 drop-shadow-[0_0_4px_rgba(217,217,217,0.25)]'>
        {type === "react" && <ReactIcon className='w-[110px] h-[95px] mx-auto text-accent' />}
        {type === "next" && <Nextjs className='w-[110px] h-[110px] text-base-300 mx-auto' />}
        {type === "db" && <MysqlIcon className='w-[110px] h-[110px] mx-auto'/>}
        <div className="flex flex-col justify-between h-[150px] my-5">
          <h1 className='text-primary-content text-[36px] text-center font-bold'>
              {type === "react" && "React"}
              {type === "next" && "NextJS"}
              {type === "db" && "MySQL"}
          </h1>
          <h2 className='text-secondary text-[22px] text-center font-medium'>
              {type === "react" && "Dynamic and responsive UI"}
              {type === "next" && "Server Side Rendering and Routing"}
              {type === "db" && "Reliable and structured\ndata storage"}
          </h2>
        </div>
    </motion.div>
  )
}

export default TechStackCard