import React from 'react'
import MainWindow from '../MainWindow'
import { Card, Text } from '@mantine/core'
const Evaluator = () => {
  return (
    <MainWindow>

      <div className="container flex-col lg:flex-row md:flex-col justify-center lg:justify-start md:justify-center items-center mt-24">
        <p className="text-lg lg:text-9xl md:text-3xl font-extrabold text-white">Welcome.</p>
      </div>
        <div className="flex flex-1 justify-center items-center w-11/12 lg:w-2/6 md:w-2/6 mx-auto bg-white rounded-lg shadow-md">
            <p className="mx-6 font-extrabold text-xl">Enter some information about your vehicle...</p>
        </div>
    </MainWindow>
  )
}

export default Evaluator