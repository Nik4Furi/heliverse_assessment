import React, { useEffect } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { Token } from '../GlobalFunctions';
import { handleFetchTeams } from '../../Store/UsersSlice';
import Loading from '../components/Layout/Loading';

const Teams = () => {

  //------------- Fetch all the teams of the members
  const dispatch = useDispatch();

  const {loading,allTeams} = useSelector(state => state.user);

  useEffect(()=>{
    if(Token)
      dispatch(handleFetchTeams());
  },[dispatch])

  return (
    <>
      <main id="Teams">
        <section className="mx-auto p-4 md:p-2 w-[100%] md:w-[80%] ">

            <small>Analyze your team</small>
            <h2 className='text-3xl font-bold mb-2'>Scratch Your Team ! Find Best One </h2>
            <p className='text-sm'>You can read out the team details and finding the best one, what
            s your needs satisfy</p>

        <div className='flex items-center gap-4 my-4 flex-wrap justify-between '>
          {loading && <Loading />}
            {/* ------------ Team card details ------------  */}
            {allTeams?.map((team,i)=>(
              <Card key={i} title={team?.title} description={team?.description} members={team?.members}  />
            ))}

        </div>

        </section>
      </main>
    </>
  )
}

export default Teams
