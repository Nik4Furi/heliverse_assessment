import React from 'react'
import Card from '../components/Card'

const Teams = () => {
  return (
    <>
      <main id="Teams">
        <section className="mx-auto w-[80%]">

            <small>Analyze your team</small>
            <h2 className='text-3xl font-bold mb-2'>Scratch Your Team ! Find Best One </h2>
            <p className='text-sm'>You can read out the team details and finding the best one, what
            s your needs satisfy</p>

        <div className='flex items-center gap-4 my-4'>
            {/* ------------ Team card details ------------  */}
            <Card />

        </div>

        </section>
      </main>
    </>
  )
}

export default Teams
